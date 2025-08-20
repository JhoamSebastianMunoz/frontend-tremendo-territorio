/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // OPCIÓN 3: Colores personalizados del brand - Enfoque Verde Natural (similar al original)
        primary: {
          // Paleta de colores primarios (verde oliva como protagonista)
          first: '#5E5630',    // Verde oliva como color base principal 
          second: '#C58A3E',   // Dorado 
          third:'#282020',     // Marrón oscuro para contraste fuerte
          fourth: '#C4AEA1',   // Beige 
          fifth: '#EEE7E2',   // Crema 
          sixth: '#D94820',   // Naranja rojizo 
        }
      },
        fontFamily: {
          'title': ['Hornbill', 'serif'],            // Para títulos
          'subtitle': ['"Averia Libre"', 'sans-serif'], // Para subtítulos
          'body': ['Inter', 'system-ui', 'sans-serif'], // Para cuerpo de texto
      },    },
  },
  plugins: [], // Array de plugins adicionales de Tailwind (actualmente vacío)
};