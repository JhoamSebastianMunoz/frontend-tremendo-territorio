import React from 'react';
import { CardUniqueFeatures } from './CardUniqueFeatures';

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
          <CardUniqueFeatures
          src={'https://cdn-icons-png.flaticon.com/512/2991/2991148.png'} 
          alt={'Video icon'}
          title={'Trazabilidad Visual'} 
          paragraph={'Videos del proceso completo desde la siembra hasta el plato.'}
          />

          {/* Conexión Local */}
          <CardUniqueFeatures
          src={'https://cdn-icons-png.flaticon.com/512/684/684908.png'} 
          alt={'Location icon'}
          title={'Conexión Local'} 
          paragraph={'Radio de 20km para fortalecer economías locales.'}
          />

          {/* Narrativas Territoriales */}
          <CardUniqueFeatures
          src={'https://cdn-icons-png.flaticon.com/512/3145/3145765.png'} 
          alt={'Document icon'}
          title={'Narrativas Territoriales'} 
          paragraph={'Historias que conectan el territorio con cada bocado.'}
          />

          {/* Valor del Campesino */}
          <CardUniqueFeatures
          src={'https://cdn-icons-png.flaticon.com/512/2936/2936719.png'} 
          alt={'Farmer icon'}
          title={'Valor del Campesino'} 
          paragraph={'Valor y reconocimiento justo al productor.'}
          />

          {/* Asociatividad */}
          <CardUniqueFeatures
          src={'https://cdn-icons-png.flaticon.com/512/1005/1005141.png'} 
          alt={'Community icon'}
          title={'Asociatividad'} 
          paragraph={'Fortalecimiento del tejido social campesino.'}
          />

          {/* Colombia */}
          <CardUniqueFeatures
          src={'https://cdn-icons-png.flaticon.com/512/197/197575.png'} 
          alt={'Colombia flag icon'}
          title={'Colombia'} 
          paragraph={'Dignificamos a quienes alimentan al país.'}
          />
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-1/4 left-0 w-32 h-32 bg-green-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
      </div>
    </div>
  );
};