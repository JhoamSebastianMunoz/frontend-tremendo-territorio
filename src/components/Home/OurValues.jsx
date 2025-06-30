import React from 'react';

export const OurValues = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto principal */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 leading-tight">
              El Valor de Nuestro Territorio
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              Cada producto tiene una historia que contar. Desde las montañas de los Andes 
              hasta los valles fértiles, nuestros campesinos no sólo cultivan alimentos, sino 
              cultura, tradición y vida.
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              En Tremendo Territorio, cada bocado de comida viene con la historia completa: quién 
              la cultivó, cómo la cultivó, y por qué es especial. Porque cuando sabes de dónde 
              viene tu comida, cada bocado sabe mejor.
            </p>
          </div>

          {/* Botón destacado */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-400 rounded-full p-2">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/2515/2515183.png" 
                    alt="Campo" 
                    className="w-8 h-8"
                  />
                </div>
                <span className="text-white font-bold text-xl">Del Campo a tu Mesa</span>
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/3082/3082041.png" 
                    alt="Mesa" 
                    className="w-8 h-8 filter brightness-0 invert"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjetas de valores */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Tarjeta 1 - 20 km de Radio */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">20</span>
            </div>
            <h3 className="text-gray-800 font-semibold text-lg">km de Radio</h3>
          </div>

          {/* Tarjeta 2 - 100% Trazabilidad */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">100%</span>
            </div>
            <h3 className="text-gray-800 font-semibold text-lg">Trazabilidad</h3>
          </div>

          {/* Tarjeta 3 - Historias */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/1040/1040226.png" 
                alt="Infinito" 
                className="w-8 h-8 filter brightness-0 invert"
              />
            </div>
            <h3 className="text-gray-800 font-semibold text-lg">Historias</h3>
          </div>

          {/* Tarjeta 4 - Amor Local */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
            <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/833/833472.png" 
                alt="Corazón" 
                className="w-8 h-8 filter brightness-0 invert"
              />
            </div>
            <h3 className="text-gray-800 font-semibold text-lg">Amor Local</h3>
          </div>
        </div>
      </div>
    </div>
  );
};