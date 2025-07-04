import React, { Children } from 'react'

export const H2 = ({children}) => {
  return (
    <h2 className="text-2xl md:text-3xl lg:text-4xl text-white mb-12 font-light leading-relaxed" >
      {children}
    </h2>
  )
};

