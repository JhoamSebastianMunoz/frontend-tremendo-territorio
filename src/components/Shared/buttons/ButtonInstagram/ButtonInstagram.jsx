
export const ButtonInstagram = () => {

    return(
        <>
            <a href="https://www.instagram.com/" 
            className="w-full font-body bg-pink-500 hover:bg-pink-600 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 " >
                <span>
                    <img 
                    src="https://res.cloudinary.com/dppf30duk/image/upload/v1755784025/instagram_wlxof9.png" 
                    alt="Imagen de Instagram" 
                    className="flex h-6 w-auto"/>
                </span>
                <span>Instagram</span>  
            </a>
        </>
    )
}