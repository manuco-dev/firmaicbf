import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import './Header.css';
import DropdownMenu from '../components/documentaciones/DropdownMenu ';

const Header = () => {
  return (
    <>
      {/* Layout de noticias */}
      <div className="layout-news">
        <h5>Donaciones al Nequi: 3013730306 -- Developer Web: ING Manuel Cogollo</h5>
      </div>

      <header className="barra">
        <div className="contenedor">
          <div className="contenido-barra">
            <DropdownMenu />
            <Link to="/firma-corp">
              <Button variant="contained" color="primary" size="small">Firma Corporativa</Button>
            </Link>
            <Link to="/comprimir">
              <Button variant="contained" color="primary" size="small">Comprimir Archivos</Button>
            </Link>
            <Link to="/feedback">
              <Button variant="contained" color="primary" size="small">Comentarios</Button>
            </Link>
            <Link to="/solucion-requerimiento">
              <Button variant="contained" color="secondary" size="small">Solución Req</Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
