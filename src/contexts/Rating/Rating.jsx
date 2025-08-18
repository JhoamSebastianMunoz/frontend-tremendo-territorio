import React, { useState, createContext } from 'react';

export const RatingContext = createContext();

export const RatingProvider = ({children}) => {
    // Calificación del agricultor
    const qualificationAverage = 4.9;

    //Función para mostrar las estrellas en base al promedio
    const renderStar = (avg) =>{
        const stars = [];
        for( let i = 1; i <= 5; i++){
            stars.push(
                <span key={i} className={ i <= avg 
                    ? 'text-yellow-400' 
                    : 'text-gray-300'}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
    <RatingContext.Provider value={{
        renderStar,
        qualificationAverage 
    }}>
        {children}
    </RatingContext.Provider>
    )
}

