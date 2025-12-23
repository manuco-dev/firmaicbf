import React, { useRef, useState } from 'react';

const Plantilla8 = () => {
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
            <h1 className='container'>Configuración de Siif Nación</h1>
            <div className="container" ref={contentRef}>
                <span>Se ha validado su solicitud relacionada con Configuración de Siif Nación. En atención a la misma, se realizaron las siguientes actividades con el fin de dar solución al requerimiento: </span>
                <br />
                <br />
                <p>1. Se descargó y se instaló la última versión del Elogic Monitor.</p>
                <br />
                <p>2. Se descagar CamerCloud y se configura en el equipo. </p>
                <br />
                <p>3. Se dan permisos de de localhost a las instancias de ELOGIC Monitor</p>
                <br />
                <p>4. Se realizan pruebas con el Funcionario las cuales fueron satisfactorias.</p>
                <br />
                <br />
                <span>
                    Tras la ejecución de estas acciones, se llevaron a cabo pruebas de funcionalidad, confirmando que el sistema ha quedado operativo conforme a lo requerido<br /><br />
                    Le recordamos Sr/a Usuario que puede radicar sus solicitudes a través de:<br />
                    • Canal de autoservicio https://mis.icbf.gov.co<br />
                    • Correo: mis@icbf.gov.co<br />
                    • MISI - Chatbot Teams<br />
                    • Ext. 8080
                </span>
                <hr />
            </div>
            <div className="button-container">
                <button className='btn btn-primary' onClick={handleCopy}>Copiar Solución</button>
                {copySuccess && <div className="container-copy">Contenido copiado al portapapeles</div>}
            </div>
        </>
    );
}

export default Plantilla8;
