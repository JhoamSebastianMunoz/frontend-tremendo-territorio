import React from 'react';

export const ButtonPrimary = ({children, ...props}) => {
  return (
    <button {...props} className="bg-secondary-light hover:bg-secondary-hover text-white px-10 py-4 rounded-full text-lg font-semibold font-primary-brand transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
      {children}
    </button>
  )
};

