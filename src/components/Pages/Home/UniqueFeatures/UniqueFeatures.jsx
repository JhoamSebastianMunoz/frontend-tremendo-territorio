import React, {Suspense} from 'react';
import { CardUniqueFeatures } from './CardUniqueFeatures';
import { useTranslation } from 'react-i18next';

export const UniqueFeatures = () => {

  const {t , i18n } = useTranslation(["Home"])
  return (
    <Suspense fallback={<p>Loading translation...</p>}>
    <div className="py-16 px-8 relative"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dppf30duk/image/upload/v1755905827/Texturas-01_at6bal.png')`, // Reemplaza 'textura.png' con el nombre exacto de tu archivo
        backgroundSize: 'cover', // o 'contain' si prefieres que se vea completa
        backgroundRepeat: 'repeat', // o 'no-repeat' si no quieres que se repita
        backgroundPosition: 'center',
        backgroundColor: '#5E5630' // Color de respaldo por si la imagen no carga
      }}>
      <div className="max-w-7xl mx-auto">
        {/* Título principal */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4 font-subtitle">
            {t("UniqueFeatures.title")}
          </h2>
          <div className="w-24 h-1 bg-primary-second mx-auto mb-6"></div>
          <p className="text-xl text-black max-w-2xl mx-auto font-body">
            {t("UniqueFeatures.p")}
          </p>
        </div>

        {/* Grid de características */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Trazabilidad Visual */}
          <CardUniqueFeatures
            src={'https://res.cloudinary.com/dppf30duk/image/upload/v1755903596/reproduce-el-video_dmjanj.png'} 
            alt={t("UniqueFeatures.CardUniqueFeatures1.alt")}
            title={t("UniqueFeatures.CardUniqueFeatures1.title")} 
            paragraph={t("UniqueFeatures.CardUniqueFeatures1.paragraph")}
          />

          {/* Conexión Local */}
          <CardUniqueFeatures
            src={'https://cdn-icons-png.flaticon.com/512/684/684908.png'} 
            alt={t("UniqueFeatures.CardUniqueFeatures2.alt")}
            title={t("UniqueFeatures.CardUniqueFeatures2.title")} 
            paragraph={t("UniqueFeatures.CardUniqueFeatures2.paragraph")}
          />

          {/* Narrativas Territoriales */}
          <CardUniqueFeatures
            src={'https://cdn-icons-png.flaticon.com/512/3145/3145765.png'} 
            alt={t("UniqueFeatures.CardUniqueFeatures3.alt")}
            title={t("UniqueFeatures.CardUniqueFeatures3.title")} 
            paragraph={t("UniqueFeatures.CardUniqueFeatures3.paragraph")}
          />

          {/* Valor del Campesino */}
          <CardUniqueFeatures
            src={'https://res.cloudinary.com/dppf30duk/image/upload/v1755903694/proteccion_pfsfiq.png'} 
            alt={t("UniqueFeatures.CardUniqueFeatures4.alt")}
            title={t("UniqueFeatures.CardUniqueFeatures4.title")} 
            paragraph={t("UniqueFeatures.CardUniqueFeatures4.paragraph")}
          />

          {/* Asociatividad */}
          <CardUniqueFeatures
            src={'https://res.cloudinary.com/dppf30duk/image/upload/v1755903803/apreton-de-manos_zpqlmi.png'} 
            alt={t("UniqueFeatures.CardUniqueFeatures5.alt")}
            title={t("UniqueFeatures.CardUniqueFeatures5.title")} 
            paragraph={t("UniqueFeatures.CardUniqueFeatures5.paragraph")}
          />

          {/* Colombia */}
          <CardUniqueFeatures
            src={'https://res.cloudinary.com/dppf30duk/image/upload/v1755903162/colombia_vmnj1a.png'} 
            alt={t("UniqueFeatures.CardUniqueFeatures6.alt")}
            title={t("UniqueFeatures.CardUniqueFeatures6.title")} 
            paragraph={t("UniqueFeatures.CardUniqueFeatures6.paragraph")}
          />
        </div>

        {/* Elementos decorativos usando colores del brand */}
        <div className="absolute top-1/4 left-0 w-32 h-32 bg-primary-second rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-primary-sixth rounded-full opacity-10 blur-3xl"></div>
      </div>
    </div>
    </Suspense>
  );
};