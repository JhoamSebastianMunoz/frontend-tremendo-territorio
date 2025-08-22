import { RestaurantProfileForm } from './RestaurantProfileForm/RestaurantProfileForm'
import React, { useState, useMemo, useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { MainSection } from './MainSection/MainSection'
import { FarmCard } from './FarmCard/FarmCard'
import { GetAdminContext } from '../../../contexts/GetDataAdmin/GetDataAdmin'

// Componente que resalta texto coincidente con el término de búsqueda
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
    // Estado que gestiona la pestaña activa (perfil, estadísticas u ofertas)
    const [activeTab, setActiveTab] = useState('offers')

    // Estado que almacena el término de búsqueda ingresado por el usuario
    const [searchTerm, setSearchTerm] = useState('');

    // Obtiene los datos del contexto del administrador (datos, gráfico y opciones del gráfico)
    const { data, chartData, chartOptions } = useContext(GetAdminContext)
    
    // Datos simulados de fincas/agricultores
    const farmsData = [
        {
            id: 1,
            images: [
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1751500396/campo-tremendo-territorio_ukcrnr.jpg',
                    alt: 'finca 1 Barichara'
                },
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1754010244/finca3_vny8ua.jpg',
                    alt: 'finca 1 Barichara img 2'
                },
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1754010243/finca6_vpizxa.jpg',
                    alt: 'finca 1 Barichara img 3'
                }
            ],
            nameFarm: 'Juan De Dios Herrera',
            distance: 'vereda Carare, km 10.2-Barichara',
            qualificationAverage: '4.9',
            location: 'finca Aromas del Campo, Finca enfocada en el cultivo de frijoles, donde se cuidan cada etapa del proceso para ofrecer granos de excelente calidad, esenciales en la alimentación tradicional y saludable.',
            icon: '🌾',
            offers: {
                legumbre: ['frijol'],
            },
            phone: '+573232967700',
        },
        {
            id: 2,
            images: [
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1754010244/finca4_j97aby.jpg',
                    alt: 'Finca 2 Barichara'
                },
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1754010244/finca1_r0wyty.jpg',
                    alt: 'Finca 2 Barichara img 2'
                }
            ],
            nameFarm: 'Marta Lucia Cardona',
            distance: 'vereda Arbolito, km 4.2 -Barichara',
            qualificationAverage: '4.7',
            location: 'Finca La Piedra Viva, Finca especializada en el cultivo de maíz, comprometida con prácticas agrícolas responsables para ofrecer cosechas frescas y nutritivas que apoyan la seguridad alimentaria local. ',
            icon: '🌿',
            offers: {
                grano: ['Maíz'],
            },
            phone: '+573116957990',
        },
        {
            id: 3,
            images: [
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1754010244/finca5_socla6.jpg',
                    alt: 'Finca 3 Barichara'
                },
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1754010244/finca2_rkna0k.jpg',
                    alt: 'Finca 3 Barichara img 2'
                },
                {
                    url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799978/samples/bike.jpg',
                    alt: 'Finca 3 Barichara img 3'
                }
            ],
            nameFarm: 'Eliecer Coronado',
            distance: 'vereda butaregua, km 11.2-Barichara',
            qualificationAverage: '4.0',
            location: 'Finca Mirador del Sol, Finca dedicada al cultivo de yuca, donde se trabaja con técnicas sostenibles para obtener raíces de alta calidad, promoviendo la agricultura local y el desarrollo rural.',
            icon: '🏠',
            offers: {
                granos: ['Maíz'],
                tuberculos: ['Yuca'],
            },
            phone: '+573113383510',
        }
    ];

    // Filtra las fincas según el término de búsqueda ingresado
    const filteredFarms = useMemo(() => {
        if (!searchTerm.trim()) {
            return farmsData;
        }

        const searchLower = searchTerm.toLowerCase().trim();
        
        return farmsData.filter(farm => {
            // Buscar por nombre del agricultor
            const nameMatch = farm.nameFarm.toLowerCase().includes(searchLower);
            
            // Buscar por ubicación
            const locationMatch = farm.distance.toLowerCase().includes(searchLower);
            
            // Buscar por productos requeridos
            const productsMatch = Object.values(farm.offers).flat().some(product => 
                product.toLowerCase().includes(searchLower)
            );
            
            // Buscar por categorías de productos
            const categoryMatch = Object.keys(farm.offers).some(category => 
                category.toLowerCase().includes(searchLower)
            );

            return nameMatch || locationMatch || productsMatch || categoryMatch;
        });
    }, [searchTerm, farmsData]);

    // Limpia el término de búsqueda
    const clearSearch = () => {
        setSearchTerm('');
    };
    
    return (
        <div className='bg-gradient-to-br from-primary-fifth via-yellow-50 to-orange-50 min-h-screen'>
            {/* Renderiza la sección principal (título, presentación, etc.) */}
            <MainSection/>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navegación por pestañas */}
                <div className="flex justify-center gap-2 flex-wrap px-4 my-6 bg-white rounded-2xl p-2 shadow-lg">
                    {[
                        {id: 'profile', label:'Datos del Usuario'},
                        {id: 'statistics', label: 'Estadísticas'},
                        {id: 'offers', label: 'Ofertas de Agricultores'}
                    ].map(tab =>(
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 min-w-32 py-3 px-4 rounded-xl font-medium font-subtitle transition-all duration-300 ${
                                activeTab === tab.id
                                    ? 'bg-primary-first text-white shadow-lg transform scale-105'
                                    : 'text-gray-600 hover:bg-gray-100'
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
                            {/* Tarjetas de métricas clave */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {[
                                    { number: data.restaurantes, label: 'Restaurantes Registrados' },
                                    { number: data.agricultores, label: 'Agricultores Activos' },
                                    { number: data.platos, label: 'Platos con Trazabilidad' },
                                    { number: data.productos, label: 'Productos Disponibles' }
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

                        {/* Gráfico de productos en oferta */}
                        <div className='flex justify-center items-center'>
                            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 m-4">
                                <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:transform hover:-translate-y-2 transition-all duration-300">
                                    <h3 className="text-2xl font-bold mb-6 text-gray-800 font-subtitle">📈 Productos en Oferta</h3>
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
                        {/* Input de búsqueda */}
                        <div className="mt-4 pb-8">
                            <div className="flex flex-col gap-4 mb-8">
                                <div className="relative max-w-2xl mx-auto w-full">
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            placeholder='Buscar por agricultor, ubicación o productos(ej: Frijol, Maíz, Yuca...) '
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
                                    
                                    {/* Conteo de resultados */}
                                    <div className="text-center mt-3">
                                        <span className="text-primary-first font-medium font-body">
                                            {filteredFarms.length === farmsData.length 
                                                ? `Mostrando ${farmsData.length} Agricultores`
                                                : `${filteredFarms.length} de ${farmsData.length} Agricultores encontrados`
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Mensaje si no hay coincidencias */}
                            {filteredFarms.length === 0 && searchTerm && (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-2xl font-bold text-primary-first mb-2 font-body">
                                        No se encontraron resultados
                                    </h3>
                                    <p className="text-gray-600 font-body mb-4">
                                        No encontramos agricultores que coincidan con "{searchTerm}"
                                    </p>
                                    <button
                                        onClick={clearSearch}
                                        className="bg-primary-first hover:bg-primary-third text-white px-6 py-3 rounded-full font-medium transition-all duration-300 font-primary-brand"
                                    >
                                        Ver todos los agricultores
                                    </button>
                                </div>
                            )}

                            {/* Renderizado de tarjetas de agricultores */}
                            {filteredFarms.length > 0 && (
                                <div className="grid gap-8 mb-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                                    {filteredFarms.map((farm) => (
                                        <FarmCard
                                            key={farm.id}
                                            {...farm}
                                            searchTerm={searchTerm}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Banner final de orgullo agrícola */}
                            <div className=" text-white text-center py-6 px-4 rounded-2xl"
                            style={{
                                backgroundImage: `url('https://res.cloudinary.com/dppf30duk/image/upload/v1755905826/Texturas-02_azkfwr.png')`, // Reemplaza 'textura.png' con el nombre exacto de tu archivo
                                backgroundSize: 'cover', // o 'contain' si prefieres que se vea completa
                                backgroundRepeat: 'repeat', // o 'no-repeat' si no quieres que se repita
                                backgroundPosition: 'center',
                                backgroundColor: '#5E5630' // Color de respaldo por si la imagen no carga
                            }}>
                                <div className="text-lg font-medium font-body">
                                    "Orgullosos de cultivar para Colombia, unidos por la tierra y la tradición" 🌾
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
