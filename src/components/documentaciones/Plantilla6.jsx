import React, { useRef, useState } from 'react';

const Plantilla6 = () => {
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
            <h1 className='container'>Salud Informatica</h1>
            <div className="container" ref={contentRef}>
                <span>Se ha validado su solicitud para Salud Informatica, se informa
                    que se ha realizado
                    las siguientes actividades para dar solución a su requerimiento: </span>
                <br />
                <br />
                <p>1.Se toma el control del equipo.</p>
                <br />
                <p>2. Se procede a validar el usuario admin local de Windows que esté deshabilitado, usuarios con privilegios admin deshabilitados, usuario Reg-Sop-Bolivar creado y habilitado, Antivirus Defender actualizado, software autorizados instalados y agente sccm instalado y activo.</p>
                <br />
                <p>3. En esta máquina todos los ítems cumplen con lo requerido</p>
                <br />
                <p>4. Se procede al cierre del caso.</p>
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

export default Plantilla6;
