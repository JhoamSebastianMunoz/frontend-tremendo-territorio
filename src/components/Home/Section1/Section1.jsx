import React from 'react';
import { ButtonPrimary } from '../../Atoms/ButtonPrimary/ButtonPrimary';
import { H1 } from '../../Atoms/H1/H1';
import { H2 } from '../../Atoms/H2/H2';


export const Section1 = () => {
    return (
<div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
        <div className="absolute inset-0 z-0">
        <img 
            src="https://res.cloudinary.com/dppf30duk/image/upload/v1751500396/campo-tremendo-territorio_ukcrnr.jpg" 
            alt="Paisaje rural verde - campo colombiano"
            className="w-full h-full object-cover"
        />
        {/* Overlay verde con opacidad */}
        <div className="absolute inset-0 bg-green-800 opacity-70"></div>
        </div>

      {/* Contenido principal */}
        <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
        {/* Título principal */}
        <H1>
            Tremendo Territorio
        </H1>

        {/* Subtítulo */}
        <H2>
            Conectamos al Campo con Quienes Quieren Conocerlo y Dignificarlo.
        </H2>

        {/* Descripción */}
        <p className="text-lg md:text-xl text-white mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Seremos una plataforma reconocida por dignificar y visibilizar las historias, 
            relaciones y saberes de las comunidades rurales, generando valor comunitario y 
            fortaleciendo la identidad territorial a través de la conexión de narrativas 
            humanas y culturales.
        </p>

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <ButtonPrimary >
            Descubre las Historias
            </ButtonPrimary>

            <ButtonPrimary  className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Conoce el Territorio
            </ButtonPrimary>
        </div>
        </div>

      {/* Elementos decorativos */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-900 to-transparent opacity-50"></div>
        
      {/* Partículas flotantes opcionales */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white opacity-30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-white opacity-20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white opacity-40 rounded-full animate-pulse delay-500"></div>
    </div>
    );
};