import React from 'react';

export const Users = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-light2 via-primary-light_hover to-primary-light_hover_active flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Encabezado */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Yo soy Usuarios!</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

