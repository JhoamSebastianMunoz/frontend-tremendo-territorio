import React, { useContext } from 'react'
import { RatingContext } from '../../../../contexts/Rating/Rating';
import { CommentsContext } from '../../../../contexts/Comments/Comments';
import { Carousel } from '../MainSection/Carousel/Carousel';
import { ButtonSecondary } from '../../../Atoms/ButtonSecondary/ButtonSecondary';

export const MainSection = () => {
  //Contexto de los comentarios
  const { comments } = useContext(CommentsContext);
  //contexto de estrellas
  const { 
    renderStar, 
    qualificationAverage } = useContext(RatingContext);

  // Datos del agricultor
  const nameFarm = "Juan De Dios Herrera";
  const phone = "+573232967700";

  // Acción para abrir WhatsApp con un mensaje predeterminado
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `¡Hola! Soy un Restaurante del Territorio de Barichara y me interesa conocer más sobre los productos que están ofertando en ${nameFarm}. ¿Podríamos coordinar una reunión?`
    );
    // Abre una nueva pestaña con el chat de WhatsApp
    window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
  };

  // Acción para realizar una llamada telefónica
  const handleCall = () => {
    // Abre la app de teléfono en el dispositivo
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border-4 border-primary-fifth">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Carrusel de imágenes */}
        <Carousel/>

        {/* Información principal del agricultor */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold text-primary-third mb-2 font-primary-brand">
            Juan De Dios Herrera
          </h1>

          {/* Nombre de la finca */}
          <div className="text-xl text-primary-second mb-2 font-primary-brand flex items-center justify-center lg:justify-start space-x-2">
            <span>🌾</span>
            <span>Finca La Esperanza</span>
          </div>

          {/* Ubicación */}
          <div className="text-primary-first mb-4 font-primary-brand flex items-center justify-center lg:justify-start space-x-2">
            <span>📍</span>
            <span>Vereda San José, Barichara, Santander</span>
          </div>

          {/* Rating y reseñas */}
          <div className="text-center lg:text-left mb-4">
            <div className="text-primary-second text-2xl mb-1">
              {renderStar(Math.round(Number(qualificationAverage)))}
            </div>
            <div className="text-xl font-bold text-primary-sixth font-primary-brand">{qualificationAverage}</div>
            <div className="text-primary-first text-sm font-primary-brand">{comments.length} reseñas de restaurantes</div>
          </div>

          {/* Botones de redes sociales y contacto */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3"></div>
          <div className="flex flex-col gap-2">
            {/* Instagram */}
            <a 
              href="#" 
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 font-primary-brand"
            >
              <span>📸</span>
              <span>Instagram</span>
            </a>

            {/* WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 font-primary-brand"
            >
              📱 WhatsApp
            </button>

            {/* Llamar */}
            <ButtonSecondary onClick={handleCall}>
              📞 Llamar
            </ButtonSecondary>
          </div>
        </div>
      </div>
    </div>
  )
}
