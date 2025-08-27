import React from 'react';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../../contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export const LogoutButton = ({ className = '', showIcon = true, showText = true }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors duration-200 font-medium ${className}`}
    >
      {showIcon && <LogOut className="w-4 h-4" />}
      {showText && <span>Cerrar Sesión</span>}
    </button>
  );
};