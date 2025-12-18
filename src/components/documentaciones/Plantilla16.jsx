import React, { useRef, useState } from 'react';

const Plantilla16 = () => {
    const contentRef = useRef(null);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = async () => {
        if (contentRef.current) {
            const textToCopy = contentRef.current.innerText; // o innerHTML si quieres copiar con HTML
            try {
                await navigator.clipboard.writeText(textToCopy);
                setCopySuccess(true);
                setTimeout(() => {
                    setCopySuccess(false);
                }, 2000); // Oculta el mensaje después de 2 segundos
            } catch (err) {
                console.error('Error al copiar el contenido: ', err);
            }
        }
    };

    return ( 
        <>
            <h1 className='container'>Configuración de Perfil Windows 11</h1>
            <div className="container" ref={contentRef}>
                <span>Se ha validado su solicitud para Configuración de Perfil Windows 11, se informa
                    que se ha realizado
                    las siguientes actividades para dar solución a su requerimiento: </span>
                <br />
                <br />
                <p>1. Se realiza configuración de Windows y se asignan hostname institucional de acuerdo a parámetros establecidos por la DIT.</p>
                <br />
                <p>2. Se procede a ingresar equipo al Domain ICBF.</p>
                <br />
                <p>3. Se realiza Instalación de Paquete Office 365.</p>
                <br />
                <p>4. Se realiza configuración de impresora.</p>
                <br />
                <p>5. Instalación de ADOBE.</p>
                <br />
                <p>6. Instalación de IZarc.</p>
                <br />
                <p>7. Instalación de PDF Gear</p>
                <br />
                <p>8. Se procede con el cierre del ticket a satisfacción.</p>
                <br />
                <span>Una vez ejecutadas se procedió a realizar pruebas de funcionalidad evidenciando que 
                    queda operativo.</span>
                <hr />
            </div>
            <div className="button-container">
                <button className='btn btn-primary' onClick={handleCopy}>Copiar Solución</button>
                {copySuccess && <div className="container-copy">Contenido copiado al portapapeles</div>}
            </div>
        </>
    );
}

export default Plantilla16;
