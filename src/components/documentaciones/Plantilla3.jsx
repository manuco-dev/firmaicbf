import { useRef, useState } from 'react';

const Plantilla3 = () => {
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
            <h1 className='container'>Configuración de Impresora</h1>
            <div className="container" ref={contentRef}>
                <span>Se ha validado su solicitud relacionada con Configuración de Impresora. En atención a la misma, se realizaron las siguientes actividades con el fin de dar solución al requerimiento: </span>
                <br />
                <br />
                <p>1. Se descarga la última versión del controlador de la impresora.</p>
                <br />
                <p>2. Se instala y se configura la impresora en el equipo. </p>
                <br />
                <p>3. Se realizó pruebas de impresión de manera correcta.</p>
                <br />
                <p>4. Se procede a cierre de la solicitud.</p>
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
                <button onClick={handleCopy}>Copiar Solución</button>
                {copySuccess && <div className="container-copy">Contenido copiado al portapapeles</div>}
            </div>
        </>
    );
}

export default Plantilla3;
