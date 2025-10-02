const mongoose = require('mongoose');

// Esquema de hotel con validaciones y restricciones

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 50,
        maxlength: 1000
    },
    address: {
        street: String,
        neighborhood: String,
        city: {
            type: String,
            default: 'Bogotá'
        },
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0
    },
    priceRange: {
        type: String,
        enum: ['Económico', 'Medio', 'Alto', 'Lujo'],
        default: 'Medio'
    },
    amenities: [{
        type: String,
        enum: [
            'WiFi', 'Estacionamiento', 'Piscina', 'Gimnasio', 
            'Restaurante', 'Bar', 'Spa', 'Servicio de habitaciones',
            'Aire acondicionado', 'TV', 'Minibar', 'Caja fuerte'
        ]
    }],
    images: [{
        url: String,
        alt: String
    }],
    searchCount: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Índices para optimizar búsquedas
hotelSchema.index({ name: 'text', description: 'text' });
hotelSchema.index({ 'address.neighborhood': 1 });
hotelSchema.index({ rating: -1 });
hotelSchema.index({ searchCount: -1 });

module.exports = mongoose.model('Hotel', hotelSchema);

