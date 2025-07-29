import React from 'react';
import { CardUser } from './CardUser';
import {  Route, Routes, useNavigate } from 'react-router-dom';

export const UsersSection = () => {

    const navigate = useNavigate();
    const goToRegister = () =>{
        navigate('/register')
    };
    const goToFarmsView = () => {
    navigate('/farmsView');
};

    return (
        <div className="bg-white py-16 px-8">
            <div className="max-w-6xl mx-auto text-center">
                {/* Título principal */}
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 font-primary-brand">
                    Tres Mundos, Miles de Historias
                </h2>
                <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto font-primary-brand">
                    Conectamos a quienes cultivan la tierra, transforman los alimentos y los disfrutan.
                </p>

                {/* Grid de tres tarjetas */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Tarjeta 1: Guardián de la Tierra*/}
                    <CardUser 
                        icon={'👨🌱'}
                        title={'Guardián de la Tierra'} 
                        paragraph1={'Dedica su vida crear productos cultivados de manera sostenible y auténtica.'} 
                        paragraph2={'Un Productor Agrícola de más de 300 cultiva productos desde hace más de 15 años. Conocimientos del campo son su visión de futuro. Que su grano de frijol, de manza esta libre de químicos de síntesis y ha logrado por dignificar el trabajo agrícola. Con su familia vive todo como en sus tradiciones, buscando alternativas novedosas donde las nuevas técnicas incluidas en él tiempo agricola. Es si carea del territorio, buscando siempre historia y dignidad.'}
                        button={'Soy Agricultor'} onClick={goToFarmsView}
                    />

                    {/* Tarjeta 2: El Sabio del Sabor Rural*/}
                    <CardUser 
                        icon={'👨‍🍳'}
                        title={'El Sabio del Sabor Rural'} 
                        paragraph1={'Lleva el campo a la mesa, con respeto por los alimentos y sus orígenes.'} 
                        paragraph2={'Este cliente es una primera productora gastronómica que busca dar valor a los alimentos de tierra, convierte en sabores del pueblo, que la historia y lo rural en el corazón del presente. Busca preparar comidas típicas, recetas tradicionales, transformar platos, con ingredientes autóctonos que han logrado disfrutar por generaciones y también el territorio.'}
                        button={'Soy Restaurante'} onClick={goToRegister}
                    />

                    {/* Tarjeta 3: Consumidor Final */}
                    <CardUser 
                        icon={'👤'}
                        title={'Consumidor Final'} 
                        paragraph1={'"Quien elige con consciencia, transforma territorios"'} 
                        paragraph2={'Un Profesional Agrícola de más cultiva productos desde hace más de 15 años. Conocimientos del campo son su visión de futuro. Que su grano de frijol, de manza esta libre de químicos. Con su familia como motor, que en las tradiciones, en el valor del esfuerzo y el territorio que aporta tierra donde la historia y la tradición territorial atraviesa historia y dignidad.'}
                        button={'Soy Consumidor'} onClick={goToRegister}
                    />
                </div>
            </div>
        </div>
    )
};