import React, { Suspense } from 'react'
import { ButtonSecondary } from '../ButtonSecondary/ButtonSecondary';
import { useTranslation } from 'react-i18next';

export const ButtonCall = ({phone, ...props}) => {
    const { t, i18n } = useTranslation(["button"])
    // Llama directamente al número del cliente
    const handleCall = () =>{
        window.open(`tel:${phone}`, '_self');
    };

    return (
    <Suspense fallback={<p>Loading translation...</p>}>
        <button {...props}
            onClick={handleCall}
        >
            <div className='flex gap-4'>
                <span className='h-6 w-auto'>📞</span> 
                <span>{t("ButtonCall.span")}</span>
            </div>

        </button>
    </Suspense>
    );
};

