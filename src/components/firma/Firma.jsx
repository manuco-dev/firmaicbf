import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

import { Button } from 'primereact/button';


function Firma({ data }) {
  const firmaRef = useRef(null);

  const generarImagen = () => {
    html2canvas(firmaRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'firma.png';
      link.click();
    });
  };

  return (
    <>
      <div className='form-group'>
        <div ref={firmaRef} className="firma">
          <img 
            src="/icbf-logo.png" // Usa la ruta relativa desde la carpeta `public`
            alt="ICBF Logo" 
            className="firma-logo" 
          />
          <div className="firma-info">
            <p><strong>{data.nombre}</strong></p>
            <p>{data.puesto}</p>
            <p>{data.grupo}</p>
            <p>{data.email}</p>
            <p>{data.direccion}</p>
            <p>{data.telefono}</p>
            <p>www.icbf.gov.co</p>
            <br />
            <p className='clasificacion-info'>Clasificación de la información: <strong>CLASIFICADA</strong></p>
          </div>
        </div>
        <Button label="Generar Firma PNG" icon="pi pi-check"onClick={generarImagen} ></Button>
      </div>
    </>
  );
}

export default Firma;
