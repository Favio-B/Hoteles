const Hotel = require('../models/Hotel');

const hotelsData = [
    {
        name: "Hotel Tequendama",
        description: "Hotel histórico emblemático de Bogotá, ubicado en el corazón de La Candelaria. Combina la arquitectura colonial con servicios modernos de primera clase. Ofrece habitaciones elegantes con vistas panorámicas de la ciudad, restaurante gourmet, centro de negocios y servicios de concierge. Ideal para ejecutivos, turistas culturales y eventos corporativos. Cuenta con 24 horas de servicio, WiFi de alta velocidad y estacionamiento privado.",
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
        description: "Hotel boutique de lujo ubicado en una mansión colonial restaurada en La Candelaria. Cada suite está diseñada individualmente con mobiliario de época y tecnología moderna. Incluye restaurante gourmet con cocina internacional, bar especializado en cocteles artesanales, spa de lujo y biblioteca privada. Servicio de mayordomo personalizado y tours culturales exclusivos. Perfecto para ocasiones especiales, luna de miel y viajeros que buscan experiencias únicas y auténticas.",
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
        description: "Hotel de lujo contemporáneo en el exclusivo sector norte de Bogotá. Arquitectura moderna con jardines tropicales y vistas panorámicas de la ciudad. Habitaciones amplias con balcones privados, spa de clase mundial con tratamientos exclusivos, piscina infinita con vista a la ciudad y múltiples restaurantes gourmet. Centro de convenciones con capacidad para 500 personas, gimnasio de última generación y servicio de concierge 24/7. Ideal para ejecutivos de alto nivel, eventos corporativos y viajeros que buscan exclusividad y confort premium.",
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
        description: "El corazón palpitante de Bogotá te espera en este hotel céntrico que combina conveniencia y comodidad. Ubicado en el vibrante barrio de Chapinero, está rodeado de museos, galerías de arte, restaurantes de moda y vida nocturna. Sus habitaciones modernas y funcionales están diseñadas para el viajero contemporáneo que valora la ubicación y el acceso a la cultura urbana. Con un servicio amigable y precios accesibles, es la base perfecta para explorar la capital colombiana.",
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
        description: "La elección inteligente para viajeros prácticos que buscan comodidad sin comprometer el presupuesto. Ubicado estratégicamente cerca del aeropuerto y centros de convenciones, ofrece conectividad perfecta para viajeros de negocios. Sus habitaciones compactas pero bien diseñadas incluyen todas las comodidades esenciales: WiFi de alta velocidad, aire acondicionado y baños modernos. El restaurante 24/7 y el bar son perfectos para comidas rápidas y networking. Ideal para viajeros frecuentes, mochileros y grupos que valoran la eficiencia y la ubicación.",
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
        description: "Un viaje en el tiempo al glamour de los años 20 en el corazón histórico de Bogotá. Este hotel boutique único celebra el movimiento Art Déco con una restauración meticulosa que preserva los detalles arquitectónicos originales. Cada habitación es una obra de arte, con mobiliario vintage, lámparas de cristal y acabados dorados que evocan la elegancia de la época dorada. El bar clandestino estilo speakeasy y el restaurante con menú de época completan la experiencia inmersiva. Perfecto para amantes del arte, fotógrafos y viajeros que buscan experiencias auténticas y únicas.",
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
        description: "El epicentro de la vida nocturna bogotana te da la bienvenida a este hotel moderno y vibrante. Ubicado en la famosa Zona T, el distrito de entretenimiento más exclusivo de la ciudad, está rodeado de los mejores restaurantes, bares de moda y clubes nocturnos. Sus habitaciones con diseño contemporáneo y tecnología de punta están pensadas para el viajero joven y dinámico. El rooftop con piscina y bar ofrece vistas espectaculares de la ciudad iluminada. Perfecto para millennials, influencers, ejecutivos jóvenes y cualquier persona que quiera estar en el corazón de la acción bogotana.",
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
        description: "El estándar de excelencia en hospitalidad corporativa y familiar en Bogotá. Este hotel de lujo redefine el concepto de suite con espacios amplios y separados que ofrecen máxima comodidad y privacidad. Sus suites de dos habitaciones son ideales para familias, grupos de trabajo y viajeros que buscan espacio y comodidad. El desayuno buffet gratuito, el happy hour nocturno y el centro de negocios 24/7 demuestran su compromiso con la satisfacción del huésped. Con salas de conferencias de última generación y un gimnasio completo, es la elección perfecta para eventos corporativos y estadías prolongadas.",
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
        description: "Un hogar lejos del hogar en el corazón de Bogotá. Este hostal acogedor y auténtico ofrece una experiencia de viaje única para mochileros, estudiantes y viajeros con presupuesto limitado. Con habitaciones compartidas y privadas, espacios comunes diseñados para socializar y una cocina comunitaria, fomenta la conexión entre viajeros de todo el mundo. El personal local amigable organiza tours gratuitos, intercambios de idiomas y eventos culturales. Perfecto para mochileros, estudiantes de intercambio, voluntarios y cualquier viajero que busque autenticidad, comunidad y aventura a precios accesibles.",
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
        description: "El epítome del lujo contemporáneo y la sofisticación urbana en Bogotá. Este hotel de diseño vanguardista redefine la experiencia de lujo con su arquitectura impresionante y decoración artística. Cada espacio es una obra de arte, desde el lobby con instalaciones multimedia hasta las habitaciones con vistas panorámicas de la ciudad. El restaurante de alta cocina, el bar de cocteles moleculares y el spa de última generación crean una experiencia sensorial incomparable. Con tecnología de punta, servicio personalizado y ubicación privilegiada, es el destino definitivo para celebridades, ejecutivos de alto nivel y viajeros que buscan lo último en lujo y exclusividad.",
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
        console.log('Base de datos limpiada');

        // Insertar datos de ejemplo
        const hotels = await Hotel.insertMany(hotelsData);
        console.log(`${hotels.length} hoteles insertados exitosamente`);

        return hotels;
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        throw error;
    }
}

module.exports = { seedDatabase, hotelsData };

