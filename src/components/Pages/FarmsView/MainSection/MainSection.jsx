import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

export const MainSection = () => {
    const { t, i18n } = useTranslation(["FarmsView"])
    return (
        <Suspense fallback={<p>Loading translation...</p>}>
        <div className=" text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
                style={{
                backgroundImage: `url('https://res.cloudinary.com/dppf30duk/image/upload/v1755905826/Texturas-03_tjxweh.png')`, // Reemplaza 'textura.png' con el nombre exacto de tu archivo
                backgroundSize: 'cover', // o 'contain' si prefieres que se vea completa
                backgroundRepeat: 'repeat', // o 'no-repeat' si no quieres que se repita
                backgroundPosition: 'center',
                backgroundColor: '#5E5630' // Color de respaldo por si la imagen no carga
            }}>
            
            {/* Elementos decorativos circulares difuminados en el fondo */}
            <div className="absolute top-1/4 left-0 w-32 h-32 bg-primary-fourth rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-primary-sixth rounded-full opacity-20 blur-3xl"></div>
            
            {/* Contenido principal centrado */}
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Encabezado principal con título y subtítulo */}
                <div className="text-center mb-12">
                    {/* Ícono decorativo y título "Campo Directo" */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-title">
                            {t("MainSection.title")}
                        </h1>
                    </div>

                    {/* Subtítulo que refuerza la idea del proyecto */}
                    <div className="text-lg md:text-xl text-primary-fifth font-light font-body">
                        {t("MainSection.subtitle")}
                    </div>
                </div>

                {/* Sección informativa sobre los restaurantes cercanos */}
                <div className="text-center max-w-4xl mx-auto">
                    {/* Título de la sección */}
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-subtitle">
                        {t("MainSection.subtitle_2")}
                    </h2>

                    {/* Descripción explicativa de la funcionalidad o propósito */}
                    <p className="text-lg md:text-xl text-primary-fifth leading-relaxed font-body mb-8">
                        {t("MainSection.p")}
                    </p>
                    
                    {/* Tarjetas informativas destacadas con características del servicio */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        
                        {/* Tarjeta: Conexión directa */}
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                            <div className="text-3xl mb-3">🤝</div>
                            <h3 className="text-lg font-semibold mb-2 font-subtitle">{t("MainSection.card_1.subtitle")}</h3>
                            <p className="text-sm text-primary-fifth font-body">
                                {t("MainSection.card_1.p")}
                            </p>
                        </div>
                        
                        {/* Tarjeta: Radio de 20km */}
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                            <div className="text-3xl mb-3">📍</div>
                            <h3 className="text-lg font-semibold mb-2 font-subtitle">{t("MainSection.card_2.subtitle")}</h3>
                            <p className="text-sm text-primary-fifth font-body">
                                {t("MainSection.card_2.p")}
                            </p>
                        </div>
                        
                        {/* Tarjeta: Productos frescos */}
                        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
                            <div className="text-3xl mb-3">💚</div>
                            <h3 className="text-lg font-semibold mb-2 font-subtitle">{t("MainSection.card_3.subtitle")}</h3>
                            <p className="text-sm text-primary-fifth font-body">
                                {t("MainSection.card_3.p")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Suspense>
    );
};