import React, { Suspense } from 'react';
import { ImageCarousel } from '../../../Shared/ImageCarousel/ImageCarousel';
import { ButtonWhatsApp } from '../../../Shared/buttons/ButtonWhatsApp/ButtonWhatsApp';
import { ButtonCall } from '../../../Shared/buttons/ButtonCall/ButtonCall';
import { useTranslation } from 'react-i18next';

const HighlightText = ({ text, highlight }) => {
    if (!highlight || !highlight.trim()) {
        return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
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

export const RestaurantCard = ({
    images = [],
    img,
    nameRestaurant,
    distance,
    location,
    icon,
    requirements,
    phone,
    searchTerm = '',
    openingTime,
    closingTime,
    peopleCapacity,
    socialMedia
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

    const { t } = useTranslation(["FarmsView"]);

    const carouselImages = images.length > 0
        ? images
        : img
            ? [{ url: img, alt: `${nameRestaurant} - Imagen principal` }]
            : [];

    const isProductHighlighted = (product) => {
        return searchTerm && product.toLowerCase().includes(searchTerm.toLowerCase());
    };

    const formatTime = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    return (
        <Suspense fallback={<p>Loading translation...</p>}>
            <div className="bg-white rounded-2xl shadow-lg border-2 border-primary-fifth hover:border-primary-first transition-all duration-300 overflow-hidden group hover:shadow-xl transform hover:-translate-y-2">
                
                <div className="h-48 relative overflow-hidden">
                    <ImageCarousel
                        images={images}
                        autoPlay={true}
                        interval={5000}
                        showPlayPause={true}
                        onSlideChange={(index) => console.log('Slide:', index)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                <div className="p-6">
                    
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

                    {/* NUEVO: Información de horarios y capacidad desde la API */}
                    {(openingTime || closingTime || peopleCapacity) && (
                        <div className="mb-4 bg-primary-fifth/30 rounded-lg p-3 space-y-2">
                            {(openingTime && closingTime) && (
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <span className="text-base">🕒</span>
                                    <span className="font-medium font-body">
                                        {t("RestaurantCard.schedules_and_capacity.schedules_span")} {formatTime(openingTime)} - {formatTime(closingTime)}
                                    </span>
                                </div>
                            )}
                            {peopleCapacity && (
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <span className="text-base">👥</span>
                                    <span className="font-medium font-body">
                                        {t("RestaurantCard.schedules_and_capacity.capacity_span")} {peopleCapacity} {t("RestaurantCard.schedules_and_capacity.capacity_span_")}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <p className="text-gray-600 text-sm italic mb-4 font-body leading-relaxed text-justify">
                        <HighlightText text={location} highlight={searchTerm} />
                    </p>

                    {/* Lista de productos requeridos (solo si existen) */}
                    {requirements && Object.keys(requirements).length > 0 && (
                        <div className="mb-6">
                            <h4 className="text-primary-first font-semibold mb-3 font-subtitle">
                                {t("RestaurantCard.List_of_required_products")}
                            </h4>
                            <div className="space-y-3">
                                {Object.entries(requirements).map(([category, products]) => (
                                    <div key={category}>
                                        <div className="flex items-center gap-2 text-primary-first text-sm font-medium mb-2">
                                            <span>{getCategoryIcon(category)}</span>
                                            <span className="font-body">
                                                <HighlightText text={getCategoryTitle(category)} highlight={searchTerm} />:
                                            </span>
                                        </div>
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
                    )}

                    {/* NUEVO: Redes sociales desde la API */}
                    {socialMedia && Object.keys(socialMedia).length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-primary-first font-semibold mb-2 font-subtitle text-sm">
                                Redes Sociales
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {socialMedia.facebook && (
                                    <a 
                                        href={socialMedia.facebook} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                        title="Facebook"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>
                                )}
                                {socialMedia.instagram && (
                                    <a 
                                        href={socialMedia.instagram} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-pink-600 hover:text-pink-800 transition-colors"
                                        title="Instagram"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </a>
                                )}
                                {socialMedia.twitter && (
                                    <a 
                                        href={socialMedia.twitter} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:text-blue-600 transition-colors"
                                        title="Twitter"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <ButtonWhatsApp
                            nameClient={nameRestaurant}
                            userMessage={t("RestaurantCard.ButtonWhatsApp.userMessage")}
                            phone={phone}
                        />
                        
                        <ButtonCall 
                            className='w-full bg-primary-first font-body hover:bg-primary-third text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-4 transform hover:scale-105'
                            phone={phone}
                        />
                    </div>
                </div>
            </div>
        </Suspense>
    );
};