import React, { useContext, useState } from 'react'
import { GetAdminContext } from '../../../../contexts/GetDataAdmin/GetDataAdmin'
import { ButtonSecondary } from '../../../Shared/buttons/ButtonSecondary/ButtonSecondary'
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
            <h3 className="text-2xl font-bold mb-6 text-gray-800 font-subtitle">🍽️ Lista de Restaurantes</h3>
            <div className='mb-4' >
                <input
                    type="text" 
                    value={searchTerm}
                    onChange={(e) =>  setSearchTerm(e.target.value)}
                    placeholder='🔍 Buscar por nombre del restaurante'
                    className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-second font-body"
                    />
            </div>

            {/*Boton para agregar */}
            <div className='w-60 h-auto flex m-6'>
            <ButtonSecondary
                onClick={() => showNotification('Función para agregar restaurante')}
            >
                ➕ Agregar Restaurante
            </ButtonSecondary>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
                <thead>
                    <tr className='bg-primary-first'>
                        <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">Nombre</th>
                        <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">Ubicación</th>
                        <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">Contacto</th>
                        <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">Productos Requeridos</th>
                        <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">Estado</th>
                        <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRestaurants.map((restaurant, index) =>(
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 border-b border-gray-200 font-body">{restaurant.name}</td>
                        <td className="px-6 py-4 border-b border-gray-200 font-body">{restaurant.location}</td>
                        <td className="px-6 py-4 border-b border-gray-200 font-body">{restaurant.contact}</td>
                        <td className="px-6 py-4 border-b border-gray-200 font-body">{restaurant.requiredProducts}</td>
                        <td className="px-6 py-4 border-b border-gray-200">
                            <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 font-body">{restaurant.state}</span>
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200">
                            <button className="mr-2 bg-primary-first text-white px-4 py-2 rounded-lg font-body hover:opacity-80">{restaurant.action}</button>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-body hover:opacity-80">Suspender</button>
                        </td>
                    </tr>                  
                ))}
                {filteredRestaurants.length === 0 && (
                    <tr>
                        <td colSpan="6" className="text-center py-6 text-gray-500 font-body">
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
