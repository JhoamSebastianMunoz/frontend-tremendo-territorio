import React, { useState, useContext } from 'react';
import { CommentsContext } from '../../../../contexts/Comments/Comments';
import { RatingContext } from '../../../../contexts/Rating/Rating';

export const Statistics = () => {
    
    // Obtiene del contexto los comentarios y la función para actualizarlos
    const { 
        comments,
        setComments 
    } = useContext(CommentsContext);
    // Obtiene el contexto de la función de estrellas
    const { 
        renderStar,
        qualificationAverage } = useContext(RatingContext);


    // Retorna el JSX que renderiza las estadísticas
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
            {/* Contenedor en forma de grid, que cambia de 1 columna a 3 en pantallas medianas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

                {/* Bloque: Calificación promedio */}
                <div className="space-y-2">
                    {/* Valor numérico fijo (puedes hacerlo dinámico si se calcula a partir de los comentarios) */}
                    <div className="text-3xl font-bold text-primary-second font-primary-brand">{qualificationAverage}</div>
                    {/* Representación visual de estrellas */}
                    <div className="text-primary-second text-xl">{renderStar(Math.round(Number(qualificationAverage)))}</div>
                    {/* Texto descriptivo */}
                    <div className="text-primary-first font-primary-brand">Calificación promedio</div>
                </div>

                {/* Bloque: Número de restaurantes que reseñan */}
                <div className="space-y-2">
                    {/* Número total de comentarios obtenidos del contexto */}
                    <div className="text-3xl font-bold text-primary-second font-primary-brand">
                        {comments.length}
                    </div>
                    <div className="text-primary-first font-primary-brand">
                        Restaurantes que reseñan
                    </div>
                </div>

                {/* Bloque: Porcentaje de recomendación */}
                <div className="space-y-2">
                    {/* Porcentaje fijo (podría calcularse dinámicamente si se analiza la data) */}
                    <div className="text-3xl font-bold text-primary-second font-primary-brand">{`${(qualificationAverage*2)*10} %`}</div>
                    <div className="text-primary-first font-primary-brand">Recomendación</div>
                </div>

            </div>
        </div>
    )
}
