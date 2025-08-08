import React from 'react';

export const MainSection = () => {
    return (
        // Contenedor principal con fondo degradado y estilos generales
        <div className="bg-gradient-to-br from-primary-first to-primary-second text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            
            {/* Elementos decorativos: círculos desenfocados que se ubican en el fondo */}
            <div className="absolute top-1/4 left-0 w-32 h-32 bg-primary-fourth rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-primary-sixth rounded-full opacity-20 blur-3xl"></div>
            
            {/* Contenido principal con centrado y límites de ancho */}
            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Encabezado principal con ícono y título */}
                <div className="text-center mb-12">
                    {/* Línea que contiene el ícono y el nombre de la aplicación */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="text-5xl">🌾</div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-primary-brand">
                            Campo Directo
                        </h1>
                    </div>
                    
                    {/* Subtítulo descriptivo */}
                    <div className="text-lg md:text-xl text-primary-fifth font-light font-primary-brand">
                        Conectando el campo con la mesa
                    </div>
                </div>

                {/* Sección descriptiva informativa central */}
                <div className="text-center max-w-4xl mx-auto">
                    {/* Título de la sección informativa */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-primary-brand">
                        Agricultores Cercanos
                    </h2>

                    {/* Descripción del propósito de la plataforma */}
                    <p className="text-lg md:text-xl text-primary-fifth leading-relaxed font-primary-brand mb-8">
                        Encuentra agricultores en tu zona que disponen de productos frescos y cultivados de forma responsable. 
                        Contacta directamente para negociar los productos agrícolas y crear conexiones duraderas que 
                        beneficien tanto al campo como a la gastronomía local.
                    </p>
                    
                    {/* Tres bloques destacados con beneficios o características */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

                        {/* Primer bloque: conexión directa */}
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                            <div className="text-3xl mb-3">🤝</div>
                            <h3 className="text-lg font-semibold mb-2 font-primary-brand">Conexión Directa</h3>
                            <p className="text-sm text-primary-fifth font-primary-brand">
                                Sin intermediarios, negociación directa entre productores y restaurantes
                            </p>
                        </div>
                        
                        {/* Segundo bloque: enfoque local */}
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                            <div className="text-3xl mb-3">📍</div>
                            <h3 className="text-lg font-semibold mb-2 font-primary-brand">Radio de 20km</h3>
                            <p className="text-sm text-primary-fifth font-primary-brand">
                                Fortalecemos las economías locales priorizando la cercanía
                            </p>
                        </div>
                        
                        {/* Tercer bloque: productos frescos */}
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                            <div className="text-3xl mb-3">💚</div>
                            <h3 className="text-lg font-semibold mb-2 font-primary-brand">Productos Frescos</h3>
                            <p className="text-sm text-primary-fifth font-primary-brand">
                                Calidad garantizada directamente desde el campo a tu cocina
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
