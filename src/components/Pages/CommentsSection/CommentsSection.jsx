import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { MainSection } from './MainSection/MainSection'; 
import { History } from './History/History'; 
import { Crops } from './Crops/Crops'; 
import { Comments } from './Comments/Comments';
import { Statistics } from './Statistics/Statistics'; 
import { ButtonPrimary } from '../../Shared/buttons/ButtonPrimary/ButtonPrimary';

// Componente principal que agrupa toda la vista de comentarios y detalles del agricultor
export const CommentsSection = React.memo(() => {
  
  const navigate = useNavigate(); // Inicializa la función de navegación

  // Memoizar los estilos de fondo para evitar recálculos
  const backgroundStyles = useMemo(() => ({
    backgroundImage: `url('https://res.cloudinary.com/dppf30duk/image/upload/v1755905827/Texturas-01_at6bal.png')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center',
    backgroundColor: '#5E5630',
    backgroundAttachment: 'scroll', // Importante: usar scroll en lugar de fixed
    willChange: 'auto', // Evitar will-change: transform que causa re-paints
    transform: 'translateZ(0)', // Crear contexto de stacking
    backfaceVisibility: 'hidden'
  }), []);

  // Función memoizada para regresar a la vista de trazabilidad de restaurantes
  const goToRestaurantsView = React.useCallback(() => {
    navigate('/restaurantsView'); 
  }, [navigate]);

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-primary-fifth to-primary-fourth"
      style={backgroundStyles}
    >
      
      {/* HEADER de navegación */}
      <div className="">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Botón para volver a la vista anterior */}
          <div className='m-4'>
            <ButtonPrimary 
              onClick={goToRestaurantsView}
            >
              <span>←</span>
              <span>Volver a Trazabilidad</span>
            </ButtonPrimary>
          </div>

          {/* Frase inspiradora en el header */}
          <div className="text-primary-fifth italic font-body">
            "Conoce a quien cultiva tu comida"
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
        
        {/* Sección con imagen, datos del agricultor y botones de contacto */}
        <MainSection/>

        {/* Historia del agricultor */}
        <History/>

        {/* Lista de cultivos con íconos */}
        <Crops/>

        {/* Sección de comentarios */}
        <Comments/> 

        {/* Sección final con estadísticas */}
        <Statistics/>

      </div>
    </div>
  );
});