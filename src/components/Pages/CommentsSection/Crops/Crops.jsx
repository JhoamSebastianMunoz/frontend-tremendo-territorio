import React from 'react'

export const Crops = () => {

    // Lista de productos/cultivos con su icono y nombre
    const products = [
        { icon: '🌽', name: 'Maíz' },
        { icon: '🥬', name: 'Lechugas' },
        { icon: '🥕', name: 'Espinaca' },
        { icon: '🍅', name: 'Tomate' },
        { icon: '🧅', name: 'Cebolla' },
        { icon: '🌱', name: 'Pimentón' },
        { icon: '🥔', name: 'Papas' },
        { icon: '🌿', name: 'Cilantro' },
        { icon: '🌱', name: 'Perejil' },
        { icon: '🌱', name: 'Frijol' },
        { icon: '🟤', name: 'Yuca' },
        { icon: '🥬', name: 'Repollo' }
    ];

    return (
        <div className="bg-white rounded-3xl p-8 shadow-xl border-l-8 border-primary-sixth">
            {/* Título de la sección */}
            <h2 className="text-3xl font-bold text-primary-third mb-6 font-subtitle flex items-center space-x-2">
                <span>🌱</span>
                <span>Mis Cultivos</span>
            </h2>

            {/* Grid para mostrar los cultivos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {products.map((product, index) => (
                    <div
                        key={index} // Clave única para cada elemento
                        className="bg-primary-fifth p-4 rounded-xl text-center transition-all duration-300 hover:bg-primary-fourth hover:-translate-y-2 hover:shadow-lg border-2 border-transparent hover:border-primary-second cursor-pointer"
                    >
                        {/* Icono del producto */}
                        <div className="text-3xl mb-2">{product.icon}</div>
                        {/* Nombre del producto */}
                        <div className="text-primary-third text-sm font-bold font-body">{product.name}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
