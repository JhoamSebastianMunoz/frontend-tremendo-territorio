import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';


export const OurObjectives = () => {
    const {t, i18n } = useTranslation(["Home"]);

    return (
        <Suspense fallback={<p>loading translation...</p>}>
        <div className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-orange-50 py-16 px-8"
        style={{
            backgroundImage: `url('https://res.cloudinary.com/dppf30duk/image/upload/v1755905827/Texturas-01_at6bal.png')`, // Reemplaza 'textura.png' con el nombre exacto de tu archivo
            backgroundSize: 'cover', // o 'contain' si prefieres que se vea completa
            backgroundRepeat: 'repeat', // o 'no-repeat' si no quieres que se repita
            backgroundPosition: 'center',
            backgroundColor: '#5E5630' // Color de respaldo por si la imagen no carga
        }}>
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl lg:text-5xl font-bold font-subtitle text-primary-first mb-8">
                            {t("OurObjectives.title")}
                        </h2>
                        
                        <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-body text-justify">
                            <p>
                                {t("OurObjectives.p1")}
                            </p>

                            <p>
                                {t("OurObjectives.p2")}
                            </p>

                            <p>
                                {t("OurObjectives.p3")}
                            </p>
                            
                            <p>
                                {t("OurObjectives.p4")}
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                            <img 
                                src="https://res.cloudinary.com/dppf30duk/image/upload/v1755647582/tremendo-territorio_htvjhj.jpg" 
                                alt={t("OurObjectives.img.alt")}
                                className="w-full h-96 object-cover"
                            />
                        </div>
                        
                        {/* Elementos decorativos usando colores del brand */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-fifth rounded-full opacity-50 blur-xl"></div>
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary-fourth rounded-full opacity-30 blur-xl"></div>
                    </div>
                </div>
            </div>
        </div>
        </Suspense>
    );
};