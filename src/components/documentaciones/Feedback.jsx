import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './FeedBack.css'; // Asegúrate de crear este archivo CSS para los estilos
import clienteAxios from '../../../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

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
            Swal.fire('Please complete the reCAPTCHA');
            return;
        }
        try {
            await clienteAxios.post('/api/comments/new', formData );
            Swal.fire('Hemos recibido tu comentario satisfactoriamente');
            navigate('/')
        } catch (error) {
            console.error('Error al guardar los datos');
        }
    };

    return (
        <div className="feedback-container">
            <h2>Feedback</h2>
            <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
                <input type="hidden" name="form-name" value="contact" />
                <div className="form-group">
                    <label>
                        Name:
                        <input 
                            type="text" 
                            name="name" 
                            placeholder='Dejanos saber tu nombre'
                            value={formData.name}
                            onChange={handleChange}
                            required 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Email:
                        <input 
                            type="email" 
                            name="email" 
                            placeholder='Correo Electronico'
                            value={formData.email}
                            onChange={handleChange}
                            required 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Comment:
                        <textarea 
                            name="comentario" 
                            placeholder='Comentario'
                            value={formData.comentario}
                            onChange={handleChange}
                            required 
                        />
                    </label>
                </div>
                <div className="form-group">
                    <ReCAPTCHA
                        sitekey="6LcPaB0qAAAAALP1SigJEGwRGMT14aoK7OJGfiYn"
                        onChange={handleRecaptchaChange}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Send</button>
                </div>
            </form>
        </div>
    );
};

export default FeedBack;
