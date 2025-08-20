import React from 'react';
import { CardOurValues } from './CardOurValues';
import CardOurValues2 from './CardOurValues2';

export const OurValues = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto principal */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-first leading-tight font-subtitle">
              El Valor de Nuestro Territorio
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed font-body">
              Cada producto tiene una historia que contar. Desde las montañas de los Andes 
              hasta los valles fértiles, nuestros campesinos no sólo cultivan alimentos, sino 
              cultura, tradición y vida.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed font-body">
              En Tremendo Territorio, cada bocado de comida viene con la historia completa: quién 
              la cultivó, cómo la cultivó, y por qué es especial. Porque cuando sabes de dónde 
              viene tu comida, cada bocado sabe mejor.
            </p>
          </div>

          {/* Botón destacado */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-gradient-to-r from-primary-first to-primary-first rounded-3xl px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-400 rounded-full p-2">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/2515/2515183.png" 
                    alt="Campo" 
                    className="w-10 h-10"
                  />
                </div>
                <span className="text-white font-bold text-xl font-subtitle">Del Campo a tu Mesa</span>
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <img 
                    src="https://res.cloudinary.com/dppf30duk/image/upload/v1751493867/comer_cz99ip.png" 
                    alt="Mesa" 
                    className="w-10 h-10 "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjetas de valores */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Tarjeta 1 - 20 km de Radio */}
          <CardOurValues
            title={'20'} 
            paragraph={'km de Radio'}
          />

          {/* Tarjeta 2 - 100% Trazabilidad */}
          <CardOurValues
            title={'100%'} 
            paragraph={'Trazabilidad'}
          />

          {/* Tarjeta 3 - Historias */}
          <CardOurValues2
            src={'https://cdn-icons-png.flaticon.com/512/1040/1040226.png'} 
            alt={'Infinito'} 
            paragraph={'Historias'}
          />

          {/* Tarjeta 4 - Amor Local */}
          <CardOurValues2
            src={'https://cdn-icons-png.flaticon.com/512/833/833472.png'} 
            alt={'Corazón'} 
            paragraph={'Amor Local'}
          />

        </div>
      </div>
    </div>
  );
};