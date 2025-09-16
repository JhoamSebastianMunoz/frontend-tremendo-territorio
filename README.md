# 🌱 Tremendo Territorio - Frontend

Una plataforma web innovadora que conecta productores agrícolas colombianos con clientes y consumidores finales, promoviendo una economía de circuito corto que dignifica el campo y elimina intermediarios innecesarios.

## 🚀 Demo en Vivo

- **Producción**: [https://tremendo-territorio.vercel.app](https://frontend-tremendo-territorio.vercel.app/)
- **Repositorio**: [GitHub](https://github.com/JhoamSebastianMunoz/frontend-tremendo-territorio.git)

## 📋 Descripción del Proyecto

**Tremendo Territorio** es una aplicación web responsiva diseñada específicamente para el territorio colombiano que facilita la conexión directa entre productores agrícolas y sus clientes potenciales. La plataforma permite a los productores encontrar clientes según rangos de distancia geográfica, mientras que los clientes pueden descubrir fincas y cosechas locales.

### 🎯 Propósito Principal

Eliminar sobrecostos de intermediarios y evitar que los transportadores compren productos agrícolas a precios injustos, creando un ecosistema donde:
- Los productores agrícolas puedan vender a precio justo
- Los clientes accedan a productos frescos y locales  
- Los consumidores finales conozcan la trazabilidad completa de los productos

### ✨ Características Principales

- 📱 **Diseño Responsivo**: Optimizado para dispositivos móviles y escritorio
- 🎥 **Trazabilidad Visual**: Videos y contenido que muestran el proceso de cosecha
- 👥 **Gestión Multi-actor**: Roles diferenciados para administradores, productores, clientes y consumidores
- 📖 **Narrativas del Campo**: Plataforma de historias que dignifican la ruralidad

## 🎭 Actores del Sistema

### 👨‍💼 **Administrador**
Gestiona la aplicación, su contenido y usuarios con privilegios especiales.

### 🚜 **Productor Agrícola** 
Trabajadores del campo con terreno y capacidad de cumplir demanda de cosecha.
- **Necesidades**: Encontrar clientes potenciales, vender a precio justo, recibir apoyo técnico

### 🏢 **Cliente**
Restaurantes, fruver, empresas agropecuarias, mayoristas y minoristas.
- **Necesidades**: Transparencia, cumplimiento de compromisos, identificar mejores proveedores

### 🛒 **Consumidor Final**
Personas que adquieren productos agrícolas para consumo personal.

## 🛠️ Stack Tecnológico

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.0
- **Styling**: TailwindCSS 3.4.17
- **Routing**: React Router DOM 7.6.2
- **Charts**: Chart.js 4.5.0 + React-ChartJS-2 5.3.0
- **Icons**: Lucide React 0.525.0
- **Deployment**: Vercel
- **Package Manager**: npm

### 📦 Dependencias del Proyecto

```json
{
  "dependencies": {
    "chart.js": "^4.5.0",
    "lucide-react": "^0.525.0",
    "react": "^19.1.0",
    "react-chartjs-2": "^5.3.0",
    "react-dom": "^19.1.0",
    "react-router-dom": "^7.6.2"
  },
  "devDependencies": {
    "@eslint/js": "^9.29.0",
    "@types/react": "^19.1.8",
    "@types/react-dom": "^19.1.6",
    "@vitejs/plugin-react": "^4.5.2",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.29.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.20",
    "globals": "^16.2.0",
    "tailwindcss": "^3.4.17",
    "vite": "^7.0.0"
  }
}
```

## 🏗️ Instalación y Configuración

### Prerequisitos

- Node.js (versión 18 o superior)
- npm 
- Git

### Instalación Local

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/JhoamSebastianMunoz/frontend-tremendo-territorio.git
   cd frontend-tremendo-territorio
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

<!-- 3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   Edita `.env.local` con tus configuraciones:
   ```env
   VITE_API_URL=http://localhost:3001
   VITE_APP_NAME=Tremendo Territorio
   VITE_MAPS_API_KEY=tu_api_key_de_mapas
   ``` -->

3. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   - Visita: `http://localhost:5173`


## 🚀 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Construye la aplicación para producción |
| `npm run preview` | Vista previa de la build de producción |
| `npm run lint` | Ejecuta el linter para análisis de código |

## 🎨 Configuración de TailwindCSS

Configuración optimizada para componentes responsivos

## 🌐 Despliegue en Vercel

### Deploy Automático
El proyecto está configurado para deploy automático:
- Cada push a `master` despliega automáticamente

### Deploy Manual
```bash
npm run build
npx vercel --prod
```

### Configuración de Build
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_API_URL": "@vite_api_url",
    "VITE_MAPS_API_KEY": "@vite_maps_api_key"
  }
}
```

## 📊 Funcionalidades Implementadas

### 📈 **Dashboard de Analytics**
- Gráficos de oferta y demanda
- Métricas de conexiones realizadas
- Indicadores de impacto en la dignidad del campo

### 🎥 **Gestión de Contenido**
- Subida de videos de trazabilidad
- Moderación por administradores
- Historias del campo y narrativas rurales

## 🎯 Lo que ES Tremendo Territorio

✅ **Generador de valor comunitario**
✅ **Marco de trabajo para territorios**
✅ **Plataforma de historias rurales**
✅ **Punto de encuentro de narrativas**
✅ **Radiografía de relaciones territoriales**

## ❌ Lo que NO ES Tremendo Territorio

❌ **No es un marketplace de compra-venta**
❌ **No es intermediario comercial**  
❌ **No es app de reservas para restaurantes**
❌ **No es bolsa de valores del agro**
❌ **No maneja inventarios ni logística**

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/NuevaFuncionalidad`)
3. Commit tus cambios (`git commit -m 'Add: Nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/NuevaFuncionalidad`) 
5. Abre un Pull Request

### Estándares de Código
- Utilizar ESLint para análisis de código
- Componentes funcionales con hooks
- Nomenclatura descriptiva en español/inglés

## 📊 Objetivos de Impacto

### 📚 **Aprendizaje**
- Adquirir conocimiento sobre cultivos y consumidores semanalmente
- Gestionar aprendizajes cuantitativos y cualitativos del territorio

### 📖 **Historias**  
- Mínimo 2 historias/mes sobre cambio y aprendizaje
- Relacionarse con 3+ campesinos/semana para recoger historias

### 🤝 **Encuentros**
- Planear encuentros mensuales cultivadores-restaurantes
- Crear metodología de encuentros territoriales

### 🏆 **Dignidad**
- Reducir número de intermediarios
- Medir impacto mensual de dignidad (indicadores RECAP)


## 👥 Equipo de Desarrollo

- **Jhoam Sebastian Munoz** - *Desarrollador Frontend* - - *Desarrollador Backend* - [@JhoamSebastianMunoz](https://github.com/JhoamSebastianMunoz)
- **Gisela Rivera Londoño** - *Desarrollador Frontend* - - *Desarrollador Backend* -
[@JhoamSebastianMunoz](https://github.com/RiveraGisela) 
- **Maria Camila Uribe** - *Desarrollador Backend* -
[@MariaCamilaUribe](https://github.com/mcur1097)

## 📞 Contacto

- **Email**: [jhoamsebastian68@gmail.com]
- **LinkedIn**: [www.linkedin.com/in/jhoam-sebastian-muñoz-betancourt]
- **GitHub**: [@JhoamSebastianMunoz](https://github.com/JhoamSebastianMunoz)

## 🙏 Agradecimientos

- Comunidades rurales de Colombia 🇨🇴
- Productores agrícolas que inspiraron este proyecto
- [React Team](https://reactjs.org/) por el framework
- [Vite](https://vitejs.dev/) por la herramienta de build
- [TailwindCSS](https://tailwindcss.com/) por el sistema de diseño
- [Chart.js](https://www.chartjs.org/) por las visualizaciones
- [Vercel](https://vercel.com/) por el hosting

---

> **"Tremendo Territorio, comidas deliciosas, historias poderosas"**

