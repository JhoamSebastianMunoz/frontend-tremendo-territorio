import React from 'react';
import { Links } from './Links';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold text-primary-light2 mb-4">
                            Tremendo Territorio
                        </h2>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Conectando historias, territorios y sabores.
                        </p>
                    </div>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-primary-light2 mb-6">
                            Enlaces
                        </h2>
                        <div className="flex justify-center space-x-6">
                            <Links/>
                        </div>
                    </div>
                    <div className="text-center md:text-right">
                        <h2 className="text-2xl font-bold text-primary-light2 mb-4">
                            Contacto
                        </h2>
                        <div className="text-gray-300 text-sm space-y-2">
                            <p>tt@tremendoterritorio.co</p>
                            <p>+57 300 123 4567</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-6">
                    <p className="text-center text-gray-400 text-sm">
                        © 2025 Tremendo Territorio. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};
