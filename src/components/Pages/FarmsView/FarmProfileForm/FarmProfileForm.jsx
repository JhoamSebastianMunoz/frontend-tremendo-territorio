import React, { useContext, Suspense } from 'react';
import { GetContext } from '../../../../contexts/UsersInformation/UsersInformation';
import { ImageCarousel } from '../../../Shared/ImageCarousel/ImageCarousel';
import { ButtonPrimary } from '../../../Shared/buttons/ButtonPrimary/ButtonPrimary';
import { ButtonSecondary } from '../../../Shared/buttons/ButtonSecondary/ButtonSecondary';
import { useTranslation } from 'react-i18next';

export const FarmProfileForm = () => {
    const { t, i18n } = useTranslation(["FarmsView"])
    // Extraer valores del contexto con destructuring organizado
    const {
        // Estados principales
        personalData, 
        farmData,
        images,
        
        // Estados de UI
        uploading, 
        fileInputRef,
        activeTab, 
        setActiveTab,
        isSubmitting, 
        
        // Funciones para datos personales
        handlePersonalDataChange,
        
        // Funciones para finca
        handleFarmDataChange,
        handleFarmProductChange,
        addNewFarmProduct,
        removeFarmProduct,
        
        // Funciones para imágenes
        handleFileSelect,
        removeImage,
        
        // Funciones generales
        handleSubmit
    } = useContext(GetContext);

    // Configuración de pestañas para el formulario de finca
    const tabs = [
        { id: 'personal', label: t("FarmProfileForm.tabs.label_1"), icon: '👦🏾' },
        { id: 'farm', label: t("FarmProfileForm.tabs.label_2"), icon: '🏡' },
        { id: 'images', label: t("FarmProfileForm.tabs.label_3"), icon: '📸' }
    ];

    return (
        <Suspense fallback={<p>Loading translation...</p>}>
        <div className="bg-primary-fifth">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header del formulario */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-subtitle font-bold text-primary-first mb-2">
                        {t("FarmProfileForm.subtitle")}
                    </h1>
                    <p className="text-gray-600 text-lg font-body">
                        {t("FarmProfileForm.p")}
                    </p>
                </div>

                {/* Sistema de pestañas navegables */}
                <div className="flex flex-wrap justify-center mb-8 bg-white rounded-2xl p-2 shadow-lg">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 min-w-32 py-3 px-4 rounded-xl font-body font-medium transition-all duration-300 ${
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
                                <span className="mr-3 font-subtitle">👦🏾</span>
                                {t("FarmProfileForm.personal_data.subtitle")}
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Campo: Nombre */}
                                <div>
                                    <label className="block text-gray-700 font-medium font-subtitle mb-2">
                                        {t("FarmProfileForm.personal_data.div_1.label")} *
                                    </label>
                                    <input
                                        type="text"
                                        value={personalData.firstName}
                                        onChange={(e) => handlePersonalDataChange('firstName', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder={t("FarmProfileForm.personal_data.div_1.placeholder")}
                                        required
                                    />
                                </div>

                                {/* Campo: Apellido */}
                                <div>
                                    <label className="block text-gray-700 font-medium font-subtitle mb-2">
                                        {t("FarmProfileForm.personal_data.div_2.label")} *
                                    </label>
                                    <input
                                        type="text"
                                        value={personalData.lastName}
                                        onChange={(e) => handlePersonalDataChange('lastName', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder={t("FarmProfileForm.personal_data.div_2.placeholder")}
                                        required
                                    />
                                </div>

                                {/* Campo: Cédula */}
                                <div>
                                    <label className="block text-gray-700 font-medium font-subtitle mb-2">
                                        {t("FarmProfileForm.personal_data.div_3.label")} *
                                    </label>
                                    <input
                                        type="text"
                                        value={personalData.idNumber}
                                        onChange={(e) => handlePersonalDataChange('idNumber', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder={t("FarmProfileForm.personal_data.div_3.placeholder")}
                                        required
                                    />
                                </div>

                                {/* Campo: Email */}
                                <div>
                                    <label className="block text-gray-700 font-medium font-subtitle mb-2">
                                        {t("FarmProfileForm.personal_data.div_4.label")}
                                    </label>
                                    <input
                                        type="email"
                                        value={personalData.email}
                                        onChange={(e) => handlePersonalDataChange('email', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder={t("FarmProfileForm.personal_data.div_4.placeholder")}
                                    />
                                </div>

                                {/* Campo: Teléfono */}
                                <div>
                                    <label className="block text-gray-700 font-medium font-subtitle mb-2">
                                        {t("FarmProfileForm.personal_data.div_5.label")} *
                                    </label>
                                    <input
                                        type="tel"
                                        value={personalData.phone}
                                        onChange={(e) => handlePersonalDataChange('phone', e.target.value)}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                        placeholder={t("FarmProfileForm.personal_data.div_5.placeholder")}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECCIÓN: Información de la finca */}
                    {activeTab === 'farm' && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold font-subtitle text-primary-first mb-6 flex items-center">
                                <span className="mr-3">🏡</span>
                                {t("FarmProfileForm.farm_data.subtitle")}
                            </h2>

                            <div className="space-y-6">
                                {/* Información básica de la finca */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Campo: Nombre de la finca */}
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-medium font-subtitle mb-2">
                                            {t("FarmProfileForm.farm_data.div_1.label")} *
                                        </label>
                                        <input
                                            type="text"
                                            value={farmData.farmName}
                                            onChange={(e) => handleFarmDataChange('farmName', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                            placeholder={t("FarmProfileForm.farm_data.div_1.placeholder")}
                                            required
                                        />
                                    </div>

                                    {/* Campo: Descripción */}
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-medium font-subtitle mb-2">
                                            {t("FarmProfileForm.farm_data.div_2.label")}
                                        </label>
                                        <textarea
                                            value={farmData.description}
                                            onChange={(e) => handleFarmDataChange('description', e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300 resize-none"
                                            placeholder={t("FarmProfileForm.farm_data.div_2.placeholder")}
                                        />
                                    </div>

                                    {/* Campo: Ubicación */}
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-medium font-subtitle mb-2">
                                            {t("FarmProfileForm.farm_data.div_3.label")} *
                                        </label>
                                        <input
                                            type="text"
                                            value={farmData.location}
                                            onChange={(e) => handleFarmDataChange('location', e.target.value)}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                            placeholder={t("FarmProfileForm.farm_data.div_3.placeholder")}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* SUBSECCIÓN: Productos ofrecidos dinámicos */}
                                <div className="md:col-span-2">
                                    <h3 className="text-xl font-semibold font-subtitle text-gray-800 mb-4 flex items-center">
                                        {t("FarmProfileForm.farm_data.subtitle_2")}
                                    </h3>

                                    <div className="space-y-4">
                                        {farmData.offers?.map((product, index) => (
                                            <div key={product.id} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-100">
                                                {/* Header del producto con opción de eliminar */}
                                                <div className="flex justify-between items-center mb-4">
                                                    <h4 className="text-lg font-medium font-subtitle text-gray-700">
                                                        {t("FarmProfileForm.farm_data.subtitle_3")} {index + 1}
                                                    </h4>
                                                    {farmData.offers.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFarmProduct(product.id)}
                                                            className="font-body text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                                                            title={t("FarmProfileForm.farm_data.delete_button.title")}
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
                                                        <label className="block text-gray-700 font-medium font-subtitle mb-2">
                                                            {t("FarmProfileForm.farm_data.product_fields.div_1.label")} *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={product.productName}
                                                            onChange={(e) => handleFarmProductChange(product.id, 'productName', e.target.value)}
                                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                                            placeholder={t("FarmProfileForm.farm_data.product_fields.div_1.placeholder")}
                                                        />
                                                    </div>

                                                    {/* Unidad de medida */}
                                                    <div>
                                                        <label className="block text-gray-700 font-medium font-subtitle mb-2">
                                                            {t("FarmProfileForm.farm_data.product_fields.div_2.label")} *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={product.unitOfMeasurement}
                                                            onChange={(e) => handleFarmProductChange(product.id, 'unitOfMeasurement', e.target.value)}
                                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                                            placeholder={t("FarmProfileForm.farm_data.product_fields.div_2.placeholder")}
                                                        />
                                                    </div>

                                                    {/* Capacidad de producción */}
                                                    <div>
                                                        <label className="block text-gray-700 font-medium font-subtitle mb-2">
                                                            {t("FarmProfileForm.farm_data.product_fields.div_3.label")} *
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={product.productionCapacity}
                                                            onChange={(e) => handleFarmProductChange(product.id, 'productionCapacity', e.target.value)}
                                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-first focus:ring-4 focus:ring-primary-first focus:ring-opacity-20 outline-none transition-all duration-300"
                                                            placeholder={t("FarmProfileForm.farm_data.product_fields.div_3.placeholder")}
                                                            min="0"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    {/* Botón para agregar producto manualmente */}
                                    <div className="flex justify-center mt-4 font-body">
                                        <ButtonSecondary
                                            type="button"
                                            onClick={addNewFarmProduct}
                                        >
                                            ➕ {t("FarmProfileForm.farm_data.add_button")}
                                        </ButtonSecondary>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECCIÓN: Imágenes de la finca */}
                    {activeTab === 'images' && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold text-primary-first mb-6 flex items-center">
                                <span className="mr-3">📸</span>
                                {t("FarmProfileForm.images_farms.subtitle")}
                            </h2>

                            {/* Vista previa del carrusel si hay imágenes */}
                            {images.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-medium text-gray-700 mb-4">{t("FarmProfileForm.images_farms.ImageCarousel")}</h3>
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
                                                {uploading ? t("FarmProfileForm.images_farms.selected_image_button.uploading") : t("FarmProfileForm.images_farms.selected_image_button.not_uploading")}
                                            </ButtonSecondary>
                                        </div>
                                        <p className="text-gray-500 text-sm">
                                            {t("FarmProfileForm.images_farms.p")}
                                        </p>
                                    </div>
                                </div>

                                {/* Lista de imágenes cargadas */}
                                {images.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-700 mb-4">
                                            {t("FarmProfileForm.images_farms.uploaded_images")} ({images.length})
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
                        <button className='bg-primary-first font-body hover:bg-primary-third text-white px-6 py-3 rounded-2xl text-lg font-semibold font-primary-brand transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4'
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {t("FarmProfileForm.images_farms.form_submission.isSubmitting")}
                                </span>
                            ) : (
                                `📩 ${t("FarmProfileForm.images_farms.form_submission.not_isSubmitting")}`
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </Suspense>
    );
};