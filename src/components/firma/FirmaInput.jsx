import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

import Firma from './Firma';

const FirmaInput = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    puesto: '',
    grupo: '',
    grupoManual: '',
    email: '',
    direccion: '',
    direccionManual: '',
    telefono: '' // Mantenemos en el estado por si el componente Firma lo usa internamente el prop, pero quitamos el input
  });

  const grupos = [
    'Grupo Interno de Trabajo de Prevención',
    'Grupo Interno de Protección Especial y Autoridades Administrativas',
    'Grupo Interno de Responsabilidad Penal',
    'Grupo Interno de Gestión Misional',
    'Grupo Interno de Planeación y Tecnología',
    'Grupo Interno de Trabajo Jurídico',
    'Grupo Interno de Trabajo Contractual',
    'Grupo Interno de Trabajo Jurídico y Contractual',
    'Grupo Interno de Trabajo de Talento Humano',
    'Grupo Interno de Trabajo Administrativo',
    'Grupo Interno de Trabajo Administrativo y Talento Humano',
    'Grupo Interno de Trabajo Financiero',
    'Grupo Interno de Trabajo de Recaudo',
    'Grupo Interno de Trabajo de Gestión de Apoyo',
    'Otro'
  ];

  const direcciones = [
    'Barrio la Matuna, Edificio Concasa Piso 16',
    'Barrio Torices Bogotá Cra. 43 #14a-34',
    'Barrio Santa Lucia, Calle 31 Mz G Lote 15',
    'Calle 31 B con carrera 56 - 58 Plaza Estadio 11 de Noviembre Barrio Olaya Herrera',
    'Calle 25 # 47 - 17 El Cármen de Bolívar - Bolívar',
    'Avenida Colombia # 6 - 36 Magangué - Bolívar',
    'Calle 19 # 1 A - 15 Barrio Centro Mompós - Bolívar',
    'Calle 11 Libertador # 8 - 35 Barrio La Sabana, Simití - Bolívar',
    'Turbaco- Urb La Granja Cra 15 #28-284',
    'Carrera 17 # 5 - 191 Barrio Torices Sector San Pedro, Cartagena - Bolívar',
    'Otra'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (e) => {
    setFormData({
      ...formData,
      direccion: e.value,
      direccionManual: e.value === 'Otra' ? formData.direccionManual : ''
    });
  };

  const handleGrupoSelectChange = (e) => {
    setFormData({
      ...formData,
      grupo: e.value,
      grupoManual: e.value === 'Otro' ? formData.grupoManual : ''
    });
  };

  return (
    <div className="firma-page-container">
      <div className="firma-grid">
        {/* LADO IZQUIERDO: FORMULARIO */}
        <div className="firma-form-card">
          <h2 className="form-title">
            <i className="pi pi-id-card" style={{ fontSize: '1.5rem' }}></i>
            Configurador de Firma
          </h2>
          <Divider />

          <form className="p-fluid">
            <div className="input-container">
              <FloatLabel>
                <InputText
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="p-inputtext-sm"
                />
                <label htmlFor="nombre">Nombres y Apellidos</label>
              </FloatLabel>
            </div>

            <div className="input-container">
              <FloatLabel>
                <InputText
                  id="puesto"
                  name="puesto"
                  value={formData.puesto}
                  onChange={handleChange}
                  className="p-inputtext-sm"
                />
                <label htmlFor="puesto">Cargo planta o Contratista</label>
              </FloatLabel>
            </div>

            <div className="input-container">
              <label htmlFor="grupo" className="p-d-block" style={{ fontSize: '0.8rem', color: '#666' }}>Grupo de Trabajo</label>
              <Dropdown
                id="grupo"
                name="grupo"
                value={formData.grupo}
                options={grupos.map((g) => ({ label: g, value: g }))}
                onChange={handleGrupoSelectChange}
                placeholder="Selecciona un grupo"
                filter
                className="p-inputtext-sm"
              />
            </div>

            {formData.grupo === 'Otro' && (
              <div className="input-container animate__animated animate__fadeIn">
                <FloatLabel>
                  <InputText
                    id="grupoManual"
                    name="grupoManual"
                    value={formData.grupoManual}
                    onChange={(e) => setFormData({ ...formData, grupoManual: e.target.value })}
                    placeholder="Escriba el grupo"
                  />
                  <label htmlFor="grupoManual">Escriba el grupo personalizado</label>
                </FloatLabel>
              </div>
            )}

            <div className="input-container">
              <FloatLabel>
                <InputText
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-inputtext-sm"
                />
                <label htmlFor="email">ICBF Sede Regional XXXXXXXXX</label>
              </FloatLabel>
            </div>

            <div className="input-container">
              <label htmlFor="direccion" className="p-d-block" style={{ fontSize: '0.8rem', color: '#666' }}>Direccion / Sede</label>
              <Dropdown
                id="direccion"
                name="direccion"
                value={formData.direccion}
                options={direcciones.map((d) => ({ label: d, value: d }))}
                onChange={handleSelectChange}
                placeholder="Selecciona una ubicación"
                filter
                className="p-inputtext-sm"
              />
            </div>

            {formData.direccion === 'Otra' && (
              <div className="input-container animate__animated animate__fadeIn">
                <FloatLabel>
                  <InputText
                    id="direccionManual"
                    name="direccionManual"
                    value={formData.direccionManual}
                    onChange={(e) => setFormData({ ...formData, direccionManual: e.target.value })}
                    placeholder="Escriba la dirección"
                  />
                  <label htmlFor="direccionManual">Escriba la dirección personalizada</label>
                </FloatLabel>
              </div>
            )}
          </form>
        </div>

        {/* LADO DERECHO: VISTA PREVIA */}
        <div className="firma-preview-section">
          <Card subTitle="Vista Previa de la Firma" className="p-shadow-3">
            <Firma data={{
              ...formData,
              direccion: formData.direccion === 'Otra' ? formData.direccionManual : formData.direccion,
              grupo: formData.grupo === 'Otro' ? formData.grupoManual : formData.grupo
            }} />
          </Card>

          <div style={{ marginTop: '20px', padding: '15px', background: '#e3f2fd', borderRadius: '8px', borderLeft: '4px solid #2196f3' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#1565c0' }}>
              <i className="pi pi-info-circle" style={{ marginRight: '10px' }}></i>
              <strong>Nota:</strong> La imagen generada tendrá el tamaño estándar corporativo para Outlook y Gmail.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirmaInput;
