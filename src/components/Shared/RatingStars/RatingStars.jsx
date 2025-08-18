// Componente funcional RatingStars que recibe como props:
// - value: número que representa la cantidad de estrellas seleccionadas
// - onChange: función que se ejecuta cuando el usuario selecciona una estrella
export const RatingStars = ({ value, onChange }) => {
    return (
        <div className="flex gap-1">
            {/* Se crea un array con 5 elementos (1 a 5) para representar las estrellas */}
            {[1, 2, 3, 4, 5].map(star => (
                <span
                    // Clave única para cada estrella (necesaria en listas de React)
                    key={star}
                    className={`cursor-pointer text-xl ${
                        star <= value ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    // Evento onClick que llama a la función onChange 
                    // pasando el número de la estrella seleccionada
                    onClick={() => onChange(star)}
                >
                    {/* Caracter unicode de estrella rellena */}
                    ★
                </span>
            ))}
        </div>
    );
};
