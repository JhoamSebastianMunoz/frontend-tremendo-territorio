import React from 'react';
import { CardUser } from './CardUser';
import { useNavigate } from 'react-router-dom';

export const UsersSection = () => {

    const navigate = useNavigate();

    const goToRestaurantsView = () =>{
        navigate('/restaurantsView')
    };
    const goToFarmsView = () => {
    navigate('/farmsView');
    };
    const goToStories = () =>{
        navigate('/stories')
    };

    return (
        <div className="bg-white py-16 px-8">
            <div className="max-w-6xl mx-auto text-center">
                {/* Título principal */}
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 font-subtitle">
                    Tres Mundos, Miles de Historias
                </h2>
                <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto font-body">
                    Conectamos a quienes cultivan la tierra, transforman los alimentos y los disfrutan.
                </p>

                {/* Grid de tres tarjetas */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Tarjeta 1: Guardián de la Tierra*/}
                    <CardUser 
                        icon={'👨🌱'}
                        title={'Guardián de la Tierra'} 
                        paragraph1={'Dedica su vida crear productos cultivados de manera sostenible.'} 
                        paragraph2={'Dedica su vida a cultivar productos con autenticidad y respeto por la naturaleza. Su vínculo con el campo va más allá de una labor: es un legado que ha cuidado generación tras generación, buscando siempre sembrar historia y dignidad en cada cosecha. Cada semilla que deposita en la tierra es un acto de esperanza. Es el guardián que protege la identidad de su territorio, innovando sin olvidar sus raíces, y demostrando que el verdadero valor de la agricultura está en el respeto, el esfuerzo y el amor por el campo.'}
                        button={'Soy Agricultor'} onClick={goToFarmsView}
                    />

                    {/* Tarjeta 2: El Sabio del Sabor Rural*/}
                    <CardUser 
                        icon={'👨‍🍳'}
                        title={'El Sabio del Sabor Rural'} 
                        paragraph1={'Lleva el campo a la mesa, con respeto por los alimentos y sus orígenes.'} 
                        paragraph2={'Lleva los sabores del campo a la mesa, respetando cada ingrediente y su origen. Con amor por la tradición y un toque de creatividad, convierte los productos de la tierra en platos especiales que cuentan historias. Cada receta rescata sabores de antes y los comparte con nuevas generaciones, haciendo que cada comida sea una forma de valorar el trabajo del campo y la cultura de cada territorio.'}
                        button={'Soy Restaurante'} onClick={goToRestaurantsView}
                    />

                    {/* Tarjeta 3: Consumidor Final */}
                    <CardUser 
                        icon={'👤'}
                        title={'Consumidor Final'} 
                        paragraph1={'"Quien elige con consciencia, transforma territorios"'} 
                        paragraph2={'Con cada elección construye un puente invisible entre el campo y la mesa. Dedica su atención a reconocer el origen de lo que consume, valorando el esfuerzo detrás de cada fruto, cada plato, cada historia. No busca solo alimentarse, sino dar sentido al trabajo de quienes cultivan la tierra y a quienes transforman sus frutos con creatividad y respeto. Su mirada va más allá del producto final: ve en cada ingrediente una cadena de manos y corazones que han trabajado para llevarle lo mejor de la naturaleza.'}
                        button={'Soy Consumidor'} onClick={goToStories}
                    />
                </div>
            </div>
        </div>
    )
};