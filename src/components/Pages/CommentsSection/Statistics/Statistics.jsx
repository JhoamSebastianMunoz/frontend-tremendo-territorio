import React, { useState, useContext, Suspense } from 'react';
import { CommentsContext } from '../../../../contexts/Comments/Comments';
import { RatingContext } from '../../../../contexts/Rating/Rating';
import { useTranslation } from 'react-i18next';

export const Statistics = () => {
    const { t, i18next } = useTranslation(["CommentsSection"])
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
        <Suspense fallback={<p>Loading translation...</p>}>
        <div className="bg-white rounded-2xl p-6 shadow-lg">
            {/* Contenedor en forma de grid, que cambia de 1 columna a 3 en pantallas medianas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">

                {/* Bloque: Calificación promedio */}
                <div className="space-y-2">
                    {/* Valor numérico fijo (puedes hacerlo dinámico si se calcula a partir de los comentarios) */}
                    <div className="text-3xl font-bold text-primary-second font-body">{qualificationAverage}</div>
                    {/* Representación visual de estrellas */}
                    <div className="text-primary-second text-xl">{renderStar(Math.round(Number(qualificationAverage)))}</div>
                    {/* Texto descriptivo */}
                    <div className="text-primary-first font-body">{t("Statistics.div")}</div>
                </div>

                {/* Bloque: Número de restaurantes que reseñan */}
                <div className="space-y-2">
                    {/* Número total de comentarios obtenidos del contexto */}
                    <div className="text-3xl font-bold text-primary-second font-body">
                        {comments.length}
                    </div>
                    <div className="text-primary-first font-body">
                        {t("Statistics.div_2")}
                    </div>
                </div>

                {/* Bloque: Porcentaje de recomendación */}
                <div className="space-y-2">
                    {/* Porcentaje fijo (podría calcularse dinámicamente si se analiza la data) */}
                    <div className="text-3xl font-bold text-primary-second font-body">{`${(qualificationAverage*2)*10} %`}</div>
                    <div className="text-primary-first font-body">{t("Statistics.div_3")}</div>
                </div>

            </div>
        </div>
        </Suspense>
    )
}
