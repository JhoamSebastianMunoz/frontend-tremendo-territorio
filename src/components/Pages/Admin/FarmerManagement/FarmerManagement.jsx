import React, { useContext, useState, Suspense } from 'react';
import { GetAdminContext } from '../../../../contexts/GetDataAdmin/GetDataAdmin';
import { ButtonSecondary } from '../../../Shared/buttons/ButtonSecondary/ButtonSecondary';
import { useTranslation } from 'react-i18next';

export const FarmerManagement = () => {
    const {t , i18n } = useTranslation(["Admin"])
    const { showNotification } = useContext(GetAdminContext);

    const [searchTerm, setSearchTerm] = useState('');

    const farmers = [
        {
            name: 'Juan De Dios Herrera',
            location: 'vereda Carare, km 10.2-Barichara',
            products: 'Frijol',
            amount: '1250 kg disponibles',
            verification: true,
        },
        {
            name: 'Marta Lucia Cardona',
            location: 'vereda Arbolito, km 4.2-Barichara',
            products: 'Maíz',
            amount: '510 kg disponibles',
            verification: false,
        },
        {
            name: 'Eliecer Coronado',
            location: 'vereda butaregua, km 11.2-Barichara',
            products: ['Maíz',', ', 'Yuca'],
            amount: '2510 kg disponibles',
            verification: false,
        }
    ];

    const filteredFarmers = farmers.filter(farmer =>
        farmer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Suspense fallback={<p>Loading translation...</p>} >
        <div>
            <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 font-subtitle">👨‍🌾 {t("FarmerManagement.subtitle")}</h3>

                {/* Campo de Búsqueda */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={t("FarmerManagement.filtered_input.placeholder")}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-second font-body"
                    />
                </div>

                {/* Botón para agregar */}
                <div className='w-60 h-auto flex m-4'>
                <ButtonSecondary
                    onClick={() => showNotification('Función para agregar campesino')}
                    className="mb-6 bg-gradient-to-r from-primary-first to-primary-second text-white py-3 px-6 rounded-xl font-semibold hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg font-body"
                >
                    ➕ {t("FarmerManagement.add_button")}
                </ButtonSecondary>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-lg">
                        <thead>
                            <tr className='bg-primary-first'>
                                <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">{t("FarmerManagement.section_table.name_th")}</th>
                                <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">{t("FarmerManagement.section_table.location_th")}</th>
                                <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">{t("FarmerManagement.section_table.product_you_grow_th")}</th>
                                <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">{t("FarmerManagement.section_table.available_amount_th")}</th>
                                <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">{t("FarmerManagement.section_table.verification_th")}</th>
                                <th className="px-6 py-4 text-left text-white font-semibold font-subtitle">{t("FarmerManagement.section_table.action_th")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFarmers.map((farmer, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 border-b border-gray-200 font-body">{farmer.name}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 font-body">{farmer.location}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 font-body">{farmer.products}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 font-body">{farmer.amount}</td>
                                    <td className="px-6 py-4 border-b border-gray-200">
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold font-body ${
                                            farmer.verification
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {farmer.verification ? t("FarmerManagement.filteredFarmers.span.verified") : t("FarmerManagement.filteredFarmers.span.not_verified")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 border-b border-gray-200">
                                        <button className="mr-2 bg-primary-first text-white px-4 py-2 rounded-lg font-body hover:opacity-80">{t("FarmerManagement.see_profile_button")}</button>
                                        <button className="bg-primary-second text-white px-4 py-2 rounded-lg font-body hover:opacity-80">{t("FarmerManagement.edit_button")}</button>
                                    </td>
                                </tr>
                            ))}

                            {filteredFarmers.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-6 text-gray-500 font-body">
                                        {t("FarmerManagement.td")}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </Suspense>
    );
};
