import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pin, setPin] = useState(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '']);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);

// Navegación para redirigir a Login del usuario
  const navigate = useNavigate();
  const goToLoginScreen = () =>{
    navigate('/loginScreen')
  };

  // Set completo de 10 imágenes de seguridad
  const securityImages = [
    { id: 1, src: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799978/samples/people/jazz.jpg', alt: 'Orquesta' },
    { id: 2, src: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799986/samples/coffee.jpg', alt: 'Antiguedades' },
    { id: 3, src: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799985/samples/balloons.jpg', alt: 'Globo-aerostático' },
    { id: 4, src: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799977/samples/animals/reindeer.jpg', alt: 'Reno' }
  ];

  const handleImageSelect = (imageId) => {
    setSelectedImage(imageId);
    setError('');
  };

  const handleNextStep = () => {
    if (!selectedImage) {
      setError('Por favor selecciona una imagen de seguridad');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setCurrentStep(2);
    setError('');
  };

  const handlePinChange = (index, value, isConfirm = false) => {
    if (value.length > 1) return;
    
    const targetPin = isConfirm ? confirmPin : pin;
    const setTargetPin = isConfirm ? setConfirmPin : setPin;
    
    const newPin = [...targetPin];
    newPin[index] = value;
    setTargetPin(newPin);

    // Auto-focus al siguiente campo
    if (value && index < 3) {
      const nextInput = document.getElementById(`${isConfirm ? 'confirm-' : ''}pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e, index, isConfirm = false) => {
    const targetPin = isConfirm ? confirmPin : pin;
    
    if (e.key === 'Backspace' && !targetPin[index] && index > 0) {
      const prevInput = document.getElementById(`${isConfirm ? 'confirm-' : ''}pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleRegister = async () => {
    const pinString = pin.join('');
    const confirmPinString = confirmPin.join('');

    if (!pinString || pinString.length !== 4) {
      setError('Por favor completa tu PIN de 4 dígitos');
      return;
    }

    if (pinString !== confirmPinString) {
      setError('Los PINs no coinciden. Intenta de nuevo.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setConfirmPin(['', '', '', '']);
      return;
    }

    setIsLoading(true);
    setError('');

    // Simular registro (en un proyecto real, esto sería una llamada al backend)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simular registro exitoso
    alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
    
    setIsLoading(false);
  };

  const isPinComplete = pin.every(digit => digit);
  const isConfirmPinComplete = confirmPin.every(digit => digit);
  const isStep2Complete = isPinComplete && isConfirmPinComplete;

  const selectedImageData = securityImages.find(img => img.id === selectedImage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 via-green-600 to-green-700 flex flex-col">

      {/* Contenido Principal */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Encabezado */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Crea tu cuenta</h2>
              <p className="text-xl text-green-600 font-semibold">
                Paso {currentStep}: {currentStep === 1 ? 'Elige tu imagen de seguridad' : 'Define tu PIN de seguridad'}
              </p>
            </div>

            {/* Indicador de Progreso */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  currentStep >= 1 ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  1
                </div>
                <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-green-500' : 'bg-gray-300'} transition-colors duration-300`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  currentStep >= 2 ? 'bg-green-500' : 'bg-gray-300'
                }`}>
                  2
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center transition-all ${shake ? 'animate-pulse' : ''}`}>
                {error}
              </div>
            )}

            {/* PASO 1: Selección de Imagen */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-600 mb-6">
                    Selecciona una imagen que recordarás para iniciar sesión
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
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
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 text-center">
                        {image.alt}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleNextStep}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center ${
                    selectedImage
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!selectedImage}
                >
                  Siguiente
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            )}

            {/* PASO 2: Creación del PIN */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Imagen Seleccionada */}
                {selectedImageData && (
                  <div className="flex flex-col items-center mb-6">
                    <p className="text-gray-600 mb-3">Tu imagen de seguridad:</p>
                    <div className="relative">
                      <img
                        src={selectedImageData.src}
                        alt={selectedImageData.alt}
                        className="w-20 h-20 object-cover rounded-xl ring-2 ring-green-500"
                      />
                      <div className="absolute -top-2 -right-2">
                        <CheckCircle className="w-6 h-6 text-green-500 bg-white rounded-full" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{selectedImageData.alt}</p>
                  </div>
                )}

                {/* Entrada de PIN */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                    Crea tu PIN de 4 dígitos
                  </h3>
                  
                  <div className="flex justify-center mb-4">
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
                          }`}
                          placeholder="•"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowPin(!showPin)}
                    className="flex items-center justify-center w-full mb-6 text-gray-600 hover:text-green-600 transition-colors"
                  >
                    {showPin ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
                    {showPin ? 'Ocultar PIN' : 'Mostrar PIN'}
                  </button>
                </div>

                {/* Confirmación de PIN */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                    Confirma tu PIN
                  </h3>
                  
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-3">
                      {confirmPin.map((digit, index) => (
                        <input
                          key={index}
                          id={`confirm-pin-${index}`}
                          type={showConfirmPin ? 'text' : 'password'}
                          value={digit}
                          onChange={(e) => handlePinChange(index, e.target.value, true)}
                          onKeyDown={(e) => handleKeyDown(e, index, true)}
                          maxLength={1}
                          className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${
                            digit ? 'border-green-500 bg-green-50' : 'border-gray-300'
                          } ${shake ? 'animate-bounce' : ''}`}
                          placeholder="•"
                          disabled={!isPinComplete}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                    className="flex items-center justify-center w-full mb-6 text-gray-600 hover:text-green-600 transition-colors"
                    disabled={!isPinComplete}
                  >
                    {showConfirmPin ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
                    {showConfirmPin ? 'Ocultar PIN' : 'Mostrar PIN'}
                  </button>
                </div>

                {/* Botones de Acción */}
                <div className="space-y-4">
                  <button
                    onClick={handleRegister}
                    disabled={!isStep2Complete || isLoading}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isStep2Complete && !isLoading
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creando cuenta...
                      </div>
                    ) : (
                      'Finalizar Registro'
                    )}
                  </button>

                  <button
                    onClick={() => setCurrentStep(1)}
                    className="w-full py-3 rounded-xl font-medium text-green-600 border-2 border-green-600 hover:bg-green-50 transition-all duration-300 flex items-center justify-center"
                    disabled={isLoading}
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Volver
                  </button>
                </div>
              </div>
            )}

            {/* Enlaces Adicionales */}
            <div className="mt-6 text-center">
              <div className="text-gray-500">
                ¿Ya tienes cuenta?{' '}
                <button onClick={goToLoginScreen} className="text-green-600 hover:text-green-700 font-medium transition-colors">
                  Iniciar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

