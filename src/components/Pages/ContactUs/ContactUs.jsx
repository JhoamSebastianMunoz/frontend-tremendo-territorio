import React, {Suspense} from 'react';
import  { Links } from '../../Shared/Footer/Links';
import { useTranslation } from 'react-i18next';

export const ContactUs = () => {
  const { t, i18n } = useTranslation(["ContactUs"])
  return (
    <Suspense fallback={<p>Loading translation...</p>}>
    <div className="min-h-screen flex flex-col"
    style={{
                backgroundImage: `url('https://res.cloudinary.com/dppf30duk/image/upload/v1755905827/Texturas-01_at6bal.png')`, // Reemplaza 'textura.png' con el nombre exacto de tu archivo
                backgroundSize: 'cover', // o 'contain' si prefieres que se vea completa
                backgroundRepeat: 'repeat', // o 'no-repeat' si no quieres que se repita
                backgroundPosition: 'center',
                backgroundColor: '#5E5630' // Color de respaldo por si la imagen no carga
            }}>
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full bg-primary-fifth  max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Encabezado */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-subtitle text-gray-800 mb-2">{t("title")}</h2>
              <p className="text-xl text-primary-first font-body">
                {t("subtitle")}
              </p>
            </div>

            {/* Contenido principal */}
            <div className="space-y-8">
              {/* Información de contacto */}
              <div className="text-center">
                <h3 className="text-2xl font-subtitle text-gray-800 mb-4">
                  {t("h3")}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5 text-primary-first" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <a 
                      href="mailto:tt@tremendoterritorio.co"
                      className="text-gray-700 font-body hover:text-primary-first transition-colors duration-300"
                    >
                      tt@tremendoterritorio.co
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <svg className="w-5 h-5 text-primary-light2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <a 
                      href="tel:+573001234567"
                      className="text-gray-700 font-body hover:text-primary-first transition-colors duration-300"
                    >
                      +57 300 123 4567
                    </a>
                  </div>
                </div>
              </div>

              {/* Separador */}
              <div className="border-t border-gray-200"></div>

              {/* Redes sociales */}
              <div className="text-center">
                <h3 className="text-2xl font-bold font-subtitle text-gray-800 mb-6">
                  {t("h3_2")}
                </h3>
                <div className="flex justify-center space-x-6">
                  <Links />
                </div>
                <p className="text-gray-600 font-body text-sm mt-4">
                  {t("p")}
                </p>
              </div>

              {/* Separador */}
              <div className="border-t border-gray-200"></div>

              {/* Mensaje adicional */}
              <div className="text-center bg-green-50 p-6 rounded-2xl">
                <h4 className="text-lg font-semibold font-body text-gray-800 mb-2">
                  {t("h4")}
                </h4>
                <p className="text-gray-600 font-body text-sm">
                  {t("p_2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Suspense>
  );
};