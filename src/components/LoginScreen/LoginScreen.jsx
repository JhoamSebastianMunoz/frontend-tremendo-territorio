import React, { useState, useEffect } from 'react';
import { CheckCircle, Eye, EyeOff } from 'lucide-react';

export const LoginScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [pin, setPin] = useState(['', '', '', '']);
  const [isPinEnabled, setIsPinEnabled] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

  // Imágenes de ejemplo (en un proyecto real, estas vendrían del backend)
  const securityImages = [
    { id: 1, src: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799986/samples/coffee.jpg', alt: 'Antiguedades' },
    { id: 2, src: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799985/samples/balloons.jpg', alt: 'Globo-aerostático' },
    { id: 3, src: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799977/samples/animals/reindeer.jpg', alt: 'Reno' }
  ];

  // Simular cual es la imagen correcta (en un proyecto real, esto vendría del contexto del usuario)
  const correctImageId = 2;

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

    // Simular validación (en un proyecto real, esto sería una llamada al backend)
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (selectedImage !== correctImageId || pin.join('') !== '1234') {
      setError('Imagen o PIN incorrectos. Intenta de nuevo.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPin(['', '', '', '']);
      setSelectedImage(null);
      setIsPinEnabled(false);
    } else {
      // Login exitoso
      alert('¡Inicio de sesión exitoso!');
    }

    setIsLoading(false);
  };

  const isFormComplete = selectedImage && pin.every(digit => digit);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 via-green-600 to-green-700 flex flex-col">

      {/* Contenido Principal */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Encabezado */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Hola de nuevo!</h2>
              <p className="text-xl text-green-600 font-semibold">Inicia Sesión</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center transition-all ${shake ? 'animate-pulse' : ''}`}>
                {error}
              </div>
            )}

            {/* Selección de Imagen */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                Selecciona tu imagen de seguridad
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {securityImages.map((image) => (
                  <div
                    key={image.id}
                    onClick={() => handleImageSelect(image.id)}
                    className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      selectedImage === image.id 
                        ? 'ring-4 ring-green-500 ring-offset-2 scale-105' 
                        : 'hover:ring-2 hover:ring-green-300'
                    } rounded-xl overflow-hidden`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-24 object-cover"
                    />
                    {selectedImage === image.id && (
                      <div className="absolute inset-0 bg-green-500 bg-opacity-30 flex items-center justify-center">
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
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
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
                      className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                        digit ? 'border-green-500 bg-green-50' : 'border-gray-300'
                      } ${shake ? 'animate-bounce' : ''}`}
                      disabled={!isPinEnabled}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => setShowPin(!showPin)}
                className="flex items-center justify-center w-full mb-6 text-gray-600 hover:text-green-600 transition-colors"
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
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                isFormComplete && !isLoading
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg transform hover:scale-105'
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

            {/* Enlaces Adicionales */}
            <div className="mt-6 text-center space-y-3">
              <button className="text-green-600 hover:text-green-700 font-medium transition-colors">
                ¿Olvidaste tu PIN?
              </button>
              <div className="text-gray-500">
                ¿No tienes cuenta?{' '}
                <button className="text-green-600 hover:text-green-700 font-medium transition-colors">
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

