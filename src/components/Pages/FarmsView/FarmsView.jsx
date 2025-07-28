import React, { useState, useMemo } from 'react';
import { MainSection } from './MainSection/MainSection';
import { RestaurantCard } from './RestaurantCard/RestaurantCard';

// Componente para resaltar términos de búsqueda
const HighlightText = ({ text, highlight }) => {
    if (!highlight.trim()) {
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

export const FarmsView = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const restaurantsData = [
        {
            id: 1,
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
            phone: '+573232967700'
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
            phone: '+573116957990'
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
            phone: '+573113383510'
        }
    ];

    // Función para filtrar restaurantes
    const filteredRestaurants = useMemo(() => {
        if (!searchTerm.trim()) {
            return restaurantsData;
        }

        const searchLower = searchTerm.toLowerCase().trim();
        
        return restaurantsData.filter(restaurant => {
            // Buscar por nombre del restaurante
            const nameMatch = restaurant.nameRestaurant.toLowerCase().includes(searchLower);
            
            // Buscar por ubicación
            const locationMatch = restaurant.distance.toLowerCase().includes(searchLower);
            
            // Buscar por productos requeridos
            const productsMatch = Object.values(restaurant.requirements).flat().some(product => 
                product.toLowerCase().includes(searchLower)
            );
            
            // Buscar por categorías de productos
            const categoryMatch = Object.keys(restaurant.requirements).some(category => 
                category.toLowerCase().includes(searchLower)
            );

            return nameMatch || locationMatch || productsMatch || categoryMatch;
        });
    }, [searchTerm, restaurantsData]);

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <div className="bg-gradient-to-br from-primary-fifth via-yellow-50 to-orange-50 min-h-screen">
            {/* Main Section Header */}
            <MainSection />
           
            {/* Search and Filter Section */}
            <div className="max-w-7xl mt-4 mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                {/* Search Input */}
                <div className="flex flex-col gap-4 mb-8">
                    <div className="relative max-w-2xl mx-auto w-full">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar por restaurante, ubicación o productos (ej: Lechugas, Tomates, El Sembrador...)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-6 py-4 pl-14 pr-12 rounded-full border-2 border-primary-fifth focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg bg-white font-primary-brand"
                            />
                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-first text-xl">
                                🔍
                            </div>
                            {searchTerm && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-first transition-colors duration-200 text-xl"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                        
                        {/* Search Results Counter */}
                        <div className="text-center mt-3">
                            <span className="text-primary-first font-medium font-primary-brand">
                                {filteredRestaurants.length === restaurantsData.length 
                                    ? `Mostrando ${restaurantsData.length} restaurantes`
                                    : `${filteredRestaurants.length} de ${restaurantsData.length} restaurantes encontrados`
                                }
                            </span>
                        </div>
                    </div>
                </div>

                {/* No Results Message */}
                {filteredRestaurants.length === 0 && searchTerm && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-primary-first mb-2 font-primary-brand">
                            No se encontraron resultados
                        </h3>
                        <p className="text-gray-600 font-primary-brand mb-4">
                            No encontramos restaurantes que coincidan con "{searchTerm}"
                        </p>
                        <button
                            onClick={clearSearch}
                            className="bg-primary-first hover:bg-primary-third text-white px-6 py-3 rounded-full font-medium transition-all duration-300 font-primary-brand"
                        >
                            Ver todos los restaurantes
                        </button>
                    </div>
                )}

                {/* Restaurants Grid */}
                {filteredRestaurants.length > 0 && (
                    <div className="grid gap-8 mb-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                        {filteredRestaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.id}
                                {...restaurant}
                                searchTerm={searchTerm}
                            />
                        ))}
                    </div>
                )}

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