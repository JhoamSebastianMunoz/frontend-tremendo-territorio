import React from 'react';

export const MainSection = () => {
    return (
        // Contenedor principal con fondo degradado, texto blanco, espaciado y posición relativa
        <div className="bg-gradient-to-br from-primary-first to-primary-second text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            
            {/* Elementos decorativos circulares difuminados en el fondo */}
            <div className="absolute top-1/4 left-0 w-32 h-32 bg-primary-fourth rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-primary-sixth rounded-full opacity-20 blur-3xl"></div>
            
            {/* Contenido principal centrado */}
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Encabezado principal con título y subtítulo */}
                <div className="text-center mb-12">
                    {/* Ícono decorativo y título "Campo Directo" */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="text-5xl">🌾</div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-primary-brand">
                            Campo Directo
                        </h1>
                    </div>

                    {/* Subtítulo que refuerza la idea del proyecto */}
                    <div className="text-lg md:text-xl text-primary-fifth font-light font-primary-brand">
                        Conectando el campo con la mesa
                    </div>
                </div>

                {/* Sección informativa sobre los restaurantes cercanos */}
                <div className="text-center max-w-4xl mx-auto">
                    {/* Título de la sección */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-primary-brand">
                        Restaurantes Cercanos
                    </h2>

                    {/* Descripción explicativa de la funcionalidad o propósito */}
                    <p className="text-lg md:text-xl text-primary-fifth leading-relaxed font-primary-brand mb-8">
                        Encuentra restaurantes en tu zona que buscan productos frescos y cultivados de forma responsable. 
                        Contacta directamente para negociar tus productos agrícolas y crear conexiones duraderas que 
                        beneficien tanto al campo como a la gastronomía local.
                    </p>
                    
                    {/* Tarjetas informativas destacadas con características del servicio */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        
                        {/* Tarjeta: Conexión directa */}
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                            <div className="text-3xl mb-3">🤝</div>
                            <h3 className="text-lg font-semibold mb-2 font-primary-brand">Conexión Directa</h3>
                            <p className="text-sm text-primary-fifth font-primary-brand">
                                Sin intermediarios, negociación directa entre productores y restaurantes
                            </p>
                        </div>
                        
                        {/* Tarjeta: Radio de 20km */}
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                            <div className="text-3xl mb-3">📍</div>
                            <h3 className="text-lg font-semibold mb-2 font-primary-brand">Radio de 20km</h3>
                            <p className="text-sm text-primary-fifth font-primary-brand">
                                Fortalecemos las economías locales priorizando la cercanía
                            </p>
                        </div>
                        
                        {/* Tarjeta: Productos frescos */}
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
