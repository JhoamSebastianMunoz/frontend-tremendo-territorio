import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/Auth/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-first via-primary-second to-primary-third">
        <div className="bg-white p-8 rounded-3xl shadow-2xl">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary-first border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700 font-medium">Verificando acceso...</p>
          </div>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login con la ruta actual como parámetro
  if (!isAuthenticated) {
    return <Navigate to="/loginScreen" state={{ from: location }} replace />;
  }

  // Si está autenticado, mostrar el componente
  return children;
};