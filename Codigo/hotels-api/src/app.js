require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const DatabaseConfig = require('./config/database');
const hotelRoutes = require('./routes/hotelRoutes');

const app = express();
const PORT = process.env.PORT || 9090;

// Configuración de seguridad
app.use(helmet());

// Configuración de CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5000',
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // máximo 100 requests por ventana
    message: {
        success: false,
        message: 'Demasiadas peticiones desde esta IP, intenta de nuevo en 15 minutos'
    }
});
app.use('/api/', limiter);

// Middleware para parsing JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Rutas
app.use('/api/hotels', hotelRoutes);

// Ruta de salud
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Hotels API is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Hotels Bogotá API',
        version: '1.0.0',
        endpoints: {
            hotels: '/api/hotels',
            mostSearched: '/api/hotels/most-searched',
            search: '/api/hotels/search',
            statistics: '/api/hotels/stats/statistics',
            neighborhoods: '/api/hotels/neighborhoods'
        }
    });
});

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor'
    });
});

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Función para iniciar el servidor
async function startServer() {
    try {
        // Conectar a la base de datos
        await DatabaseConfig.connect();
        
        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor iniciado en puerto ${PORT}`);
            console.log(`📊 API disponible en http://localhost:${PORT}`);
            console.log(`🏥 Health check en http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
}

// Manejo de señales para cierre graceful
process.on('SIGTERM', async () => {
    console.log('🛑 Recibida señal SIGTERM, cerrando servidor...');
    await DatabaseConfig.disconnect();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('🛑 Recibida señal SIGINT, cerrando servidor...');
    await DatabaseConfig.disconnect();
    process.exit(0);
});

// Iniciar servidor
startServer();

