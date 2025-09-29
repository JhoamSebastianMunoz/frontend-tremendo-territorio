import React, { useEffect, useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

export const ButtonWhatsApp = ({nameClient, userMessage, phone}) => {
    const { t, i18n } = useTranslation(["button"])
    //Estado para almacenar y usar el logo de WhatsApp
    const [ whatsAppLogo, setWhatsAppLogo ] = useState('');

    //Captura del Logo de WhatsApp alojado en la plataforma cloudinary
    const URLWhatsApplogo = 'https://res.cloudinary.com/dppf30duk/image/upload/v1755531678/whatsapp_egscxs.png';
    useEffect(()=>{
        setWhatsAppLogo(URLWhatsApplogo);
    },[]);

    //Acción para abrir WhatsApp con un mensaje predeterminado
    const handleWhatsApp = () =>{
        const message = encodeURIComponent(
            `${userMessage} ${nameClient}. ${t("ButtonWhatsApp.handleWhatsApp.message")}`
        );
        window.open(`https://wa.me/${phone.replace(/\+/g, '')}?text=${message}`, '_blank');
    };

    return (
    <Suspense fallback={<p>Loading translation...</p>}>
        <button
            onClick={handleWhatsApp}
            className="w-full font-body bg-green-500 hover:bg-green-600 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 font-primary-brand"
        >
            <span className='w-6 h-auto'><img src={whatsAppLogo} alt={t("ButtonWhatsApp.img.alt")}/></span> WhatsApp
        </button>
    </Suspense>
    )
}

