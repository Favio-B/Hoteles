const Joi = require('joi');

// Factory Pattern para creación y validación de objetos de hotel
class HotelFactory {
    constructor() {
        this.validationSchema = Joi.object({
            name: Joi.string().min(3).max(100).required(),
            description: Joi.string().min(10).max(500).required(),
            address: Joi.object({
                street: Joi.string().required(),
                neighborhood: Joi.string().required(),
                city: Joi.string().default('Bogotá'),
                coordinates: Joi.object({
                    lat: Joi.number().min(-90).max(90),
                    lng: Joi.number().min(-180).max(180)
                }).optional()
            }).required(),
            rating: Joi.number().min(1).max(5).default(0),
            priceRange: Joi.string().valid('Económico', 'Medio', 'Alto', 'Lujo').default('Medio'),
            amenities: Joi.array().items(
                Joi.string().valid(
                    'WiFi', 'Estacionamiento', 'Piscina', 'Gimnasio', 
                    'Restaurante', 'Bar', 'Spa', 'Servicio de habitaciones',
                    'Aire acondicionado', 'TV', 'Minibar', 'Caja fuerte'
                )
            ).default([]),
            images: Joi.array().items(
                Joi.object({
                    url: Joi.string().uri().required(),
                    alt: Joi.string().required()
                })
            ).default([])
        });
    }

    createHotelData(rawData) {
        try {
            const { error, value } = this.validationSchema.validate(rawData, {
                abortEarly: false,
                stripUnknown: true
            });

            if (error) {
                const errorMessages = error.details.map(detail => detail.message);
                throw new Error(`Datos de hotel inválidos: ${errorMessages.join(', ')}`);
            }

            return {
                ...value,
                searchCount: 0,
                isActive: true
            };
        } catch (error) {
            throw new Error(`Error en factory: ${error.message}`);
        }
    }

    createHotelUpdateData(rawData) {
        const updateSchema = Joi.object({
            name: Joi.string().min(3).max(100),
            description: Joi.string().min(10).max(500),
            address: Joi.object({
                street: Joi.string(),
                neighborhood: Joi.string(),
                city: Joi.string(),
                coordinates: Joi.object({
                    lat: Joi.number().min(-90).max(90),
                    lng: Joi.number().min(-180).max(180)
                })
            }),
            rating: Joi.number().min(1).max(5),
            priceRange: Joi.string().valid('Económico', 'Medio', 'Alto', 'Lujo'),
            amenities: Joi.array().items(
                Joi.string().valid(
                    'WiFi', 'Estacionamiento', 'Piscina', 'Gimnasio', 
                    'Restaurante', 'Bar', 'Spa', 'Servicio de habitaciones',
                    'Aire acondicionado', 'TV', 'Minibar', 'Caja fuerte'
                )
            ),
            images: Joi.array().items(
                Joi.object({
                    url: Joi.string().uri().required(),
                    alt: Joi.string().required()
                })
            )
        });

        try {
            const { error, value } = updateSchema.validate(rawData, {
                abortEarly: false,
                stripUnknown: true
            });

            if (error) {
                const errorMessages = error.details.map(detail => detail.message);
                throw new Error(`Datos de actualización inválidos: ${errorMessages.join(', ')}`);
            }

            return value;
        } catch (error) {
            throw new Error(`Error en factory de actualización: ${error.message}`);
        }
    }

    createSearchFilters(query) {
        const filters = {};
        
        if (query.neighborhood) {
            filters.neighborhood = query.neighborhood;
        }
        
        if (query.priceRange) {
            filters.priceRange = query.priceRange;
        }
        
        if (query.minRating) {
            filters.minRating = parseInt(query.minRating);
        }
        
        if (query.amenities) {
            filters.amenities = Array.isArray(query.amenities) 
                ? query.amenities 
                : [query.amenities];
        }
        
        return filters;
    }
}

module.exports = new HotelFactory();

