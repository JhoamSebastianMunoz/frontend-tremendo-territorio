import React, { useContext } from 'react'
import { GetAdminContext } from '../../../../contexts/GetDataAdmin/GetDataAdmin'

export const ConnectionsReport = () => {
const { generarReporte } = useContext(GetAdminContext)

    return (
    <>
        <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 font-primary-brand">📈 Generación de Reportes</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
            <div>
                <label className="block mb-3 font-semibold text-gray-800 font-primary-brand">Tipo de Reporte</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg transition-colors focus:border-primary-first focus:outline-none focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 font-primary-brand">
                    <option value="general">Reporte de Conexiones</option>
                </select>
                </div>
                <div>
                <label className="block mb-3 font-semibold text-gray-800 font-primary-brand">Período</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg transition-colors focus:border-primary-first focus:outline-none focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 font-primary-brand">
                    <option value="semana">Última Semana</option>
                    <option value="mes">Último Mes</option>
                    <option value="trimestre">Último Trimestre</option>
                    <option value="año">Último Año</option>
                </select>
                </div>
                <div>
                    <label className="block mb-3 font-semibold text-gray-800 font-primary-brand">Filtrar por Zona</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg transition-colors focus:border-primary-first focus:outline-none focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 font-primary-brand">
                        <option value="">Todas las zonas</option>
                        <option value="armenia">Armenia</option>
                        <option value="circasia">Circasia</option>
                        <option value="quimbaya">Quimbaya</option>
                    </select>
                </div>
                <div className="flex gap-4">
                    <button
                    onClick={() => generarReporte('pdf')}
                    className="flex-1 bg-gradient-to-r from-primary-first to-primary-second text-white py-4 px-6 rounded-xl font-semibold text-lg hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg font-primary-brand"
                    >
                    📄 Generar PDF
                    </button>
                    <button
                    onClick={() => generarReporte('excel')}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg font-primary-brand"
                    >
                    📊 Generar Excel
                    </button>
                </div>
                </div>
                <div>
                <h4 className="text-xl font-bold mb-4 text-gray-800 font-primary-brand">📅 Calendario de Cosechas vs Demandas</h4>
                <div className="bg-gray-100 p-8 rounded-2xl text-center h-64 flex flex-col items-center justify-center">
                    <p className="text-lg font-semibold text-gray-600 font-primary-brand mb-2">Vista de Calendario Interactivo</p>
                    <small className="text-gray-500 font-primary-brand">Muestra cosechas programadas vs demandas de restaurantes</small>
                </div>
                </div>
            </div>
        </div>
    </>
    )
}

