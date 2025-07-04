import React, { createContext, useState, useEffect } from 'react'

export const GetContext = createContext();

export const GetElementsProvider = ({children}) => {

    const [ getLogo, setGetLogo ] = useState();
    const [error, setError ] =useState(null);
    const [isLoading, setIsLoading ] = useState(true);

    const URLLogo = 'https://res.cloudinary.com/dppf30duk/image/upload/v1751501033/logotipo-tremendo-territorio_mbhgta.jpg';

    useEffect(()=>{
        const fetchLogo = async () =>{
            try {
                setGetLogo(URLLogo);
            } catch (error) {
                setError(error)
            }finally{
                setIsLoading(false)
            }
        }
        fetchLogo();
    },[]);

    return (
    <GetContext.Provider value={{ 
        getLogo, 
        error, 
        isLoading
    }} >
      {children}
    </GetContext.Provider>
  );
};

