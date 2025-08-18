import React, { useContext } from 'react';
import { GetContext } from '../../../../contexts/UsersInformation/UsersInformation';
import { ImageCarousel } from '../FarmCard/ImageCarousel/ImageCarousel';
import { ButtonPrimary } from '../../../Atoms/ButtonPrimary/ButtonPrimary';
import { ButtonSecondary } from '../../../Atoms/ButtonSecondary/ButtonSecondary';

export const RestaurantProfileForm = () => {
    // Extraer valores del contexto con destructuring organizado
    const {
        // Estados principales
        personalData, 
        restaurantData, 
        images,
        
        // Estados de UI
        uploading, 
        fileInputRef,
        activeTab, 
        setActiveTab,
        isSubmitting, 
        
        // Funciones para datos personales
        handlePersonalDataChange,
        
        // Funciones para restaurante
        handleRestaurantDataChange,
        handleRestaurantProductChange,
        addNewRestaurantProduct,
        removeRestaurantProduct,
        
        // Funciones para imágenes
        handleFileSelect,
        removeImage,
        
        // Funciones generales
        handleSubmit
    } = useContext(GetContext);

    // Configuración de pestañas para el formulario
    const tabs = [
        { id: 'personal', label: 'Datos Personales', icon: '👦🏾' },
        { id: 'restaurant', label: 'Restaurante', icon: '🏪' },
        { id: 'images', label: 'Imágenes', icon: '📸' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-fifth via-yellow-50 to-orange-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header del formulario */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary-first mb-2">
                        Actualizar Perfil
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Mantén actualizada la información de tu restaurante
                    </p>
                </div>

                {/* Sistema de pestañas navegables */}
                <div className="flex flex-wrap justify-center mb-8 bg-white rounded-2xl p-2 shadow-lg">
                    {tabs.map(tab => (
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
                    {/* SECCIÓN: Datos Personales */}
                    {activeTab === 'personal' && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold text-primary-first mb-6 flex items-center">
                                <span className="mr-3">👦🏾</span>
                                Información Personal
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Campo: Nombre */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        value={personalData.firstName}
                                        onChange={(e) => handlePersonalDataChange('firstName', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder="Tu nombre"
                                        required
                                    />
                                </div>

                                {/* Campo: Apellido */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Apellido *
                                    </label>
                                    <input
                                        type="text"
                                        value={personalData.lastName}
                                        onChange={(e) => handlePersonalDataChange('lastName', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder="Tu apellido"
                                        required
                                    />
                                </div>

                                {/* Campo: Cédula */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Cédula *
                                    </label>
                                    <input
                                        type="text"
                                        value={personalData.idNumber}
                                        onChange={(e) => handlePersonalDataChange('idNumber', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder="12345678"
                                        required
                                    />
                                </div>

                                {/* Campo: Email */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Correo Electrónico (opcional)
                                    </label>
                                    <input
                                        type="email"
                                        value={personalData.email}
                                        onChange={(e) => handlePersonalDataChange('email', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder="tu@email.com"
                                    />
                                </div>

                                {/* Campo: Teléfono */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Teléfono *
                                    </label>
                                    <input
                                        type="tel"
                                        value={personalData.phone}
                                        onChange={(e) => handlePersonalDataChange('phone', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder="+57 300 123 4567"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECCIÓN: Información del Restaurante */}
                    {activeTab === 'restaurant' && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold text-primary-first mb-6 flex items-center">
                                <span className="mr-3">🏪</span>
                                Información del Restaurante
                            </h2>

                            <div className="space-y-6">
                                {/* Información básica del restaurante */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Campo: Nombre del restaurante */}
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Nombre del Restaurante *
                                        </label>
                                        <input
                                            type="text"
                                            value={restaurantData.restaurantName}
                                            onChange={(e) => handleRestaurantDataChange('restaurantName', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                            placeholder="Nombre de tu restaurante"
                                            required
                                        />
                                    </div>

                                    {/* Campo: Descripción */}
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Descripción
                                        </label>
                                        <textarea
                                            value={restaurantData.description}
                                            onChange={(e) => handleRestaurantDataChange('description', e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300 resize-none"
                                            placeholder="Describe tu restaurante, especialidades, ambiente..."
                                        />
                                    </div>

                                    {/* Campo: Ubicación */}
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Ubicación *
                                        </label>
                                        <input
                                            type="text"
                                            value={restaurantData.location}
                                            onChange={(e) => handleRestaurantDataChange('location', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                            placeholder="Dirección completa del restaurante"
                                            required
                                        />
                                    </div>

                                    {/* Campo: Horario de apertura */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Horario de Apertura
                                        </label>
                                        <input
                                            type="time"
                                            value={restaurantData.openingTime}
                                            onChange={(e) => handleRestaurantDataChange('openingTime', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        />
                                    </div>

                                    {/* Campo: Horario de cierre */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Horario de Cierre
                                        </label>
                                        <input
                                            type="time"
                                            value={restaurantData.closingTime}
                                            onChange={(e) => handleRestaurantDataChange('closingTime', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        />
                                    </div>

                                    {/* Campo: Capacidad */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Capacidad (personas)
                                        </label>
                                        <input
                                            type="number"
                                            value={restaurantData.capacity}
                                            onChange={(e) => handleRestaurantDataChange('capacity', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                            placeholder="50"
                                            min="1"
                                        />
                                    </div>

                                    {/* Campo: Teléfono del restaurante */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Teléfono del Restaurante
                                        </label>
                                        <input
                                            type="tel"
                                            value={restaurantData.phone}
                                            onChange={(e) => handleRestaurantDataChange('phone', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                            placeholder="+57 1 234 5678"
                                        />
                                    </div>

                                    {/* Campo: Red social */}
                                    <div>
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Red Social
                                        </label>
                                        <input
                                            type="text"
                                            value={restaurantData.socialMedia}
                                            onChange={(e) => handleRestaurantDataChange('socialMedia', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                            placeholder="ej para instagram: @TremendoTerritorio"
                                        />
                                    </div>
                                </div>

                                {/* SUBSECCIÓN: Productos requeridos dinámicos */}
                                <div className="md:col-span-2">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <span className="mr-2">🌱</span>
                                        Productos Requeridos en el Restaurante
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        {restaurantData.requires?.map((product, index) => (
                                            <div key={product.id} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
                                                {/* Header del producto con opción de eliminar */}
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="text-lg font-medium text-gray-700">
                                                        Producto {index + 1}
                                                    </h4>
                                                    {restaurantData.requires.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeRestaurantProduct(product.id)}
                                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                                                            title="Eliminar producto"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Campos del producto */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {/* Nombre del producto */}
                                                    <div>
                                                        <label className="block text-gray-700 font-medium mb-2">
                                                            Producto que requiere *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={product.productName}
                                                            onChange={(e) => handleRestaurantProductChange(product.id, 'productName', e.target.value)}
                                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                                            placeholder="ej: Yuca, Tomate, Maíz..."
                                                        />
                                                    </div>

                                                    {/* Unidad de medida */}
                                                    <div>
                                                        <label className="block text-gray-700 font-medium mb-2">
                                                            Unidad de medida *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={product.unitOfMeasurement}
                                                            onChange={(e) => handleRestaurantProductChange(product.id, 'unitOfMeasurement', e.target.value)}
                                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                                            placeholder="ej: kg, g, lb, ton..."
                                                        />
                                                    </div>

                                                    {/* Cantidad requerida */}
                                                    <div>
                                                        <label className="block text-gray-700 font-medium mb-2">
                                                            Cantidad Requerida *
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={product.requiredQuantity}
                                                            onChange={(e) => handleRestaurantProductChange(product.id, 'requiredQuantity', e.target.value)}
                                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                                            placeholder="ej: 100"
                                                            min="0"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Botón para agregar producto manualmente */}
                                    <div className="flex justify-center mt-4">
                                        <ButtonSecondary
                                            type="button"
                                            onClick={addNewRestaurantProduct}
                                        >
                                            ➕ Agregar otro producto
                                        </ButtonSecondary>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECCIÓN: Imágenes del Restaurante */}
                    {activeTab === 'images' && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold text-primary-first mb-6 flex items-center">
                                <span className="mr-3">📸</span>
                                Imágenes del Restaurante
                            </h2>

                            {/* Vista previa del carrusel si hay imágenes */}
                            {images.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-medium text-gray-700 mb-4">Vista Previa</h3>
                                    <ImageCarousel images={images} />
                                </div>
                            )}

                            {/* Zona de carga de imágenes */}
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

                                {/* Lista de imágenes cargadas */}
                                {images.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-700 mb-4">
                                            Imágenes Cargadas ({images.length})
                                        </h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {images.map((image, index) => (
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

                    {/* Botón de envío del formulario */}
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
                                '📩 Actualizar Perfil'
                            )}
                        </ButtonPrimary>
                    </div>
                </form>
            </div>
        </div>
    );
};