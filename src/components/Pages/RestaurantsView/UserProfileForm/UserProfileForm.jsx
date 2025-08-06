import React, { useContext } from 'react';
import { GetContext } from '../../../../contexts/UsersInformation/UsersInformation';
import { ImageCarousel } from '../../RestaurantsView/ImageCarousel/ImageCarousel';
import { ButtonPrimary } from '../../../Atoms/ButtonPrimary/ButtonPrimary';
import { ButtonSecondary } from '../../../Atoms/ButtonSecondary/ButtonSecondary';

export const UserProfileForm = () => {
    const {personalData, 
        restaurantData, 
        restaurantImages,
        uploading, 
        fileInputRef,
        activeTab, 
        setActiveTab,
        isSubmitting, 
        handlePersonalDataChange,
        handleRestaurantDataChange,
        handleImageUpload,
        handleFileSelect,
        removeImage,
        handleSubmit
    } = useContext(GetContext)


    return (
    <div className="min-h-screen bg-gradient-to-br from-primary-fifth via-yellow-50 to-orange-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-primary-first mb-2">
                    Actualizar Perfil
                </h1>
                <p className="text-gray-600 text-lg">
                    Mantén actualizada la información de tu restaurante
                </p>
            </div>
            {/* Tabs */}
            <div className="flex flex-wrap justify-center mb-8 bg-white rounded-2xl p-2 shadow-lg">
                {[
                    { id: 'personal', label: 'Datos Personales', icon: '👦🏾' },
                    { id: 'restaurant', label: 'Restaurante', icon: '🏪' },
                    { id: 'images', label: 'Imágenes', icon: '📸' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 min-w-32 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                            activeTab === tab.id
                                ? 'bg-primary-first text-white shadow-lg transform scale-105'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        <span className="mr-2">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Datos Personales */}
                {activeTab === 'personal' && (
                    <div className="bg-white rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold text-primary-first mb-6 flex items-center">
                            <span className="mr-3">👦🏾</span>
                            Información Personal
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Nombre *
                                </label>
                                <input
                                    type="text"
                                    value={personalData.nombre}
                                    onChange={(e) => handlePersonalDataChange('nombre', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                    placeholder="Tu nombre"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Apellido *
                                </label>
                                <input
                                    type="text"
                                    value={personalData.apellido}
                                    onChange={(e) => handlePersonalDataChange('apellido', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                    placeholder="Tu apellido"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Cédula 
                                </label>
                                <input
                                    type="text"
                                    value={personalData.cedula}
                                    onChange={(e) => handlePersonalDataChange('cedula', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                    placeholder="12345678"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Correo Eletrónico (opcional)
                                </label>
                                <input
                                    type="email"
                                    value={personalData.email}
                                    onChange={(e) => handlePersonalDataChange('email', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                    placeholder="tu@email.com"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-medium mb-2">
                                    Teléfono *
                                </label>
                                <input
                                    type="tel"
                                    value={personalData.telefono}
                                    onChange={(e) => handlePersonalDataChange('telefono', e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                    placeholder="+57 300 123 4567"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                )}
                {/* Información del Restaurante */}
                {activeTab === 'restaurant' && (
                    <div className="bg-white rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold text-primary-first mb-6 flex items-center">
                            <span className="mr-3">🏪</span>
                            Información del Restaurante
                        </h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Nombre del Restaurante *
                                    </label>
                                    <input
                                        type="text"
                                        value={restaurantData.nombreRestaurante}
                                        onChange={(e) => handleRestaurantDataChange('nombreRestaurante', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder="Nombre de tu restaurante"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Descripción
                                    </label>
                                    <textarea
                                        value={restaurantData.descripcion}
                                        onChange={(e) => handleRestaurantDataChange('descripcion', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300 resize-none"
                                        placeholder="Describe tu restaurante, especialidades, ambiente..."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Ubicación *
                                    </label>
                                    <input
                                        type="text"
                                        value={restaurantData.ubicacion}
                                        onChange={(e) => handleRestaurantDataChange('ubicacion', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder="Dirección completa del restaurante"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Horario de Apertura
                                    </label>
                                    <input
                                        type="time"
                                        value={restaurantData.horarioApertura}
                                        onChange={(e) => handleRestaurantDataChange('horarioApertura', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Horario de Cierre
                                    </label>
                                    <input
                                        type="time"
                                        value={restaurantData.horarioCierre}
                                        onChange={(e) => handleRestaurantDataChange('horarioCierre', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Capacidad (personas)
                                    </label>
                                    <input
                                        type="number"
                                        value={restaurantData.capacidad}
                                        onChange={(e) => handleRestaurantDataChange('capacidad', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder="50"
                                        min="1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Teléfono del Restaurante
                                    </label>
                                    <input
                                        type="tel"
                                        value={restaurantData.telefono}
                                        onChange={(e) => handleRestaurantDataChange('telefono', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder="+57 1 234 5678"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Red Social
                                    </label>
                                    <input
                                        type="url"
                                        value={restaurantData.sitioWeb}
                                        onChange={(e) => handleRestaurantDataChange('sitioWeb', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder="ej para instagram: @TremendoTerritorio"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Imágenes del Restaurante */}
                {activeTab === 'images' && (
                    <div className="bg-white rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold text-primary-first mb-6 flex items-center">
                            <span className="mr-3">📸</span>
                            Imágenes del Restaurante
                        </h2>
                        {/* Preview del Carrusel */}
                        {restaurantImages.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-medium text-gray-700 mb-4">Vista Previa</h3>
                                <ImageCarousel images={restaurantImages} />
                            </div>
                        )}
                        {/* Upload de Imágenes */}
                        <div className="space-y-6">
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-first transition-colors duration-300">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                />
                                
                                <div className="space-y-4">
                                    <div className="text-6xl">📷</div>
                                    <div>
                                        <ButtonSecondary
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                        >
                                            {uploading ? 'Subiendo...' : 'Seleccionar Imágenes'}
                                        </ButtonSecondary>
                                    </div>
                                    <p className="text-gray-500 text-sm">
                                        Selecciona múltiples imágenes de tu restaurante
                                    </p>
                                </div>
                            </div>
                            {/* Lista de Imágenes */}
                            {restaurantImages.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-700 mb-4">
                                        Imágenes Cargadas ({restaurantImages.length})
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {restaurantImages.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={image.url}
                                                    alt={image.alt}
                                                    className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition-colors duration-300 opacity-0 group-hover:opacity-100"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {/* Botón de Envío */}
                <div className="text-center">
                    <ButtonPrimary
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Actualizando Perfil...
                            </span>
                        ) : (
                            '📩 Actualizar Perfil '
                        )}
                    </ButtonPrimary>
                </div>
            </form>
        </div>
    </div>
    );
};



