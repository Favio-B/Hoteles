const Hotel = require('../models/Hotel');

const hotelsData = [
    {
        name: "Hotel Tequendama",
        description: "Hotel histórico ubicado en el centro de Bogotá, cerca de importantes atracciones turísticas y centros comerciales.",
        address: {
            street: "Carrera 10 # 26-21",
            neighborhood: "La Candelaria",
            city: "Bogotá",
            coordinates: {
                lat: 4.5981,
                lng: -74.0760
            }
        },
        rating: 4.5,
        priceRange: "Alto",
        amenities: ["WiFi", "Restaurante", "Bar", "Estacionamiento", "Aire acondicionado", "TV", "Minibar"],
        images: [
            {
                url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
                alt: "Hotel Tequendama exterior"
            }
        ],
        searchCount: 1250
    },
    {
        name: "Hotel de la Ópera",
        description: "Hotel boutique con encanto colonial en el corazón histórico de Bogotá, perfecto para viajeros que buscan autenticidad.",
        address: {
            street: "Calle 10 # 5-72",
            neighborhood: "La Candelaria",
            city: "Bogotá",
            coordinates: {
                lat: 4.5979,
                lng: -74.0750
            }
        },
        rating: 4.8,
        priceRange: "Lujo",
        amenities: ["WiFi", "Restaurante", "Bar", "Spa", "Servicio de habitaciones", "Aire acondicionado", "TV", "Minibar", "Caja fuerte"],
        images: [
            {
                url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
                alt: "Hotel de la Ópera lobby"
            }
        ],
        searchCount: 980
    },
    {
        name: "Hotel Estelar La Fontana",
        description: "Hotel moderno en la zona norte de Bogotá, ideal para viajes de negocios y turismo de lujo.",
        address: {
            street: "Calle 127 # 18A-15",
            neighborhood: "Usaquén",
            city: "Bogotá",
            coordinates: {
                lat: 4.7120,
                lng: -74.0320
            }
        },
        rating: 4.6,
        priceRange: "Lujo",
        amenities: ["WiFi", "Piscina", "Gimnasio", "Restaurante", "Bar", "Spa", "Estacionamiento", "Aire acondicionado", "TV", "Minibar", "Caja fuerte"],
        images: [
            {
                url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
                alt: "Hotel Estelar La Fontana"
            }
        ],
        searchCount: 1100
    },
    {
        name: "Hotel Bogotá Plaza",
        description: "Hotel céntrico con excelente ubicación para turistas, cerca de museos y restaurantes.",
        address: {
            street: "Carrera 7 # 23-98",
            neighborhood: "Chapinero",
            city: "Bogotá",
            coordinates: {
                lat: 4.6680,
                lng: -74.0550
            }
        },
        rating: 4.2,
        priceRange: "Medio",
        amenities: ["WiFi", "Restaurante", "Estacionamiento", "Aire acondicionado", "TV"],
        images: [
            {
                url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
                alt: "Hotel Bogotá Plaza"
            }
        ],
        searchCount: 850
    },
    {
        name: "Hotel Ibis Bogotá Salitre",
        description: "Hotel económico con excelente relación calidad-precio, ubicado cerca del aeropuerto.",
        address: {
            street: "Calle 22 # 68-37",
            neighborhood: "Salitre",
            city: "Bogotá",
            coordinates: {
                lat: 4.6680,
                lng: -74.1050
            }
        },
        rating: 3.8,
        priceRange: "Económico",
        amenities: ["WiFi", "Estacionamiento", "Aire acondicionado", "TV"],
        images: [
            {
                url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
                alt: "Hotel Ibis Bogotá Salitre"
            }
        ],
        searchCount: 720
    },
    {
        name: "Hotel Casa Deco",
        description: "Hotel boutique con diseño art déco en el centro histórico, perfecto para viajeros que aprecian la arquitectura.",
        address: {
            street: "Calle 12C # 2-36",
            neighborhood: "La Candelaria",
            city: "Bogotá",
            coordinates: {
                lat: 4.5980,
                lng: -74.0750
            }
        },
        rating: 4.4,
        priceRange: "Medio",
        amenities: ["WiFi", "Restaurante", "Bar", "Aire acondicionado", "TV", "Caja fuerte"],
        images: [
            {
                url: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800",
                alt: "Hotel Casa Deco"
            }
        ],
        searchCount: 650
    },
    {
        name: "Hotel Zona T",
        description: "Hotel moderno en la zona rosa, ideal para jóvenes y viajeros que buscan vida nocturna.",
        address: {
            street: "Calle 85 # 12-46",
            neighborhood: "Chapinero",
            city: "Bogotá",
            coordinates: {
                lat: 4.6680,
                lng: -74.0450
            }
        },
        rating: 4.1,
        priceRange: "Medio",
        amenities: ["WiFi", "Restaurante", "Bar", "Estacionamiento", "Aire acondicionado", "TV"],
        images: [
            {
                url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
                alt: "Hotel Zona T"
            }
        ],
        searchCount: 580
    },
    {
        name: "Hotel Embassy Suites",
        description: "Hotel de lujo con suites amplias, perfecto para familias y viajes de negocios.",
        address: {
            street: "Calle 70 # 6-22",
            neighborhood: "Chapinero",
            city: "Bogotá",
            coordinates: {
                lat: 4.6580,
                lng: -74.0550
            }
        },
        rating: 4.7,
        priceRange: "Lujo",
        amenities: ["WiFi", "Piscina", "Gimnasio", "Restaurante", "Bar", "Spa", "Estacionamiento", "Aire acondicionado", "TV", "Minibar", "Caja fuerte"],
        images: [
            {
                url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
                alt: "Hotel Embassy Suites"
            }
        ],
        searchCount: 920
    },
    {
        name: "Hotel Hostal Casa Bellavista",
        description: "Hostal acogedor con ambiente familiar, ideal para mochileros y viajeros con presupuesto limitado.",
        address: {
            street: "Calle 69 # 8-45",
            neighborhood: "Chapinero",
            city: "Bogotá",
            coordinates: {
                lat: 4.6580,
                lng: -74.0650
            }
        },
        rating: 3.9,
        priceRange: "Económico",
        amenities: ["WiFi", "Aire acondicionado", "TV"],
        images: [
            {
                url: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
                alt: "Hostal Casa Bellavista"
            }
        ],
        searchCount: 420
    },
    {
        name: "Hotel W Bogotá",
        description: "Hotel de lujo con diseño contemporáneo, ubicado en el corazón financiero de la ciudad.",
        address: {
            street: "Calle 9A # 40-31",
            neighborhood: "Chapinero",
            city: "Bogotá",
            coordinates: {
                lat: 4.6480,
                lng: -74.0650
            }
        },
        rating: 4.9,
        priceRange: "Lujo",
        amenities: ["WiFi", "Piscina", "Gimnasio", "Restaurante", "Bar", "Spa", "Servicio de habitaciones", "Estacionamiento", "Aire acondicionado", "TV", "Minibar", "Caja fuerte"],
        images: [
            {
                url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
                alt: "Hotel W Bogotá"
            }
        ],
        searchCount: 1350
    }
];

async function seedDatabase() {
    try {
        // Limpiar base de datos
        await Hotel.deleteMany({});
        console.log('🗑️ Base de datos limpiada');

        // Insertar datos de ejemplo
        const hotels = await Hotel.insertMany(hotelsData);
        console.log(`✅ ${hotels.length} hoteles insertados exitosamente`);

        return hotels;
    } catch (error) {
        console.error('❌ Error al poblar la base de datos:', error);
        throw error;
    }
}

module.exports = { seedDatabase, hotelsData };

