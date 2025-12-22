import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { TabView, TabPanel } from 'primereact/tabview';
import { Message } from 'primereact/message';
import axios from 'axios';

const Historial = () => {
    const navigate = useNavigate();
    const { token, isAuthenticated, user } = useAuth();
    const toast = useRef(null);

    const [requirements, setRequirements] = useState([]);
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            toast.current?.show({
                severity: 'warn',
                summary: 'Autenticación Requerida',
                detail: 'Debes iniciar sesión para ver el historial',
                life: 3000
            });
            setTimeout(() => navigate('/login'), 2000);
            return;
        }

        // Check if user is premium
        if (!user?.isPremium && !user?.isPremiumActive) {
            setIsPremium(false);
            setLoading(false);
            return;
        }

        setIsPremium(true);
        fetchHistorial();
    }, [isAuthenticated, user, navigate]);

    const fetchHistorial = async () => {
        setLoading(true);
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

        try {
            // Fetch requirements
            const reqResponse = await axios.get(`${backendUrl}/api/requirements`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setRequirements(reqResponse.data);

            // Fetch incidents
            const incResponse = await axios.get(`${backendUrl}/api/incidents`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setIncidents(incResponse.data);

            toast.current?.show({
                severity: 'success',
                summary: 'Historial Cargado',
                detail: 'Se han cargado tus registros',
                life: 2000
            });
        } catch (error) {
            console.error(error);
            if (error.response?.status === 403) {
                setIsPremium(false);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Premium Requerido',
                    detail: error.response?.data?.message || 'Esta funcionalidad requiere suscripción Premium',
                    life: 4000
                });
            } else {
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo cargar el historial',
                    life: 3000
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const actividadesTemplate = (rowData) => {
        return (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {rowData.actividades.map((act, idx) => (
                    <li key={idx} style={{ fontSize: '12px' }}>{act}</li>
                ))}
            </ul>
        );
    };

    if (!isPremium && !loading) {
        return (
            <div className="container mt-5" style={{ maxWidth: '800px' }}>
                <Toast ref={toast} />
                <Card title="Historial de Casos">
                    <Message
                        severity="warn"
                        text="Esta funcionalidad requiere suscripción Premium. Actualiza tu cuenta para acceder a tu historial completo de requerimientos e incidentes."
                        className="w-full mb-3"
                    />
                    <div className="text-center mt-4">
                        <h3>💎 Beneficios Premium</h3>
                        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '20px auto' }}>
                            <li>Ver historial completo de requerimientos</li>
                            <li>Ver historial completo de incidentes</li>
                            <li>Buscar y filtrar casos antiguos</li>
                            <li>Exportar reportes (próximamente)</li>
                        </ul>
                        <Button
                            label="Contactar para Premium"
                            icon="pi pi-envelope"
                            className="p-button-success"
                            onClick={() => navigate('/feedback')}
                        />
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <Toast ref={toast} />
            <Card title="💎 Historial de Casos (Premium)">
                <TabView>
                    <TabPanel header={`Requerimientos (${requirements.length})`}>
                        <DataTable
                            value={requirements}
                            loading={loading}
                            paginator
                            rows={10}
                            emptyMessage="No hay requerimientos registrados"
                            className="p-datatable-sm"
                        >
                            <Column field="ticket" header="Ticket" sortable style={{ width: '10%' }} />
                            <Column field="solicitud" header="Solicitud" sortable style={{ width: '30%' }} />
                            <Column field="actividades" header="Actividades" body={actividadesTemplate} style={{ width: '45%' }} />
                            <Column
                                field="fechaCreacion"
                                header="Fecha"
                                body={(rowData) => formatDate(rowData.fechaCreacion)}
                                sortable
                                style={{ width: '15%' }}
                            />
                        </DataTable>
                    </TabPanel>

                    <TabPanel header={`Incidentes (${incidents.length})`}>
                        <DataTable
                            value={incidents}
                            loading={loading}
                            paginator
                            rows={10}
                            emptyMessage="No hay incidentes registrados"
                            className="p-datatable-sm"
                        >
                            <Column field="ticket" header="Ticket" sortable style={{ width: '10%' }} />
                            <Column field="causa" header="Causa" sortable style={{ width: '30%' }} />
                            <Column field="actividades" header="Actividades" body={actividadesTemplate} style={{ width: '45%' }} />
                            <Column
                                field="fechaCreacion"
                                header="Fecha"
                                body={(rowData) => formatDate(rowData.fechaCreacion)}
                                sortable
                                style={{ width: '15%' }}
                            />
                        </DataTable>
                    </TabPanel>
                </TabView>
            </Card>
        </div>
    );
};

export default Historial;
