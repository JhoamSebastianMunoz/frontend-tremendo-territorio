import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

export const ButtonInstagram = () => {
    const { t, i18n } = useTranslation(["button"])

    return(
        <Suspense fallback={<p>Loading Translation...</p>}>
            <a href="https://www.instagram.com/" 
            className="w-full font-body bg-pink-500 hover:bg-pink-600 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 " >
                <span>
                    <img 
                    src="https://res.cloudinary.com/dppf30duk/image/upload/v1755784025/instagram_wlxof9.png" 
                    alt={t("ButtonInstagram.img.alt")} 
                    className="flex h-6 w-auto"/>
                </span>
                <span>Instagram</span>  
            </a>
        </Suspense>
    )
}