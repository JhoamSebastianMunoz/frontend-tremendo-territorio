import React, { createContext, useState, useEffect } from 'react'

export const GetContext = createContext();

export const GetElementsProvider = ({children}) => {

    const [ getLogo, setGetLogo ] = useState();
    const [error, setError ] =useState(null);
    const [isLoading, setIsLoading ] = useState(true);

    const URLLogo = 'https://res.cloudinary.com/dppf30duk/image/upload/v1755639138/Logo_TremendoTerritorio-03_ai32lo.png';

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

