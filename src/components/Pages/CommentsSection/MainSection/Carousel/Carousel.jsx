import React from 'react'
import { ImageCarousel } from '../../../RestaurantsView/FarmCard/ImageCarousel/ImageCarousel';

export const Carousel = () => {
  
  // Lista de imágenes con su URL y texto alternativo
  const images = [
    {
      url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1751500396/campo-tremendo-territorio_ukcrnr.jpg',
      alt: 'Juan De Dios Herrera - Finca La Esperanza'
    },
    {
      url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1754010244/finca3_vny8ua.jpg',
      alt: 'Cultivos de la finca'
    },
    {
      url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1754010243/finca6_vpizxa.jpg',
      alt: 'Productos frescos'
    }
  ];

  // Si hay imágenes, se usan en el carrusel; si no, se pasa un arreglo vacío
  const carouselImages = images.length > 0 ? images : [];

  return (
    <div className="mx-2">
      {/* Contenedor del carrusel con estilos de tamaño y bordes redondeados */}
      <div className="h-99 relative overflow-hidden rounded-2xl">
        <ImageCarousel
          images={carouselImages} // Lista de imágenes a mostrar
          autoPlay={true}         // Activa reproducción automática
          interval={4000}         // Intervalo entre cambios en milisegundos
          showIndicators={true}   // Muestra los indicadores de posición
          showArrows={true}       // Muestra flechas de navegación
        />
      </div>
    </div>
  )
}
