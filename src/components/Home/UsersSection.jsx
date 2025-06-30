import React from 'react';

export const UsersSection = () => {
    return (
    <div className="bg-white py-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
        {/* Título principal */}
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Tres Mundos, Miles de Historias
        </h2>
        <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
            Conectamos a quienes cultivan la tierra, transforman los alimentos y los disfrutan.
        </p>

        {/* Grid de tres tarjetas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Tarjeta 1: Guardián de la Tierra */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 relative">
            {/* Barra superior verde */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-green-500 rounded-t-2xl"></div>
            
            {/* Ícono */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌱</span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Guardián de la Tierra</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Dedica su vida crear productos cultivados de manera sostenible y auténtica.
            </p>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Un Productor Agrícola de más de 300 cultiva productos desde hace más de 15 años. Conocimientos del campo son su visión de futuro. Que su grano de frijol, de manza esta libre de químicos de síntesis y ha logrado por dignificar el trabajo agrícola. Con su familia vive todo como en sus tradiciones, buscando alternativas novedosas donde las nuevas técnicas incluidas en él tiempo agricola. Es si carea del territorio, buscando siempre historia y dignidad.
            </p>

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200">
                Soy Campesino
            </button>
            </div>

          {/* Tarjeta 2: El Sabio del Sabor Rural */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 relative">
            {/* Barra superior verde */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-green-500 rounded-t-2xl"></div>
            
            {/* Ícono */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">👨‍🍳</span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">El Sabio del Sabor Rural</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Lleva el campo a la mesa, con respeto por los alimentos y sus orígenes.
            </p>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Este cliente es una primera productora gastronómica que busca dar valor a los alimentos de tierra, convierte en sabores del pueblo, que la historia y lo rural en el corazón del presente. Busca preparar comidas típicas, recetas tradicionales, transformar platos, con ingredientes autóctonos que han logrado disfrutar por generaciones y también el territorio.
            </p>

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200">
                Soy Restaurante
            </button>
            </div>

          {/* Tarjeta 3: Consumidor Final */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 relative md:col-span-2 lg:col-span-1">
            {/* Barra superior verde */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-green-500 rounded-t-2xl"></div>
            
            {/* Ícono */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">👤</span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Consumidor Final</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                "Quien elige con consciencia, transforma territorios"
            </p>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Un Profesional Agrícola de más cultiva productos desde hace más de 15 años. Conocimientos del campo son su visión de futuro. Que su grano de frijol, de manza esta libre de químicos. Con su familia como motor, que en las tradiciones, en el valor del esfuerzo y el territorio que aporta tierra donde la historia y la tradición territorial atraviesa historia y dignidad.
            </p>

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200">
                Soy Consumidor
            </button>
            </div>
        </div>
        </div>
    </div>
    )
};

