require('dotenv').config();
const DatabaseConfig = require('../config/database');
const { seedDatabase } = require('../data/seedData');

async function main() {
    try {
        console.log('🌱 Iniciando proceso de poblamiento de base de datos...');
        
        // Conectar a la base de datos
        await DatabaseConfig.connect();
        
        // Poblar con datos de ejemplo
        const hotels = await seedDatabase();
        
        console.log(`✅ Base de datos poblada exitosamente con ${hotels.length} hoteles`);
        console.log('🏨 Hoteles agregados:');
        hotels.forEach(hotel => {
            console.log(`  - ${hotel.name} (${hotel.address.neighborhood})`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al poblar la base de datos:', error);
        process.exit(1);
    }
}

main();

