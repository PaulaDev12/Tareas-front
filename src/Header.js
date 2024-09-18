import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {

// Para obtener la ubicación actual de la URL
  const location = useLocation();

  return (
    <header className="container mx-auto py-4">
      <h1 className="text-3xl font-bold flex items-center justify-between">
        
        {/* Texto del enlace que dirige a la paina principal en la lista de tareas */}
        <Link to="/" className="text-gray-900 hover:text-gray-700">
          Lista de tareas creadas
        </Link>
        
        {/* Texto del enlace para crear nueva tarea o regresar a la lista de tareas */}
        <Link
          to={location.pathname === '/new-entry' ? '/' : '/new-entry'}
          className="relative inline-flex items-center justify-center p-0.5 mb-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          <span className="relative px-5 py-1 transition-all ">
            {location.pathname === '/new-entry' ? 'Regresar' : 'Agregar una nueva tarea'}
          </span>
        </Link>
      </h1>
      <hr className="my-4" />
    </header>
  );
};

export default Header;
