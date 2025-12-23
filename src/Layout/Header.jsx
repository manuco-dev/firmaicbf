import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../context/AuthContext';

import './Header.css';
import DropdownMenu from '../components/documentaciones/DropdownMenu ';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="barra">
        <div className="contenedor">
          <div className="contenido-barra">
            <DropdownMenu />
            <Link to="/firma-corp">
              <Button variant="contained" color="primary" size="small">Firma Corporativa</Button>
            </Link>
            <Link to="/solucion-requerimiento">
              <Button variant="contained" color="secondary" size="small">Solución Req</Button>
            </Link>
            <Link to="/solucion-incidente">
              <Button variant="contained" color="error" size="small">Solución Inc</Button>
            </Link>

            <Link to="/comprimir">
              <Button variant="contained" color="primary" size="small">Comprimir Archivos</Button>
            </Link>
            <Link to="/feedback">
              <Button variant="contained" color="primary" size="small">Comentarios</Button>
            </Link>

            {/* Premium Feature - Historial */}
            {isAuthenticated && user?.isPremium && (
              <Link to="/historial">
                <Button variant="contained" style={{ backgroundColor: '#FFD700', color: '#000' }} size="small">
                  💎 Historial
                </Button>
              </Link>
            )}

            {/* User Section */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isAuthenticated ? (
                <>
                  <span style={{ fontSize: '14px', color: '#333' }}>
                    👤 {user?.name}
                    {user?.isPremium && <span style={{ marginLeft: '5px', color: '#FFD700', fontWeight: 'bold' }}>💎 Premium</span>}
                  </span>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={handleLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button variant="contained" color="success" size="small">
                    Iniciar Sesión
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
