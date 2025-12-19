import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

import './FeedBack.css';

const FeedBack = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        comment: ''
    });
    const [recaptchaToken, setRecaptchaToken] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRecaptchaChange = (token) => {
        setRecaptchaToken(token);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!recaptchaToken) {
            Swal.fire('Por favor completa el reCAPTCHA');
            return;
        }

        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
            await axios.post(`${backendUrl}/api/comments`, formData);

            Swal.fire({
                icon: 'success',
                title: '¡Gracias!',
                text: 'Hemos recibido tu comentario satisfactoriamente'
            });
            navigate('/');
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al guardar tu comentario'
            });
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '600px' }}>
            <Card title="Envíanos tus Comentarios">
                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="field mb-3">
                        <label htmlFor="name" className="block text-sm font-bold mb-1">Nombre</label>
                        <InputText
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Déjanos saber tu nombre"
                            required
                            className="p-inputtext-sm"
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="email" className="block text-sm font-bold mb-1">Email</label>
                        <InputText
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Correo Electrónico"
                            required
                            className="p-inputtext-sm"
                        />
                    </div>
                    <div className="field mb-3">
                        <label htmlFor="comment" className="block text-sm font-bold mb-1">Comentario</label>
                        <InputTextarea
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Escribe tu comentario aquí..."
                            required
                            autoResize
                            className="text-sm"
                        />
                    </div>

                    <div className="field mb-3 flex justify-content-center">
                        <ReCAPTCHA
                            sitekey="6LcPaB0qAAAAALP1SigJEGwRGMT14aoK7OJGfiYn"
                            onChange={handleRecaptchaChange}
                        />
                    </div>

                    <Button label="Enviar Comentario" icon="pi pi-send" type="submit" className="p-button-sm" />
                </form>
            </Card>
        </div>
    );
};

export default FeedBack;
