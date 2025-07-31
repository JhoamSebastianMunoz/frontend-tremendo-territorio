import { Children, createContext, useState, useEffect } from 'react'

export const GetAdminContext = createContext();

export const GetDataAdminProvider = ({ children }) => {
    
    const [activeTab, setActiveTab] = useState('dashboard');
    
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

    const [selectedTrazabilidad, setSelectedTrazabilidad] = useState('');
    
    // Simulación de datos en tiempo real
    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => ({
                ...prev,
                restaurantes: prev.restaurantes + Math.floor(Math.random() * 3),
                agricultores: prev.agricultores + Math.floor(Math.random() * 5),
                platos: prev.platos + Math.floor(Math.random() * 2),
                productos: prev.productos + Math.floor(Math.random() * 10),
            }));
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const showTab = (tabName) => {
        setActiveTab(tabName);
    };

    const showNotification = (message, type = 'success') => {
        // Implementación simple de notificación
        alert(message);
    };

    const generarReporte = (tipo) => {
        showNotification(`Generando reporte en formato ${tipo.toUpperCase()}...`);
    };

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

    const chartData = {
        labels: ['Tomate', 'Cilantro', 'Lechuga', 'Cebolla', 'Zanahoria'],
        datasets: [{
            data: [30, 25, 20, 15, 10],
            backgroundColor: [
                '#5E5630',
                '#C58A3E',
                '#D94820',
                '#C4AEA1',
                '#EEE7E2'
            ]
        }]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    };

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