import React, { Suspense } from 'react';
import { CardOurValues } from './CardOurValues';
import CardOurValues2 from './CardOurValues2';
import { useTranslation } from 'react-i18next';


export const OurValues = () => {
  const { t, i18n } = useTranslation(["Home"])

  return (
    <Suspense fallback={<p>Loading translation...</p>}>
    <div className="bg-primary-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texto principal */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-first leading-tight font-subtitle">
              {t("OurValues.title")}
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed font-body text-justify">
              {t("OurValues.p1")}
            </p>
            
            <p className="text-gray-700 text-lg leading-relaxed font-body text-justify">
              {t("OurValues.p2")}
            </p>
          </div>

          {/* Botón destacado */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-gradient-to-r from-primary-first to-primary-first rounded-3xl px-8 py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="bg-yellow-400 rounded-full p-2">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/2515/2515183.png" 
                    alt={t("OurValues.img1.alt")}
                    className="w-10 h-10"
                  />
                </div>
                <span className="text-white font-bold text-xl font-subtitle">{t("OurValues.span")}</span>
                <div className="bg-white bg-opacity-20 rounded-full p-2">
                  <img 
                    src="https://res.cloudinary.com/dppf30duk/image/upload/v1751493867/comer_cz99ip.png" 
                    alt={t("OurValues.img2.alt")}
                    className="w-10 h-10 "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjetas de valores */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Tarjeta 1 - 20 km de Radio */}
          <CardOurValues
            title={t("OurValues.CardOurValues1.title")} 
            paragraph={t("OurValues.CardOurValues1.paragraph")}
          />

          {/* Tarjeta 2 - 100% Trazabilidad */}
          <CardOurValues
            title={t("OurValues.CardOurValues2.title")} 
            paragraph={t("OurValues.CardOurValues2.paragraph")}
          />

          {/* Tarjeta 3 - Historias */}
          <CardOurValues2
            src={'https://cdn-icons-png.flaticon.com/512/1040/1040226.png'} 
            alt={t("OurValues.CardOurValues3.title")} 
            paragraph={t("OurValues.CardOurValues3.paragraph")}
          />

          {/* Tarjeta 4 - Amor Local */}
          <CardOurValues2
            src={'https://cdn-icons-png.flaticon.com/512/833/833472.png'} 
            alt={t("OurValues.CardOurValues4.title")} 
            paragraph={t("OurValues.CardOurValues4.paragraph")}
          />

        </div>
      </div>
    </div>
    </Suspense>
  );
};