import React from 'react'

export const H1 = ({children}) => {
  return (
    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
      {children}
    </h1>
  )
};

