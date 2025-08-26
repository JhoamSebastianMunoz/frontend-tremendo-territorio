import React, { useState } from 'react';

export const Crops = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Lista de productos/cultivos con información detallada
  const products = [
    {   
      category: 'Legumbres y Granos Verdes',
      name: 'Maíz',
      variety: 'Maíz Criollo Amarillo',
      method: 'Cultivo Tradicional Orgánico',
      seedType: 'Semilla Comercial',
      plantingDate: '15 Abril 2025',
      harvestDate: '20 Agosto 2025',
      quantity: '2.5 Toneladas',
      seedOrigin: 'Semillas Ancestrales Valle del Cauca',
      contact: 'Jorge Ramírez - Tel: 312 456 7890',
      cycle: '120 días',
      status: 'En cosecha'
    },
    {   
      category: 'Frutas Tropicales Exóticas',
      name: 'Cereza',
      variety: 'Maíz Criollo Amarillo',
      method: 'Cultivo Tradicional Orgánico',
      seedType: 'Semilla Comercial',
      plantingDate: '15 Abril 2025',
      harvestDate: '20 Agosto 2025',
      quantity: '2.5 Toneladas',
      seedOrigin: 'Semillas Ancestrales Valle del Cauca',
      contact: 'Jorge Ramírez - Tel: 312 456 7890',
      cycle: '120 días',
      status: 'En cosecha'
    },
    { 
      category: 'Hortalizas de Hoja',
      name: 'Lechugas',
      variety: 'Lechuga Crespa Verde',
      method: 'Hidroponia Vertical',
      seedType: 'Semilla Donada',
      plantingDate: '01 Mayo 2025',
      harvestDate: '15 Agosto 2025',
      quantity: '800 Unidades',
      seedOrigin: 'Semillas del Huerto SAS',
      contact: 'María González - Tel: 301 234 5678',
      cycle: '75 días',
      status: 'Listo para cosecha'
    },
    { 
      category: 'Hortalizas de Hoja',
      name: 'Espinaca',
      variety: 'Espinaca Baby Leaf',
      method: 'Cultivo en Surcos',
      seedType: 'Semilla Comercial',
      plantingDate: '10 Mayo 2025',
      harvestDate: '25 Julio 2025',
      quantity: '150 Kg',
      seedOrigin: 'Cooperativa Agrícola La Esperanza',
      contact: 'Carlos Vega - Tel: 315 678 9012',
      cycle: '45 días',
      status: 'En crecimiento'
    },
    { 
      category: 'Hortalizas de Fruto',
      name: 'Tomate',
      variety: 'Tomate Chonto Híbrido',
      method: 'Invernadero Tecnificado',
      seedType: 'Semilla Donada',
      plantingDate: '20 Abril 2025',
      harvestDate: '10 Agosto 2025',
      quantity: '1.8 Toneladas',
      seedOrigin: 'Agrosemillas del Valle',
      contact: 'Ana Morales - Tel: 317 890 1234',
      cycle: '110 días',
      status: 'Floración'
    },
    { 
      category: 'Bulbos y Tallos',
      name: 'Cebolla',
      variety: 'Cebolla Cabezona Blanca',
      method: 'Cultivo a Campo Abierto',
      seedType: 'Semilla Comercial',
      plantingDate: '05 Marzo 2025',
      harvestDate: '15 Agosto 2025',
      quantity: '950 Kg',
      seedOrigin: 'Semillas Nativas del Quindío',
      contact: 'Pedro López - Tel: 320 123 4567',
      cycle: '160 días',
      status: 'Desarrollo de bulbo'
    },
    { 
      category: 'Hortalizas de Fruto',
      name: 'Pimentón',
      variety: 'Pimentón Dulce California',
      method: 'Cultivo Protegido',
      seedType: 'Semilla Comercial',
      plantingDate: '12 Mayo 2025',
      harvestDate: '28 Agosto 2025',
      quantity: '600 Kg',
      seedOrigin: 'Semillas Premium Andinas',
      contact: 'Lucía Herrera - Tel: 318 345 6789',
      cycle: '108 días',
      status: 'Formación de fruto'
    },
    { 
      category: 'Hortalizas de Raíz y Tubérculos',
      name: 'Papas',
      variety: 'Papa Criolla',
      method: 'Cultivo Tradicional',
      seedType: 'Tubérculo Comercial',
      plantingDate: '25 Febrero 2025',
      harvestDate: '05 Julio 2025',
      quantity: '3.2 Toneladas',
      seedOrigin: 'Tubérculos Semilla Boyacá',
      contact: 'Roberto Silva - Tel: 314 567 8901',
      cycle: '130 días',
      status: 'Cosechado'
    },
    { 
      category: 'Condimentos y Aromáticas Frescas',
      name: 'Cilantro',
      variety: 'Cilantro Liso Nacional',
      method: 'Cultivo Orgánico en Camas',
      seedType: 'Semilla Donada',
      plantingDate: '01 Junio 2025',
      harvestDate: '20 Julio 2025',
      quantity: '80 Kg',
      seedOrigin: 'Semillas Orgánicas Colombia',
      contact: 'Elena Ruiz - Tel: 311 678 9012',
      cycle: '50 días',
      status: 'Listo para corte'
    },
    { 
      category: 'Condimentos y Aromáticas Frescas',
      name: 'Perejil',
      variety: 'Perejil Crespo',
      method: 'Cultivo en Macetas',
      seedType: 'Semilla Donada',
      plantingDate: '15 Mayo 2025',
      harvestDate: '30 Julio 2025',
      quantity: '45 Kg',
      seedOrigin: 'Hierbas Frescas del Campo',
      contact: 'Miguel Torres - Tel: 319 234 5678',
      cycle: '75 días',
      status: 'En desarrollo'
    },
    { 
      category: 'Legumbres y Granos Verdes',
      name: 'Frijol',
      variety: 'Frijol Calima Rojo',
      method: 'Cultivo Asociado con Maíz',
      seedType: 'Semilla Autogenerada',
      plantingDate: '20 Marzo 2025',
      harvestDate: '15 Agosto 2025',
      quantity: '1.1 Toneladas',
      seedOrigin: 'Semillas Criollas del Tolima',
      contact: 'Carmen Díaz - Tel: 316 789 0123',
      cycle: '147 días',
      status: 'Llenado de vaina'
    }
  ];

  // Mapeo de categorías con sus respectivos colores y configuraciones
  const categoryMapping = {
    'Hortalizas de Hoja': {
      id: 1,
      displayName: 'Hortalizas de Hoja',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      accentColor: 'bg-green-500'
    },
    'Hortalizas de Fruto': {
      id: 2,
      displayName: 'Hortalizas de Fruto',
      color: 'from-red-400 to-pink-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      accentColor: 'bg-red-500'
    },
    'Hortalizas de Raíz y Tubérculos': {
      id: 3,
      displayName: 'Raíces y Tubérculos',
      color: 'from-orange-400 to-amber-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      accentColor: 'bg-orange-500'
    },
    'Legumbres y Granos Verdes': {
      id: 4,
      displayName: 'Legumbres y Granos',
      color: 'from-yellow-400 to-amber-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      accentColor: 'bg-yellow-500'
    },
    'Condimentos y Aromáticas Frescas': {
      id: 5,
      displayName: 'Aromáticas y Condimentos',
      color: 'from-purple-400 to-violet-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      accentColor: 'bg-purple-500'
    },
    'Bulbos y Tallos': {
      id: 6,
      displayName: 'Bulbos y Tallos',
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      accentColor: 'bg-blue-500'
    }
  };

  // Función para obtener color de estado
  const getStatusColor = (status) => {
    const statusColors = {
      'En cosecha': 'bg-green-500 text-white',
      'Listo para cosecha': 'bg-emerald-500 text-white',
      'Listo para corte': 'bg-emerald-600 text-white',
      'En crecimiento': 'bg-blue-500 text-white',
      'Floración': 'bg-pink-500 text-white',
      'Desarrollo de bulbo': 'bg-amber-500 text-white',
      'Formación de fruto': 'bg-orange-500 text-white',
      'Cosechado': 'bg-gray-600 text-white',
      'En desarrollo': 'bg-indigo-500 text-white',
      'Llenado de vaina': 'bg-yellow-600 text-white'
    };
    return statusColors[status] || 'bg-gray-400 text-white';
  };

  // Obtener categorías únicas dinámicamente desde los productos
  const categories = Object.values(categoryMapping).filter(category => 
    products.some(product => categoryMapping[product.category]?.id === category.id)
  );

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedCrop(null);
    setSearchTerm('');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedCrop(null);
    setSearchTerm('');
  };

  const filteredProducts = selectedCategory 
    ? products.filter(product => 
        product.category === Object.keys(categoryMapping).find(key => 
          categoryMapping[key].id === selectedCategory.id
        ) && product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🌱</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-primary-first bg-clip-text text-transparent">
                  Mis Cultivos
                </h1>
                <p className="text-sm text-gray-500">Sistema de Trazabilidad Agrícola</p>
              </div>
            </div>
            
            {(selectedCategory || selectedCrop) && (
              <button
                onClick={selectedCrop ? () => setSelectedCrop(null) : handleBackToCategories}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span>←</span>
                {selectedCrop ? 'Volver a productos' : 'Volver a categorías'}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modal/Detalles del cultivo seleccionado */}
        {selectedCrop && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-20 h-20 ${selectedCategory?.accentColor || 'bg-gray-500'} rounded-xl flex items-center justify-center`}>
                      <span className="text-white font-bold text-2xl">{selectedCrop.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-1">
                        {selectedCrop.name}
                      </h3>
                      <p className="text-lg text-gray-600 font-medium">{selectedCrop.variety}</p>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getStatusColor(selectedCrop.status)}`}>
                        {selectedCrop.status}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Botón para regresar a categorías principales */}
                    <button
                      onClick={() => {
                        setSelectedCrop(null);
                        setSelectedCategory(null);
                        setSearchTerm('');
                      }}
                      className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all mr-2"
                      title="Volver a todas las categorías"
                    >
                      <span>⟨⟨</span>
                      <span>Categorías</span>
                    </button>

                    {/* Navegación entre cultivos */}
                    <div className="flex items-center gap-1 mr-4 border-l border-gray-200 pl-4">
                      <button
                        onClick={() => {
                          const currentIndex = filteredProducts.findIndex(p => p === selectedCrop);
                          const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredProducts.length - 1;
                          setSelectedCrop(filteredProducts[prevIndex]);
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                        title="Cultivo anterior"
                      >
                        <span>←</span>
                      </button>
                      
                      <span className="text-sm text-gray-500 px-2">
                        {filteredProducts.findIndex(p => p === selectedCrop) + 1} de {filteredProducts.length}
                      </span>
                      
                      <button
                        onClick={() => {
                          const currentIndex = filteredProducts.findIndex(p => p === selectedCrop);
                          const nextIndex = currentIndex < filteredProducts.length - 1 ? currentIndex + 1 : 0;
                          setSelectedCrop(filteredProducts[nextIndex]);
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                        title="Siguiente cultivo"
                      >
                        <span>→</span>
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedCrop(null)}
                      className="text-gray-400 hover:text-gray-600 text-2xl font-bold p-2"
                      title="Cerrar detalles"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Información de cultivo */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-green-500 rounded text-white text-center text-xs leading-6">i</span>
                      Información de Cultivo
                    </h4>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <span className="text-sm font-medium text-gray-500">Método de Cultivo:</span>
                      <p className="text-gray-800 font-medium">{selectedCrop.method}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <span className="text-sm font-medium text-gray-500">Tipo de Semilla:</span>
                      <p className="text-gray-800 font-medium">{selectedCrop.seedType}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <span className="text-sm font-medium text-gray-500">Ciclo de Cultivo:</span>
                      <p className="text-gray-800 font-medium">{selectedCrop.cycle}</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                      <span className="text-sm font-medium text-gray-500">Cantidad Esperada:</span>
                      <p className="text-gray-800 font-bold text-xl">{selectedCrop.quantity}</p>
                    </div>
                  </div>

                  {/* Fechas y origen */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-500 rounded text-white text-center text-xs leading-6">F</span>
                      Fechas y Origen
                    </h4>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <span className="text-sm font-medium text-gray-500">Fecha de Siembra:</span>
                      <p className="text-gray-800 font-medium">{selectedCrop.plantingDate}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <span className="text-sm font-medium text-gray-500">Fecha de Cosecha:</span>
                      <p className="text-gray-800 font-medium">{selectedCrop.harvestDate}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <span className="text-sm font-medium text-gray-500">Origen de Semilla:</span>
                      <p className="text-gray-800 font-medium text-sm">{selectedCrop.seedOrigin}</p>
                    </div>
                  </div>
                </div>

                {/* Contacto del proveedor */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-6 h-6 bg-purple-500 rounded text-white text-center text-xs leading-6">T</span>
                    Contacto Proveedor de Semillas
                  </h4>
                  <p className="text-gray-700">{selectedCrop.contact}</p>
                </div>

                {/* Navegación rápida entre cultivos */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium text-gray-700">
                      Otros cultivos en {selectedCategory?.displayName}
                    </h4>
                    <button
                      onClick={() => {
                        setSelectedCrop(null);
                        setSelectedCategory(null);
                        setSearchTerm('');
                      }}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                    >
                      Ver todas las categorías
                      <span>→</span>
                    </button>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {filteredProducts.map((product, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedCrop(product)}
                        className={`flex-shrink-0 p-3 rounded-xl border-2 transition-all duration-200 ${
                          product === selectedCrop
                            ? `${selectedCategory?.borderColor} ${selectedCategory?.bgColor} ${selectedCategory?.textColor} font-bold`
                            : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                        }`}
                        title={`${product.name} - ${product.status}`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <div className={`w-8 h-8 ${product === selectedCrop ? selectedCategory?.accentColor : 'bg-gray-300'} rounded-lg flex items-center justify-center`}>
                            <span className="text-white font-bold text-sm">{product.name.charAt(0)}</span>
                          </div>
                          <span className="text-xs whitespace-nowrap max-w-16 overflow-hidden text-ellipsis">
                            {product.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!selectedCategory ? (
          /* Vista de Categorías */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Sistema de Trazabilidad Agrícola
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Gestiona y monitorea tus cultivos por categorías con información detallada de trazabilidad
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const categoryProducts = products.filter(p => 
                  categoryMapping[p.category]?.id === category.id
                );
                
                return (
                  <div
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className={`${category.bgColor} ${category.borderColor} border-2 rounded-2xl p-6 cursor-pointer 
                             transform transition-all duration-300 hover:scale-105 hover:shadow-xl 
                             group relative overflow-hidden`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 
                                   group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 ${category.accentColor} rounded-xl flex items-center justify-center mb-4 
                                     group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-white text-2xl font-bold">{category.displayName.charAt(0)}</span>
                      </div>
                      
                      <h3 className={`text-xl font-bold ${category.textColor} mb-2`}>
                        {category.displayName}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3">
                        {categoryProducts.length} cultivos activos
                      </p>

                      {/* Preview de cultivos */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {categoryProducts.slice(0, 4).map((product, idx) => (
                          <div key={idx} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm">
                            {product.name.charAt(0)}
                          </div>
                        ))}
                        {categoryProducts.length > 4 && (
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                            +{categoryProducts.length - 4}
                          </div>
                        )}
                      </div>
                      
                      <div className={`mt-4 text-sm ${category.textColor} font-medium 
                                     group-hover:translate-x-2 transition-transform duration-300`}>
                        Ver cultivos →
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Vista de Productos por Categoría */
          <div className="space-y-8">
            {/* Header de categoría seleccionada */}
            <div className={`${selectedCategory.bgColor} ${selectedCategory.borderColor} border-2 rounded-2xl p-6`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 ${selectedCategory.accentColor} rounded-xl flex items-center justify-center`}>
                  <span className="text-white text-xl font-bold">{selectedCategory.displayName.charAt(0)}</span>
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${selectedCategory.textColor}`}>
                    {selectedCategory.displayName}
                  </h2>
                  <p className="text-gray-600">
                    {filteredProducts.length} cultivos en esta categoría
                  </p>
                </div>
              </div>
              
              {/* Barra de búsqueda */}
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Buscar cultivos en ${selectedCategory.displayName.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                           focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Grid de cultivos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedCrop(product)}
                  className={`bg-white ${selectedCategory.borderColor} border-2 rounded-2xl p-6 
                           transform transition-all duration-300 hover:scale-105 hover:shadow-xl
                           group cursor-pointer relative overflow-hidden`}
                >
                  {/* Indicador de categoría */}
                  <div className={`absolute top-0 right-0 w-6 h-6 ${selectedCategory.accentColor} rounded-bl-lg`} />
                  
                  {/* Cultivo visual */}
                  <div className="text-center mb-4">
                    <div className={`w-16 h-16 ${selectedCategory?.accentColor} rounded-xl flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white font-bold text-xl">{product.name.charAt(0)}</span>
                    </div>
                  </div>
                  
                  {/* Información del cultivo */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-gray-700 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {product.variety}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="w-4 h-4 bg-gray-400 rounded text-white text-center text-xs leading-4">Q</span>
                        <span className="text-gray-600">{product.quantity}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <span className="w-4 h-4 bg-gray-400 rounded text-white text-center text-xs leading-4">T</span>
                        <span className="text-gray-600">{product.cycle}</span>
                      </div>
                    </div>
                    
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No se encontraron cultivos que coincidan con "{searchTerm}"
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

