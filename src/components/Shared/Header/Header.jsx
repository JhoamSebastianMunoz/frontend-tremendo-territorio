import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from '../../Pages/Home/Home';
import { Stories } from '../../Pages/Stories/Stories';
import { Admin } from '../../Pages/Admin/Admin';
import { ContactUs } from '../../Pages/ContactUs/ContactUs';
import  { LoginScreen } from '../../Pages/LoginScreen/LoginScreen';
import { Register } from '../../Pages/Register/Register';
import { FarmsView } from  '../../Pages/FarmsView/FarmsView'
import { useGetElements } from '../../../hooks/useGetElements/useGetElements';

export const Header = () => {
    // Uso del Contexto para el uso del logo
    const { getLogo, isLoading, error } = useGetElements();

    if (isLoading) return <p className="text-white">Cargando logo...</p>;
    if (error) return <p className="text-red-500">Error al cargar logo</p>;
    
    //-------------------------------------------
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInteractDropdownOpen, setIsInteractDropdownOpen] = useState(false);
    const [isMobileInteractDropdownOpen, setIsMobileInteractDropdownOpen] = useState(false);

    return (
    <div>
      {/* Header */}
        <header className="bg-primary-first text-white px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo y Título */}
            <div className="flex items-center space-x-4">
            <div className="w-17 h-17 rounded-full overflow-hidden bg-white p-0.9">
                <img 
                src={getLogo} 
                alt="logo" 
                className="w-auto h-14 object-cover rounded-full"
                />
            </div>
            <h2 className="text-2xl font-bold text-white p-3 font-primary-brand">Tremendo Territorio</h2>
            </div>

          {/* Navegación Desktop */}
            <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
                <li>
                <Link 
                    to='/' 
                    className="text-white hover:text-primary-fifth transition-colors duration-200 font-medium font-primary-brand"
                >
                    Conócenos
                </Link>
                </li>
                
                {/* Dropdown para Interactuar - Desktop */}
                <li className="relative">
                <div className="relative">
                    <button 
                    className="text-white hover:text-primary-fifth transition-colors duration-200 font-medium font-primary-brand flex items-center"
                    onClick={() => setIsInteractDropdownOpen(!isInteractDropdownOpen)}
                    >
                    Interactuar
                    <svg 
                        className={`w-4 h-4 ml-1 transition-transform duration-200 ${isInteractDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    </button>
                    
                    {/* Dropdown Menu - Desktop */}
                    {isInteractDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                        <div className="py-1">
                        <Link
                            to="/farmsView"
                            className="block px-4 py-2 text-gray-800 hover:bg-primary-fifth hover:text-white transition-colors duration-200 font-medium font-primary-brand"
                            onClick={() => setIsInteractDropdownOpen(false)}
                        >
                            Agricultor
                        </Link>
                        <Link
                            to="/loginScreen"
                            className="block px-4 py-2 text-gray-800 hover:bg-primary-fifth hover:text-white transition-colors duration-200 font-medium font-primary-brand"
                            onClick={() => setIsInteractDropdownOpen(false)}
                        >
                            Restaurante
                        </Link>
                        <Link
                            to="/stories"
                            className="block px-4 py-2 text-gray-800 hover:bg-primary-fifth hover:text-white transition-colors duration-200 font-medium font-primary-brand"
                            onClick={() => setIsInteractDropdownOpen(false)}
                        >
                            Consumidor
                        </Link>
                        </div>
                    </div>
                    )}
                </div>
                </li>
                
                <li>
                <Link 
                    to='/admin'
                    className="text-white hover:text-primary-fifth transition-colors duration-200 font-medium font-primary-brand"
                >
                    Administrar
                </Link>
                </li>
                <li>
                <Link 
                    to='/contactUs' 
                    className="text-white hover:text-primary-fifth transition-colors duration-200 font-medium font-primary-brand"
                >
                    Contáctanos
                </Link>
                </li>
                <li>
                <Link 
                    to='/loginScreen' 
                    className="bg-primary-second hover:bg-primary-sixth px-4 py-2 rounded-md transition-colors duration-200 font-medium font-primary-brand"
                >
                    Iniciar Sesión
                </Link>
                </li>
            </ul>
            </nav>

            {/* Menú móvil - BOTÓN */}
            <div className="md:hidden">
            <button 
                className="text-white hover:text-primary-fifth"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            </div>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        {isMenuOpen && (
            <div className="md:hidden mt-4 border-t border-primary-first pt-4">
            <nav>
                <ul className="space-y-2 px-6">
                <li>
                    <Link
                    to="/"
                    className="block px-4 py-2 text-white hover:text-primary-fifth hover:bg-primary-second rounded transition-colors duration-200 font-medium font-primary-brand"
                    onClick={() => setIsMenuOpen(false)}
                    >
                    Conócenos
                    </Link>
                </li>
                
                {/* Dropdown para Interactuar - Mobile */}
                <li>
                    <button
                    className="w-full text-left px-4 py-2 text-white hover:text-primary-fifth hover:bg-primary-second rounded transition-colors duration-200 font-medium font-primary-brand flex items-center justify-between"
                    onClick={() => setIsMobileInteractDropdownOpen(!isMobileInteractDropdownOpen)}
                    >
                    Interactuar
                    <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${isMobileInteractDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    </button>
                    
                    {/* Submenu Mobile */}
                    {isMobileInteractDropdownOpen && (
                    <div className="ml-4 mt-2 space-y-1">
                        <Link
                        to="/farmsView"
                        className="block px-4 py-2 text-white hover:text-primary-fifth hover:bg-primary-second rounded transition-colors duration-200 font-medium font-primary-brand"
                        onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileInteractDropdownOpen(false);
                        }}
                        >
                        Agricultor
                        </Link>
                        <Link
                        to="/loginScreen"
                        className="block px-4 py-2 text-white hover:text-primary-fifth hover:bg-primary-second rounded transition-colors duration-200 font-medium font-primary-brand"
                        onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileInteractDropdownOpen(false);
                        }}
                        >
                        Restaurante
                        </Link>
                        <Link
                        to="/stories"
                        className="block px-4 py-2 text-white hover:text-primary-fifth hover:bg-primary-second rounded transition-colors duration-200 font-medium font-primary-brand"
                        onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileInteractDropdownOpen(false);
                        }}
                        >
                        Consumidor
                        </Link>
                    </div>
                    )}
                </li>
                
                <li>
                    <Link
                    to="/admin"
                    className="block px-4 py-2 text-white hover:text-primary-fifth hover:bg-primary-second rounded transition-colors duration-200 font-medium font-primary-brand"
                    onClick={() => setIsMenuOpen(false)}
                    >
                    Administrar
                    </Link>
                </li>
                <li>
                    <Link
                    to="/contactUs"
                    className="block px-4 py-2 text-white hover:text-primary-fifth hover:bg-primary-second rounded transition-colors duration-200 font-medium font-primary-brand"
                    onClick={() => setIsMenuOpen(false)}
                    >
                    Contáctanos
                    </Link>
                </li>
                <li>
                    <Link
                    to="/loginScreen"
                    className="block px-4 py-2 bg-primary-second hover:bg-primary-sixth rounded transition-colors duration-200 font-medium text-white font-primary-brand"
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
        <Route path='/stories' element={<Stories/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/contactUs' element={<ContactUs/>} />
        <Route path='/loginScreen' element={<LoginScreen/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/farmsView' element={<FarmsView/>} ></Route>
        </Routes>
    </div>
    )
};