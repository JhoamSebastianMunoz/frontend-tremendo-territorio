import React, { useState, Suspense } from 'react';
import { CheckCircle, Eye, EyeOff } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ButtonPrimary } from '../../Shared/buttons/ButtonPrimary/ButtonPrimary';
import { useAuth } from '../../../contexts/Auth/AuthContext';
import { useTranslation } from 'react-i18next';

export const LoginScreen = () => {
  const {t, i18n } = useTranslation(["LoginScreen"])
  // Estados para manejar el flujo de autenticación
  const [pin, setPin] = useState(['', '', '', '']);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [securityImages, setSecurityImages] = useState([]);
  const [isPinSubmitted, setIsPinSubmitted] = useState(false);
  const [username, setUsername] = useState('');

  // Hooks de navegación y autenticación
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // URL base de la API
  const API_BASE_URL = 'https://secuencia432-tremendoterritorio-production.up.railway.app/api';

  // Obtener la ruta desde donde vino el usuario
  const from = location.state?.from?.pathname || '/';

  // Funciones de navegación
  const goToRegister = () => {
    navigate('/register');
  };

  // Validación y envío inicial del PIN
  const handlePinSubmit = async () => {
    const pinValue = pin.join('');
    if (pinValue.length !== 4) {
      setError('Por favor ingresa un PIN de 4 dígitos');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin: pinValue }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error('PIN no encontrado o error de validación');
        }
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al verificar PIN');
      }

      const data = await response.json();
      
      if (data.username) {
        setUsername(data.username);
      }

      setSecurityImages(data.images.map(img => ({
        id: img.id,
        src: img.cloudinary_url,
        alt: `Imagen ${img.id}`
      })));
      
      setIsPinSubmitted(true);
    } catch (err) {
      setError(err.message || 'Error al conectar con el servidor');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejo de cambios en los campos del PIN
  const handlePinChange = (index, value) => {
    if (value.length > 1) return;
   
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  // Permite retroceder con "Backspace"
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Selección de imagen de seguridad
  const handleImageSelect = (imageId) => {
    setSelectedImage(imageId);
    setError('');
   
    setTimeout(() => {
      document.getElementById('login-button')?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }, 300);
  };

  // Petición final para completar el login
  const handleLogin = async () => {
    if (!selectedImage) {
      setError('Por favor selecciona tu imagen de seguridad');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
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
      
      // Usar el contexto de autenticación para guardar el login
      await login(data.token, {
        username: username,
        // Puedes agregar más datos del usuario aquí si los tienes
      });
      
      // Redirigir a la página desde donde vino o a la página por defecto
      navigate(from, { replace: true });
      
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  // Permite regresar al paso anterior (PIN)
  const handleBackToPin = () => {
    setIsPinSubmitted(false);
    setSecurityImages([]);
    setSelectedImage(null);
    setUsername('');
    setError('');
  };

  // Validaciones para habilitar botones
  const isPinComplete = pin.every(digit => digit);
  const isFormComplete = selectedImage;

  return (
    <Suspense fallback={<p>Loading translation</p>}>
    <div
      className="min-h-screen bg-gradient-to-b from-primary-first via-primary-second to-primary-third flex flex-col"
      style={{
          backgroundImage: `url('https://res.cloudinary.com/dppf30duk/image/upload/v1755905827/Texturas-01_at6bal.png')`,
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundColor: '#5E5630'
      }}>
      
      {/* Contenido principal centrado */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
           
            {/* Encabezado de bienvenida */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2 font-title">{t("welcome_header.title")}</h2>
              <p className="text-xl text-primary-first font-semibold font-subtitle">{t("welcome_header.subtitle")}</p>
            </div>

            {/* Mensaje de error */}
            {error && (
              <div className={`mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center transition-all font-body ${shake ? 'animate-pulse' : ''}`}>
                {error}
              </div>
            )}

            {/* Paso 1: Ingreso de PIN */}
            {!isPinSubmitted ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 mb-4 text-center font-subtitle">
                    {t("PIN_entry.label")}
                  </label>
                 
                  {/* Inputs de PIN */}
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
                          className={`w-14 h-14 text-center text-2xl font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-first transition-all font-body ${
                            digit ? 'border-primary-first bg-primary-first bg-opacity-10' : 'border-gray-300'
                          } ${shake ? 'animate-bounce' : ''}`}
                          disabled={isLoading}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Botón mostrar/ocultar PIN */}
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="flex items-center justify-center w-full mb-6 text-gray-600 hover:text-primary-first transition-colors font-body"
                    disabled={isLoading}
                  >
                    {showPin ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
                    {showPin ? t("button.doNotShowPin") : t("button.showPin")}
                  </button>
                </div>

                {/* Botón continuar */}
                <div className='flex gap-4 justify-center'>
                  <ButtonPrimary
                    type="button"
                    onClick={handlePinSubmit}
                    disabled={!isPinComplete || isLoading}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 font-body ${
                      isPinComplete && !isLoading
                        ? 'bg-gradient-to-r from-primary-second to-primary-sixth hover:from-primary-sixth hover:to-primary-second text-white shadow-lg transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t("continue_button.isLoading")}
                      </div>
                    ) : (
                      t("continue_button.buttonPrimary")
                    )}
                  </ButtonPrimary>
                </div>
              </div>
            ) : (
              <>
                {/* Paso 2: Selección de Imagen */}
                <div className="mb-6">
                  <ButtonPrimary
                    onClick={handleBackToPin}
                    className="text-primary-first hover:text-primary-second font-medium transition-colors font-body"
                  >
                    ← {t("image_selection.buttonPrimary")}
                  </ButtonPrimary>
                  <p className="text-sm text-gray-600 mt-2 font-subtitle">
                    {t("image_selection.p")}
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center font-subtitle">
                    {t("image_selection.h3")}
                  </h3>

                  {/* Grid de imágenes de seguridad */}
                  <div className="grid grid-cols-2 gap-4 max-h-60 overflow-y-auto">
                    {securityImages.map((image) => (
                      <div
                        key={image.id}
                        onClick={() => handleImageSelect(image.id)}
                        className={`relative cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          selectedImage === image.id
                            ? 'ring-4 ring-primary-first ring-offset-2 scale-105'
                            : 'hover:ring-2 hover:ring-primary-first'
                        } rounded-xl overflow-hidden`}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="flex justify-center items-center w-full h-28 object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/150?text=Error';
                          }}
                        />
                        {/* Icono de selección */}
                        {selectedImage === image.id && (
                          <div className="absolute inset-0 bg-primary-first bg-opacity-30 flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón de Ingreso */}
                <div className='flex justify-center'>
                  <ButtonPrimary
                    id="login-button"
                    onClick={handleLogin}
                    disabled={!isFormComplete || isLoading}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 font-body ${
                      isFormComplete && !isLoading
                        ? 'bg-gradient-to-r from-primary-second to-primary-sixth hover:from-primary-sixth hover:to-primary-second text-white shadow-lg transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        {t("login_button.isLoading")}...
                      </div>
                    ) : (
                      t("login_button.buttonPrimary")
                    )}
                  </ButtonPrimary>
                </div>
              </>
            )}

            {/* Links adicionales */}
            <div className="mt-6 text-center space-y-3">
              <button className="text-primary-first hover:text-primary-second font-medium transition-colors font-body">
                ¿{t("additional_links.button")}?
              </button>
              <div className="text-gray-500 font-body">
                ¿{t("additional_links.div")}?{' '}
                <button
                  onClick={goToRegister}
                  className="text-primary-first hover:text-primary-second font-medium font-subtitle transition-colors"
                >
                  {t("additional_links.button_2")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Suspense>
  );
};