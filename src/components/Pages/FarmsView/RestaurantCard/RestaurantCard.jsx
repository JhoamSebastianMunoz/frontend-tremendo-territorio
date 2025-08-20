import React from 'react';
import { ImageCarousel } from '../ImageCarousel/ImageCarousel';
import { ButtonWhatsApp } from '../../../Shared/buttons/ButtonWhatsApp/ButtonWhatsApp';
import { ButtonCall } from '../../../Shared/buttons/ButtonCall/ButtonCall';

// Componente auxiliar para resaltar texto que coincida con una búsqueda
const HighlightText = ({ text, highlight }) => {
    // Si no hay término a resaltar, se muestra el texto normal
    if (!highlight || !highlight.trim()) {
        return <span>{text}</span>;
    }

    // Se crea una expresión regular con el término a resaltar (ignorando mayúsculas/minúsculas)
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex); // Se divide el texto original por el término encontrado

    // Se renderiza el texto resaltando las coincidencias
    return (
        <span>
            {parts.map((part, index) => 
                regex.test(part) ? (
                    <mark key={index} className="bg-yellow-200 text-primary-first font-semibold rounded px-1">
                        {part}
                    </mark>
                ) : (
                    <span key={index}>{part}</span>
                )
            )}
        </span>
    );
};

// Componente principal: tarjeta individual de un restaurante
export const RestaurantCard = ({
    images = [],       
    img,               
    nameRestaurant,    
    distance,          
    location,          
    icon,              
    requirements,      
    phone,             
    searchTerm = ''    
}) => {

    // Retorna un emoji representativo según la categoría de productos
    const getCategoryIcon = (category) => {
        const icons = {
            hortalizas: '🥬',
            verduras: '🥕',
            condimentos: '🌶️',
            frutas: '🥑',
            granos: '🌾',
            tuberculos: '🥔'
        };
        return icons[category] || '🌱'; // Icono por defecto si no coincide
    };

    // Retorna el título con formato capitalizado según la categoría
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

    // Prepara el array de imágenes a mostrar en el carrusel
    const carouselImages = images.length > 0
        ? images
        : img
            ? [{ url: img, alt: `${nameRestaurant} - Imagen principal` }]
            : [];

    // Verifica si un producto debe ser resaltado en base al término de búsqueda
    const isProductHighlighted = (product) => {
        return searchTerm && product.toLowerCase().includes(searchTerm.toLowerCase());
    };

    // Estructura de la tarjeta visual
    return (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-primary-fifth hover:border-primary-first transition-all duration-300 overflow-hidden group hover:shadow-xl transform hover:-translate-y-2">

            {/* Carrusel de imágenes */}
            <div className="h-48 relative overflow-hidden">
                <ImageCarousel
                    images={carouselImages}
                    autoPlay={true}
                    interval={4000}
                    showIndicators={true}
                    showArrows={true}
                />
                {/* Superposición visual para oscurecer ligeramente las imágenes */}
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Contenido textual de la tarjeta */}
            <div className="p-6">

                {/* Encabezado: nombre, ícono y distancia */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-first to-primary-second rounded-full flex items-center justify-center text-white text-lg flex-shrink-0">
                        {icon}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary-first mb-1 font-subtitle">
                            <HighlightText text={nameRestaurant} highlight={searchTerm} />
                        </h3>
                        <div className="flex items-center gap-2 text-primary-first text-sm">
                            <span>📍</span>
                            <span className="font-medium font-body">
                                <HighlightText text={distance} highlight={searchTerm} />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Ubicación (dirección) del restaurante */}
                <p className="text-gray-600 text-sm italic mb-4 font-body leading-relaxed">
                    <HighlightText text={location} highlight={searchTerm} />
                </p>

                {/* Lista de productos requeridos */}
                <div className="mb-6">
                    <h4 className="text-primary-first font-semibold mb-3 font-subtitle">
                        Requerimos:
                    </h4>

                    <div className="space-y-3">
                        {/* Recorre las categorías y productos */}
                        {Object.entries(requirements).map(([category, products]) => (
                            <div key={category}>
                                <div className="flex items-center gap-2 text-primary-first text-sm font-medium mb-2">
                                    <span>{getCategoryIcon(category)}</span>
                                    <span className="font-body">
                                        <HighlightText text={getCategoryTitle(category)} highlight={searchTerm} />:
                                    </span>
                                </div>
                                {/* Muestra los productos como chips visuales */}
                                <div className="flex flex-wrap gap-2">
                                    {products.map((product, index) => (
                                        <span
                                            key={index}
                                            className={`px-3 py-1 rounded-full text-xs border font-body transition-all duration-300 ${
                                                isProductHighlighted(product)
                                                    ? 'bg-yellow-100 text-primary-first border-yellow-400 shadow-md transform scale-105'
                                                    : 'bg-primary-fourth text-primary-first border-primary-first'
                                            }`}
                                        >
                                            <HighlightText text={product} highlight={searchTerm} />
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botones de contacto: WhatsApp y Llamada */}
                <div className="flex flex-col gap-2">
                    <ButtonWhatsApp 
                    nameClient={nameRestaurant} 
                    userMessage='¡Hola! Soy productor agrícola y me interesa conocer más sobre los productos que necesitan en' 
                    phone={phone}/>
                    
                    <ButtonCall
                    phone={phone}/>
                </div>
            </div>
        </div>
    );
};
