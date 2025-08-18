import React from 'react'

export const History = () => {
    
    return (
        // Contenedor principal con estilos de tarjeta
        <div className="bg-white rounded-3xl p-8 shadow-xl border-l-8 border-primary-second">
            
            {/* Título de la sección */}
            <h2 className="text-3xl font-bold text-primary-third mb-6 font-primary-brand flex items-center space-x-2">
                <span>📖</span>
                <span>Mi Historia</span>
            </h2>

            {/* Texto descriptivo con la historia del agricultor */}
            <p className="text-primary-first text-lg leading-relaxed italic font-primary-brand">
                "Soy Juan De Dios Herrera, llevo 18 años cultivando esta tierra hermosa de Barichara que heredé de mi abuelo.
                Desde niño aprendí los secretos de la agricultura tradicional santandereana. Mi finca La Esperanza ha sido
                testigo de generaciones de trabajo honesto y dedicado. Cultivo más de 15 variedades diferentes, desde granos
                ancestrales hasta hortalizas frescas que llegan directamente a los restaurantes del pueblo mágico.
                Cada semilla que siembro lleva el amor por esta tierra y el compromiso de alimentar a las familias de Barichara
                con productos frescos y de calidad. Mi mayor satisfacción es saber que mis cultivos forman parte de los platos
                tradicionales que deleitan a visitantes de todo el mundo."
            </p>
        </div>
    )
}
