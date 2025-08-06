import React, { useContext } from 'react';
import { GetContext } from '../../../../contexts/UsersInformation/UsersInformation'
import { ImageCarousel } from '../ImageCarousel/ImageCarousel';

export const UserProfileForm = () => {
    const {
            personalData, 
            farmData,
            restaurantImages,
            uploading, 
            fileInputRef,
            activeTab, 
            setActiveTab,
            isSubmitting, 
            handlePersonalDataChange,
            handleFarmDataChange,
            handleProductChange,
            addNewProduct,
            removeProduct,
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
                    Mantén actualizada la información de tu finca
                </p>
            </div>
            {/* Tabs */}
            <div className="flex flex-wrap justify-center mb-8 bg-white rounded-2xl p-2 shadow-lg">
                {[
                    { id: 'personal', label: 'Datos Personales', icon: '👦🏾' },
                    { id: 'farm', label: 'Finca', icon: '🏡' },
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
                                    Correo Electrónico (opcional)
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
                {/* Información de la finca */}
                {activeTab === 'farm' && (
                    <div className="bg-white rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold text-primary-first mb-6 flex items-center">
                            <span className="mr-3">🏡</span>
                            Información de la Finca
                        </h2>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Nombre de la Finca *
                                    </label>
                                    <input
                                        type="text"
                                        value={farmData.farmName}
                                        onChange={(e) => handleFarmDataChange('farmName', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder="Nombre de tu finca"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Descripción
                                    </label>
                                    <textarea
                                        value={farmData.description}
                                        onChange={(e) => handleFarmDataChange('description', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300 resize-none"
                                        placeholder="Describe tu finca, especialidades, tipo de cultivos..."
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        Ubicación *
                                    </label>
                                    <input
                                        type="text"
                                        value={farmData.location}
                                        onChange={(e) => handleFarmDataChange('location', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder="Dirección completa de la finca"
                                        required
                                    />
                                </div>
                            </div>
                
                            {/* Sección de Productos Dinámicos - CORREGIDA */}
                            <div className="md:col-span-2">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <span className="mr-2">🌱</span>
                                    Productos de la Finca
                                </h3>
                                <div className="space-y-4">
                                    {farmData.offers?.map((product, index) => (
                                        <div key={product.id} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
                                            <div className="flex justify-between items-center mb-4">
                                                <h4 className="text-lg font-medium text-gray-700">
                                                    Producto {index + 1}
                                                </h4>
                                                {farmData.offers.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeProduct(product.id)}
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                                                        title="Eliminar producto"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 font-medium mb-2">
                                                        Producto que ofrece *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={product.productName}
                                                        onChange={(e) => handleProductChange(product.id, 'productName', e.target.value)}
                                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                                        placeholder="ej: Yuca, Tomate, Maíz..."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 font-medium mb-2">
                                                        Unidad de medida *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={product.unitOfMeasurement}
                                                        onChange={(e) => handleProductChange(product.id, 'unitOfMeasurement', e.target.value)}
                                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                                        placeholder="ej: kg, g, lb, ton..."
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-700 font-medium mb-2">
                                                        Capacidad de producción *
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={product.productionCapacity}
                                                        onChange={(e) => handleProductChange(product.id, 'productionCapacity', e.target.value)}
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
                                    <button
                                        type="button"
                                        onClick={addNewProduct}
                                        className="flex items-center px-6 py-3 bg-primary-first text-white rounded-xl hover:bg-primary-third transition-all duration-300 shadow-md hover:shadow-lg"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Agregar otro producto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Imágenes de la finca */}
                {activeTab === 'images' && (
                    <div className="bg-white rounded-3xl p-8 shadow-xl">
                        <h2 className="text-2xl font-bold text-primary-first mb-6 flex items-center">
                            <span className="mr-3">📸</span>
                            Imágenes de la Finca Ó Área de Cosecha
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
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                            className="bg-primary-first hover:bg-primary-third text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-50"
                                        >
                                            {uploading ? 'Subiendo...' : 'Seleccionar Imágenes'}
                                        </button>
                                    </div>
                                    <p className="text-gray-500 text-sm">
                                        Selecciona múltiples imágenes de tu Finca
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
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-primary-first to-primary-second text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none"
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
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
};