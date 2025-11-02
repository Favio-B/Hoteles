const mongoose = require('mongoose');

// Singleton Pattern para configuración de base de datos
class DatabaseConfig {
    constructor() {
        if (DatabaseConfig.instance) {
            return DatabaseConfig.instance;
        }
        
        this.connection = null;
        DatabaseConfig.instance = this;
    }

    async connect() {
        try {
            const mongoUri = process.env.MONGODB_URI || 'mongodb://mongodb:27017/hotels_bogota';
            
            this.connection = await mongoose.connect(mongoUri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

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

    async disconnect() {
        if (this.connection) {
            await mongoose.disconnect();
            console.log('Desconectado de MongoDB');
        }
    }
}

module.exports = new DatabaseConfig();

