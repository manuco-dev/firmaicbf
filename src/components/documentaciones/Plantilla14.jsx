import React, { useRef, useState } from 'react';


const Plantilla14 = () => {
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
            <h1 className='container'>Configuración e Instalación de CamerCloud</h1>
            <div className="container" ref={contentRef}>
                <span>Se ha validado su solicitud para Configuración e Instalación de CamerCloud, se informa
                    que se ha realizado
                    las siguientes actividades para dar solución a su requerimiento: </span>
                <br />
                <br />
                <p>1 - Se realiza instalación de Software CamerCloud y sus certificados desde la página de descarga oficial.</p>
                <br />
                <p>2 - Se desinstala epass2003 (token antiguo) para evitar conflictos.</p>
                <br />
                <p>3 - Se realiza activación de usuario y se procede con la activación de Pin y Google Autenticathor.</p>
                <br />
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

export default Plantilla14;
