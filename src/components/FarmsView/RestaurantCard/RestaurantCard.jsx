import React from 'react';
import { ImageCarousel } from '../ImageCarousel/ImageCarousel';

export const RestaurantCard = ({ 
    images = [], // Nuevo prop para múltiples imágenes
    img, // Mantenemos compatibilidad con imagen única
    nameRestaurant, 
    distance, 
    location, 
    icon, 
    requirements, 
    phone,
    viewMode = 'grid' 
}) => {
    const getCategoryIcon = (category) => {
        const icons = {
            hortalizas: '🥬',
            verduras: '🥕',
            condimentos: '🌶️',
            frutas: '🥑',
            granos: '🌾',
            tuberculos: '🥔'
        };
        return icons[category] || '🌱';
    };

    const getCategoryTitle = (category) => {
        const titles = {
            hortalizas: 'Hortalizas',
            verduras: 'Verduras', 
            condimentos: 'Condimentos',
            frutas: 'Frutas',
            granos: 'Granos',
            tuberculos: 'Tubérculos'
        };
        return titles[category] || category.charAt(0).toUpperCase() + category.slice(1);
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent(
            `¡Hola! Soy productor agrícola y me interesa conocer más sobre los productos que necesitan en ${nameRestaurant}. ¿Podríamos coordinar una reunión?`
        );
        window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
    };

    const handleCall = () => {
        window.open(`tel:${phone}`, '_self');
    };

    // Preparar las imágenes para el carrusel
    const carouselImages = images.length > 0 
        ? images 
        : img 
            ? [{ url: img, alt: `${nameRestaurant} - Imagen principal` }]
            : [];

    if (viewMode === 'list') {
        return (
            <div className="bg-white rounded-2xl shadow-lg border-2 border-primary-fifth hover:border-primary-first transition-all duration-300 overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    {/* Carrusel de imágenes */}
                    <div className="lg:w-1/3 h-64 lg:h-auto relative overflow-hidden">
                        <ImageCarousel 
                            images={carouselImages}
                            autoPlay={true}
                            interval={5000}
                            showIndicators={true}
                            showArrows={true}
                        />
                    </div>
                    
                    {/* Contenido */}
                    <div className="lg:w-2/3 p-6">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-first to-primary-second rounded-full flex items-center justify-center text-2xl text-white flex-shrink-0">
                                {icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-primary-first mb-2 font-primary-brand">
                                    {nameRestaurant}
                                </h3>
                                <div className="flex items-center gap-2 text-primary-first mb-3">
                                    <span>📍</span>
                                    <span className="font-medium font-primary-brand">{distance}</span>
                                </div>
                                <p className="text-gray-600 text-sm italic font-primary-brand leading-relaxed">
                                    {location}
                                </p>
                            </div>
                        </div>

                        {/* Productos requeridos */}
                        <div className="mb-6">
                            <h4 className="text-lg font-semibold text-primary-first mb-4 font-primary-brand">
                                Productos que necesitamos:
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(requirements).map(([category, products]) => (
                                    <div key={category} className="space-y-2">
                                        <div className="flex items-center gap-2 text-primary-first font-medium">
                                            <span className="text-lg">{getCategoryIcon(category)}</span>
                                            <span className="font-primary-brand">{getCategoryTitle(category)}:</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {products.map((product, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-primary-fourth text-primary-first px-3 py-1 rounded-full text-sm border border-primary-first font-primary-brand"
                                                >
                                                    {product}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Botones de contacto */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleWhatsApp}
                                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 font-primary-brand"
                            >
                                📱 WhatsApp
                            </button>
                            <button
                                onClick={handleCall}
                                className="flex-1 bg-primary-first hover:bg-primary-third text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 font-primary-brand"
                            >
                                📞 Llamar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Vista en cuadrícula (grid)
    return (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-primary-fifth hover:border-primary-first transition-all duration-300 overflow-hidden group hover:shadow-xl transform hover:-translate-y-2">
            {/* Carrusel de imágenes del restaurante */}
            <div className="h-48 relative overflow-hidden">
                <ImageCarousel 
                    images={carouselImages}
                    autoPlay={true}
                    interval={4000}
                    showIndicators={true}
                    showArrows={true}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Contenido de la tarjeta */}
            <div className="p-6">
                {/* Header del restaurante */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-first to-primary-second rounded-full flex items-center justify-center text-white text-lg flex-shrink-0">
                        {icon}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary-first mb-1 font-primary-brand">
                            {nameRestaurant}
                        </h3>
                        <div className="flex items-center gap-2 text-primary-first text-sm">
                            <span>📍</span>
                            <span className="font-medium font-primary-brand">{distance}</span>
                        </div>
                    </div>
                </div>

                {/* Descripción */}
                <p className="text-gray-600 text-sm italic mb-4 font-primary-brand leading-relaxed">
                    {location}
                </p>

                {/* Productos requeridos */}
                <div className="mb-6">
                    <h4 className="text-primary-first font-semibold mb-3 font-primary-brand">
                        Requerimos:
                    </h4>
                    <div className="space-y-3">
                        {Object.entries(requirements).map(([category, products]) => (
                            <div key={category}>
                                <div className="flex items-center gap-2 text-primary-first text-sm font-medium mb-2">
                                    <span>{getCategoryIcon(category)}</span>
                                    <span className="font-primary-brand">{getCategoryTitle(category)}:</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {products.map((product, index) => (
                                        <span
                                            key={index}
                                            className="bg-primary-fourth text-primary-first px-3 py-1 rounded-full text-xs border border-primary-first font-primary-brand"
                                        >
                                            {product}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botones de contacto */}
                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleWhatsApp}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 font-primary-brand"
                    >
                        📱 WhatsApp
                    </button>
                    <button
                        onClick={handleCall}
                        className="w-full bg-primary-first hover:bg-primary-third text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 font-primary-brand"
                    >
                        📞 Llamar
                    </button>
                </div>
            </div>
        </div>
    );
};