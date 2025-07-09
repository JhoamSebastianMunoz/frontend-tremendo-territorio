/** @type {import('tailwindcss').Config} */ 
export default { 
  content: [ 
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: { 
    extend: { 
      colors: { // Colores personalizados del brand
        primary: { // Paleta de colores primarios (verdes)
          light: '#166534', // Verde claro para overlays - equivale a bg-green-800
          hover: '#15803d', // Verde hover más brillante que light
          dark: '#059669', // Verde brillante para modo oscuro
          dark_hover: '#10b981', // Verde hover para modo oscuro (más brillante)
          gradient: '#14532d', // Verde muy oscuro para gradientes - equivale a bg-green-900
          light2: '#16a34a', // Verde para header - equivale a bg-green-600
          light_hover: '#15803d', // Verde hover para botones del header - equivale a bg-green-700
          light_hover_active: '#166534', // Verde hover activo para header - equivale a bg-green-800
          light_text_hover: '#bbf7d0', // Verde claro para texto hover - equivale a text-green-200
        },
        secondary: { // Paleta de colores secundarios (naranjas)
          light: '#f97316', // Naranja claro - equivale a bg-orange-500
          hover: '#ea580c', // Naranja hover - equivale a hover:bg-orange-600
          dark: '#fb923c', // Naranja brillante para modo oscuro
          dark_hover: '#fdba74', // Naranja hover para modo oscuro (más brillante)
        },
      },
      fontFamily: { // Fuentes personalizadas del brand
        'primary-brand': ['Inter', 'system-ui', 'sans-serif'], // Fuente primaria del brand con fallbacks
      },
    },
  },
  plugins: [], // Array de plugins adicionales de Tailwind (actualmente vacío)
};