import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from '../Home/Home';
import { Users } from '../Users/Users';
import { Territory } from '../Territory/Territory';
import { ContactUs } from '../ContactUs/ContactUs';
import  { LoginScreen } from '../LoginScreen/LoginScreen';
import { Register } from '../Register/Register';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
    <div>
      {/* Header */}
        <header className="bg-green-600 text-white px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo y Título */}
            <div className="flex items-center space-x-4">
            <div className="w-17 h-17 rounded-full overflow-hidden bg-white p-0.9">
                <img 
                src="https://res.cloudinary.com/dppf30duk/image/upload/v1751501033/logotipo-tremendo-territorio_mbhgta.jpg" 
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
                    to='/' 
                    className="text-white hover:text-green-200 transition-colors duration-200 font-medium"
                >
                    Inicio
                </Link>
                </li>
                <li>
                <Link 
                    to='/users' 
                    className="text-white hover:text-green-200 transition-colors duration-200 font-medium"
                >
                    Usuarios
                </Link>
                </li>
                <li>
                <Link 
                    to='/territory'
                    className="text-white hover:text-green-200 transition-colors duration-200 font-medium"
                >
                    Territorio
                </Link>
                </li>
                <li>
                <Link 
                    to='/contactUs' 
                    className="text-white hover:text-green-200 transition-colors duration-200 font-medium"
                >
                    Contacto
                </Link>
                </li>
                <li>
                <Link 
                    to='/loginScreen' 
                    className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-md transition-colors duration-200 font-medium"
                >
                    Iniciar Sesión
                </Link>
                </li>
            </ul>
            </nav>

{/* Menú móvil - BOTÓN ACTUALIZADO */}
            <div className="md:hidden">
            <button 
                className="text-white hover:text-green-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)} // AGREGAR ESTA LÍNEA
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            </div>
        </div>

        {/*  MENÚ MÓVIL DESPLEGABLE */}
        {isMenuOpen && (
            <div className="md:hidden mt-4 border-t border-green-500 pt-4">
            <nav>
                <ul className="space-y-2 px-6">
                <li>
                    <Link
                    to="/"
                    className="block px-4 py-2 text-white hover:text-green-200 hover:bg-green-700 rounded transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                    >
                    Inicio
                    </Link>
                </li>
                <li>
                    <Link
                    to="/users"
                    className="block px-4 py-2 text-white hover:text-green-200 hover:bg-green-700 rounded transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                    >
                    Usuarios
                    </Link>
                </li>
                <li>
                    <Link
                    to="/territory"
                    className="block px-4 py-2 text-white hover:text-green-200 hover:bg-green-700 rounded transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                    >
                    Territorio
                    </Link>
                </li>
                <li>
                    <Link
                    to="/contactUs"
                    className="block px-4 py-2 text-white hover:text-green-200 hover:bg-green-700 rounded transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                    >
                    Contacto
                    </Link>
                </li>
                <li>
                    <Link
                    to="/loginScreen"
                    className="block px-4 py-2 bg-green-700 hover:bg-green-800 rounded transition-colors duration-200 font-medium text-white"
                    onClick={() => setIsMenuOpen(false)}
                    >
                    Iniciar Sesión
                    </Link>
                </li>
                </ul>
            </nav>
            </div>
        )}
        </header>
        
      {/* Rutas */}
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/territory' element={<Territory/>} />
        <Route path='/contactUs' element={<ContactUs/>} />
        <Route path='/loginScreen' element={<LoginScreen/>} />
        <Route path='/register' element={<Register/>} />
        </Routes>
    </div>
    )
};