import { createContext, useState, useEffect } from 'react'

// Creación del contexto para compartir datos globales del administrador
export const GetAdminContext = createContext();

// Componente proveedor del contexto que envuelve a los componentes hijos
export const GetDataAdminProvider = ({ children }) => {

    // Estado para controlar la pestaña activa del panel de administración
    const [activeTab, setActiveTab] = useState('dashboard');
    
    // Estado para almacenar datos simulados del sistema
    const [data, setData] = useState({
        restaurantes: 23,       
        agricultores: 156,      
        platos: 89,       
        productos: 342,      
        transacciones: [       
            { fecha: '2025-07-29', restaurante: 'La Mesa Verde', campesino: 'Carlos Rodríguez', producto: 'Tomate Chonto', estado: 'Conectado' },
            { fecha: '2025-07-28', restaurante: 'Sabor Campesino', campesino: 'María González', producto: 'Cilantro Orgánico', estado: 'Completado' }
        ]
    });

    // Estado para guardar la trazabilidad seleccionada por el usuario
    const [selectedTrazabilidad, setSelectedTrazabilidad] = useState('');
    
    // Hook useEffect para simular actualización de datos en tiempo real cada 30 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            // Se actualizan los datos de forma aleatoria para simular actividad en el sistema
            setData(prev => ({
                ...prev,
                restaurantes: prev.restaurantes + Math.floor(Math.random() * 3),
                agricultores: prev.agricultores + Math.floor(Math.random() * 5),
                platos: prev.platos + Math.floor(Math.random() * 2),
                productos: prev.productos + Math.floor(Math.random() * 10),
            }));
        }, 30000); 

        // Limpieza del intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, []);

    // Función para cambiar la pestaña activa del panel
    const showTab = (tabName) => {
        setActiveTab(tabName);
    };

    // Función simple para mostrar notificaciones con un mensaje y tipo
    const showNotification = (message, type = 'success') => {
        alert(message); // En este caso se usa alert como método básico
    };

    // Función que simula la generación de un reporte en el formato indicado
    const generarReporte = (tipo) => {
        showNotification(`Generando reporte en formato ${tipo.toUpperCase()}...`);
    };

    // Datos de trazabilidad para productos agrícolas
    const trazabilidadData = {
        tomate: [
            { fecha: '15 de Mayo, 2025', evento: 'Siembra', descripcion: 'Semilla orgánica plantada en Vereda El Jardín' },
            { fecha: '30 de Mayo, 2025', evento: 'Crecimiento', descripcion: 'Aplicación de abono orgánico' },
            { fecha: '15 de Junio, 2025', evento: 'Cuidado', descripcion: 'Control de plagas con métodos naturales' },
            { fecha: '20 de Julio, 2025', evento: 'Cosecha', descripcion: 'Recolección en punto óptimo de maduración' }
        ],
        cilantro: [
            { fecha: '10 de Junio, 2025', evento: 'Siembra', descripcion: 'Semillas criollas en Vereda La Esperanza' },
            { fecha: '25 de Junio, 2025', evento: 'Germinación', descripcion: 'Primeros brotes visibles' },
            { fecha: '10 de Julio, 2025', evento: 'Cosecha', descripcion: 'Corte selectivo de hojas maduras' }
        ]
    };

    // Datos para la gráfica de productos más cultivados o vendidos
    const chartData = {
        labels: ['Maiz', 'Yuca', 'Frijol', 'Tomate', 'Zanahoria', 'Lechuga', 'Pimentón', 'Espinaca', 'Apio', 'Diente de León', 'Cebolla','Aguacate', 'Limón', 'Cilantro', 'Perejil', 'Papas', 'Repollo'],
        datasets: [{
            data: [30, 25, 20, 15, 2, 8, 12, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 
            backgroundColor: [
                '#5E5630',
                '#C58A3E',
                '#D94820',
                '#C4AEA1',
                '#EEE7E2'
            ] 
        }]
    };

    // Opciones de configuración para la gráfica
    const chartOptions = {
        responsive: true,              // Adaptación a distintos tamaños de pantalla
        maintainAspectRatio: false,   // Permite romper la proporción por defecto del canvas
        plugins: {
            legend: {
                position: 'bottom'    // Posición de la leyenda en la parte inferior
            }
        }
    };

    // Se retorna el proveedor del contexto con los valores y funciones que estarán disponibles para los componentes hijos
    return (
        <GetAdminContext.Provider value={{
            activeTab,
            setActiveTab,
            data, 
            setData,
            selectedTrazabilidad, 
            setSelectedTrazabilidad,
            showTab,
            showNotification,
            generarReporte,
            trazabilidadData,
            chartData,
            chartOptions
        }}>
            {children} 
        </GetAdminContext.Provider>
    )
}
