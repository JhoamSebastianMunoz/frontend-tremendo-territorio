import React from 'react';

export const OurObjectives = () => {
    return (
        <div className="bg-gradient-to-br from-yellow-100 via-yellow-50 to-orange-50 py-16 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl lg:text-5xl font-bold font-subtitle text-primary-first mb-8">
                            Nuestros Objetivos
                        </h2>
                        
                        <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-body">
                            <p>
                                Impulsamos el aprendizaje sobre cultivos y territorios, conectando a campesinos con consumidores y gestionando sus saberes.
                            </p>

                            <p>
                                Recogemos historias de cambio y aprendizaje para visibilizar la vida en el campo y fomentar la autonomía campesina.
                            </p>

                            <p>
                                Facilitamos encuentros para la asociatividad entre cultivadores y restaurantes.
                            </p>
                            
                            <p>
                                Trabajamos por la dignidad del campesinado mediante la reducción de intermediarios y la medición del impacto de su labor.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
                            <img 
                                src="https://res.cloudinary.com/dppf30duk/image/upload/v1755647582/tremendo-territorio_htvjhj.jpg" 
                                alt="Manos plantando en la tierra - agricultura sostenible"
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
    );
};