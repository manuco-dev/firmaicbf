import React, { useRef, useState } from 'react';


const Plantilla15 = () => {
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
            <h1 className='container'>Actualización de Firma</h1>
            <div className="container" ref={contentRef}>
                <span>Se ha validado su solicitud para Actualización de Firma, se informa
                    que se ha realizado
                    las siguientes actividades para dar solución a su requerimiento: </span>
                <br />
                <p>1. Se configura y se actualiza el último modelo de la firma de correo desde las opciones de Outlook 365 y Outlook Desktop de manera correcta.</p>
                <br />
                <p>2. Se comprueba él buen funcionamiento de la solución dada a satisfacción.</p>
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

export default Plantilla15;
