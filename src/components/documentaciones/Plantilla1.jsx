import { Button } from 'primereact/button';
import  { useRef, useState } from 'react';

const Plantilla1 = () => {
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
        <h1 className='container'>Alistamiento Videoconferencia</h1>
            <div className="container" ref={contentRef}>
                <span>Se ha validado su solicitud para Alistamiento Videoconferencia, se informa
                que se ha realizado


                las siguientes actividades para dar solución a su requerimiento: </span>
                <br />
                <br />
                <p>1. Se realiza alistamiento de la sala de videoconferencia para presentación desde equipo portátil.</p>
                <br />
                <p>2. Se le entrega la sala al usuario en funcionamiento.</p>
                <br />
                <p>3. Finalizada la actividad se procede con el cierre del ticket.</p>
                <br />
                <br />
                <span>Una vez ejecutadas se procedió a realizar pruebas de funcionalidad evidenciando que 
                    queda operativo.
                </span>
                <br />
            </div>
            <div className="button-container">
                <button className='btn btn-primary'  onClick={handleCopy}>Copiar contenido</button>
                {copySuccess && <div className="container-copy">Contenido copiado al portapapeles</div>}
            </div>
        </>
    );
}

export default Plantilla1;
