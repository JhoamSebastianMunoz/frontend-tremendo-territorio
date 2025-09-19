import React, {Suspense} from 'react';
import { Links } from './Links';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
    const { t, i18n } = useTranslation(["Footer"])
    return (
        <Suspense fallback={<p>Loading translation...</p>}>
        <footer className="bg-primary-first text-white py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-subtitle font-bold text-primary-first mb-4">
                            {t("title")}
                        </h2>
                        <p className="text-gray-300 text-sm leading-relaxed font-body">
                            {t("p")}
                        </p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold font-subtitle text-primary-first mb-6">
                            {t("h2")}
                        </h2>
                        <div className="flex justify-center space-x-6">
                            <Links/>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <h2 className="text-2xl font-subtitle font-bold text-primary-first mb-4">
                            {t("ContactUs")}
                        </h2>
                        <div className="text-gray-300 text-sm font-body space-y-2">
                            <p>tt@tremendoterritorio.co</p>
                            <p>+57 300 123 4567</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-6">
                    <p className="text-center font-body text-gray-400 text-sm">
                        {t("p2")}
                    </p>
                </div>
            </div>
        </footer>
        </Suspense>
    );
};
