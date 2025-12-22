import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            // Optionally verify token and get user data
        } else {
            localStorage.removeItem('token');
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${backendUrl}/api/auth/login`, {
                email,
                password
            });

            setToken(response.data.token);
            setUser(response.data.user);
            return { success: true, user: response.data.user };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al iniciar sesión'
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const response = await axios.post(`${backendUrl}/api/auth/register`, {
                name,
                email,
                password
            });

            setToken(response.data.token);
            setUser(response.data.user);
            return { success: true, user: response.data.user };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Error al registrar usuario'
            };
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    const value = {
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
