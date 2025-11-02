// Script de inicialización de MongoDB
db = db.getSiblingDB('hotels_bogota');

// Crear colección de hoteles
db.createCollection('hotels');

// Crear índices para optimizar búsquedas
db.hotels.createIndex({ "name": "text", "description": "text" });
db.hotels.createIndex({ "address.neighborhood": 1 });
db.hotels.createIndex({ "rating": -1 });
db.hotels.createIndex({ "searchCount": -1 });

print('Base de datos hotels_bogota inicializada correctamente');
print('Índices creados para optimizar búsquedas');

