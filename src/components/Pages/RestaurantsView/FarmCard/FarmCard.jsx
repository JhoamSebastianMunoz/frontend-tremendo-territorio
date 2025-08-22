import React, { useContext, useState } from 'react';
import { RatingContext } from '../../../../contexts/Rating/Rating';
import { useNavigate } from 'react-router-dom';
import { ImageCarousel } from '../../../Shared/ImageCarousel/ImageCarousel';
import { ButtonPrimary } from '../../../Shared/buttons/ButtonPrimary/ButtonPrimary';
import { ButtonSecondary } from '../../../Shared/buttons/ButtonSecondary/ButtonSecondary';
import { RatingStars } from '../../../Shared/RatingStars/RatingStars';
import { ButtonWhatsApp } from '../../../Shared/buttons/ButtonWhatsApp/ButtonWhatsApp';
import { ButtonCall } from '../../../Shared/buttons/ButtonCall/ButtonCall';


// Componente para resaltar términos de búsqueda dentro de un texto
const HighlightText = ({ text, highlight }) => {
    if (!highlight || !highlight.trim()) {
        return <span>{text}</span>; // Si no hay texto a resaltar, se muestra tal cual
    }

    const regex = new RegExp(`(${highlight})`, 'gi'); // Expresión regular para encontrar coincidencias
    const parts = text.split(regex); // Divide el texto original en partes coincidentes y no coincidentes

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

// Componente que representa una tarjeta de información de una finca (productor)
export const FarmCard = ({
    images = [],
    img,
    nameFarm,
    distance,
    qualificationAverage,
    location,
    icon,
    offers,
    phone,
    searchTerm = ''
}) => {
    // Mapea categorías a íconos representativos
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

    // Mapea categorías a títulos legibles
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
    
    //Estado para manejar las calificaciones
    const [ rating, setRating ] = useState(0);

    const { renderStar } = useContext(RatingContext);

    // Prepara las imágenes a mostrar en el carrusel
    const carouselImages = images.length > 0
        ? images
        : img
            ? [{ url: img, alt: `${nameFarm} - Imagen principal` }]
            : [];

    // Verifica si un producto coincide con el texto de búsqueda
    const isProductHighlighted = (product) => {
        return searchTerm && product.toLowerCase().includes(searchTerm.toLowerCase());
    };

    //Estado para manejar los comentarios que redacten los usuarios
    const [ comment, setComment ] = useState('');

    // Redirigir a la vista de Comentarios
    const navigate = useNavigate()

    const goToCommentsSection = () =>{
        navigate('/commentsSection')
    }

    // Renderizado del componente
    return (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-primary-fifth hover:border-primary-first transition-all duration-300 overflow-hidden group hover:shadow-xl transform hover:-translate-y-2">
            
            {/* Sección del carrusel de imágenes */}
            <div className="h-48 relative overflow-hidden">
                <ImageCarousel 
                    images={images}
                    autoPlay={true}
                    interval={5000}
                    showPlayPause={true}
                    onSlideChange={(index) => console.log('Slide:', index)}
                />                
                {/* Superposición visual sobre la imagen */}
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Contenido principal de la tarjeta */}
            <div className="p-6">

                {/* Encabezado con ícono, nombre y ubicación */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-first to-primary-second rounded-full flex items-center justify-center text-white text-lg flex-shrink-0">
                        {icon}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary-first mb-1 font-subtitle">
                            <HighlightText text={nameFarm} highlight={searchTerm} />
                        </h3>
                        <div className="flex items-center gap-2 text-primary-first text-sm">
                            <span>📍</span>
                            <span className="font-medium font-body">
                                <HighlightText text={distance} highlight={searchTerm} />
                            </span>
                        </div>
                        <div className='flex gap-1'>
                            <span className='text-sm font-body text-gray-500'>
                                {qualificationAverage}
                            </span>
                            <div>
                                {renderStar(Math.round(Number(qualificationAverage)))}
                            </div>
                        </div>
                        
                    </div>
                </div>

                {/* Descripción de la finca */}
                <p className="text-gray-600 text-sm italic mb-4 font-body leading-relaxed">
                    <HighlightText text={location} highlight={searchTerm} />
                </p>

                {/* Lista de productos ofrecidos por categorías */}
                <div className="mb-6">
                    <h4 className="text-primary-first font-semibold mb-3 font-subtitle">
                        Ofrecemos:
                    </h4>
                    <div className="space-y-3">
                        {Object.entries(offers).map(([category, products]) => (
                            <div key={category}>
                                {/* Título de la categoría con ícono */}
                                <div className="flex items-center gap-2 text-primary-first text-sm font-medium mb-2">
                                    <span>{getCategoryIcon(category)}</span>
                                    <span className="font-body">
                                        <HighlightText text={getCategoryTitle(category)} highlight={searchTerm} />:
                                    </span>
                                </div>
                                {/* Lista de productos como etiquetas */}
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

                {/* Botones de contacto: WhatsApp y llamada */}
                <div className="flex flex-col gap-2">
                    <ButtonWhatsApp 
                    nameClient={nameFarm}  
                    userMessage='¡Hola! Soy un Restaurante del Territorio de Barichara y me interesa conocer más sobre los productos que estás ofertando ' 
                    phone={phone}/>

                    <ButtonCall 
                    phone={phone}/> 
                </div>
            
                <div className='flex mt-4'>
                        <p>
                            Calificar: <RatingStars value={rating} onChange={setRating} />
                        </p>
                </div>

                <div className=''>
                    <div className='flex gap-2 m-4'>
                        <textarea 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className='w-full font-body p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-first'
                        placeholder='🖋 Escribe tu comentario...'>
                        </textarea>
                        <ButtonPrimary
                        onClick={() => console.log('Enviar calificación: ', rating, 'Comentario: ', comment)}>
                            Enviar
                        </ButtonPrimary>
                    </div>
                    <div className=' m-4'>
                        <ButtonSecondary
                        onClick={goToCommentsSection}>
                            Ver Comentarios
                        </ButtonSecondary>
                    </div>
                </div>
            </div>
        </div>
    );
};
