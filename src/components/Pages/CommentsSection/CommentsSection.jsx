import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { MainSection } from './MainSection/MainSection'; 
import { History } from './History/History'; 
import { Crops } from './Crops/Crops'; 
import { Comments } from './Comments/Comments'; 
import { Statistics } from './Statistics/Statistics'; 

// Componente principal que agrupa toda la vista de comentarios y detalles del agricultor
export const CommentsSection = () => {
  
  const navigate = useNavigate(); // Inicializa la función de navegación

  // Función para regresar a la vista de trazabilidad de restaurantes
  const goToRestaurantsView = () => {
    navigate('/restaurantsView'); 
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-fifth to-primary-fourth">
      
      {/* HEADER de navegación */}
      <div className="bg-gradient-to-r from-primary-third to-primary-first text-white py-4 px-8 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Botón para volver a la vista anterior */}
          <button 
            className="bg-primary-second hover:bg-primary-sixth px-6 py-2 rounded-full transition-all duration-300 transform hover:-translate-y-1 font-body flex items-center space-x-2"
            onClick={goToRestaurantsView}
          >
            <span>←</span>
            <span>Volver a Trazabilidad</span>
          </button>

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
};
