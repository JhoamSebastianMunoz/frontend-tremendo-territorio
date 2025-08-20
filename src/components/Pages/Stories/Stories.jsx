import React from 'react';

export const Stories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-first via-primary-second to-primary-third flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Encabezado */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 font-title">¡Historias de Tremendo Territorio y de nuestros usuarios.!</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

