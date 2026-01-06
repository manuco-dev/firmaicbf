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
    navigate('/');
  };

  return (
    <>
      <div className="header-main-title">
        <h1>MIS - IA</h1>
        <div className="header-icon-container">
          <img src="/favicon.svg" alt="Logo" className="header-page-icon" />
        </div>
      </div>
      <header className="barra">
        <div className="contenedor">
          <div className="contenido-barra">
            <DropdownMenu />

            <Link to="/solucion-requerimiento">
              <Button variant="contained" className="btn-header btn-orange-deep" size="small">Solución Req</Button>
            </Link>
            <Link to="/solucion-incidente">
              <Button variant="contained" className="btn-header btn-orange-light" size="small">Solución Inc</Button>
            </Link>

            <Link to="/feedback">
              <Button variant="contained" className="btn-header btn-amber" size="small">Comentarios</Button>
            </Link>

            {/* Premium Feature - Historial */}
            {isAuthenticated && user?.isPremium && (
              <Link to="/historial">
                <Button variant="contained" style={{ backgroundColor: '#FFD700', color: '#000' }} size="small">
                  💎 Historial
                </Button>
              </Link>
            )}

            {/* User Section (Only shows if logged in by some other means, or just logout) */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
              {isAuthenticated && (
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
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
