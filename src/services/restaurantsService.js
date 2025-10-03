// src/services/restaurantsService.js

const API_BASE_URL = 'https://secuencia432-tremendoterritorio-production.up.railway.app/api';

/**
 * Servicio para consumir el endpoint de restaurantes
 */
export const restaurantsService = {
  /**
   * Obtiene todos los restaurantes desde la API
   * @param {string} language - Idioma de la respuesta ('es' o 'en')
   * @returns {Promise<Array>} Lista de restaurantes
   */
  async getAllRestaurants(language = 'es') {
    try {
      console.log('🔄 Intentando conectar con:', `${API_BASE_URL}/get-all-restaurants`);
      console.log('🌐 Idioma solicitado:', language);
      
      const response = await fetch(`${API_BASE_URL}/get-all-restaurants`, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Accept-Language': language
        }
      });

      console.log('📡 Respuesta recibida - Status:', response.status);

      if (!response.ok) {
        if (response.status === 404) {
          console.warn('⚠️ No se encontraron restaurantes en la API (404)');
          return [];
        }
        throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log('✅ Datos recibidos de la API:', data);
      return data;
    } catch (error) {
      console.error('❌ Error detallado al obtener restaurantes:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      throw error;
    }
  },

  /**
   * Adapta los datos de la API al formato esperado por el frontend
   * @param {Array} apiRestaurants - Restaurantes desde la API
   * @param {Array} mockData - Datos mock con imágenes, requirements, etc.
   * @returns {Array} Restaurantes adaptados
   */
  adaptRestaurantsData(apiRestaurants, mockData) {
    return apiRestaurants.map((apiRestaurant) => {
      // Busca si existe un mock con el mismo nombre para complementar datos
      const mockMatch = mockData.find(
        mock => mock.nameRestaurant.toLowerCase() === apiRestaurant.restaurant_name.toLowerCase()
      );

      // Extrae el teléfono desde redes sociales o usa el mock
      const phone = this.extractPhoneFromSocialMedia(apiRestaurant.socialMedia) 
        || mockMatch?.phone 
        || '+573000000000';

      // IMPORTANTE: Preserva los requirements del mock
      // Si no hay match en el mock, usa requirements por defecto
      const requirements = mockMatch?.requirements || this.getDefaultRequirements();

      return {
        id: apiRestaurant.id,
        id_user: apiRestaurant.id_user,
        // Usa imágenes del mock o imágenes por defecto
        images: mockMatch?.images || this.getDefaultImages(),
        nameRestaurant: apiRestaurant.restaurant_name,
        // La API usa 'location' para dirección
        distance: apiRestaurant.location,
        // La API usa 'description'
        location: apiRestaurant.description,
        icon: mockMatch?.icon || '🍽️',
        // CRÍTICO: Siempre incluye requirements
        requirements: requirements,
        phone: phone,
        // Campos adicionales de la API
        openingTime: apiRestaurant.openingTime,
        closingTime: apiRestaurant.closingTime,
        peopleCapacity: apiRestaurant.peopleCapacity,
        socialMedia: apiRestaurant.socialMedia
      };
    });
  },

  /**
   * Intenta extraer un teléfono de las redes sociales (si hay WhatsApp)
   * @param {Object} socialMedia - Objeto con redes sociales
   * @returns {string|null} Número de teléfono o null
   */
  extractPhoneFromSocialMedia(socialMedia) {
    if (!socialMedia) return null;
    
    // Busca en las URLs de redes sociales si hay algún patrón de WhatsApp
    const whatsappPatterns = [
      /whatsapp.*?(\+?\d{10,15})/i,
      /wa\.me\/(\+?\d{10,15})/i
    ];

    for (const [key, value] of Object.entries(socialMedia)) {
      if (typeof value === 'string') {
        for (const pattern of whatsappPatterns) {
          const match = value.match(pattern);
          if (match) return match[1];
        }
      }
    }
    
    return null;
  },

  /**
   * Retorna imágenes por defecto cuando no hay en el mock
   * @returns {Array} Array de objetos de imagen
   */
  getDefaultImages() {
    return [
      {
        url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799977/samples/food/fish-vegetables.jpg',
        alt: 'Restaurante - Imagen por defecto'
      },
      {
        url: 'https://res.cloudinary.com/dppf30duk/image/upload/v1746799986/samples/man-on-a-street.jpg',
        alt: 'Restaurante - Segunda imagen por defecto'
      }
    ];
  },

  /**
   * Retorna requirements por defecto para restaurantes sin match en mock
   * @returns {Object} Objeto con categorías de productos por defecto
   */
  getDefaultRequirements() {
    return {
      hortalizas: ['Lechugas', 'Espinaca'],
      verduras: ['Tomates', 'Cebolla'],
      frutas: ['Aguacate']
    };
  }
};