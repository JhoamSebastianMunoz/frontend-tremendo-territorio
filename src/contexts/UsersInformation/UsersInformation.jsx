import { createContext, useState, useRef } from "react";

export const GetContext = createContext();

export const GetUsersInformationProvider = ({children}) => {

    // Estado para datos personales del usuario
    const [personalData, setPersonalData] = useState({
        firstName: '',
        lastName: '',
        idNumber: '',
        email: '',
        phone: ''
    });

    // Estado para información del restaurante con productos dinámicos
    const [restaurantData, setRestaurantData] = useState({
        restaurantName: '',
        description: '',
        location: '',
        openingTime: '',
        closingTime: '',
        capacity: '',
        phone: '',
        socialMedia: '',
        requires: [
            {
                id: 1,
                productName: '',
                unitOfMeasurement: '',
                requiredQuantity: ''
            }
        ]
    });

    // Estado para la información de la finca del agricultor
    const [farmData, setFarmData] = useState({
        farmName: '',
        description: '',
        location: '',
        offers: [
            {
                id: 1,
                productName: '',
                unitOfMeasurement: '',
                productionCapacity: ''
            }
        ]
    });

    // Estado para imágenes compartidas (restaurante/finca)
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    // Estados de interfaz de usuario
    const [activeTab, setActiveTab] = useState('personal');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // FUNCIONES PARA MANEJAR DATOS PERSONALES
    const handlePersonalDataChange = (field, value) => {
        setPersonalData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // FUNCIONES PARA MANEJAR DATOS DEL RESTAURANTE
    const handleRestaurantDataChange = (field, value) => {
        setRestaurantData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Manejar cambios en productos requeridos por el restaurante
    const handleRestaurantProductChange = (productId, field, value) => {
        setRestaurantData(prev => ({
            ...prev,
            requires: prev.requires.map(require => 
                require.id === productId 
                    ? { ...require, [field]: value }
                    : require
            )
        }));

        // Auto-agregar nuevo producto si todos los campos del actual están completos
        const currentProduct = restaurantData.requires.find(r => r.id === productId);
        if (currentProduct && field === 'requiredQuantity' && value.trim() !== '') {
            const updatedProduct = { ...currentProduct, [field]: value };
            if (updatedProduct.productName.trim() !== '' && 
                updatedProduct.unitOfMeasurement.trim() !== '' && 
                updatedProduct.requiredQuantity.trim() !== '') {
                addNewRestaurantProduct();
            }
        }
    };

    // Agregar nuevo producto requerido para el restaurante
    const addNewRestaurantProduct = () => {
        const lastProduct = restaurantData.requires[restaurantData.requires.length - 1];
        if (lastProduct.productName.trim() !== '' && 
            lastProduct.unitOfMeasurement.trim() !== '' && 
            lastProduct.requiredQuantity.trim() !== '') {
            
            setRestaurantData(prev => ({
                ...prev,
                requires: [
                    ...prev.requires,
                    {
                        id: Date.now(), // ID único basado en timestamp
                        productName: '',
                        unitOfMeasurement: '',
                        requiredQuantity: ''
                    }
                ]
            }));
        }
    };

    // Eliminar producto requerido del restaurante
    const removeRestaurantProduct = (productId) => {
        if (restaurantData.requires.length > 1) {
            setRestaurantData(prev => ({
                ...prev,
                requires: prev.requires.filter(require => require.id !== productId)
            }));
        }
    };

    // FUNCIONES PARA MANEJAR DATOS DE LA FINCA
    const handleFarmDataChange = (field, value) => {
        setFarmData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Manejar cambios en productos ofrecidos por la finca
    const handleFarmProductChange = (productId, field, value) => {
        setFarmData(prev => ({
            ...prev,
            offers: prev.offers.map(offer => 
                offer.id === productId 
                    ? { ...offer, [field]: value }
                    : offer
            )
        }));

        // Auto-agregar nuevo producto si todos los campos del actual están completos
        const currentProduct = farmData.offers.find(o => o.id === productId);
        if (currentProduct && field === 'productionCapacity' && value.trim() !== '') {
            const updatedProduct = { ...currentProduct, [field]: value };
            if (updatedProduct.productName.trim() !== '' && 
                updatedProduct.unitOfMeasurement.trim() !== '' && 
                updatedProduct.productionCapacity.trim() !== '') {
                addNewFarmProduct();
            }
        }
    };

    // Agregar nuevo producto ofrecido por la finca
    const addNewFarmProduct = () => {
        const lastProduct = farmData.offers[farmData.offers.length - 1];
        if (lastProduct.productName.trim() !== '' && 
            lastProduct.unitOfMeasurement.trim() !== '' && 
            lastProduct.productionCapacity.trim() !== '') {
            
            setFarmData(prev => ({
                ...prev,
                offers: [
                    ...prev.offers,
                    {
                        id: Date.now(), // ID único basado en timestamp
                        productName: '',
                        unitOfMeasurement: '',
                        productionCapacity: ''
                    }
                ]
            }));
        }
    };

    // Eliminar producto ofrecido por la finca
    const removeFarmProduct = (productId) => {
        if (farmData.offers.length > 1) {
            setFarmData(prev => ({
                ...prev,
                offers: prev.offers.filter(offer => offer.id !== productId)
            }));
        }
    };

    // FUNCIONES PARA MANEJAR IMÁGENES
    // Simular proceso de subida de imágenes
    const handleImageUpload = async (files) => {
        setUploading(true);
        
        try {
            // Procesar cada archivo seleccionado
            for (const file of files) {
                // Validar tipo de archivo
                if (!file.type.startsWith('image/')) {
                    console.warn(`Archivo ${file.name} no es una imagen válida`);
                    continue;
                }

                // Crear URL temporal para vista previa
                const imageUrl = URL.createObjectURL(file);
                const newImage = {
                    url: imageUrl,
                    alt: `Imagen del usuario ${images.length + 1}`,
                    file: file,
                    name: file.name
                };
                
                setImages(prev => [...prev, newImage]);
                
                // Simular delay de subida para UX realista
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        } catch (error) {
            console.error('Error al subir imágenes:', error);
        } finally {
            setUploading(false);
        }
    };

    // Manejar selección de archivos desde el input
    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleImageUpload(files);
        }
        // Limpiar el input para permitir seleccionar los mismos archivos nuevamente
        e.target.value = '';
    };

    // Eliminar imagen específica por índice
    const removeImage = (index) => {
        const imageToRemove = images[index];
        
        // Liberar memoria del objeto URL creado
        if (imageToRemove?.url) {
            URL.revokeObjectURL(imageToRemove.url);
        }
        
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    // FUNCIÓN PARA ENVIAR FORMULARIO
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validar datos requeridos antes del envío
            if (!personalData.firstName.trim() || !personalData.lastName.trim()) {
                throw new Error('Los campos nombre y apellido son obligatorios');
            }

            // Simular proceso de envío a servidor
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Preparar datos para envío
            const formData = {
                personal: personalData,
                restaurant: restaurantData,
                farm: farmData,
                images: images
            };
            
            console.log('Datos preparados para envío:', formData);
            alert('Perfil actualizado exitosamente');
            
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            alert(`Error al actualizar perfil: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Función para resetear formulario
    const resetForm = () => {
        setPersonalData({
            firstName: '',
            lastName: '',
            idNumber: '',
            email: '',
            phone: ''
        });
        setRestaurantData({
            restaurantName: '',
            description: '',
            location: '',
            openingTime: '',
            closingTime: '',
            capacity: '',
            phone: '',
            socialMedia: '',
            requires: [
                {
                    id: 1,
                    productName: '',
                    unitOfMeasurement: '',
                    requiredQuantity: ''
                }
            ]
        });
        setFarmData({
            farmName: '',
            description: '',
            location: '',
            offers: [
                {
                    id: 1,
                    productName: '',
                    unitOfMeasurement: '',
                    productionCapacity: ''
                }
            ]
        });
        setImages([]);
        setActiveTab('personal');
    };

    // Valores y funciones disponibles para componentes hijos
    const contextValue = {
        // Estados principales
        personalData, 
        setPersonalData,
        restaurantData, 
        setRestaurantData,
        farmData,
        setFarmData,
        images,
        setImages,
        
        // Estados de UI
        uploading, 
        setUploading,
        fileInputRef,
        activeTab, 
        setActiveTab,
        isSubmitting, 
        setIsSubmitting,
        
        // Funciones para datos personales
        handlePersonalDataChange,
        
        // Funciones para restaurante
        handleRestaurantDataChange,
        handleRestaurantProductChange,
        addNewRestaurantProduct,
        removeRestaurantProduct,
        
        // Funciones para finca
        handleFarmDataChange,
        handleFarmProductChange,
        addNewFarmProduct,
        removeFarmProduct,
        
        // Funciones para imágenes
        handleImageUpload,
        handleFileSelect,
        removeImage,
        
        // Funciones generales
        handleSubmit,
        resetForm
    };

    return(
        <GetContext.Provider value={contextValue}>
            {children}
        </GetContext.Provider>
    );
};