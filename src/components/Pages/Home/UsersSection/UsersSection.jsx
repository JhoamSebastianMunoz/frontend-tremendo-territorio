import React, {Suspense} from 'react';
import { CardUser } from './CardUser';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const UsersSection = () => {
    const {t, i18n } = useTranslation(["Home"]);

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
        <Suspense fallback={<p>Loading translation...</p>}>
        <div className="bg-white py-16 px-8">
            <div className="max-w-6xl mx-auto text-center">
                {/* Título principal */}
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4 font-subtitle">
                    {t("UsersSection.title")}
                </h2>
                <p className="text-gray-600 text-lg mb-16 max-w-2xl mx-auto font-body">
                    {t("UsersSection.p")}
                </p>

                {/* Grid de tres tarjetas */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Tarjeta 1: Guardián de la Tierra*/}
                    <CardUser 
                        icon={'👨🌱'}
                        title={t("UsersSection.CardUserFarm.title")} 
                        paragraph1={t("UsersSection.CardUserFarm.paragraph1")} 
                        paragraph2={t("UsersSection.CardUserFarm.paragraph2")}
                        button={t("UsersSection.CardUserFarm.button")} onClick={goToFarmsView}
                    />

                    {/* Tarjeta 2: El Sabio del Sabor Rural*/}
                    <CardUser 
                        icon={'👨‍🍳'}
                        title={t("UsersSection.CardUserRestaurant.title")} 
                        paragraph1={t("UsersSection.CardUserRestaurant.paragraph1")} 
                        paragraph2={t("UsersSection.CardUserRestaurant.paragraph2")}
                        button={t("UsersSection.CardUserRestaurant.button")} onClick={goToRestaurantsView}
                    />

                    {/* Tarjeta 3: Consumidor Final */}
                    <CardUser 
                        icon={'👤'}
                        title={t("UsersSection.CardUserConsumer.title")} 
                        paragraph1={t("UsersSection.CardUserConsumer.paragraph1")} 
                        paragraph2={t("UsersSection.CardUserConsumer.paragraph2")}
                        button={t("UsersSection.CardUserConsumer.button")} onClick={goToStories}
                    />
                </div>
            </div>
        </div>
        </Suspense>
    )
};