import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Message } from 'primereact/message';

const Auth = () => {
    const navigate = useNavigate();
    const { login, register } = useAuth();

    // Login state
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    // Register state
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(loginEmail, loginPassword);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(false);

        if (registerPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        const result = await register(registerName, registerEmail, registerPassword);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }

        setLoading(false);
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <Card title="Bienvenido">
                {error && <Message severity="error" text={error} className="mb-3 w-full" />}

                <TabView>
                    <TabPanel header="Iniciar Sesión">
                        <form onSubmit={handleLogin} className="p-fluid">
                            <div className="field mb-3">
                                <label htmlFor="loginEmail" className="block text-sm font-bold mb-1">Email</label>
                                <InputText
                                    id="loginEmail"
                                    type="email"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    required
                                    className="p-inputtext-sm"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            <div className="field mb-3">
                                <label htmlFor="loginPassword" className="block text-sm font-bold mb-1">Contraseña</label>
                                <Password
                                    id="loginPassword"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    required
                                    feedback={false}
                                    toggleMask
                                    className="p-inputtext-sm"
                                    inputClassName="p-inputtext-sm"
                                />
                            </div>

                            <Button
                                label="Iniciar Sesión"
                                icon="pi pi-sign-in"
                                type="submit"
                                loading={loading}
                                className="p-button-sm"
                            />
                        </form>
                    </TabPanel>

                    <TabPanel header="Registrarse">
                        <form onSubmit={handleRegister} className="p-fluid">
                            <div className="field mb-3">
                                <label htmlFor="registerName" className="block text-sm font-bold mb-1">Nombre</label>
                                <InputText
                                    id="registerName"
                                    value={registerName}
                                    onChange={(e) => setRegisterName(e.target.value)}
                                    required
                                    className="p-inputtext-sm"
                                    placeholder="Tu nombre"
                                />
                            </div>

                            <div className="field mb-3">
                                <label htmlFor="registerEmail" className="block text-sm font-bold mb-1">Email</label>
                                <InputText
                                    id="registerEmail"
                                    type="email"
                                    value={registerEmail}
                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                    required
                                    className="p-inputtext-sm"
                                    placeholder="tu@email.com"
                                />
                            </div>

                            <div className="field mb-3">
                                <label htmlFor="registerPassword" className="block text-sm font-bold mb-1">Contraseña</label>
                                <Password
                                    id="registerPassword"
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    required
                                    toggleMask
                                    className="p-inputtext-sm"
                                    inputClassName="p-inputtext-sm"
                                />
                            </div>

                            <Button
                                label="Registrarse"
                                icon="pi pi-user-plus"
                                type="submit"
                                loading={loading}
                                className="p-button-sm p-button-success"
                            />
                        </form>
                    </TabPanel>
                </TabView>

                <div className="mt-3 text-center text-sm">
                    <p className="text-gray-600">
                        <strong>Gratis:</strong> Genera soluciones ilimitadas<br />
                        <strong>Premium:</strong> Accede a tu historial de casos
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Auth;
