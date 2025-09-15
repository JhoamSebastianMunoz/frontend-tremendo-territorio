import React, { createContext, useState } from 'react'

export const CommentsContext = createContext()

export const CommentsProvider = ({children}) => {
    
    const [comments, setComments] = useState([
    {
        id: 1,
        authorName: "El Puntal",
        authorInitials: "EP",
        date: "Hace 2 semanas",
        rating: 5,
        text: "Juan De Dios es nuestro proveedor de confianza desde hace años. Sus lechugas y espinacas llegan perfectas para nuestros platos típicos de Barichara. La calidad de sus hortalizas es excepcional y siempre mantiene la frescura que necesitamos para rescatar los sabores ancestrales de Santander. ¡Altamente recomendado!"
    },
    {
        id: 2,
        authorName: "Noa Light Food",
        authorInitials: "NL",
        date: "Hace 1 mes",
        rating: 4,
        text: "Trabajamos con Juan De Dios para nuestro menú vegetariano y sus productos son simplemente extraordinarios. Sus tomates, cilantro y perejil tienen un sabor auténtico que complementa perfectamente nuestras preparaciones light. Es un agricultor comprometido con la calidad y la sostenibilidad. Sus ingredientes frescos nutren tanto el cuerpo como el espíritu, comparto un poco de mi experiencia de mi día a día como agricultor: https://youtu.be/6Pl47vwGDYw?si=GPnBXaVGqzT2oO1U"
    },
    {
        id: 3,
        authorName: "El Bodegón de Toñita",
        authorInitials: "BT",
        date: "Hace 3 semanas",
        rating: 5,
        text: "Los granos y tubérculos de Juan De Dios son la base de nuestros tostones y platos tradicionales. Su maíz es de excelente calidad y las papas siempre tienen la textura perfecta. Ubicados en la plazuela de la catedral, sabemos que podemos confiar en la consistencia de sus productos para deleitar a nuestros clientes con los mejores sabores."
    }
    ]);

    return (
    <CommentsContext.Provider 
    value={{
        comments, 
        setComments
    }}>
        {children}
    </CommentsContext.Provider>
    )
}

