import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { Home } from '../../Pages/Home/Home';
import { CommentsSection } from '../../Pages/CommentsSection/CommentsSection';
import { Admin } from '../../Pages/Admin/Admin';
import { ContactUs } from '../../Pages/ContactUs/ContactUs';
import { LoginScreen } from '../../Pages/LoginScreen/LoginScreen';
import { Register } from '../../Pages/Register/Register';
import { FarmsView } from  '../../Pages/FarmsView/FarmsView';
import { RestaurantsView } from '../../Pages/RestaurantsView/RestaurantsView';
import { ProtectedRoute } from '../Auth/ProtectedRoute';
import { useGetElements } from '../../../hooks/useGetElements/useGetElements';
import { useAuth } from '../../../contexts/Auth/AuthContext';
import { ButtonLanguage } from '../buttons/ButtonLanguage/ButtonLanguage';

export const Header = () => {
    // Uso del Contexto para el uso del logo
    const { getLogo, isLoading, error } = useGetElements();
    const { isAuthenticated, user, logout } = useAuth();

    if (isLoading) return <p className="text-white">Cargando logo...</p>;
    if (error) return <p className="text-red-500">Error al cargar logo</p>;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isInteractDropdownOpen, setIsInteractDropdownOpen] = useState(false);
    const [isMobileInteractDropdownOpen, setIsMobileInteractDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState('es');
    
    const handleLanguageChange = (langCode) => {
        setCurrentLanguage(langCode);
        console.log(`Cambiando idioma a: ${langCode}`);
    };



    const handleLogout = () => {
        logout();
        setIsUserDropdownOpen(false);
        setIsMenuOpen(false);
    };

    return (
        <div>
            {/* Header */}
            <header className="bg-primary-first text-white px-6 py-4 shadow-lg">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    {/* Logo y Título */}
                    <div className="flex items-center space-x-4">
                        <img
                            src={getLogo}
                            alt="logo"
                            className="w-auto h-16 object-cover rounded-full"
                        />
                    </div>

                    {/* Navegación Desktop */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center space-x-8">
                            <li>
                                <Link
                                    to='/'
                                    className="text-white hover:text-primary-fifth transition-colors duration-200 font-medium font-subtitle"
                                >
                                    Conócenos
                                </Link>
                            </li>

                            {/* Dropdown para Interactuar - Desktop */}
                            <li className="relative">
                                <div className="relative">
                                    <button
                                        className="text-white hover:text-primary-fifth transition-colors duration-200 font-medium font-subtitle flex items-center"
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
                                                    className="block px-4 py-2 text-gray-800 hover:bg-primary-fifth hover:text-white transition-colors duration-200 font-medium font-subtitle"
                                                    onClick={() => setIsInteractDropdownOpen(false)}
                                                >
                                                    Agricultor
                                                </Link>
                                                <Link
                                                    to="/restaurantsView"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-primary-fifth hover:text-white transition-colors duration-200 font-medium font-subtitle"
                                                    onClick={() => setIsInteractDropdownOpen(false)}
                                                >
                                                    Restaurante
                                                </Link>
                                                <Link
                                                    to="/commentsSection"
                                                    className="block px-4 py-2 text-gray-800 hover:bg-primary-fifth hover:text-white transition-colors duration-200 font-medium font-subtitle"
                                                >
                                                    Reseñas
                                                </Link>
                                                <Link
                                                    to='/admin'
                                                    className="block px-4 py-2 text-gray-800 hover:bg-primary-fifth hover:text-white transition-colors duration-200 font-medium font-subtitle"
                                                    onClick={() => setIsInteractDropdownOpen(false)}
                                                >
                                                    Administrar
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </li>

                            <li>
                                <Link
                                    to='/contactUs'
                                    className="text-white hover:text-primary-fifth transition-colors duration-200 font-medium font-subtitle"
                                >
                                    Contáctanos
                                </Link>
                            </li>
                            <ButtonLanguage
                                currentLanguage={currentLanguage}
                                onLanguageChange={handleLanguageChange}
                            />

                            {/* Usuario autenticado - Desktop */}
                            {isAuthenticated && user && (
                                <li className="relative">
                                    <button
                                        className="flex items-center space-x-2 text-white hover:text-primary-fifth transition-colors duration-200 font-medium font-subtitle"
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                    >
                                        <User className="w-4 h-4" />
                                        <span>{user.username}</span>
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {/* Dropdown Usuario - Desktop */}
                                    {isUserDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                                            <div className="py-1">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 font-medium font-subtitle flex items-center space-x-2"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span>Cerrar Sesión</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            )}
                        </ul>
                    </nav>

                    {/* Menú móvil - BOTÓN */}
                    <div className="md:hidden">
                        <button
                            className="text-white hover:text-primary-fifth mr-12"
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
                                        className="block px-4 py-2 text-white hover:text-primary-fifth hover:bg-primary-second rounded transition-colors duration-200 font-medium font-subtitle"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Conócenos
                                    </Link>
                                </li>

                                {/* Dropdown para Interactuar - Mobile */}
                                <li>
                                    <button
                                        className="w-full text-left px-4 py-2 text-white hover:text-primary-fifth hover:bg-primary-second rounded transition-colors duration-200 font-medium font-subtitle flex items-center justify-between"
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
                                                className="block px-4 py-2 text-white hover:text-primary-fifth hover:bg-primary-second rounded transition-colors duration-200 font-medium font-subtitle"
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    setIsMobileInteractDropdownOpen(false);
                                                }}
                                            >
                                                Agricultor
                                            </Link>
                                            <Link
                                                to="/restaurantsView"
                                                className="block px-4 py-2 text-white hover:text-primary-fifth hover:bg-primary-second rounded transition-colors duration-200 font-medium font-subtitle"
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    setIsMobileInteractDropdownOpen(false);
                                                }}
                                            >
                                                Restaurante
                                            </Link>
                                            <Link
                                                to="/commentsSection"
                                                className="block px-4 py-2 text-white hover:text-primary-fifth hover:bg-primary-second rounded transition-colors duration-200 font-medium font-subtitle"
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    setIsMobileInteractDropdownOpen(false);
                                                }}
                                            >
                                                Reseñas
                                            </Link>
                                            <Link
                                                to="/admin"
                                                className="block px-4 py-2 text-white hover:text-primary-fifth hover:bg-primary-second rounded transition-colors duration-200 font-medium font-subtitle"
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                }}
                                            >
                                                Administrar
                                            </Link>
                                        </div>
                                    )}
                                </li>

                                <li>
                                    <Link
                                        to="/contactUs"
                                        className="block px-4 py-2 text-white hover:text-primary-fifth hover:bg-primary-second rounded transition-colors duration-200 font-medium font-subtitle"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Contáctanos
                                    </Link>
                                </li>
                                <ButtonLanguage
                                    currentLanguage={currentLanguage}
                                    onLanguageChange={handleLanguageChange}
                                />

                                {/* Usuario autenticado - Mobile */}
                                {isAuthenticated && user && (
                                    <li className="border-t border-primary-second pt-2 mt-2">
                                        <div className="px-4 py-2 text-white font-medium font-subtitle flex items-center space-x-2">
                                            <User className="w-4 h-4" />
                                            <span>{user.username}</span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-white hover:text-red-300 hover:bg-red-600 rounded transition-colors duration-200 font-medium font-subtitle flex items-center space-x-2 ml-4"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Cerrar Sesión</span>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                )}
            </header>

            {/* Rutas */}
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/contactUs' element={<ContactUs/>} />
                <Route path='/loginScreen' element={<LoginScreen/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/commentsSection' element={<CommentsSection/>}/>
                <Route 
                    path='/admin' 
                    element={
                        <ProtectedRoute>
                            <Admin/>
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path='/farmsView' 
                    element={
                        <ProtectedRoute>
                            <FarmsView/>
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path='/restaurantsView' 
                    element={
                        <ProtectedRoute>
                            <RestaurantsView/>
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </div>
    );
};