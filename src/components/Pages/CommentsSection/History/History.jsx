import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'

export const History = () => {
    const { t, i18next } = useTranslation(["CommentsSection"])

    return (
            <Suspense fallback={<p>Loading translation...</p>}>
        <div className="bg-white rounded-3xl p-8 shadow-xl ">
            
            {/* Título de la sección */}
            <h2 className="text-3xl font-bold text-primary-third mb-6 font-subtitle flex items-center space-x-2">
                <span>📖</span>
                <span>{t("History.span_title")}</span>
            </h2>

            {/* Texto descriptivo con la historia del agricultor */}
            <p className="text-primary-first text-lg leading-relaxed italic font-body text-justify">
                {t("History.p_history")}
            </p>
        </div>
        </Suspense>
    )
}
