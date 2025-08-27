import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { MainSection } from './MainSection/MainSection'; 
import { History } from './History/History'; 
import { Crops } from './Crops/Crops'; 
import { Comments } from './Comments/Comments'; 
import { Statistics } from './Statistics/Statistics'; 
import { ButtonPrimary } from '../../Shared/buttons/ButtonPrimary/ButtonPrimary';

// Componente principal que agrupa toda la vista de comentarios y detalles del agricultor
export const CommentsSection = () => {
  
  const navigate = useNavigate(); // Inicializa la función de navegación

  // Función para regresar a la vista de trazabilidad de restaurantes
  const goToRestaurantsView = () => {
    navigate('/restaurantsView'); 
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-fifth to-primary-fourth"
          style={{
                backgroundImage: `url('https://res.cloudinary.com/dppf30duk/image/upload/v1755905827/Texturas-01_at6bal.png')`, // Reemplaza 'textura.png' con el nombre exacto de tu archivo
                backgroundSize: 'cover', // o 'contain' si prefieres que se vea completa
                backgroundRepeat: 'repeat', // o 'no-repeat' si no quieres que se repita
                backgroundPosition: 'center',
                backgroundColor: '#5E5630' // Color de respaldo por si la imagen no carga
            }}>
      
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
      <div className="max-w-6xl mx-auto px-8 py-8 space-y-8 ">
        
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
};
