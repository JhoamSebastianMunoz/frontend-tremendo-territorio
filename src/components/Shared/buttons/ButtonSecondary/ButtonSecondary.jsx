import React from 'react';

export const ButtonSecondary = ({children, ...props}) => {
  return (
    <button {...props} className="w-full bg-primary-first font-body hover:bg-primary-third text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-4 transform hover:scale-105">
      {children}
    </button>
  )
};

