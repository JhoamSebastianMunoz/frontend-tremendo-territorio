import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Hook personalizado para manejar la lógica del carrusel
const useCarousel = ({ images, autoPlay, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const timerRef = useRef(null);

  const imageCount = images?.length || 0;
  const hasMultipleImages = imageCount > 1;

  // Funciones de navegación optimizadas
  const goToNext = useCallback(() => {
    if (imageCount <= 1) return;
    setCurrentIndex(prevIndex => (prevIndex + 1) % imageCount);
  }, [imageCount]);

  const goToPrevious = useCallback(() => {
    if (imageCount <= 1) return;
    setCurrentIndex(prevIndex => (prevIndex - 1 + imageCount) % imageCount);
  }, [imageCount]);

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < imageCount) {
      setCurrentIndex(index);
    }
  }, [imageCount]);

  // Control del autoplay
  const startAutoPlay = useCallback(() => {
    if (!autoPlay || !hasMultipleImages) return;
    
    timerRef.current = setInterval(goToNext, interval);
  }, [autoPlay, hasMultipleImages, interval, goToNext]);

  const stopAutoPlay = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsPlaying(prev => {
      const newState = !prev;
      if (newState) {
        startAutoPlay();
      } else {
        stopAutoPlay();
      }
      return newState;
    });
  }, [startAutoPlay, stopAutoPlay]);

  // Efecto para manejar el autoplay
  useEffect(() => {
    if (isPlaying && hasMultipleImages) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return stopAutoPlay;
  }, [isPlaying, hasMultipleImages, startAutoPlay, stopAutoPlay]);

  // Limpiar al desmontar
  useEffect(() => {
    return stopAutoPlay;
  }, [stopAutoPlay]);

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToSlide,
    isPlaying,
    toggleAutoPlay,
    hasMultipleImages,
    imageCount
  };
};

// Componente de imagen optimizado con lazy loading
const CarouselImage = React.memo(({ image, index, isActive, onImageError }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setHasError(true);
    onImageError?.(index);
  }, [index, onImageError]);

  return (
    <div className="w-full h-full flex-shrink-0 relative">
      {!hasError ? (
        <>
          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-2xl text-gray-400">🖼️</span>
              </div>
            </div>
          )}
          
          <img
            src={image.url}
            alt={image.alt || `Imagen ${index + 1} del carrusel`}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={isActive ? "eager" : "lazy"}
          />
        </>
      ) : (
        // Fallback mejorado
        <div className="w-full h-full bg-gradient-to-br from-primary-first to-primary-second flex flex-col items-center justify-center text-white">
          <span className="text-4xl mb-2">🌾</span>
          <span className="text-sm opacity-75">Imagen no disponible</span>
        </div>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-5 transition-all duration-300" />
    </div>
  );
});

CarouselImage.displayName = 'CarouselImage';

// Componente principal del carrusel optimizado
export const ImageCarousel = ({ 
  images = [], 
  autoPlay = true, 
  interval = 4000, 
  showIndicators = true, 
  showArrows = true,
  showCounter = true,
  showPlayPause = false,
  className = "",
  height = "h-64",
  onSlideChange
}) => {
  const {
    currentIndex,
    goToNext,
    goToPrevious,
    goToSlide,
    isPlaying,
    toggleAutoPlay,
    hasMultipleImages,
    imageCount
  } = useCarousel({ images, autoPlay, interval });

  // Memoizar la transformación para evitar recálculos
  const transformStyle = useMemo(() => ({
    transform: `translateX(-${currentIndex * 100}%)`
  }), [currentIndex]);

  // Notificar cambios de slide
  useEffect(() => {
    onSlideChange?.(currentIndex);
  }, [currentIndex, onSlideChange]);

  // Manejo de errores de imagen
  const handleImageError = useCallback((index) => {
    console.warn(`Error loading image at index ${index}`);
  }, []);

  // Manejo de eventos del teclado para accesibilidad
  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        goToPrevious();
        break;
      case 'ArrowRight':
        e.preventDefault();
        goToNext();
        break;
      case ' ':
        e.preventDefault();
        if (showPlayPause) toggleAutoPlay();
        break;
      default:
        break;
    }
  }, [goToPrevious, goToNext, showPlayPause, toggleAutoPlay]);

  // Si no hay imágenes, mostrar estado vacío
  if (!images || imageCount === 0) {
    return (
      <div className={`${height} bg-gradient-to-br from-primary-first to-primary-second flex items-center justify-center text-white rounded-2xl ${className}`}>
        <div className="text-center">
          <span className="text-4xl block mb-2">🌾</span>
          <span className="text-sm opacity-75">No hay imágenes disponibles</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full ${height} overflow-hidden rounded-2xl bg-gradient-to-br from-primary-first to-primary-second group ${className}`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Carrusel de imágenes"
      aria-live="polite"
    >
      {/* Contenedor de imágenes */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={transformStyle}
        role="group"
        aria-label={`Imagen ${currentIndex + 1} de ${imageCount}`}
      >
        {images.map((image, index) => (
          <CarouselImage
            key={`${image.url}-${index}`}
            image={image}
            index={index}
            isActive={index === currentIndex}
            onImageError={handleImageError}
          />
        ))}
      </div>

      {/* Controles de navegación */}
      {showArrows && hasMultipleImages && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full transition-all duration-300 backdrop-blur-sm flex items-center justify-center z-10 shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
            aria-label="Imagen anterior"
            type="button"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full transition-all duration-300 backdrop-blur-sm flex items-center justify-center z-10 shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
            aria-label="Siguiente imagen"
            type="button"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </>
      )}

      {/* Botón de play/pause */}
      {showPlayPause && hasMultipleImages && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleAutoPlay();
          }}
          className="absolute top-3 left-3 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full transition-all duration-300 backdrop-blur-sm flex items-center justify-center z-10 shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50"
          aria-label={isPlaying ? "Pausar carrusel" : "Reproducir carrusel"}
          type="button"
        >
          {isPlaying ? (
            <div className="w-3 h-3 flex gap-0.5">
              <div className="w-1 h-full bg-white" />
              <div className="w-1 h-full bg-white" />
            </div>
          ) : (
            <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-0.5" />
          )}
        </button>
      )}

      {/* Indicadores */}
      {showIndicators && hasMultipleImages && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 border-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black/50 ${
                index === currentIndex
                  ? 'bg-white border-white scale-125 shadow-lg'
                  : 'bg-transparent border-white/70 hover:bg-white/50 hover:border-white'
              }`}
              aria-label={`Ir a la imagen ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
              type="button"
            />
          ))}
        </div>
      )}

      {/* Contador */}
      {showCounter && hasMultipleImages && (
        <div className="absolute top-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm font-medium">
          {currentIndex + 1} / {imageCount}
        </div>
      )}

      {/* Indicador de carga para touch devices */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-500 ease-in-out"
        style={{ width: `${((currentIndex + 1) / imageCount) * 100}%` }}
        aria-hidden="true"
      />
    </div>
  );
};