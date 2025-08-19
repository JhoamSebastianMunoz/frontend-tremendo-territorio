import React from 'react'
import { ButtonSecondary } from '../ButtonSecondary/ButtonSecondary';

export const ButtonCall = ({phone}) => {
    // Llama directamente al número del cliente
    const handleCall = () =>{
        window.open(`tel:${phone}`, '_self');
    };

    return (
    <ButtonSecondary
    onClick={handleCall}>
        📞 Llamar
    </ButtonSecondary>
    )
}

