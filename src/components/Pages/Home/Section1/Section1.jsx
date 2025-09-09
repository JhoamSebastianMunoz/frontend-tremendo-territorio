import React from 'react';
import { ButtonPrimary } from '../../../Shared/buttons/ButtonPrimary/ButtonPrimary';
import { useNavigate } from 'react-router-dom';
export const Section1 = () => {

    const navigate = useNavigate();

    const goToStories = () =>{
        navigate('/stories')
    }
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Imagen de fondo */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://res.cloudinary.com/dppf30duk/image/upload/v1751500396/campo-tremendo-territorio_ukcrnr.jpg" 
                    alt="Paisaje rural verde - campo colombiano"
                    className="w-full h-full object-cover"
                />
                {/* Overlay verde con opacidad usando color personalizado */}
                <div className="absolute inset-0 bg-primary-first opacity-70"></div>
            </div>

            {/* Contenido principal */}
            <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
                {/* Título principal */}
                <div className='m-auto flex justify-center items-center'>
                    <img src="https://res.cloudinary.com/dppf30duk/image/upload/v1757461223/Logo_TremendoTerritorio-06_klsytt.png" alt="logotipo de Tremendo Territorio" />
                </div>

                {/* Subtítulo */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-12 font-subtitle leading-relaxed">
                    Conectamos al Campo con Quienes Quieren Conocerlo y Dignificarlo.
                </h2>

                {/* Descripción */}
                <p className="text-lg md:text-xl text-white mb-12 max-w-4xl mx-auto leading-relaxed font-body font-primary-brand">
                    Seremos una plataforma reconocida por dignificar y visibilizar las historias, 
                    relaciones y saberes de las comunidades rurales, generando valor comunitario y 
                    fortaleciendo la identidad territorial a través de la conexión de narrativas 
                    humanas y culturales.
                </p>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <ButtonPrimary onClick={goToStories}>
                        Descubre las Historias
                    </ButtonPrimary>

                </div>
            </div>

            {/* Elementos decorativos */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-third to-transparent opacity-50"></div>
            
            {/* Partículas flotantes opcionales */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white opacity-30 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-white opacity-20 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white opacity-40 rounded-full animate-pulse delay-500"></div>
        </div>
    );
};