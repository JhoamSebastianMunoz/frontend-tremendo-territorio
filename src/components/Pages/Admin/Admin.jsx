import React, {  useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { GetAdminContext } from  '../../../contexts/GetDataAdmin/GetDataAdmin'
import { RestaurantManagement } from './RestaurantManagement/RestaurantManagement'
import { FarmerManagement } from './FarmerManagement/FarmerManagement'
import { ConnectionsReport } from './ConnectionsReport/ConnectionsReport'

ChartJS.register(ArcElement, Tooltip, Legend);

export const Admin = () => {
  const { activeTab,
            data, 
            showTab,
            chartData,
            chartOptions } = useContext(GetAdminContext)

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #5E5630 0%, #C58A3E 100%)' }}>
      <div className="max-w-7xl mx-auto p-5">
        {/* Header */}
        <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 mb-8 shadow-2xl">
          <h1 className="text-5xl font-title font-bold mb-4 bg-gradient-to-r from-primary-first to-primary-second bg-clip-text text-transparent">
            Tremendo Territorio
          </h1>
          <p className="text-gray-600 text-xl font-body">
            Panel Administrativo - Conectando campesinos con restaurantes locales
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: 'dashboard', label: '📊 Informe' },
            { id: 'restaurantes', label: '🍽️ Restaurantes' },
            { id: 'agricultores', label: '👨‍🌾 Agricultores' },
            { id: 'reportes', label: '📈 Reportes' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => showTab(tab.id)}
              className={`px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 font-subtitle ${
                activeTab === tab.id
                  ? 'bg-white text-primary-first shadow-lg transform -translate-y-1'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 hover:transform hover:-translate-y-1'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Principal */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { number: data.restaurantes, label: 'Restaurantes Registrados' },
                { number: data.agricultores, label: 'Agricultores Activos' },
                { number: data.platos, label: 'Platos con Trazabilidad' },
                { number: data.productos, label: 'Productos Disponibles' }
              ].map((kpi, index) => (
                <div key={index} className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:transform hover:-translate-y-2 transition-all duration-300 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-first to-primary-second"></div>
                  <div className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-primary-first to-primary-second bg-clip-text text-transparent">
                    {kpi.number}
                  </div>
                  <div className="text-gray-600 font-semibold text-lg font-subtitle">
                    {kpi.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts and Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 font-subtitle">📈 Productos Más Solicitados</h3>
                <div className="h-80">
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
              </div>

              <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-xl hover:transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 font-subtitle">🗺️ Mapa de Zonas Activas</h3>
                <div className="h-auto  rounded-2xl flex items-center justify-center">
                  <img src="https://res.cloudinary.com/dppf30duk/image/upload/v1753919506/mapa-colombia_ivkhxi.jpg" alt="Mapa de Colombia" />
                </div>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 font-subtitle">🔄 Últimas Conexiones</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
                  <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #5E5630, #C58A3E)' }}>
                      <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">Fecha</th>
                      <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">Restaurante</th>
                      <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">Agricultor</th>
                      <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">Producto</th>
                      <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.transacciones.map((transaccion, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 border-b border-gray-200 font-body">{transaccion.fecha}</td>
                        <td className="px-6 py-4 border-b border-gray-200 font-body">{transaccion.restaurante}</td>
                        <td className="px-6 py-4 border-b border-gray-200 font-body">{transaccion.campesino}</td>
                        <td className="px-6 py-4 border-b border-gray-200 font-body">{transaccion.producto}</td>
                        <td className="px-6 py-4 border-b border-gray-200">
                          <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 font-primary-brand">
                            {transaccion.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Gestión de Restaurantes */}
        {activeTab === 'restaurantes' && (
        <RestaurantManagement/>)}

        {/* Gestión de Agricultores */}
        {activeTab === 'agricultores' && (
          <FarmerManagement/>
        )}

        {/* Reportes */}
        {activeTab === 'reportes' && (
          <ConnectionsReport/>
        )}
      </div>
    </div>
  );
};