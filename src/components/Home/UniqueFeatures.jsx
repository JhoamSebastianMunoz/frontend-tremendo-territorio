import React from 'react';

export const UniqueFeatures = () => {
  return (
    <div className="bg-gradient-to-br from-green-700 via-green-600 to-green-800 py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Título principal */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Características Únicas
          </h2>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6"></div>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Tecnología al servicio del territorio y sus historias.
          </p>
        </div>

        {/* Grid de características */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Trazabilidad Visual */}
          <div className="bg-green-600 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105 border border-green-500 border-opacity-30">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" 
                  alt="Video icon"
                  className="w-8 h-8 filter invert"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Trazabilidad Visual
              </h3>
              <p className="text-green-100 leading-relaxed">
                Videos del proceso completo desde la siembra hasta el plato.
              </p>
            </div>
          </div>

          {/* Conexión Local */}
          <div className="bg-green-600 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105 border border-green-500 border-opacity-30">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/684/684908.png" 
                  alt="Location icon"
                  className="w-8 h-8 filter invert"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Conexión Local
              </h3>
              <p className="text-green-100 leading-relaxed">
                Radio de 20km para fortalecer economías locales.
              </p>
            </div>
          </div>

          {/* Narrativas Territoriales */}
          <div className="bg-green-600 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105 border border-green-500 border-opacity-30">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/3145/3145765.png" 
                  alt="Document icon"
                  className="w-8 h-8 filter invert"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Narrativas Territoriales
              </h3>
              <p className="text-green-100 leading-relaxed">
                Historias que conectan el territorio con cada bocado.
              </p>
            </div>
          </div>

          {/* Valor del Campesino */}
          <div className="bg-green-600 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105 border border-green-500 border-opacity-30">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/2936/2936719.png" 
                  alt="Farmer icon"
                  className="w-8 h-8 filter invert"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Valor del Campesino
              </h3>
              <p className="text-green-100 leading-relaxed">
                Valor y reconocimiento justo al productor.
              </p>
            </div>
          </div>

          {/* Asociatividad */}
          <div className="bg-green-600 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105 border border-green-500 border-opacity-30">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/1005/1005141.png" 
                  alt="Community icon"
                  className="w-8 h-8 filter invert"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Asociatividad
              </h3>
              <p className="text-green-100 leading-relaxed">
                Fortalecimiento del tejido social campesino.
              </p>
            </div>
          </div>

          {/* Colombia */}
          <div className="bg-green-600 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105 border border-green-500 border-opacity-30">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/197/197575.png" 
                  alt="Colombia flag icon"
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Colombia
              </h3>
              <p className="text-green-100 leading-relaxed">
                Dignificamos a quienes alimentan al país.
              </p>
            </div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-1/4 left-0 w-32 h-32 bg-green-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
      </div>
    </div>
  );
};