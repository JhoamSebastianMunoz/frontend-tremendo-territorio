import React, { useState, useMemo, useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { MainSection } from './MainSection/MainSection';
import { RestaurantCard } from './RestaurantCard/RestaurantCard';
import { GetAdminContext } from '../../../contexts/GetDataAdmin/GetDataAdmin'
import { FarmProfileForm } from './FarmProfileForm/FarmProfileForm'

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
    const [ activeTab, setActiveTab ] = useState('requirements')
    const { data, 
            chartData,
            chartOptions } = useContext(GetAdminContext)

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
            nameRestaurant: 'El Puntal',
            distance: 'Carrera 6 # 6-13, Barichara',
            location: 'Deliciosa comida típica, rescatando los sabores ancestrales de Barichara y Santander. Está ubicada a pocos metros del Parque Principal de Barichara, uno de los puntos más conocidos del municipio. Se encuentra en una zona central y tranquila, rodeada de calles empedradas y casas coloniales típicas del pueblo.',
            icon: '🍽️',
            requirements: {
                hortalizas: ['Lechugas', 'Espinaca', 'Apio'],
                legumbre: ['Yuca'],
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
            nameRestaurant: 'Noa Light Food',
            distance: 'Carrera 7 N 6 -34, Barichara',
            location: 'Noa Light Food es un espacio creado con todo el cariño para disfrutar de las bondades de nuestras preparaciones, que no solo nutren el cuerpo, sino también el espíritu. Nuestro menú se centra en preparaciones vegetarianas, complementadas con proteínas al gusto, elaboradas con ingredientes frescos de este hermoso entorno y de temporada.',
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
            nameRestaurant: 'El Bodegón de Toñita',
            distance: 'Carrera 7 # 5-63 Plazuela de la Catedral, Barichara',
            location: 'ubicados en la plazuela de la catedral y deleitarse con los exquisitos frappe, granizados, jugos naturales, helados y los deliciosos tostones con pollo y maíz, sándwich y hamburguesas. Y por supuesto el mejor sitio para tomarse un buen vino, una cerveza o el trago de tu preferencia !!',
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
        {/*sección principal */}
            <MainSection />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center gap-2 flex-wrap px-4 my-6 bg-white rounded-2xl p-2 shadow-lg">
                {[
                    {id: 'profile', label: 'Datos del Usuario'},
                    {id: 'statistics', label: 'Estadísticas'},
                    {id: 'requirements', label: 'Requerimientos de Restaurantes'}
                ].map(tab =>(
                    <button
                        key={tab.id}
                        onClick={() =>setActiveTab(tab.id)}
                        className={`flex-1 min-w-32 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                            activeTab === tab.id
                            ? 'bg-primary-first text-white shadow-lg transform scale-105'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <span>{tab.label}</span>
                    </button>
                ))}
                </div>
            </div>
            
            {activeTab === 'profile' &&(
                <div>
                    {/*Sección de la información por editar del usuario */}
                    <FarmProfileForm/>
                </div>
            )}

            {activeTab === 'statistics' &&(
            <div>
                {/* Dashboard Principal */}
                <div className=" my-4 space-y-8 gap-4">
                {/* KPI Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                        { number: data.restaurantes, label: 'Restaurantes Registrados' },
                        { number: data.agricultores, label: 'Agricultores Activos' },
                        { number: data.platos, label: 'Platos con Trazabilidad' },
                        { number: data.productos, label: 'Productos Disponibles' }
                        ].map((kpi, index) => (
                        <div key={index} className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:transform hover:-translate-y-2 transition-all duration-300 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-first to-primary-second">
                            </div>
                            <div className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-primary-first to-primary-second bg-clip-text text-transparent">
                                {kpi.number}
                            </div>
                            <div className="text-gray-600 font-semibold text-lg font-primary-brand">
                                {kpi.label}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                {/* Charts and Map */}
                <div className='flex justify-center items-center' >
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 m-4">
                        <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:transform hover:-translate-y-2 transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-6 text-gray-800 font-primary-brand">📈 Productos en Demanda</h3>
                            <div className="h-80">
                                <Doughnut data={chartData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}

            {activeTab === 'requirements' &&(
            <div>
                {/*Busqueda y filtro de la sección */}
                <div className="max-w-7xl mt-4 mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    {/*Input de busqueda */}
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

                    {/* Pride Banner */}
                    <div className="bg-gradient-to-r from-primary-first to-primary-second text-white text-center py-6 px-4 rounded-2xl">
                        <div className="text-lg font-medium font-primary-brand">
                            "Orgullosos de cultivar para Colombia, unidos por la tierra y la tradición" 🌾
                        </div>
                    </div>
                </div>
            </div>
            )}

        </div>
    );
};