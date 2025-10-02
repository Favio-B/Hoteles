const Joi = require('joi');

// PUNTO 4: FORMAS ESTRUCTURADAS DEL CONTENIDO - Implementado en este archivo
// - Validación robusta con Joi para todos los endpoints
// - Esquemas estructurados para hoteles (create, update, search, filter)
// - Validación de parámetros de URL
// - Mensajes de error personalizados en español
// - Validación de tipos de datos, rangos y formatos
// - Middleware reutilizable para diferentes operaciones

// Middleware de validación genérico
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
      convert: true
    });

    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));

      return res.status(400).json({
        success: false,
        error: 'Datos de entrada inválidos',
        details: errorDetails,
        message: 'Por favor, revisa los datos enviados y vuelve a intentar'
      });
    }

    req[property] = value;
    next();
  };
};

// Esquemas de validación para hoteles
const hotelSchemas = {
  create: Joi.object({
    name: Joi.string()
      .min(3)
      .max(100)
      .required()
      .messages({
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'string.max': 'El nombre no puede exceder 100 caracteres',
        'any.required': 'El nombre del hotel es obligatorio'
      }),
    
    description: Joi.string()
      .min(50)
      .max(1000)
      .required()
      .messages({
        'string.min': 'La descripción debe tener al menos 50 caracteres',
        'string.max': 'La descripción no puede exceder 1000 caracteres',
        'any.required': 'La descripción es obligatoria'
      }),
    
    address: Joi.object({
      street: Joi.string()
        .min(5)
        .max(200)
        .required()
        .messages({
          'string.min': 'La dirección debe tener al menos 5 caracteres',
          'any.required': 'La dirección es obligatoria'
        }),
      
      neighborhood: Joi.string()
        .min(2)
        .max(50)
        .required()
        .messages({
          'string.min': 'El barrio debe tener al menos 2 caracteres',
          'any.required': 'El barrio es obligatorio'
        }),
      
      city: Joi.string()
        .default('Bogotá')
        .max(50),
      
      coordinates: Joi.object({
        lat: Joi.number()
          .min(-90)
          .max(90)
          .required()
          .messages({
            'number.min': 'La latitud debe estar entre -90 y 90',
            'number.max': 'La latitud debe estar entre -90 y 90',
            'any.required': 'La latitud es obligatoria'
          }),
        
        lng: Joi.number()
          .min(-180)
          .max(180)
          .required()
          .messages({
            'number.min': 'La longitud debe estar entre -180 y 180',
            'number.max': 'La longitud debe estar entre -180 y 180',
            'any.required': 'La longitud es obligatoria'
          })
      }).optional()
    }).required(),
    
    rating: Joi.number()
      .min(1)
      .max(5)
      .default(0)
      .messages({
        'number.min': 'La calificación debe ser entre 1 y 5',
        'number.max': 'La calificación debe ser entre 1 y 5'
      }),
    
    priceRange: Joi.string()
      .valid('Económico', 'Medio', 'Alto', 'Lujo')
      .default('Medio')
      .messages({
        'any.only': 'El rango de precio debe ser: Económico, Medio, Alto o Lujo'
      }),
    
    amenities: Joi.array()
      .items(Joi.string().valid(
        'WiFi', 'Estacionamiento', 'Piscina', 'Gimnasio', 
        'Restaurante', 'Bar', 'Spa', 'Servicio de habitaciones',
        'Aire acondicionado', 'TV', 'Minibar', 'Caja fuerte'
      ))
      .default([])
      .messages({
        'array.base': 'Las amenidades deben ser un arreglo',
        'any.only': 'Amenidad no válida'
      }),
    
    images: Joi.array()
      .items(Joi.object({
        url: Joi.string()
          .uri()
          .required()
          .messages({
            'string.uri': 'La URL de la imagen debe ser válida',
            'any.required': 'La URL de la imagen es obligatoria'
          }),
        
        alt: Joi.string()
          .min(3)
          .max(100)
          .required()
          .messages({
            'string.min': 'El texto alternativo debe tener al menos 3 caracteres',
            'any.required': 'El texto alternativo es obligatorio'
          })
      }))
      .default([])
      .max(5)
      .messages({
        'array.max': 'Máximo 5 imágenes permitidas'
      })
  }),

  update: Joi.object({
    name: Joi.string()
      .min(3)
      .max(100)
      .optional(),
    
    description: Joi.string()
      .min(50)
      .max(1000)
      .optional(),
    
    address: Joi.object({
      street: Joi.string()
        .min(5)
        .max(200)
        .optional(),
      
      neighborhood: Joi.string()
        .min(2)
        .max(50)
        .optional(),
      
      city: Joi.string()
        .max(50)
        .optional(),
      
      coordinates: Joi.object({
        lat: Joi.number()
          .min(-90)
          .max(90)
          .optional(),
        
        lng: Joi.number()
          .min(-180)
          .max(180)
          .optional()
      }).optional()
    }).optional(),
    
    rating: Joi.number()
      .min(1)
      .max(5)
      .optional(),
    
    priceRange: Joi.string()
      .valid('Económico', 'Medio', 'Alto', 'Lujo')
      .optional(),
    
    amenities: Joi.array()
      .items(Joi.string().valid(
        'WiFi', 'Estacionamiento', 'Piscina', 'Gimnasio', 
        'Restaurante', 'Bar', 'Spa', 'Servicio de habitaciones',
        'Aire acondicionado', 'TV', 'Minibar', 'Caja fuerte'
      ))
      .optional(),
    
    images: Joi.array()
      .items(Joi.object({
        url: Joi.string()
          .uri()
          .required(),
        
        alt: Joi.string()
          .min(3)
          .max(100)
          .required()
      }))
      .max(5)
      .optional(),
    
    isActive: Joi.boolean()
      .optional()
  }),

  search: Joi.object({
    query: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.min': 'La búsqueda debe tener al menos 2 caracteres',
        'string.max': 'La búsqueda no puede exceder 100 caracteres',
        'any.required': 'El término de búsqueda es obligatorio'
      }),
    
    limit: Joi.number()
      .integer()
      .min(1)
      .max(50)
      .default(10)
      .optional(),
    
    page: Joi.number()
      .integer()
      .min(1)
      .default(1)
      .optional()
  }),

  filter: Joi.object({
    priceRange: Joi.string()
      .valid('Económico', 'Medio', 'Alto', 'Lujo')
      .optional(),
    
    neighborhood: Joi.string()
      .min(2)
      .max(50)
      .optional(),
    
    minRating: Joi.number()
      .min(1)
      .max(5)
      .optional(),
    
    maxRating: Joi.number()
      .min(1)
      .max(5)
      .optional(),
    
    amenities: Joi.array()
      .items(Joi.string().valid(
        'WiFi', 'Estacionamiento', 'Piscina', 'Gimnasio', 
        'Restaurante', 'Bar', 'Spa', 'Servicio de habitaciones',
        'Aire acondicionado', 'TV', 'Minibar', 'Caja fuerte'
      ))
      .optional(),
    
    limit: Joi.number()
      .integer()
      .min(1)
      .max(50)
      .default(10)
      .optional(),
    
    page: Joi.number()
      .integer()
      .min(1)
      .default(1)
      .optional()
  })
};

// Esquemas de validación para parámetros
const paramSchemas = {
  id: Joi.object({
    id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'El ID del hotel no es válido',
        'any.required': 'El ID del hotel es obligatorio'
      })
  })
};

module.exports = {
  validate,
  hotelSchemas,
  paramSchemas
};
