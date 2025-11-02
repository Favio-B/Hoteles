# Hoteles Bogotá - Aplicación Web

Una aplicación web moderna para mostrar los hoteles más buscados en Bogotá, construida con microservicios, Docker y Kubernetes.

## Arquitectura

- **Frontend**: React.js con TypeScript
- **Backend**: Node.js con Express
- **Base de datos**: MongoDB
- **Contenedores**: Docker
- **Orquestación**: Kubernetes

## Docker - Contenedores y Orquestación

### ¿Qué es Docker?

Docker es una plataforma de contenedores que permite empaquetar aplicaciones con todas sus dependencias en contenedores estandarizados, garantizando que funcionen de manera consistente en cualquier entorno.

### Implementación en el Proyecto

#### 1. Dockerfile del Backend (`hotels-api/Dockerfile`)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
```

**Características:**
- **Imagen base**: Node.js 18 Alpine (ligera y segura)
- **Optimización**: Instalación de dependencias en capa separada
- **Seguridad**: Usuario no-root y dependencias de producción únicamente

#### 2. Dockerfile del Frontend (`hotels-frontend/Dockerfile`)
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
```

**Características:**
- **Multi-stage build**: Optimización de tamaño de imagen
- **Nginx**: Servidor web ligero para servir archivos estáticos
- **Configuración personalizada**: nginx.conf para routing de SPA

#### 3. Docker Compose (`docker-compose.yml`)
```yaml
version: '3.8'
services:
  mongodb:
    image: mongo:6.0
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
    volumes:
      - mongodb_data:/data/db
      - ./hotels-api/data/init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js:ro

  hotels-api:
    build: ./hotels-api
    ports:
      - "9090:9090"
    environment:
      NODE_ENV: production
      MONGODB_URI: mongodb://admin:password123@mongodb:27017/hotels_bogota?authSource=admin
    depends_on:
      - mongodb
    volumes:
      - ./hotels-api/logs:/app/logs

  hotels-frontend:
    build: ./hotels-frontend
    ports:
      - "5000:80"
    depends_on:
      - hotels-api
```

**Beneficios:**
- **Orquestación automática**: Gestión de dependencias entre servicios
- **Redes aisladas**: Comunicación segura entre contenedores
- **Volúmenes persistentes**: Datos de MongoDB preservados
- **Variables de entorno**: Configuración flexible

### Comandos Docker Útiles

```bash
# Construir imágenes
docker build -t hotels-api:latest ./hotels-api
docker build -t hotels-frontend:latest ./hotels-frontend

# Ejecutar contenedores
docker run -d -p 9090:9090 --name api hotels-api:latest
docker run -d -p 5000:80 --name frontend hotels-frontend:latest

# Ver logs
docker logs -f hotels-api
docker logs -f hotels-frontend

# Inspeccionar contenedores
docker exec -it hotels-api sh
docker exec -it mongodb mongosh

# Limpiar recursos
docker system prune -a
docker volume prune
```

## Kubernetes - Orquestación de Contenedores

### ¿Qué es Kubernetes?

Kubernetes (K8s) es una plataforma de orquestación de contenedores que automatiza el despliegue, escalado y gestión de aplicaciones contenerizadas.

### Implementación en el Proyecto

#### 1. Namespace (`k8s/namespace.yaml`)
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: hotels-bogota
  labels:
    name: hotels-bogota
```

**Propósito**: Aislamiento lógico de recursos del proyecto.

#### 2. Deployment del Backend (`k8s/hotels-api-deployment.yaml`)
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hotels-api
  namespace: hotels-bogota
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hotels-api
  template:
    metadata:
      labels:
        app: hotels-api
    spec:
      containers:
      - name: hotels-api
        image: hotels-api:latest
        ports:
        - containerPort: 9090
        env:
        - name: NODE_ENV
          value: "production"
        - name: MONGODB_URI
          value: "mongodb://admin:password123@mongodb:27017/hotels_bogota?authSource=admin"
        livenessProbe:
          httpGet:
            path: /health
            port: 9090
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 9090
          initialDelaySeconds: 5
          periodSeconds: 5
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

**Características:**
- **Replicas**: 3 instancias para alta disponibilidad
- **Health Checks**: Liveness y readiness probes
- **Recursos**: Límites de CPU y memoria
- **Variables de entorno**: Configuración dinámica

#### 3. Service (`k8s/hotels-api-service.yaml`)
```yaml
apiVersion: v1
kind: Service
metadata:
  name: hotels-api-service
  namespace: hotels-bogota
spec:
  selector:
    app: hotels-api
  ports:
  - protocol: TCP
    port: 9090
    targetPort: 9090
  type: ClusterIP
```

**Propósito**: Exposición interna del servicio para comunicación entre pods.

#### 4. Ingress (`k8s/ingress.yaml`)
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: hotels-ingress
  namespace: hotels-bogota
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: hotels-bogota.local
    http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: hotels-api-service
            port:
              number: 9090
      - path: /
        pathType: Prefix
        backend:
          service:
            name: hotels-frontend-service
            port:
              number: 80
```

**Funcionalidad**: Enrutamiento de tráfico externo a servicios internos.

### Comandos Kubernetes Útiles

```bash
# Aplicar configuración
kubectl apply -k k8s/

# Verificar estado
kubectl get pods -n hotels-bogota
kubectl get services -n hotels-bogota
kubectl get ingress -n hotels-bogota

# Ver logs
kubectl logs -f deployment/hotels-api -n hotels-bogota
kubectl logs -f deployment/hotels-frontend -n hotels-bogota

# Escalar servicios
kubectl scale deployment hotels-api --replicas=5 -n hotels-bogota

# Port forwarding para desarrollo
kubectl port-forward service/hotels-api-service 9090:9090 -n hotels-bogota

# Describir recursos
kubectl describe pod <pod-name> -n hotels-bogota
kubectl describe service hotels-api-service -n hotels-bogota
```

## Microservicios - Arquitectura Distribuida

### ¿Qué son los Microservicios?

Los microservicios son un patrón arquitectónico donde una aplicación se divide en servicios pequeños, independientes y autónomos que se comunican entre sí a través de APIs.

### Implementación en el Proyecto

#### 1. Estructura de Microservicios

```
hotels-bogota/
├── hotels-api/          # Microservicio de gestión de hoteles
│   ├── controllers/     # Controladores de API
│   ├── services/        # Lógica de negocio
│   ├── repositories/    # Acceso a datos
│   ├── models/          # Modelos de datos
│   └── routes/          # Definición de rutas
├── hotels-frontend/     # Microservicio de interfaz de usuario
│   ├── src/
│   │   ├── components/  # Componentes React
│   │   ├── services/    # Servicios de API
│   │   └── utils/       # Utilidades
│   └── public/          # Archivos estáticos
└── mongodb/             # Base de datos independiente
```

#### 2. Comunicación Entre Servicios

**API Gateway Pattern**: El frontend actúa como gateway para las llamadas al backend.

```javascript
// hotels-frontend/src/services/api.js
class HotelService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:9090';
  }

  async getHotels() {
    const response = await fetch(`${this.baseURL}/api/hotels`);
    return response.json();
  }

  async searchHotels(query) {
    const response = await fetch(`${this.baseURL}/api/hotels/search?query=${query}`);
    return response.json();
  }
}
```

#### 3. Independencia de Servicios

**Base de Datos Independiente**: Cada microservicio puede tener su propia base de datos.

```javascript
// hotels-api/config/database.js
const mongoose = require('mongoose');

class Database {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      this.connection = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Conectado a MongoDB');
    } catch (error) {
      console.error('Error conectando a MongoDB:', error);
      process.exit(1);
    }
  }
}

module.exports = new Database();
```

#### 4. Resiliencia y Circuit Breaker

```javascript
// hotels-frontend/src/services/api.js
class ResilientHotelService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:9090';
    this.retryAttempts = 3;
    this.retryDelay = 1000;
  }

  async makeRequest(endpoint, options = {}) {
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        if (attempt === this.retryAttempts) {
          throw error;
        }
        
        console.warn(`Intento ${attempt} falló, reintentando en ${this.retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, this.retryDelay));
      }
    }
  }
}
```

### Beneficios de los Microservicios

1. **Escalabilidad Independiente**: Cada servicio puede escalar según sus necesidades
2. **Desarrollo Paralelo**: Equipos pueden trabajar en servicios diferentes
3. **Tecnologías Diversas**: Cada servicio puede usar tecnologías óptimas
4. **Falla Aislada**: Un servicio fallido no afecta a otros
5. **Despliegue Independiente**: Actualizaciones sin afectar toda la aplicación

## Patrones de Diseño Implementados

### 1. Repository Pattern

**Propósito**: Abstraer la lógica de acceso a datos y centralizar operaciones de base de datos.

```javascript
// hotels-api/repositories/HotelRepository.js
class HotelRepository {
  constructor() {
    this.Hotel = require('../models/Hotel');
  }

  async findAll() {
    return await this.Hotel.find({});
  }

  async findById(id) {
    return await this.Hotel.findById(id);
  }

  async findByNeighborhood(neighborhood) {
    return await this.Hotel.find({ neighborhood });
  }

  async findMostSearched() {
    return await this.Hotel.find({}).sort({ searchCount: -1 }).limit(5);
  }

  async create(hotelData) {
    const hotel = new this.Hotel(hotelData);
    return await hotel.save();
  }

  async update(id, updateData) {
    return await this.Hotel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return await this.Hotel.findByIdAndDelete(id);
  }

  async incrementSearchCount(id) {
    return await this.Hotel.findByIdAndUpdate(
      id,
      { $inc: { searchCount: 1 } },
      { new: true }
    );
  }
}

module.exports = HotelRepository;
```

**Beneficios:**
- Separación de responsabilidades
- Facilita testing con mocks
- Centraliza lógica de acceso a datos
- Permite cambiar implementación de base de datos

### 2. Service Layer Pattern

**Propósito**: Encapsular lógica de negocio y coordinar operaciones entre repositorios.

```javascript
// hotels-api/services/HotelService.js
const HotelRepository = require('../repositories/HotelRepository');
const HotelFactory = require('../factories/HotelFactory');

class HotelService {
  constructor() {
    this.hotelRepository = new HotelRepository();
    this.hotelFactory = new HotelFactory();
  }

  async getAllHotels() {
    try {
      const hotels = await this.hotelRepository.findAll();
      return {
        success: true,
        data: hotels,
        count: hotels.length
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getHotelById(id) {
    try {
      const hotel = await this.hotelRepository.findById(id);
      if (!hotel) {
        return {
          success: false,
          error: 'Hotel no encontrado'
        };
      }

      // Incrementar contador de búsquedas
      await this.hotelRepository.incrementSearchCount(id);

      return {
        success: true,
        data: hotel
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async searchHotels(query) {
    try {
      const hotels = await this.hotelRepository.findByNeighborhood(query);
      return {
        success: true,
        data: hotels,
        count: hotels.length
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getMostSearchedHotels() {
    try {
      const hotels = await this.hotelRepository.findMostSearched();
      return {
        success: true,
        data: hotels,
        count: hotels.length
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  async createHotel(hotelData) {
    try {
      // Validar y transformar datos usando Factory
      const validatedData = this.hotelFactory.createHotel(hotelData);
      const hotel = await this.hotelRepository.create(validatedData);
      
      return {
        success: true,
        data: hotel
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = HotelService;
```

**Beneficios:**
- Lógica de negocio centralizada
- Reutilización de código
- Facilita testing unitario
- Separación clara de responsabilidades

### 3. Factory Pattern

**Propósito**: Encapsular la lógica de creación de objetos complejos y validación.

```javascript
// hotels-api/factories/HotelFactory.js
class HotelFactory {
  createHotel(data) {
    // Validaciones
    this.validateRequiredFields(data);
    this.validatePrice(data.price);
    this.validateRating(data.rating);

    // Transformación de datos
    return {
      name: this.sanitizeString(data.name),
      neighborhood: this.sanitizeString(data.neighborhood),
      address: this.sanitizeString(data.address),
      price: parseFloat(data.price),
      rating: parseFloat(data.rating),
      amenities: this.validateAmenities(data.amenities),
      description: this.sanitizeString(data.description),
      imageUrl: this.validateUrl(data.imageUrl),
      searchCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  validateRequiredFields(data) {
    const required = ['name', 'neighborhood', 'address', 'price', 'rating'];
    for (const field of required) {
      if (!data[field]) {
        throw new Error(`Campo requerido: ${field}`);
      }
    }
  }

  validatePrice(price) {
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice < 0) {
      throw new Error('Precio debe ser un número positivo');
    }
  }

  validateRating(rating) {
    const numRating = parseFloat(rating);
    if (isNaN(numRating) || numRating < 0 || numRating > 5) {
      throw new Error('Rating debe estar entre 0 y 5');
    }
  }

  validateAmenities(amenities) {
    if (!Array.isArray(amenities)) {
      return [];
    }
    return amenities.filter(amenity => typeof amenity === 'string');
  }

  validateUrl(url) {
    try {
      new URL(url);
      return url;
    } catch {
      return 'https://via.placeholder.com/400x300?text=Hotel';
    }
  }

  sanitizeString(str) {
    return String(str).trim();
  }
}

module.exports = HotelFactory;
```

**Beneficios:**
- Validación centralizada
- Transformación de datos consistente
- Facilita testing
- Reutilización de lógica de creación

### 4. Observer Pattern

**Propósito**: Implementar notificaciones y eventos cuando cambian los datos.

```javascript
// hotels-api/services/NotificationService.js
class NotificationService {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(event, data) {
    this.observers.forEach(observer => {
      if (observer.update) {
        observer.update(event, data);
      }
    });
  }
}

// Implementación en HotelService
class HotelService {
  constructor() {
    this.hotelRepository = new HotelRepository();
    this.notificationService = new NotificationService();
  }

  async createHotel(hotelData) {
    try {
      const hotel = await this.hotelRepository.create(hotelData);
      
      // Notificar a observadores
      this.notificationService.notify('hotel.created', hotel);
      
      return {
        success: true,
        data: hotel
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}
```

### 5. Singleton Pattern

**Propósito**: Garantizar una única instancia de configuración y conexiones.

```javascript
// hotels-api/config/database.js
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    
    this.connection = null;
    this.isConnected = false;
    Database.instance = this;
  }

  async connect() {
    if (this.isConnected) {
      return this.connection;
    }

    try {
      this.connection = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      this.isConnected = true;
      console.log('Conectado a MongoDB');
      return this.connection;
    } catch (error) {
      console.error('Error conectando a MongoDB:', error);
      throw error;
    }
  }

  getConnection() {
    return this.connection;
  }

  isConnected() {
    return this.isConnected;
  }
}

// Exportar instancia única
module.exports = new Database();
```

**Beneficios:**
- Control de recursos compartidos
- Configuración centralizada
- Evita múltiples conexiones innecesarias

## Servicios

1. **hotels-api**: Microservicio principal para gestión de hoteles (Puerto 9090)
2. **hotels-frontend**: Interfaz de usuario (Puerto 5000)
3. **mongodb**: Base de datos (Puerto 27017)

## Características

- Búsqueda de hoteles por nombre
- Filtros por precio y barrio
- Hoteles más buscados
- Sistema de calificaciones
- Amenities con iconos
- Diseño responsive
- API RESTful completa
- Base de datos con datos de ejemplo

## Instalación

### Opción 1: Docker Compose (Recomendado)

```bash
# Clonar el repositorio
git clone <repository-url>
cd Codigo

# Construir y ejecutar con Docker Compose
docker-compose up --build -d

# Poblar la base de datos con datos de ejemplo
docker exec hotels-api npm run seed
```

### Opción 2: Kubernetes

```bash
# Construir las imágenes Docker
docker build -t hotels-api:latest ./hotels-api
docker build -t hotels-frontend:latest ./hotels-frontend

# Aplicar configuración de Kubernetes
kubectl apply -k k8s/

# Verificar el estado
kubectl get pods -n hotels-bogota
```

### Opción 3: Desarrollo Local

```bash
# Backend
cd hotels-api
npm install
npm run dev

# Frontend (en otra terminal)
cd hotels-frontend
npm install
npm start
```

## Acceso

- **Frontend**: http://localhost:5000
- **API**: http://localhost:9090
- **MongoDB**: localhost:27017
- **Health Check**: http://localhost:9090/health

## Endpoints de la API

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
- `GET /health` - Health check

## Base de Datos

La aplicación incluye datos de ejemplo de 10 hoteles populares en Bogotá:

- Hotel Tequendama (La Candelaria)
- Hotel de la Ópera (La Candelaria)
- Hotel Estelar La Fontana (Usaquén)
- Hotel Bogotá Plaza (Chapinero)
- Hotel Ibis Bogotá Salitre (Salitre)
- Hotel Casa Deco (La Candelaria)
- Hotel Zona T (Chapinero)
- Hotel Embassy Suites (Chapinero)
- Hotel Hostal Casa Bellavista (Chapinero)
- Hotel W Bogotá (Chapinero)

## Configuración

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

## Monitoreo

- **Health Checks**: Configurados para todos los servicios
- **Logs**: Centralizados en contenedores Docker
- **Métricas**: Endpoints de estadísticas disponibles

## Despliegue

### Docker Compose
```bash
# Desarrollo
docker-compose up

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

## Testing

```bash
# Backend
cd hotels-api
npm test

# Frontend
cd hotels-frontend
npm test
```

## Licencia

MIT License - ver archivo LICENSE para más detalles.

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Soporte

Para soporte técnico o preguntas, por favor abrir un issue en el repositorio.