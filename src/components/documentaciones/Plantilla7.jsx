import React, { useRef, useState } from 'react';

const Plantilla7 = () => {
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
            <h1 className='container'>Equipo fuera de Dominio</h1>
            <div className="container" ref={contentRef}>
                <span>Se ha validado su solicitud para Equipo fuera de Dominio, se informa
                    que se ha realizado
                    las siguientes actividades para dar solución a su requerimiento: </span>
                <br />
                <br />
                <p>1. Se identifica que el equipo se encuentra por fuera del dominio. </p>
                <br />
                <p>2. Se procedió desde la configuración del sistema sacar el equipo del dominio de forma correcta.</p>
                <br />
                <p>3. Se reinicia el equipo y se ingresa al dominio de nuevo de forma correcta con el nuevo nombramiento del equipo.</p>
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

export default Plantilla7;
