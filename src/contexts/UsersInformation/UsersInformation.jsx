import { createContext, useState, useRef } from "react";

export const GetContext = createContext();

export const GetUsersInformationProvider = ({children}) =>{

    // Estado para datos personales
    const [personalData, setPersonalData] = useState({
        nombre: '',
        apellido: '',
        cedula: '',
        email: '',
        telefono: ''
    });

    // Estado para información del restaurante - actualizado con productos dinámicos
    const [restaurantData, setRestaurantData] = useState({
        nombreRestaurante: '',
        descripcion: '',
        ubicacion: '',
        horarioApertura: '',
        horarioCierre: '',
        capacidad: '',
        telefono: '',
        sitioWeb: '',
        productos: [
            {
                id: 1,
                nombre: '',
                unidadMedida: '',
                capacidadProduccion: ''
            }
        ]
    });

    // Estado para la información de la finca de agricultor
    const [farmData, setFarmtData] = useState({
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

    // Estado para imágenes del restaurante y del agricultor
    const [restaurantImages, setRestaurantImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    // Estados de UI
    const [activeTab, setActiveTab] = useState('personal');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Manejar cambios en datos personales
    const handlePersonalDataChange = (field, value) => {
        setPersonalData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Manejar cambios en datos del restaurante
    const handleRestaurantDataChange = (field, value) => {
        setRestaurantData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Manejar Cambios en datos de la finca
    const handleFarmDataChange = (field, value) => {
        setFarmtData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Manejar cambios en productos específicos
    const handleProductChange = (productId, field, value) => {
        setFarmtData(prev => ({
            ...prev,
            offers: prev.offers.map(offer => 
                offer.id === productId 
                    ? { ...offer, [field]: value }
                    : offer
            )
        }));

        // Auto-agregar nuevo producto si todos los campos del actual están llenos
        const currentProduct = farmData.offers.find(o => o.id === productId);
        if (currentProduct && field === 'productionCapacity' && value.trim() !== '') {
            const updatedProduct = { ...currentProduct, [field]: value };
            if (updatedProduct.productName.trim() !== '' && 
                updatedProduct.unitOfMeasurement.trim() !== '' && 
                updatedProduct.productionCapacity.trim() !== '') {
                addNewProduct();
            }
        }
    };

    // Agregar nuevo producto
    const addNewProduct = () => {
        const lastProduct = farmData.offers[farmData.offers.length - 1];
        if (lastProduct.productName.trim() !== '' && 
            lastProduct.unitOfMeasurement.trim() !== '' && 
            lastProduct.productionCapacity.trim() !== '') {
            
            setFarmtData(prev => ({
                ...prev,
                offers: [
                    ...prev.offers,
                    {
                        id: Date.now(), // ID único simple
                        productName: '',
                        unitOfMeasurement: '',
                        productionCapacity: ''
                    }
                ]
            }));
        }
    };

    // Eliminar producto
    const removeProduct = (productId) => {
        if (farmData.offers.length > 1) {
            setFarmtData(prev => ({
                ...prev,
                offers: prev.offers.filter(offer => offer.id !== productId)
            }));
        }
    };

    // Simular subida de imágenes
    const handleImageUpload = async (files) => {
        setUploading(true);
        
        // Simular proceso de subida
        for (const file of files) {
            // Crear URL temporal para preview
            const imageUrl = URL.createObjectURL(file);
            const newImage = {
                url: imageUrl,
                alt: `Imagen del usuario ${restaurantImages.length + 1}`,
                file: file
            };
            
            setRestaurantImages(prev => [...prev, newImage]);
            
            // Simular delay de subida
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        setUploading(false);
    };

    // Manejar selección de archivos
    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleImageUpload(files);
        }
    };

    // Eliminar imagen
    const removeImage = (index) => {
        setRestaurantImages(prev => prev.filter((_, i) => i !== index));
    };

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simular envío de datos
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            const formData = {
                personal: personalData,
                restaurant: restaurantData,
                farm: farmData,
                images: restaurantImages
            };
            
            console.log('Datos enviados:', formData);
            alert('Perfil actualizado exitosamente');
            
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            alert('Error al actualizar perfil');
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <GetContext.Provider
        value={{
            personalData, 
            setPersonalData,
            restaurantData, 
            setRestaurantData,
            farmData,
            setFarmtData,
            restaurantImages,
            setRestaurantImages,
            uploading, 
            setUploading,
            fileInputRef,
            activeTab, 
            setActiveTab,
            isSubmitting, 
            setIsSubmitting,
            handlePersonalDataChange,
            handleRestaurantDataChange,
            handleFarmDataChange,
            handleProductChange,
            addNewProduct,
            removeProduct,
            handleImageUpload,
            handleFileSelect,
            removeImage,
            handleSubmit
        }}>
            {children}
        </GetContext.Provider>
    )
}