import React from 'react';

export const ButtonPrimary = ({children}) => {
  return (
    <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
      {children}
    </button>
  )
};

