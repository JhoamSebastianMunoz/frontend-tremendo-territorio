import React from 'react'
import { ButtonPrimary } from '../../Atoms/ButtonPrimary/ButtonPrimary';

export const CardUser = ({icon,title, paragraph1, paragraph2, button}) => {
  return (
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 relative">
            {/* Barra superior verde */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-green-500 rounded-t-2xl"></div>
            
            {/* Ícono */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">{icon}</span>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                { paragraph1 }
            </p>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                { paragraph2 }
            </p>

            <ButtonPrimary className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200">
                { button }
            </ButtonPrimary>
            </div>
  )
};

export default CardUser
