import React, { useState, useEffect } from 'react';
import { CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [pin, setPin] = useState(['', '', '', '']);
  const [isPinEnabled, setIsPinEnabled] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [securityImages, setSecurityImages] = useState([]);
  const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);

  const navigate = useNavigate();

  const API_BASE_URL = 'https://secuencia432-tremendoterritorio-production.up.railway.app/api';

  const goToRegister = () => {
    navigate('/register');
  };

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim()
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Usuario no encontrado o error de validación');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al verificar usuario');
      }

      const data = await response.json();
      
      // Mapear las imágenes según la estructura del backend
      setSecurityImages(data.images.map(img => ({
        id: img.id,
        src: img.cloudinary_url,
        alt: `Imagen ${img.id}`
      })));

      setIsUsernameSubmitted(true);

    } catch (err) {
      setError(err.message || 'Error al conectar con el servidor');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (imageId) => {
    setSelectedImage(imageId);
    setIsPinEnabled(true);
    setError('');
   
    // Animación suave de transición
    setTimeout(() => {
      document.getElementById('pin-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 300);
  };

  const handlePinChange = (index, value) => {
    if (value.length > 1) return; // Solo un dígito por campo
   
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-focus al siguiente campo
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleLogin = async () => {
    if (!selectedImage || pin.some(digit => !digit)) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          selectedImageId: selectedImage,
          pin: pin.join('')
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('PIN o imagen incorrecta, o usuario bloqueado');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al iniciar sesión');
      }

      const data = await response.json();
     
      // Guardar token en localStorage
      localStorage.setItem('authToken', data.token);
     
      // Mostrar mensaje de éxito
      alert('¡Inicio de sesión exitoso!');
      
      // Aquí puedes redirigir al dashboard u otra página
      // navigate('/dashboard');
     
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPin(['', '', '', '']);
      
      // Limpiar el foco del PIN después de un error
      document.getElementById('pin-0')?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToUsername = () => {
    setIsUsernameSubmitted(false);
    setSecurityImages([]);
    setSelectedImage(null);
    setPin(['', '', '', '']);
    setIsPinEnabled(false);
    setError('');
  };

  const isFormComplete = selectedImage && pin.every(digit => digit);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light2 via-primary-light_hover to-primary-light_hover_active flex flex-col">
      {/* Contenido Principal */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Encabezado */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 font-primary-brand">¡Hola de nuevo!</h2>
              <p className="text-xl text-primary-light2 font-semibold font-primary-brand">Inicia Sesión</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center transition-all font-primary-brand ${shake ? 'animate-pulse' : ''}`}>
                {error}
              </div>
            )}

            {/* Formulario de Username */}
            {!isUsernameSubmitted ? (
              <form onSubmit={handleUsernameSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-lg font-semibold text-gray-700 mb-3 text-center font-primary-brand">
                    Ingresa tu nombre de usuario
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-light2 focus:border-primary-light2 transition-all font-primary-brand"
                    placeholder="Ej: capella01"
                    disabled={isLoading}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={!username.trim() || isLoading}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 font-primary-brand ${
                    username.trim() && !isLoading
                      ? 'bg-gradient-to-r from-secondary-light to-secondary-hover hover:from-secondary-hover hover:to-secondary-light text-white shadow-lg transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verificando...
                    </div>
                  ) : (
                    'Continuar'
                  )}
                </button>
              </form>
            ) : (
              <>
                {/* Botón para regresar */}
                <div className="mb-6">
                  <button
                    onClick={handleBackToUsername}
                    className="text-primary-light2 hover:text-primary-light_hover font-medium transition-colors font-primary-brand"
                  >
                    ← Cambiar usuario
                  </button>
                  <p className="text-sm text-gray-600 mt-2 font-primary-brand">
                    Usuario: <span className="font-semibold">{username}</span>
                  </p>
                </div>

                {/* Selección de Imagen */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center font-primary-brand">
                    Selecciona tu imagen de seguridad
                  </h3>
                  <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
                    {securityImages.map((image) => (
                      <div
                        key={image.id}
                        onClick={() => handleImageSelect(image.id)}
                        className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          selectedImage === image.id
                            ? 'ring-4 ring-primary-light2 ring-offset-2 scale-105'
                            : 'hover:ring-2 hover:ring-primary-light'
                        } rounded-xl overflow-hidden`}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-24 object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150?text=Error';
                          }}
                        />
                        {selectedImage === image.id && (
                          <div className="absolute inset-0 bg-primary-light2 bg-opacity-30 flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sección PIN */}
                <div
                  id="pin-section"
                  className={`transition-all duration-500 ${
                    isPinEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'
                  }`}
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center font-primary-brand">
                    Ahora, ingresa tu PIN
                  </h3>
                 
                  <div className="flex justify-center mb-6">
                    <div className="flex space-x-3">
                      {pin.map((digit, index) => (
                        <input
                          key={index}
                          id={`pin-${index}`}
                          type={showPin ? 'text' : 'password'}
                          value={digit}
                          onChange={(e) => handlePinChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          maxLength={1}
                          className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-light2 transition-all font-primary-brand ${
                            digit ? 'border-primary-light2 bg-primary-light bg-opacity-10' : 'border-gray-300'
                          } ${shake ? 'animate-bounce' : ''}`}
                          disabled={!isPinEnabled}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowPin(!showPin)}
                    className="flex items-center justify-center w-full mb-6 text-gray-600 hover:text-primary-light2 transition-colors font-primary-brand"
                    disabled={!isPinEnabled}
                  >
                    {showPin ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
                    {showPin ? 'Ocultar PIN' : 'Mostrar PIN'}
                  </button>
                </div>

                {/* Botón de Ingreso */}
                <button
                  onClick={handleLogin}
                  disabled={!isFormComplete || isLoading}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 font-primary-brand ${
                    isFormComplete && !isLoading
                      ? 'bg-gradient-to-r from-secondary-light to-secondary-hover hover:from-secondary-hover hover:to-secondary-light text-white shadow-lg transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Ingresando...
                    </div>
                  ) : (
                    'Ingresar'
                  )}
                </button>
              </>
            )}

            {/* Enlaces Adicionales */}
            <div className="mt-6 text-center space-y-3">
              <button className="text-primary-light2 hover:text-primary-light_hover font-medium transition-colors font-primary-brand">
                ¿Olvidaste tu PIN?
              </button>
              <div className="text-gray-500 font-primary-brand">
                ¿No tienes cuenta?{' '}
                <button onClick={goToRegister} className="text-primary-light2 hover:text-primary-light_hover font-medium transition-colors">
                  Crear una cuenta nueva
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};