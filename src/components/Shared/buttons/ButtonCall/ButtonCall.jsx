import React from 'react'
import { ButtonSecondary } from '../ButtonSecondary/ButtonSecondary';

export const ButtonCall = ({phone, ...props}) => {
    // Llama directamente al número del cliente
    const handleCall = () =>{
        window.open(`tel:${phone}`, '_self');
    };

    return (
    <button {...props}
    onClick={handleCall}
    >
        <div className='flex gap-4'>
            <span className='h-6 w-auto'>📞</span> 
            <span>Llamar</span>
        </div>
         
    </button>
    )
}

