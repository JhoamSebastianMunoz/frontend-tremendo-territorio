import React, { useState, useMemo, useContext, Suspense, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { MainSection } from './MainSection/MainSection';
import { RestaurantCard } from './RestaurantCard/RestaurantCard';
import { GetAdminContext } from '../../../contexts/GetDataAdmin/GetDataAdmin';
import { FarmProfileForm } from './FarmProfileForm/FarmProfileForm';
import { useTranslation } from 'react-i18next';
import { restaurantsService } from '../../../services/restaurantsService';

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
    const { t, i18n } = useTranslation(["FarmsView"]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('requirements');
    const { data, chartData, chartOptions } = useContext(GetAdminContext);
    
    // Estados para manejo de la API
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Datos mock complementarios (mantienen imágenes, requirements, etc.)
    const mockRestaurantsData = [
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
            icon: '🏠',
            requirements: {
                granos: ['Maíz', 'Frijol'],
                tuberculos: ['Papas', 'Yuca'],
                verduras: ['Repollo', 'Pimentón']
            },
            phone: '+573113383510'
        }
    ];

    // Efecto para cargar restaurantes desde la API
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Obtiene el idioma actual de i18next
                const currentLanguage = i18n.language === 'en' ? 'en' : 'es';
                
                // Llama a la API
                const apiRestaurants = await restaurantsService.getAllRestaurants(currentLanguage);
                
                // Si la API retorna datos, adapta combinando API + mock
                if (apiRestaurants && apiRestaurants.length > 0) {
                    const adaptedRestaurants = restaurantsService.adaptRestaurantsData(
                        apiRestaurants, 
                        mockRestaurantsData
                    );
                    setRestaurants(adaptedRestaurants);
                } else {
                    // Si la API no retorna datos, usa el mock directamente
                    console.warn('API sin datos, usando mock');
                    setRestaurants(mockRestaurantsData);
                }
            } catch (err) {
                console.error('Error cargando restaurantes:', err);
                setError(err.message);
                // En caso de error, usa los datos mock con requirements intactos
                setRestaurants(mockRestaurantsData);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, [i18n.language]); // Recarga cuando cambia el idioma

    // Filtrado de restaurantes con búsqueda
    const filteredRestaurants = useMemo(() => {
        if (!searchTerm.trim()) {
            return restaurants;
        }

        const searchLower = searchTerm.toLowerCase().trim();
        
        return restaurants.filter(restaurant => {
            const nameMatch = restaurant.nameRestaurant.toLowerCase().includes(searchLower);
            const locationMatch = restaurant.distance?.toLowerCase().includes(searchLower);
            const descriptionMatch = restaurant.location?.toLowerCase().includes(searchLower);
            
            const productsMatch = restaurant.requirements && 
                Object.values(restaurant.requirements).flat().some(product =>
                    product.toLowerCase().includes(searchLower)
                );
            
            const categoryMatch = restaurant.requirements &&
                Object.keys(restaurant.requirements).some(category =>
                    category.toLowerCase().includes(searchLower)
                );

            return nameMatch || locationMatch || descriptionMatch || productsMatch || categoryMatch;
        });
    }, [searchTerm, restaurants]);

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <Suspense fallback={<p>Loading translation...</p>}>
            <div className="bg-primary-fifth">
                
                {/* Botones de navegación entre pestañas */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center gap-2 flex-wrap px-4 my-6 bg-white rounded-2xl p-2 shadow-lg">
                        {[
                            {id: 'profile', label: t("tab_navigation.div.label_1")},
                            {id: 'statistics', label: t("tab_navigation.div.label_2")},
                            {id: 'requirements', label: t("tab_navigation.div.label_3")}
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
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

                {/* Sección de formulario de perfil del usuario */}
                {activeTab === 'profile' && (
                    <div>
                        <FarmProfileForm/>
                    </div>
                )}

                {/* Sección de estadísticas con gráficas y KPIs */}
                {activeTab === 'statistics' && (
                    <div>
                        <div className="my-4 space-y-8 gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { number: data.restaurantes, label: t("statistics_section.KPI_cards.label_1") },
                                    { number: data.agricultores, label: t("statistics_section.KPI_cards.label_2") },
                                    { number: data.platos, label: t("statistics_section.KPI_cards.label_3") },
                                    { number: data.productos, label: t("statistics_section.KPI_cards.label_4") }
                                ].map((kpi, index) => (
                                    <div key={index} className="bg-white bg-opacity-95 font-subtitle backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:transform hover:-translate-y-2 transition-all duration-300 text-center relative overflow-hidden">
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-first to-primary-second"></div>
                                        <div className="text-5xl font-extrabold font-subtitle mb-3 bg-gradient-to-r from-primary-first to-primary-second bg-clip-text text-transparent">
                                            {kpi.number}
                                        </div>
                                        <div className="text-gray-600 font-semibold text-lg font-subtitle">
                                            {kpi.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='flex justify-center items-center'>
                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 m-4">
                                <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:transform hover:-translate-y-2 transition-all duration-300">
                                    <h3 className="text-2xl font-bold mb-6 text-gray-800 font-subtitle">📈 {t("statistics_section.doughnut")}</h3>
                                    <div className="h-80">
                                        <Doughnut data={chartData} options={chartOptions} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Sección de requerimientos de restaurantes */}
                {activeTab === 'requirements' && (
                    <div>
                        <div className="max-w-7xl mt-4 mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                            
                            {/* Indicador de carga */}
                            {loading && (
                                <div className="text-center py-12">
                                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-first"></div>
                                    <p className="mt-4 text-primary-first font-medium">Cargando restaurantes...</p>
                                </div>
                            )}

                            {/* Mensaje de error (opcional, usa mock como fallback) */}
                            {error && !loading && (
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-yellow-700">
                                                No se pudo conectar con la API. Mostrando datos de ejemplo.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!loading && (
                                <>
                                    {/* Input de búsqueda */}
                                    <div className="flex flex-col gap-4 mb-8">
                                        <div className="relative max-w-2xl mx-auto w-full">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder={t("requirements_section.input.placeholder")}
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="w-full font-body px-6 py-4 pl-14 pr-12 rounded-full border-2 border-primary-fifth focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300 text-gray-700 placeholder-gray-500 shadow-lg bg-white"
                                                />
                                                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-first text-xl">
                                                    🔍
                                                </div>
                                                {searchTerm && (
                                                    <button
                                                        onClick={clearSearch}
                                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-body hover:text-primary-first transition-colors duration-200 text-xl"
                                                    >
                                                        ✕
                                                    </button>
                                                )}
                                            </div>
                                            
                                            <div className="text-center mt-3">
                                                <span className="text-primary-first font-medium font-body">
                                                    {filteredRestaurants.length === restaurants.length
                                                        ? `${t("requirements_section.filteredRestaurants.isFilteredRestaurants_1")} ${restaurants.length} ${t("requirements_section.filteredRestaurants.isFilteredRestaurants_2")}`
                                                        : `${filteredRestaurants.length} ${t("requirements_section.filteredRestaurants.not_isFilteredRestaurants_1")} ${restaurants.length} ${t("requirements_section.filteredRestaurants.not_isFilteredRestaurants_2")}`
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mensaje si no se encuentran resultados */}
                                    {filteredRestaurants.length === 0 && searchTerm && (
                                        <div className="text-center py-12">
                                            <div className="text-6xl mb-4">🔍</div>
                                            <h3 className="text-2xl font-bold text-primary-first mb-2 font-body">
                                                {t("requirements_section.not_isFilteredRestaurants.subtitle")}
                                            </h3>
                                            <p className="text-gray-600 font-body mb-4">
                                                {t("requirements_section.not_isFilteredRestaurants.p")} "{searchTerm}"
                                            </p>
                                            <button
                                                onClick={clearSearch}
                                                className="bg-primary-first hover:bg-primary-third text-white px-6 py-3 rounded-full font-medium transition-all duration-300 font-body"
                                            >
                                                {t("requirements_section.search_button")}
                                            </button>
                                        </div>
                                    )}

                                    {/* Muestra las tarjetas de los restaurantes filtrados */}
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

                                    {/* Frase de cierre */}
                                    <div className="bg-gradient-to-r from-primary-first to-primary-second text-white text-center py-6 px-4 rounded-2xl"
                                        style={{
                                            backgroundImage: `url('https://res.cloudinary.com/dppf30duk/image/upload/v1755905826/Texturas-03_tjxweh.png')`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'repeat',
                                            backgroundPosition: 'center',
                                            backgroundColor: '#5E5630'
                                        }}
                                    >
                                        <div className="text-lg font-medium font-body">
                                            {t("div")} 🌾
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <MainSection />
            </div>
        </Suspense>
    );
};