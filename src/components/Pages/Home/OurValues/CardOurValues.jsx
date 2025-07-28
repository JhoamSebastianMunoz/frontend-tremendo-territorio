import React from 'react'

export const CardOurValues = ({title, paragraph}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
        <div className="bg-primary-first rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl font-primary-brand">{title}</span>
        </div>
            <h3 className="text-gray-800 font-semibold text-lg font-primary-brand">{paragraph}</h3>
    </div>
  )
};