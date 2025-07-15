import React, { Children } from 'react'
import { ButtonPrimary } from '../../Atoms/ButtonPrimary/ButtonPrimary';

export const CardUser = ({icon, title, paragraph1, paragraph2, button, ...props}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 relative">
      {/* Barra superior verde usando color personalizado */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-primary-light2 rounded-t-2xl"></div>
      
      {/* Ícono con colores del brand */}
      <div className="w-16 h-16 bg-primary-light_text_hover rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
        <div className="w-8 h-8 bg-primary-light2 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg font-primary-brand">{icon}</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-4 font-primary-brand">{title}</h3>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed font-primary-brand">
        {paragraph1}
      </p>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed font-primary-brand">
        {paragraph2}
      </p>

      <ButtonPrimary {...props} >
        {button}
      </ButtonPrimary>
    </div>
  )
};

