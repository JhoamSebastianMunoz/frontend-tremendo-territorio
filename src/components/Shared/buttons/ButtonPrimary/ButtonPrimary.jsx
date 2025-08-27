import React from 'react';

export const ButtonPrimary = ({children, ...props}) => {
  return (
    <button {...props} className="bg-primary-second font-body hover:bg-primary-sixth text-white px-6 py-3 rounded-2xl text-lg font-semibold font-primary-brand transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4">
      {children}
    </button>
  )
};

