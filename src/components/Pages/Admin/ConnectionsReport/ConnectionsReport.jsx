import React, { useContext, Suspense } from 'react'
import { GetAdminContext } from '../../../../contexts/GetDataAdmin/GetDataAdmin'
import { ButtonSecondary } from '../../../Shared/buttons/ButtonSecondary/ButtonSecondary'
import { useTranslation } from 'react-i18next'

export const ConnectionsReport = () => {
const { t, i18n } = useTranslation(["Admin"])
const { generarReporte } = useContext(GetAdminContext)

    return (
    <Suspense fallback={<p>Loading translation...</p>}>
        <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 font-subtitle">📈 {t("ConnectionsReport.subtitle")}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
            <div>
                <label className="block mb-3 font-semibold text-gray-800 font-subtitle">{t("ConnectionsReport.type_report.label")}</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg transition-colors focus:border-primary-first focus:outline-none focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 font-body">
                    <option value="general">{t("ConnectionsReport.type_report.option")}</option>
                </select>
                </div>
                <div>
                <label className="block mb-3 font-semibold text-gray-800 font-subtitle">{t("ConnectionsReport.period.label")}</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg transition-colors focus:border-primary-first focus:outline-none focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 font-body">
                    <option value="semana">{t("ConnectionsReport.period.option_1")}</option>
                    <option value="mes">{t("ConnectionsReport.period.option_2")}</option>
                    <option value="trimestre">{t("ConnectionsReport.period.option_3")}</option>
                    <option value="año">{t("ConnectionsReport.period.option_4")}</option>
                </select>
                </div>
                <div>
                    <label className="block mb-3 font-semibold text-gray-800 font-subtitle">{t("ConnectionsReport.filter_by_area.label")}</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg transition-colors focus:border-primary-first focus:outline-none focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 font-body">
                        <option value="">{t("ConnectionsReport.filter_by_area.option_1")}</option>
                        <option value="armenia">Armenia</option>
                        <option value="circasia">Circasia</option>
                        <option value="quimbaya">Quimbaya</option>
                    </select>
                </div>
                <div className="flex gap-4">
                    <div className=' bg-primary-first hover:bg-primary-third flex-1 py-4 px-6 rounded-xl font-semibold text-lg hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg font-body' >
                    <ButtonSecondary
                    onClick={() => generarReporte('pdf')}
                    >
                    📄 {t("ConnectionsReport.PDF_button")}
                    </ButtonSecondary>
                    </div>
                    <button
                    onClick={() => generarReporte('excel')}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:transform hover:-translate-y-1 transition-all duration-300 shadow-lg font-body"
                    >
                    📊 {t("ConnectionsReport.Excel_button")}
                    </button>
                </div>
                </div>
                <div>
                <h4 className="text-xl font-bold mb-4 text-gray-800 font-subtitle">📅 {t("ConnectionsReport.subtitle_2")}</h4>
                <div className="bg-gray-100 p-8 rounded-2xl text-center h-64 flex flex-col items-center justify-center">
                    <p className="text-lg font-semibold text-gray-600 font-subtitle mb-2">{t("ConnectionsReport.p")}</p>
                    <small className="text-gray-500 font-body">{t("ConnectionsReport.small")}</small>
                </div>
                </div>
            </div>
        </div>
    </Suspense>
    )
}

