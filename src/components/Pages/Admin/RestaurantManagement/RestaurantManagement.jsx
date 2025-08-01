import React, { useContext, useState } from 'react'
import { GetAdminContext } from '../../../../contexts/GetDataAdmin/GetDataAdmin'
import { Contact } from 'lucide-react'


export const RestaurantManagement = () => {
    const {showNotification} = useContext(GetAdminContext)
    
    const [ searchTerm, setSearchTerm ] = useState('')

    const restaurants = [
        {
            name: 'El Puntal',
            location: 'Carrera 6 # 6-13, Barichara',
            contact: '573232967700',
            requiredProducts: 'Lechuga, Espinaca, Apio, Yuca, Diente de León',
            state: 'Activo',
            action: 'Editar',
        },
        {
            name: 'Noa Light Food',
            location: 'Carrera 7 N 6 -34, Barichara',
            contact: '573116957990',
            requiredProducts: 'Tomates, Cebolla, Pimentón, Espinaca, Acelga, Aguacate, Limón, Cilantro, Perejil',
            state: 'Activo',
            action: 'Editar',
        },
        {
            name: 'El Bodegón de Toñita',
            location: 'Carrera 7 # 5-63 Plazuela de la Catedral, Barichara',
            contact: '573113383510',
            requiredProducts: 'Maíz, Frijol, Papas, Yuca, Repollo, Pimentón',
            state: 'Activo',
            action: 'Editar',
        }
    ]

    const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
    <>
        <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 font-primary-brand">🍽️ Lista de Restaurantes</h3>
            <div className='mb-4' >
                <input
                    type="text" 
                    value={searchTerm}
                    onChange={(e) =>  setSearchTerm(e.target.value)}
                    placeholder='🔍 Buscar por nombre del restaurante'
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-second font-primary-brand"
                    />
            </div>

            {/*Boton para agregar */}
            <button
                onClick={() => showNotification('Función para agregar restaurante')}
                className="mb-6 bg-gradient-to-r from-primary-first to-primary-second text-white py-3 px-6 rounded-xl font-semibold hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg font-primary-brand"
            >
                ➕ Agregar Restaurante
            </button>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
                <thead>
                    <tr style={{ background: 'linear-gradient(135deg, #5E5630, #C58A3E)' }}>
                        <th className="px-6 py-4 text-left text-white font-semibold font-primary-brand">Nombre</th>
                        <th className="px-6 py-4 text-left text-white font-semibold font-primary-brand">Ubicación</th>
                        <th className="px-6 py-4 text-left text-white font-semibold font-primary-brand">Contacto</th>
                        <th className="px-6 py-4 text-left text-white font-semibold font-primary-brand">Productos Requeridos</th>
                        <th className="px-6 py-4 text-left text-white font-semibold font-primary-brand">Estado</th>
                        <th className="px-6 py-4 text-left text-white font-semibold font-primary-brand">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRestaurants.map((restaurant, index) =>(
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 border-b border-gray-200 font-primary-brand">{restaurant.name}</td>
                        <td className="px-6 py-4 border-b border-gray-200 font-primary-brand">{restaurant.location}</td>
                        <td className="px-6 py-4 border-b border-gray-200 font-primary-brand">{restaurant.contact}</td>
                        <td className="px-6 py-4 border-b border-gray-200 font-primary-brand">{restaurant.requiredProducts}</td>
                        <td className="px-6 py-4 border-b border-gray-200">
                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 font-primary-brand">{restaurant.state}</span>
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200">
                            <button className="mr-2 bg-primary-first text-white px-4 py-2 rounded-lg font-primary-brand hover:opacity-80">{restaurant.action}</button>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-primary-brand hover:opacity-80">Suspender</button>
                        </td>
                    </tr>                  
                ))}
                {filteredRestaurants.length === 0 && (
                    <tr>
                        <td colSpan="6" className="text-center py-6 text-gray-500 font-primary-brand">
                            No se encontraron restaurantes con ese nombre.
                        </td>
                    </tr>
                )}
                </tbody>
                </table>
            </div>
        </div>
    </>
    )
}
