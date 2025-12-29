import { useRef, useState } from 'react';

const Plantilla4 = () => {
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
            <h1 className='container'>Atasco de Papel</h1>
            <div className="container" ref={contentRef}>
                <span>Se ha validado su solicitud relacionada con Atasco de Papel. En atención a la misma, se realizaron las siguientes actividades con el fin de dar solución al requerimiento: </span>
                <br />
                <br />
                <p>1. Se identifica un atasco de papel en las bandejas.</p>
                <br />
                <p>2. Se retira el papel y se realiza las pruebas de impresión de forma correcta.  </p>
                <br />

                <br />
                <br />
                <span>
                    Tras la ejecución de estas acciones, se llevaron a cabo pruebas de funcionalidad, confirmando que el sistema ha quedado operativo conforme a lo requerido
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

export default Plantilla4;
