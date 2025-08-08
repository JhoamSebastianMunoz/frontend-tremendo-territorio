import React, { useState, useEffect } from 'react'; 

// Componente funcional que recibe imágenes y configuraciones como props
export const ImageCarousel = ({ images = [], autoPlay = true, interval = 4000, showIndicators = true, showArrows = true }) => {
    // Estado que controla el índice de la imagen actual mostrada
    const [currentIndex, setCurrentIndex] = useState(0);

    // Hook para gestionar el cambio automático de imágenes (auto-play)
    useEffect(() => {
        // Si autoPlay está desactivado o hay solo una imagen, no hacer nada
        if (!autoPlay || images.length <= 1) return;

        // Intervalo que cambia la imagen cada cierto tiempo
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, interval);

        // Limpieza del intervalo al desmontar el componente o al cambiar dependencias
        return () => clearInterval(timer);
    }, [autoPlay, interval, images.length]);

    // Función para ir a la imagen anterior
    const goToPrevious = (e) => {
        e?.stopPropagation();
        setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    };

    // Función para ir a la imagen siguiente
    const goToNext = (e) => {
        e?.stopPropagation();
        setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    };

    // Función para ir a una imagen específica mediante el indicador
    const goToSlide = (index, e) => {
        e?.stopPropagation();
        setCurrentIndex(index);
    };

    // Si no hay imágenes, se muestra un contenedor alternativo
    if (!images || images.length === 0) {
        return (
            <div className="h-64 bg-gradient-to-br from-primary-first to-primary-second flex items-center justify-center text-white">
                <span className="text-4xl">🌾</span>
            </div>
        );
    }

    // Renderizado del carrusel
    return (
        <div className="relative w-full h-64 overflow-hidden rounded-t-2xl bg-gradient-to-br from-primary-first to-primary-second group">
            
            {/* Contenedor de las imágenes con transición de deslizamiento */}
            <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {/* Renderizado dinámico de cada imagen */}
                {images.map((image, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 relative">
                        <img
                            src={image.url}
                            alt={image.alt || `Slide ${index + 1}`}
                            className="w-full h-full object-cover"
                            // Oculta la imagen si hay error de carga y muestra un contenido alternativo
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        {/* Contenido alternativo (fallback) si la imagen no carga */}
                        <div className="w-full h-full bg-gradient-to-br from-primary-first to-primary-second flex items-center justify-center text-white text-4xl" style={{ display: 'none' }}>
                            🌾
                        </div>
                        {/* Capa de superposición con opacidad */}
                        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                    </div>
                ))}
            </div>

            {/* Flechas de navegación (si están activadas y hay más de una imagen) */}
            {showArrows && images.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-10 h-10 rounded-full transition-all duration-300 backdrop-blur-sm flex items-center justify-center z-10 shadow-lg hover:scale-110"
                        aria-label="Imagen anterior"
                        type="button"
                    >
                        {/* Ícono de flecha izquierda */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white w-10 h-10 rounded-full transition-all duration-300 backdrop-blur-sm flex items-center justify-center z-10 shadow-lg hover:scale-110"
                        aria-label="Siguiente imagen"
                        type="button"
                    >
                        {/* Ícono de flecha derecha */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Indicadores inferiores (si están activados y hay más de una imagen) */}
            {showIndicators && images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => goToSlide(index, e)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                                index === currentIndex
                                    ? 'bg-white border-white scale-125 shadow-lg'
                                    : 'bg-transparent border-white hover:bg-white hover:bg-opacity-50'
                            }`}
                            aria-label={`Ir a la imagen ${index + 1}`}
                            type="button"
                        />
                    ))}
                </div>
            )}

            {/* Contador de imágenes (posición actual / total) */}
            {images.length > 1 && (
                <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs backdrop-blur-sm">
                    {currentIndex + 1} / {images.length}
                </div>
            )}
        </div>
    );
};