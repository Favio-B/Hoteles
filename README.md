# 🏨 Hoteles Bogotá - Aplicación Web

Una aplicación web moderna para mostrar los hoteles más buscados en Bogotá, construida con microservicios, Docker y Kubernetes.

## 🏗️ Arquitectura

- **Frontend**: React.js con componentes modernos
- **Backend**: Node.js con Express y arquitectura de microservicios
- **Base de datos**: MongoDB con datos de hoteles de Bogotá
- **Contenedores**: Docker con Docker Compose
- **Orquestación**: Kubernetes para despliegue en producción

## 📁 Estructura del Proyecto

```
1EproyHoteles/
├── Codigo/                          # Código fuente principal
│   ├── docker-compose.yml          # Orquestación de contenedores
│   ├── start.sh                    # Script de inicio
│   ├── hotels-api/                 # Microservicio Backend
│   │   ├── src/
│   │   │   ├── app.js             # Aplicación principal
│   │   │   ├── controllers/       # Controladores de API
│   │   │   ├── services/          # Lógica de negocio
│   │   │   ├── repositories/      # Acceso a datos
│   │   │   ├── models/            # Modelos de MongoDB
│   │   │   ├── routes/            # Definición de rutas
│   │   │   ├── factories/         # Patrón Factory
│   │   │   ├── config/            # Configuración
│   │   │   ├── data/              # Datos de inicialización
│   │   │   └── scripts/           # Scripts de utilidad
│   │   ├── Dockerfile             # Imagen Docker del backend
│   │   └── package.json           # Dependencias del backend
│   ├── hotels-frontend/           # Microservicio Frontend
│   │   ├── src/
│   │   │   ├── App.js            # Componente principal
│   │   │   ├── components/       # Componentes React
│   │   │   └── services/         # Servicios de API
│   │   ├── public/               # Archivos estáticos
│   │   ├── Dockerfile            # Imagen Docker del frontend
│   │   ├── nginx.conf            # Configuración de Nginx
│   │   └── package.json          # Dependencias del frontend
│   └── k8s/                      # Configuración de Kubernetes
│       ├── namespace.yaml        # Namespace del proyecto
│       ├── hotels-api-deployment.yaml
│       ├── hotels-frontend-deployment.yaml
│       ├── mongodb-deployment.yaml
│       ├── ingress.yaml          # Configuración de entrada
│       └── kustomization.yaml    # Configuración de Kustomize
├── Documentación.docx             # Documentación detallada
└── README.md                      # Este archivo
```

## 🚀 Características Principales

- ✅ **Búsqueda de hoteles** por nombre y barrio
- ✅ **Filtros avanzados** por precio y calificación
- ✅ **Hoteles más buscados** con contador de popularidad
- ✅ **Sistema de calificaciones** de 1 a 5 estrellas
- ✅ **Amenities detallados** con iconos
- ✅ **Diseño responsive** para móviles y desktop
- ✅ **API RESTful completa** con documentación
- ✅ **Base de datos poblada** con hoteles reales de Bogotá
- ✅ **Arquitectura de microservicios** escalable
- ✅ **Contenedores Docker** para fácil despliegue
- ✅ **Configuración Kubernetes** para producción

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **Joi** - Validación de datos
- **Helmet** - Seguridad HTTP
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **React.js** - Biblioteca de UI
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Styled Components** - CSS-in-JS
- **React Icons** - Iconografía

### DevOps
- **Docker** - Contenedores
- **Docker Compose** - Orquestación local
- **Kubernetes** - Orquestación en producción
- **Nginx** - Servidor web y proxy reverso

## 🏗️ Patrones de Diseño Implementados

### 1. **Repository Pattern**
Abstrae la lógica de acceso a datos y centraliza operaciones de base de datos.

### 2. **Service Layer Pattern**
Encapsula la lógica de negocio y coordina operaciones entre repositorios.

### 3. **Factory Pattern**
Encapsula la lógica de creación de objetos complejos y validación.

### 4. **Observer Pattern**
Implementa notificaciones y eventos cuando cambian los datos.

### 5. **Singleton Pattern**
Garantiza una única instancia de configuración y conexiones.

## 🐳 Instalación y Uso

### Opción 1: Docker Compose (Recomendado)

```bash
# Clonar el repositorio
git clone <repository-url>
cd 1EproyHoteles/Codigo

# Construir y ejecutar todos los servicios
docker-compose up --build -d

# Poblar la base de datos con datos de ejemplo
docker exec hotels-api npm run seed

# Verificar que todos los servicios estén funcionando
docker-compose ps
```

### Opción 2: Kubernetes

```bash
# Construir las imágenes Docker
docker build -t hotels-api:latest ./hotels-api
docker build -t hotels-frontend:latest ./hotels-frontend

# Aplicar configuración de Kubernetes
kubectl apply -k k8s/

# Verificar el estado de los pods
kubectl get pods -n hotels-bogota
```

### Opción 3: Desarrollo Local

```bash
# Backend
cd Codigo/hotels-api
npm install
npm run dev

# Frontend (en otra terminal)
cd Codigo/hotels-frontend
npm install
npm start

# MongoDB (en otra terminal)
docker run -d -p 27017:27017 --name mongodb mongo:6.0
```

## 🌐 Acceso a la Aplicación

- **Frontend**: http://localhost:5000
- **API Backend**: http://localhost:9090
- **MongoDB**: localhost:27017
- **Health Check**: http://localhost:9090/health

## 📚 API Endpoints

### Hoteles
- `GET /api/hotels` - Obtener todos los hoteles
- `GET /api/hotels/most-searched` - Hoteles más buscados
- `GET /api/hotels/search?query=nombre` - Buscar hoteles
- `GET /api/hotels/:id` - Obtener hotel por ID
- `POST /api/hotels` - Crear nuevo hotel
- `PUT /api/hotels/:id` - Actualizar hotel
- `DELETE /api/hotels/:id` - Eliminar hotel

### Utilidades
- `GET /api/hotels/neighborhoods` - Obtener barrios disponibles
- `GET /api/hotels/stats/statistics` - Estadísticas generales
- `GET /health` - Health check del servicio

## 🗄️ Base de Datos

La aplicación incluye datos de ejemplo de 10 hoteles populares en Bogotá:

- **Hotel Tequendama** (La Candelaria) - 4.5 ⭐
- **Hotel de la Ópera** (La Candelaria) - 4.3 ⭐
- **Hotel Estelar La Fontana** (Usaquén) - 4.4 ⭐
- **Hotel Bogotá Plaza** (Chapinero) - 4.2 ⭐
- **Hotel Ibis Bogotá Salitre** (Salitre) - 4.1 ⭐
- **Hotel Casa Deco** (La Candelaria) - 4.6 ⭐
- **Hotel Zona T** (Chapinero) - 4.3 ⭐
- **Hotel Embassy Suites** (Chapinero) - 4.5 ⭐
- **Hotel Hostal Casa Bellavista** (Chapinero) - 4.0 ⭐
- **Hotel W Bogotá** (Chapinero) - 4.7 ⭐

## 🔧 Configuración

### Variables de Entorno

```env
# Backend
NODE_ENV=production
PORT=9090
MONGODB_URI=mongodb://admin:password123@mongodb:27017/hotels_bogota?authSource=admin
FRONTEND_URL=http://localhost:5000

# MongoDB
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=password123
MONGO_INITDB_DATABASE=hotels_bogota
```

## 🧪 Testing

```bash
# Backend
cd Codigo/hotels-api
npm test

# Frontend
cd Codigo/hotels-frontend
npm test
```

## 📊 Monitoreo

- **Health Checks**: Configurados para todos los servicios
- **Logs**: Centralizados en contenedores Docker
- **Métricas**: Endpoints de estadísticas disponibles
- **Kubernetes**: Monitoreo de pods y servicios

## 🚀 Despliegue en Producción

### Docker Compose
```bash
# Producción
docker-compose -f docker-compose.yml up -d
```

### Kubernetes
```bash
# Aplicar configuración
kubectl apply -k k8s/

# Verificar servicios
kubectl get services -n hotels-bogota

# Ver logs
kubectl logs -f deployment/hotels-api -n hotels-bogota
```

## 🔍 Comandos Útiles

### Docker
```bash
# Ver logs de servicios
docker-compose logs -f hotels-api
docker-compose logs -f hotels-frontend

# Reiniciar servicios
docker-compose restart hotels-api

# Limpiar recursos
docker system prune -a
```

### Kubernetes
```bash
# Escalar servicios
kubectl scale deployment hotels-api --replicas=5 -n hotels-bogota

# Port forwarding para desarrollo
kubectl port-forward service/hotels-api-service 9090:9090 -n hotels-bogota

# Describir recursos
kubectl describe pod <pod-name> -n hotels-bogota
```

## 📝 Licencia

MIT License - ver archivo LICENSE para más detalles.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o preguntas, por favor abrir un issue en el repositorio.

---

**Desarrollado con ❤️ para mostrar los mejores hoteles de Bogotá**
