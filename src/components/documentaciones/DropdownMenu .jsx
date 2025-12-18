import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';

const DropdownMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="contained"
        color="primary"
        size="small"
      >
        Plantillas de Solución
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/plantilla12">
        Plantilla Default Requerimientos
        </MenuItem>

        <MenuItem onClick={handleClose} component={Link} to="/plantilla13">
        Configuración de Aplicativo SIM
        </MenuItem>

        <MenuItem onClick={handleClose} component={Link} to="/plantilla1">
          Alistamiento de VideoConferencia
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/plantilla2">
        Configuración de Perfil
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/plantilla16">
        Configuración de Perfil Windows 11
        </MenuItem>
        
        <MenuItem onClick={handleClose} component={Link} to="/plantilla3">
        Configuración de Impresora
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/plantilla4">
        Atasco de Papel
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/plantilla5">
        Actualización de Firma
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/plantilla6">
        Salud Informatica
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/plantilla7">
        Equipo Fuera de Dominio
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/plantilla8">
        Configuración de SIIF Nación
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/plantilla9">
        Configuración de red Wifi
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/plantilla10">
        Instalación de PDFGEAR
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/plantilla11">
        Instalación de SEVEN
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/plantilla14">
        Configuración e Instalación de CamerCloud
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/plantilla15">
        Actualización de Firma
        </MenuItem>

        
      </Menu>
      
    </div>
  );
};

export default DropdownMenu;
