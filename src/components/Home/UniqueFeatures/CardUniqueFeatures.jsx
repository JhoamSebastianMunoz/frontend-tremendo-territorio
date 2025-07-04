import React from 'react';

export const CardUniqueFeatures = ({src, alt, title, paragraph}) => {
  return (
    <div className="bg-green-600 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-70 transition-all duration-300 transform hover:scale-105 border border-green-500 border-opacity-30">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
          <img 
            src={src} 
            alt={alt}
            className="w-8 h-8 filter invert"
          />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">
          {title}
        </h3>
        <p className="text-green-100 leading-relaxed">
          {paragraph}
        </p>
      </div>
    </div>
  )
};

