import React from 'react';

export const CardUniqueFeatures = ({src, alt, title, paragraph}) => {
  return (
    <div className="bg-primary-first bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105 border border-primary-first border-opacity-30">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-primary-first rounded-full flex items-center justify-center">
          <img 
            src={src} 
            alt={alt}
            className="w-8 h-8 filter invert"
          />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 font-primary-brand">
          {title}
        </h3>
        <p className="text-primary-fifth leading-relaxed font-primary-brand">
          {paragraph}
        </p>
      </div>
    </div>
  )
};