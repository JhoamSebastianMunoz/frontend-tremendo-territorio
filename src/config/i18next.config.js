import i18n from "i18next";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(backend)
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    debug: false,
    
    // Configuración de namespaces
    ns: ['Header','Footer', 'Home','ContactUs', 'CommentsSection', 'LoginScreen', 'Admin', 'FarmsView'], 
    defaultNS: 'Header',
    
    
    interpolation: {
      escapeValue: false,
    },
    
    backend: {
      // Patrón para cargar los archivos de traducción
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    
    // react: {
    //   useSuspense: false
    // },

    // Configuración adicional para mejor performance
    load: 'languageOnly',
    preload: ['es', 'en'],
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;