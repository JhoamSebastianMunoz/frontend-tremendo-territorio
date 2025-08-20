import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    selectedImageId: null,
    pin: ['', '', '', ''],
    confirmPin: ['', '', '', '']
  });
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [availableImages, setAvailableImages] = useState([]);
  
  const navigate = useNavigate();
  const API_BASE_URL = 'https://secuencia432-tremendoterritorio-production.up.railway.app/api';

  const goToLoginScreen = () => {
    navigate('/loginScreen');
  };

  // Cargar imágenes disponibles desde el backend
  useEffect(() => {
    const fetchAvailableImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/register/get-images`, {
          method: 'GET',
          headers: {
            'accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al cargar las imágenes disponibles');
        }

        const data = await response.json();
        setAvailableImages(data.images.map(img => ({
          id: img.id,
          src: img.cloudinary_url,
          alt: `Imagen ${img.id}`
        })));
      } catch (err) {
        setError(err.message || 'Error al cargar las imágenes');
        // Fallback: usar imágenes por defecto si el backend falla
        setAvailableImages([
          { id: 1, src: 'https://via.placeholder.com/150?text=1', alt: 'Imagen 1' },
          { id: 2, src: 'https://via.placeholder.com/150?text=2', alt: 'Imagen 2' },
          { id: 3, src: 'https://via.placeholder.com/150?text=3', alt: 'Imagen 3' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableImages();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const handleImageSelect = (imageId) => {
    setFormData(prev => ({
      ...prev,
      selectedImageId: imageId
    }));
    setError('');
  };

  const handleNextStep = () => {
    // Validar paso 1
    if (currentStep === 1) {
      if (!formData.username.trim()) {
        setError('Por favor ingresa tu nombre de usuario');
        triggerShake();
        return;
      }
      if (!formData.email.trim()) {
        setError('Por favor ingresa tu email');
        triggerShake();
        return;
      }
      if (!formData.selectedImageId) {
        setError('Por favor selecciona una imagen de seguridad');
        triggerShake();
        return;
      }
      
      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Por favor ingresa un email válido');
        triggerShake();
        return;
      }
    }

    setCurrentStep(2);
    setError('');
  };

  const handlePinChange = (index, value, isConfirm = false) => {
    if (value.length > 1) return;
    
    const pinField = isConfirm ? 'confirmPin' : 'pin';
    const newPin = [...formData[pinField]];
    newPin[index] = value;
    
    setFormData(prev => ({
      ...prev,
      [pinField]: newPin
    }));

    // Auto-focus al siguiente campo
    if (value && index < 3) {
      const nextInput = document.getElementById(`${isConfirm ? 'confirm-' : ''}pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e, index, isConfirm = false) => {
    const pinField = isConfirm ? 'confirmPin' : 'pin';
    const targetPin = formData[pinField];
    
    if (e.key === 'Backspace' && !targetPin[index] && index > 0) {
      const prevInput = document.getElementById(`${isConfirm ? 'confirm-' : ''}pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleRegister = async () => {
    const pinString = formData.pin.join('');
    const confirmPinString = formData.confirmPin.join('');

    // Validaciones
    if (!pinString || pinString.length !== 4) {
      setError('Por favor completa tu PIN de 4 dígitos');
      triggerShake();
      return;
    }

    if (pinString !== confirmPinString) {
      setError('Los PINs no coinciden. Intenta de nuevo.');
      triggerShake();
      setFormData(prev => ({
        ...prev,
        confirmPin: ['', '', '', '']
      }));
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username.trim(),
          email: formData.email.trim(),
          pin: pinString,
          selectedImageId: formData.selectedImageId
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error de validación o imagen ya usada');
        }
        throw new Error('Error al registrar usuario');
      }

      const data = await response.json();
      
      // Registro exitoso
      alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
      navigate('/loginScreen');
      
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta');
      triggerShake();
    } finally {
      setIsLoading(false);
    }
  };

  const isPinComplete = formData.pin.every(digit => digit);
  const isConfirmPinComplete = formData.confirmPin.every(digit => digit);
  const isStep2Complete = isPinComplete && isConfirmPinComplete;
  const selectedImageData = availableImages.find(img => img.id === formData.selectedImageId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-first via-primary-first to-primary-third flex flex-col font-body">
      {/* Contenido Principal */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Encabezado */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 font-title">Crea tu cuenta</h2>
              <p className="text-xl text-primary-first font-semibold font-subtitle">
                Paso {currentStep}: {currentStep === 1 ? 'Datos personales e imagen' : 'Define tu PIN de seguridad'}
              </p>
            </div>

            {/* Indicador de Progreso */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold font-body ${
                  currentStep >= 1 ? 'bg-primary-first' : 'bg-gray-300'
                }`}>
                  1
                </div>
                <div className={`h-1 w-16 ${currentStep >= 2 ? 'bg-primary-first' : 'bg-gray-300'} transition-colors duration-300`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold font-body ${
                  currentStep >= 2 ? 'bg-primary-first' : 'bg-gray-300'
                }`}>
                  2
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className={`mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center transition-all font-body ${shake ? 'animate-pulse' : ''}`}>
                {error}
              </div>
            )}

            {/* PASO 1: Datos personales e imagen */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Campos de entrada */}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2 font-subtitle">
                      Nombre de usuario
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-first focus:border-primary-first transition-all font-body"
                      placeholder="Ej: capella02"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-subtitle">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-first focus:border-primary-first transition-all font-body"
                      placeholder="capella02@email.com"
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>

                {/* Selección de imagen */}
                <div className="text-center">
                  <p className="text-gray-600 mb-4 font-body">
                    Selecciona una imagen que recordarás para iniciar sesión
                  </p>
                </div>

                {isLoading && availableImages.length === 0 ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-2 border-primary-first border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span className="text-gray-600 font-body">Cargando imágenes...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3 max-h-60 overflow-y-auto">
                    {availableImages.map((image) => (
                      <div
                        key={image.id}
                        onClick={() => handleImageSelect(image.id)}
                        className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          formData.selectedImageId === image.id
                            ? 'ring-4 ring-primary-first ring-offset-2 scale-105'
                            : 'hover:ring-2 hover:ring-primary-first'
                        } rounded-xl overflow-hidden`}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-20 object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150?text=Error';
                          }}
                        />
                        {formData.selectedImageId === image.id && (
                          <div className="absolute inset-0 bg-primary-first bg-opacity-30 flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={handleNextStep}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center font-body ${
                    formData.username && formData.email && formData.selectedImageId
                      ? 'bg-gradient-to-r from-primary-second to-primary-sixth hover:from-primary-sixth hover:to-primary-fourth text-white shadow-lg transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!formData.username || !formData.email || !formData.selectedImageId || isLoading}
                >
                  Siguiente
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            )}

            {/* PASO 2: Creación del PIN */}
            {currentStep === 2 && (
              <div className="space-y-6">
                {/* Imagen y datos seleccionados */}
                {selectedImageData && (
                  <div className="flex flex-col items-center mb-6">
                    <p className="text-gray-600 mb-3 font-subtitle">
                      Usuario: <span className="font-semibold">{formData.username}</span>
                    </p>
                    <p className="text-gray-600 mb-3 font-subtitle">Tu imagen de seguridad:</p>
                    <div className="relative">
                      <img
                        src={selectedImageData.src}
                        alt={selectedImageData.alt}
                        className="w-20 h-20 object-cover rounded-xl ring-2 ring-primary-first"
                      />
                      <div className="absolute -top-2 -right-2">
                        <CheckCircle className="w-6 h-6 text-primary-first bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Entrada de PIN */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center font-subtitle">
                    Crea tu PIN de 4 dígitos
                  </h3>
                  
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-3">
                      {formData.pin.map((digit, index) => (
                        <input
                          key={index}
                          id={`pin-${index}`}
                          type={showPin ? 'text' : 'password'}
                          value={digit}
                          onChange={(e) => handlePinChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          maxLength={1}
                          className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-first transition-all font-body ${
                            digit ? 'border-primary-first bg-primary-fifth' : 'border-gray-300'
                          }`}
                          placeholder="•"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowPin(!showPin)}
                    className="flex items-center justify-center w-full mb-6 text-gray-600 hover:text-primary-first transition-colors font-body"
                  >
                    {showPin ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
                    {showPin ? 'Ocultar PIN' : 'Mostrar PIN'}
                  </button>
                </div>

                {/* Confirmación de PIN */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center font-subtitle">
                    Confirma tu PIN
                  </h3>
                  
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-3">
                      {formData.confirmPin.map((digit, index) => (
                        <input
                          key={index}
                          id={`confirm-pin-${index}`}
                          type={showConfirmPin ? 'text' : 'password'}
                          value={digit}
                          onChange={(e) => handlePinChange(index, e.target.value, true)}
                          onKeyDown={(e) => handleKeyDown(e, index, true)}
                          maxLength={1}
                          className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-first transition-all font-body ${
                            digit ? 'border-primary-first bg-primary-fifth' : 'border-gray-300'
                          } ${shake ? 'animate-bounce' : ''}`}
                          placeholder="•"
                          disabled={!isPinComplete}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                    className="flex items-center justify-center w-full mb-6 text-gray-600 hover:text-primary-first transition-colors font-body"
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
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 font-body ${
                      isStep2Complete && !isLoading
                        ? 'bg-gradient-to-r from-primary-second to-primary-sixth hover:from-primary-sixth hover:to-primary-fourth text-white shadow-lg transform hover:scale-105'
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
                    className="w-full py-3 rounded-xl font-medium text-primary-first border-2 border-primary-first hover:bg-primary-fifth transition-all duration-300 flex items-center justify-center font-body"
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
              <div className="text-gray-500 font-body">
                ¿Ya tienes cuenta?{' '}
                <button onClick={goToLoginScreen} className="text-primary-first hover:text-primary-second font-medium font-subtitle transition-colors">
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