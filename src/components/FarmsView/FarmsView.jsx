import React, { useState } from 'react';
import { MainSection } from './MainSection/MainSection';
import { RestaurantCard } from './RestaurantCard/RestaurantCard';

export const FarmsView = () => {
    const [viewMode, setViewMode] = useState('grid');

    const restaurantsData = [
        {
            id: 1,
            // Múltiples imágenes para el carrusel
            images: [
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799986/samples/man-on-a-street.jpg',
                    alt: 'Restaurante El Sembrador - Exterior del restaurante'
                },

                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799977/samples/people/kitchen-bar.jpg',
                    alt: 'Restaurante El Sembrador - Cocina'
                },
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799986/samples/coffee.jpg',
                    alt: 'Restaurante El Sembrador - cultura cafetera'
                }
            ],
            nameRestaurant: 'Restaurante El Sembrador',
            distance: 'Armenia, Quindío - 2.5 km',
            location: 'Ubicado en el corazón de Armenia, cerca al Parque de la Vida. Especializado en cocina tradicional colombiana con ingredientes frescos de la región.',
            icon: '🍽️',
            requirements: {
                hortalizas: ['Lechugas', 'Espinaca', 'Apio'],
                verduras: ['Zanahorias', 'Pepino', 'Rábano'],
                Experiencial: ['Diente de León']
            },
            phone: '+573001234567'
        },
        {
            id: 2,
            images: [
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799977/samples/food/fish-vegetables.jpg',
                    alt: 'Cocina Verde - plato fuerte'
                },
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799986/samples/breakfast.jpg',
                    alt: 'Cocina Verde - desayunos'
                }
            ],
            nameRestaurant: 'Cocina Verde',
            distance: 'Circasia, Quindío - 8.2 km',
            location: 'Restaurante ecológico en Circasia, comprometido con la sostenibilidad. Busca productos orgánicos y de cultivo responsable para sus platos vegetarianos.',
            icon: '🌿',
            requirements: {
                verduras: ['Tomates', 'Cebolla', 'Pimentón'],
                hortalizas: ['Espinaca', 'Acelga'],
                frutas: ['Aguacate', 'Limón'],
                condimentos: ['Cilantro', 'Perejil']
            },
            phone: '+573009876543'
        },
        {
            id: 3,
            images: [
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799976/samples/food/dessert.jpg',
                    alt: 'Casa del Campo - Postre'
                },
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799988/cld-sample-4.jpg',
                    alt: 'Casa del Campo - Ambiente familiar'
                },
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799979/samples/food/spices.jpg',
                    alt: 'Casa del Campo - ingredientes'
                }
            ],
            nameRestaurant: 'Casa del Campo',
            distance: 'Montenegro, Quindío - 12.1 km',
            location: 'Restaurante familiar en Montenegro, famoso por sus platos típicos. Ubicado en la vía principal, busca ingredientes frescos para mantener la tradición culinaria.',
            icon: '🏠',
            requirements: {
                granos: ['Maíz', 'Frijol'],
                tuberculos: ['Papas', 'Yuca'],
                verduras: ['Repollo', 'Pimentón']
            },
            phone: '+573005551234'
        }
    ];

    const toggleView = (mode) => {
        setViewMode(mode);
    };

    return (
        <div className="bg-gradient-to-br from-primary-fifth via-yellow-50 to-orange-50 min-h-screen">
            {/* Main Section Header */}
            <MainSection />
            
            {/* View Toggle */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                    <button
                        onClick={() => toggleView('grid')}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                            viewMode === 'grid'
                                ? 'bg-primary-first text-white shadow-lg transform scale-105'
                                : 'bg-white text-primary-first border-2 border-primary-first hover:bg-primary-first hover:text-white'
                        }`}
                    >
                        📋 Vista en Cuadrícula
                    </button>
                    <button
                        onClick={() => toggleView('list')}
                        className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                            viewMode === 'list'
                                ? 'bg-primary-first text-white shadow-lg transform scale-105'
                                : 'bg-white text-primary-first border-2 border-primary-first hover:bg-primary-first hover:text-white'
                        }`}
                    >
                        📄 Vista Detallada
                    </button>
                </div>

                {/* Restaurants Grid */}
                <div className={`grid gap-8 mb-8 ${
                    viewMode === 'grid' 
                        ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
                        : 'grid-cols-1 max-w-4xl mx-auto'
                }`}>
                    {restaurantsData.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            {...restaurant}
                            viewMode={viewMode}
                        />
                    ))}
                </div>

                {/* Statistics Bar */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-primary-fifth mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-primary-first">24</div>
                            <div className="text-sm text-gray-600 font-primary-brand">Restaurantes Registrados</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-primary-first">156</div>
                            <div className="text-sm text-gray-600 font-primary-brand">Productos Solicitados</div>
                        </div>
                        <div className="space-y-2">
                            <div className="text-3xl font-bold text-primary-first">89</div>
                            <div className="text-sm text-gray-600 font-primary-brand">Ventas Realizadas</div>
                        </div>
                    </div>
                </div>

                {/* Pride Banner */}
                <div className="bg-gradient-to-r from-primary-first to-primary-second text-white text-center py-6 px-4 rounded-2xl">
                    <div className="text-lg font-medium font-primary-brand">
                        "Orgullosos de cultivar para Colombia, unidos por la tierra y la tradición" 🌾
                    </div>
                </div>
            </div>
        </div>
    );
};