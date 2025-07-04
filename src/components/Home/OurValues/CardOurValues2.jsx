import React from 'react'

const CardOurValues2 = ({src, alt, paragraph}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
        <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <img 
            src={src} 
            alt={alt}
            className="w-8 h-8 filter brightness-0 invert"
          />
        </div>
        <h3 className="text-gray-800 font-semibold text-lg">{paragraph}</h3>
    </div>
  )
}

export default CardOurValues2
