
import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const SolucionIncidente = () => {
    const [causa, setCausa] = useState('');
    const [ticket, setTicket] = useState('');
    const [soluciones, setSoluciones] = useState(['', '', '', '', '']);
    const [generatedHtml, setGeneratedHtml] = useState('');
    const toast = useRef(null);

    const handleSolucionChange = (index, value) => {
        const newSoluciones = [...soluciones];
        newSoluciones[index] = value;
        setSoluciones(newSoluciones);
    };

    const generarHtml = () => {
        const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <title>Scripts MIS</title>
</head>
<body>
    <h2>Solución generica de incidentes</h2>
    <span>Atendiendo a su solicitud se procedió a realizar revisión de lo reportado, se ha identificado que la causa de la falla se presenta por <strong>${causa}</strong> (Ticket: ${ticket}), para dar solución se procedió a realizar las siguientes actividades:</span>
    <br><br>
    ${soluciones.map(sol => sol ? `<p>${sol}</p><br>` : '').join('')}
    <span>Una vez ejecutadas se procedió a realizar pruebas de funcionalidad evidenciando que queda operativo nuevamente.</span>
</body>
</html>`;
        return html;
    };

    const generarTextoPlano = () => {
        const actividadesTexto = soluciones.filter(s => s.trim() !== '').map(s => `- ${s}`).join('\n');
        return `Atendiendo a su solicitud se procedió a realizar revisión de lo reportado, se ha identificado que la causa de la falla se presenta por ${causa} (Ticket: ${ticket}), para dar solución se procedió a realizar las siguientes actividades:\n\n${actividadesTexto}\n\nUna vez ejecutadas se procedió a realizar pruebas de funcionalidad evidenciando que queda operativo nuevamente.`;
    };

    const [loadingAI, setLoadingAI] = useState(null); // Index of the input being improved
    const [loadingSuggestAI, setLoadingSuggestAI] = useState(false);

    const suggestWithAI = async () => {
        if (!causa.trim()) return;

        setLoadingSuggestAI(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
            const response = await axios.post(`${backendUrl}/api/ai/suggest`, {
                problem: causa
            });

            setSoluciones(response.data.steps);
            toast.current.show({ severity: 'success', summary: 'Sugerencias Generadas', detail: 'Se han generado pasos automáticos', life: 2000 });
        } catch (error) {
            console.error(error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudieron generar sugerencias', life: 3000 });
        } finally {
            setLoadingSuggestAI(false);
        }
    };

    const improveWithAI = async (index) => {
        const textToImprove = soluciones[index];
        if (!textToImprove.trim()) return;

        setLoadingAI(index);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
            const response = await axios.post(`${backendUrl}/api/ai/formalize`, {
                text: textToImprove
            });

            const improvedText = response.data.formalizedText;
            handleSolucionChange(index, improvedText);
            toast.current.show({ severity: 'success', summary: 'Mejorado', detail: 'Texto formalizado con IA', life: 2000 });
        } catch (error) {
            console.error(error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo conectar con la IA', life: 3000 });
        } finally {
            setLoadingAI(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const html = generarHtml();
        setGeneratedHtml(html);

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
            await axios.post(`${backendUrl}/api/incidents`, {
                ticket,
                causa,
                actividades: soluciones.filter(s => s.trim() !== ''),
                fechaCreacion: new Date()
            });

            toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Incidente guardado correctamente', life: 3000 });
        } catch (error) {
            console.error(error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el incidente', life: 3000 });
        }
    };

    const copyToClipboard = () => {
        const textoPlano = generarTextoPlano();
        navigator.clipboard.writeText(textoPlano);
        toast.current.show({ severity: 'info', summary: 'Copiado', detail: 'Texto de la solución copiado al portapapeles', life: 2000 });
    };

    const handleClear = () => {
        setCausa('');
        setTicket('');
        setSoluciones(['', '', '', '', '']);
        setGeneratedHtml('');
        toast.current.show({ severity: 'info', summary: 'Campos Limpiados', detail: 'El formulario se ha reiniciado', life: 2000 });
    };

    return (
        <div className="container mt-5">
            <Toast ref={toast} />
            <Card title="Generador de Solución de Incidentes">
                <form onSubmit={handleSubmit}>
                    <div className="p-fluid">
                        <div className="p-field mb-2">
                            <label htmlFor="ticket" className="form-label text-sm">Número de Ticket</label>
                            <InputText id="ticket" value={ticket} onChange={(e) => setTicket(e.target.value)} placeholder="Ej. 12345" required className="p-inputtext-sm" />
                        </div>
                        <div className="p-field mb-2">
                            <label htmlFor="causa" className="form-label text-sm">Causa de la Falla</label>
                            <span className="text-xs block mb-1">Se ha identificado que la causa de la falla se presenta por: </span>
                            <div className="p-inputgroup">
                                <InputText id="causa" value={causa} onChange={(e) => setCausa(e.target.value)} required className="p-inputtext-sm" />
                                <Button
                                    type="button"
                                    icon={loadingSuggestAI ? "pi pi-spin pi-spinner" : "pi pi-android"}
                                    className="p-button-info p-button-sm"
                                    onClick={suggestWithAI}
                                    tooltip="Sugerir pasos con IA"
                                    tooltipOptions={{ position: 'top' }}
                                    disabled={!causa.trim() || loadingSuggestAI}
                                />
                            </div>
                        </div>

                        <div className="mb-2">
                            <label className="form-label text-sm">Actividades Realizadas:</label>
                            {soluciones.map((sol, index) => (
                                <div key={index} className="mb-1 p-inputgroup">
                                    <InputText
                                        value={sol}
                                        onChange={(e) => handleSolucionChange(index, e.target.value)}
                                        placeholder={`Solución ${index + 1}`}
                                        className="p-inputtext-sm"
                                    />
                                    <Button
                                        type="button"
                                        icon={loadingAI === index ? "pi pi-spin pi-spinner" : "pi pi-bolt"}
                                        className="p-button-warning p-button-sm"
                                        onClick={() => improveWithAI(index)}
                                        tooltip="Mejorar redacción con IA"
                                        tooltipOptions={{ position: 'top' }}
                                        disabled={loadingAI !== null}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2 flex-column md:flex-row">
                            <Button label="Generar Script y Guardar" icon="pi pi-save" type="submit" className="w-full md:w-auto" />
                            <Button
                                label="Limpiar Campos"
                                icon="pi pi-trash"
                                type="button"
                                className="p-button-danger p-button-outlined w-full md:w-auto"
                                onClick={handleClear}
                            />
                        </div>
                    </div>
                </form>
            </Card>

            {generatedHtml && (
                <Card title="Vista Previa de la Solución" className="mt-4">
                    <div className="mb-3">
                        <Button label="Copiar Texto Solución" icon="pi pi-copy" className="p-button-secondary" onClick={copyToClipboard} />
                    </div>
                    <div className="mt-3">
                        <div dangerouslySetInnerHTML={{ __html: generatedHtml }} className="border p-3" />
                    </div>
                </Card>
            )}
        </div>
    );
};

export default SolucionIncidente;
