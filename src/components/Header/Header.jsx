import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from '../Home/Home';
import {Usuarios } from '../Usuarios/Usuarios';
import { Territorio } from '../Territorio/Territorio';
import { Contacto } from '../Contacto/Contacto';
import { IniciarSesion } from '../IniciarSesion/IniciarSesion';

export const Header = () => {
    return (
    <div>
      {/* Header */}
        <header className="bg-green-600 text-white px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo y Título */}
            <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.1">
                <img 
                src="https://res.cloudinary.com/dppf30duk/image/upload/v1751035524/logo-tremendo-territorio_o4h9nd.jpg" 
                alt="logo" 
                className="w-full h-full object-cover rounded-full"
                />
            </div>
            <h2 className="text-2xl font-bold text-white p-3">Tremendo Territorio</h2>
            </div>

          {/* Navegación */}
            <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
                <li>
                <Link 
                    to='/inicio' 
                    className="text-white hover:text-green-200 transition-colors duration-200 font-medium"
                >
                    Inicio
                </Link>
                </li>
                <li>
                <Link 
                    to='/usuarios' 
                    className="text-white hover:text-green-200 transition-colors duration-200 font-medium"
                >
                    Usuarios
                </Link>
                </li>
                <li>
                <Link 
                    to='/territorio'
                    className="text-white hover:text-green-200 transition-colors duration-200 font-medium"
                >
                    Territorio
                </Link>
                </li>
                <li>
                <Link 
                    to='/contacto' 
                    className="text-white hover:text-green-200 transition-colors duration-200 font-medium"
                >
                    Contacto
                </Link>
                </li>
                <li>
                <Link 
                    to='/iniciarSesion' 
                    className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md transition-colors duration-200 font-medium"
                >
                    Iniciar Sesión
                </Link>
                </li>
            </ul>
            </nav>

          {/* Menú móvil - botón hamburguesa */}
            <div className="md:hidden">
            <button className="text-white hover:text-green-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            </div>
        </div>
        </header>
        
      {/* Rutas */}
        <Routes>
        <Route path='/inicio' element={<Home/>} />
        <Route path='/usuarios' element={<Usuarios/>} />
        <Route path='/territorio' element={<Territorio/>} />
        <Route path='/contacto' element={<Contacto/>} />
        <Route path='/iniciarSesion' element={<IniciarSesion/>} />
        </Routes>
    </div>
    )
};