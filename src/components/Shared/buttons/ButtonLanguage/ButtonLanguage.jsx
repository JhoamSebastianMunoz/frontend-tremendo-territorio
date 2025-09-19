import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ButtonLanguage = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Botón Principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative overflow-hidden flex items-center space-x-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:text-primary-fifth transition-all duration-300 ease-out hover:bg-white/15 hover:border-white/30 hover:scale-105 hover:shadow-lg hover:shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 active:scale-95"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
        </div>
        
        <Globe className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-medium font-subtitle text-sm tracking-wide">
          {currentLang.flag} {currentLang.code.toUpperCase()}
        </span>
        
        <svg
          className={`w-3 h-3 transition-all duration-300 ${isOpen ? 'rotate-180 text-primary-fifth' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          
          <div className="absolute top-full right-0 mt-3 z-20 w-48 origin-top-right bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
            <div className="py-2">
              {languages.map((lang, index) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between transition-all duration-200 ease-out hover:bg-gradient-to-r hover:from-primary-fifth/20 hover:to-primary-second/20 hover:scale-[1.02] group relative overflow-hidden ${i18n.language === lang.code ? 'bg-primary-first/10' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-first/0 via-primary-first/10 to-primary-first/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  <div className="flex items-center space-x-3 relative z-10">
                    <span className="text-xl">{lang.flag}</span>
                    <div>
                      <p className="font-medium text-gray-800 font-subtitle text-sm">
                        {lang.name}
                      </p>
                    </div>
                  </div>
                  
                  {i18n.language === lang.code && (
                    <Check className="w-4 h-4 text-primary-first relative z-10" />
                  )}
                </button>
              ))}
            </div>
            <div className="h-1 bg-gradient-to-r from-primary-first via-primary-second to-primary-first" />
          </div>
        </>
      )}
    </div>
  );
};
