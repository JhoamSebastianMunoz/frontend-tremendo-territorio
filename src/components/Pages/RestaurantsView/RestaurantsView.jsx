import React, { useState, useMemo, useContext, Suspense, useEffect } from 'react';
import { RestaurantProfileForm } from './RestaurantProfileForm/RestaurantProfileForm';
import { Doughnut } from 'react-chartjs-2';
import { MainSection } from './MainSection/MainSection';
import { FarmCard } from './FarmCard/FarmCard';
import { GetAdminContext } from '../../../contexts/GetDataAdmin/GetDataAdmin';
import { useTranslation } from 'react-i18next';

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

export const RestaurantsView = () => {
    const { t, i18n } = useTranslation(["RestaurantsView"]);
    const [activeTab, setActiveTab] = useState('offers');
    const [searchTerm, setSearchTerm] = useState('');
    const { data, chartData, chartOptions } = useContext(GetAdminContext);
    
    // Estados para manejar los datos del API
    const [farmsData, setFarmsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener ícono según descripción
    const getIconByDescription = (description) => {
        const lowerDesc = description.toLowerCase();
        if (lowerDesc.includes('frijol') || lowerDesc.includes('legumbre')) return '🌾';
        if (lowerDesc.includes('maíz') || lowerDesc.includes('grano')) return '🌿';
        if (lowerDesc.includes('yuca') || lowerDesc.includes('tubérculo')) return '🏠';
        return '🌱';
    };

    // Función para extraer ofertas de la descripción
    const extractOffersFromDescription = (description) => {
        const lowerDesc = description.toLowerCase();
        const offers = {};

        if (lowerDesc.includes('frijol')) {
            offers.legumbre = ['Frijol'];
        }
        if (lowerDesc.includes('maíz')) {
            offers.grano = ['Maíz'];
        }
        if (lowerDesc.includes('yuca')) {
            offers.tuberculos = ['Yuca'];
        }

        if (Object.keys(offers).length === 0) {
            offers.granos = ['Producto agrícola'];
        }

        return offers;
    };

    // Función para mapear teléfonos (datos mock)
    const getPhoneByUserId = (userId) => {
        const phones = {
            2: '+573113383510',
            6: '+573232967700',
            7: '+573116957990'
        };
        return phones[userId] || '+573001234567';
    };

    // useEffect para obtener datos del API
    useEffect(() => {
        const fetchFarms = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const language = i18n.language === 'en' ? 'en' : 'es';
                
                const response = await fetch(
                    'https://secuencia432-tremendoterritorio-production.up.railway.app/api/get-all-farms',
                    {
                        headers: {
                            'Accept': 'application/json',
                            'Accept-Language': language
                        }
                    }
                );
                if (!response.ok) {
                    throw new Error('Error al obtener las fincas');
                }
                const apiData = await response.json();
                
                // Mapear datos del API a la estructura del componente
                const mappedFarms = apiData.map((farm, index) => ({
                    id: farm.farm_id,
                    images: farm.images && farm.images.length > 0 
                        ? farm.images.map((img, imgIndex) => ({
                            url: img.url || img,
                            alt: `${farm.farm_name} - Imagen ${imgIndex + 1}`
                        }))
                        : [
                            {
                                url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1751500396/campo-tremendo-territorio_ukcrnr.jpg',
                                alt: `${farm.farm_name} - Imagen por defecto`
                            },
                            {
                                url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1754010244/finca1_r0wyty.jpg',
                                alt: `${farm.farm_name} - Imagen por defecto`
                            }
                        ],
                    nameFarm: farm.user?.first_name 
                        ? `${farm.user.first_name}${farm.user.last_name ? ' ' + farm.user.last_name : ''}`
                        : farm.farm_name,
                    distance: farm.location,
                    qualificationAverage: '4.5',
                    location: farm.description,
                    icon: getIconByDescription(farm.description),
                    offers: extractOffersFromDescription(farm.description),
                    phone: getPhoneByUserId(farm.user?.id)
                }));

                setFarmsData(mappedFarms);
            } catch (err) {
                console.error('Error fetching farms:', err);
                setError(err.message);
                // En caso de error, usar datos mock como fallback
                setFarmsData([
                    {
                        id: 1,
                        images: [
                            {
                                url:  'https://res.cloudinary.com/dppf30duk/image/upload/v1751500396/campo-tremendo-territorio_ukcrnr.jpg',
                                    
                                alt: 'finca 1 Barichara'
                            }
                        ],
                        nameFarm: 'Juan De Dios Herrera',
                        distance: 'vereda Carare, km 10.2-Barichara',
                        qualificationAverage: '4.9',
                        location: 'finca Aromas del Campo, Finca enfocada en el cultivo de frijoles',
                        icon: '🌾',
                        offers: {
                            legumbre: ['frijol'],
                        },
                        phone: '+573232967700',
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchFarms();
    }, [i18n.language]);

    // Filtra las fincas según el término de búsqueda
    const filteredFarms = useMemo(() => {
        if (!searchTerm.trim()) {
            return farmsData;
        }
        const searchLower = searchTerm.toLowerCase().trim();
        
        return farmsData.filter(farm => {
            const nameMatch = farm.nameFarm.toLowerCase().includes(searchLower);
            const locationMatch = farm.distance.toLowerCase().includes(searchLower);
            const productsMatch = Object.values(farm.offers).flat().some(product =>
                product.toLowerCase().includes(searchLower)
            );
            const categoryMatch = Object.keys(farm.offers).some(category =>
                category.toLowerCase().includes(searchLower)
            );
            return nameMatch || locationMatch || productsMatch || categoryMatch;
        });
    }, [searchTerm, farmsData]);

    const clearSearch = () => {
        setSearchTerm('');
    };
    
    return (
        <Suspense fallback={<p>Loading translation...</p>}>
        <div className='bg-primary-fifth'>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navegación por pestañas */}
                <div className="flex justify-center gap-2 flex-wrap px-4 my-6 bg-white rounded-2xl p-2 shadow-lg">
                    {[
                        {id: 'profile', label: t("tab_navigation.div.label_1")},
                        {id: 'statistics', label: t("tab_navigation.div.label_2")},
                        {id: 'offers', label: t("tab_navigation.div.label_3")}
                    ].map(tab =>(
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 min-w-32 py-3 px-4 rounded-xl font-medium font-subtitle transition-all duration-300 ${
                                activeTab === tab.id
                                    ? 'bg-primary-second font-body text-white shadow-lg transform scale-105'
                                    : 'text-gray-600 hover:bg-primary-sixth'
                            }`}
                        >
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Sección: Datos del perfil */}
                {activeTab === 'profile' && (
                    <div>
                        <RestaurantProfileForm/>
                    </div>
                )}

                {/* Sección: Estadísticas y KPIs */}
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
                                    <div key={index} className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:transform hover:-translate-y-2 transition-all duration-300 text-center relative overflow-hidden">
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

                {/* Sección: Ofertas de Agricultores */}
                {activeTab === 'offers' && (
                    <div>
                        <div className="mt-4 pb-8">
                            <div className="flex flex-col gap-4 mb-8">
                                <div className="relative max-w-2xl mx-auto w-full">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder={t("requirements_section.input.placeholder")}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full px-6 py-4 pl-14 pr-12 rounded-full border-2 border-primary-fifth focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300 text-gray-700 font-body placeholder-gray-500 shadow-lg bg-white font-primary-brand"
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
                                    
                                    {/* Estado de carga */}
                                    {loading && (
                                        <div className="text-center mt-3">
                                            <span className="text-primary-first font-medium font-body">
                                                {t("requirements_section.loading.loading")}
                                            </span>
                                        </div>
                                    )}

                                    {/* Estado de error */}
                                    {error && (
                                        <div className="text-center mt-3">
                                            <span className="text-orange-600 font-medium font-body text-sm">
                                                ⚠️ {t("requirements_section.loading.error")} - {error}
                                            </span>
                                        </div>
                                    )}

                                    {/* Conteo de resultados */}
                                    {!loading && (
                                        <div className="text-center mt-3">
                                            <span className="text-primary-first font-medium font-body">
                                                {filteredFarms.length === farmsData.length
                                                    ? `${t("requirements_section.filteredFarms.isFilteredFarms_1")} ${farmsData.length} ${t("requirements_section.filteredFarms.isFilteredFarms_2")}`
                                                    : `${filteredFarms.length} ${t("requirements_section.filteredFarms.not_isFilteredFarms_1")} ${farmsData.length} ${t("requirements_section.filteredFarms.not_isFilteredFarms_2")}`
                                                }
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Mensaje si no hay coincidencias */}
                            {!loading && filteredFarms.length === 0 && searchTerm && (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-2xl font-bold text-primary-first mb-2 font-body">
                                        {t("requirements_section.not_isFilteredFarm.subtitle")}
                                    </h3>
                                    <p className="text-gray-600 font-body mb-4">
                                        {t("requirements_section.not_isFilteredFarm.p")} "{searchTerm}"
                                    </p>
                                    <button
                                        onClick={clearSearch}
                                        className="bg-primary-first hover:bg-primary-third text-white px-6 py-3 rounded-full font-medium transition-all duration-300 font-primary-brand"
                                    >
                                        {t("requirements_section.search_button")}
                                    </button>
                                </div>
                            )}

                            {/* Renderizado de tarjetas de agricultores */}
                            {!loading && filteredFarms.length > 0 && (
                                <div className="grid gap-8 mb-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 bg-primary-fifth">
                                    {filteredFarms.map((farm) => (
                                        <FarmCard
                                            key={farm.id}
                                            {...farm}
                                            searchTerm={searchTerm}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Banner final */}
                            <div className="text-white text-center py-6 px-4 rounded-2xl"
                            style={{
                                backgroundImage: `url('https://res.cloudinary.com/dppf30duk/image/upload/v1755905826/Texturas-02_azkfwr.png')`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'repeat',
                                backgroundPosition: 'center',
                                backgroundColor: '#5E5630'
                            }}>
                                <div className="text-lg font-medium font-body">
                                    {t("div")} 🌾
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <MainSection/>
        </div>
        </Suspense>
    );
};