const HotelService = require('../services/HotelService');
const HotelFactory = require('../factories/HotelFactory');

// Observer para logging
class LoggingObserver {
    update(event, data) {
        console.log(`[${new Date().toISOString()}] Event: ${event}`, data);
    }
}

class HotelController {
    constructor() {
        this.service = HotelService;
        this.factory = HotelFactory;
        
        // Suscribir observer para logging
        this.service.subscribeToEvents(new LoggingObserver());
    }

    // GET /api/hotels - Obtener todos los hoteles
    async getAllHotels(req, res) {
        try {
            const filters = this.factory.createSearchFilters(req.query);
            const hotels = await this.service.getAllHotels(filters);
            
            res.status(200).json({
                success: true,
                data: hotels,
                count: hotels.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // GET /api/hotels/most-searched - Obtener hoteles más buscados
    async getMostSearchedHotels(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 10;
            const hotels = await this.service.getMostSearchedHotels(limit);
            
            res.status(200).json({
                success: true,
                data: hotels,
                count: hotels.length
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // GET /api/hotels/search - Buscar hoteles por nombre
    async searchHotels(req, res) {
        try {
            const { query } = req.query;
            
            if (!query) {
                return res.status(400).json({
                    success: false,
                    message: 'Query parameter is required'
                });
            }

            const hotels = await this.service.searchHotels(query);
            
            res.status(200).json({
                success: true,
                data: hotels,
                count: hotels.length,
                query
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // GET /api/hotels/:id - Obtener hotel por ID
    async getHotelById(req, res) {
        try {
            const { id } = req.params;
            const hotel = await this.service.getHotelById(id);
            
            res.status(200).json({
                success: true,
                data: hotel
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // POST /api/hotels - Crear nuevo hotel
    async createHotel(req, res) {
        try {
            const hotel = await this.service.createHotel(req.body);
            
            res.status(201).json({
                success: true,
                data: hotel,
                message: 'Hotel creado exitosamente'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // PUT /api/hotels/:id - Actualizar hotel
    async updateHotel(req, res) {
        try {
            const { id } = req.params;
            const updateData = this.factory.createHotelUpdateData(req.body);
            const hotel = await this.service.updateHotel(id, updateData);
            
            res.status(200).json({
                success: true,
                data: hotel,
                message: 'Hotel actualizado exitosamente'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // DELETE /api/hotels/:id - Eliminar hotel
    async deleteHotel(req, res) {
        try {
            const { id } = req.params;
            const hotel = await this.service.deleteHotel(id);
            
            res.status(200).json({
                success: true,
                data: hotel,
                message: 'Hotel eliminado exitosamente'
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // GET /api/hotels/stats/statistics - Obtener estadísticas
    async getStatistics(req, res) {
        try {
            const stats = await this.service.getStatistics();
            
            res.status(200).json({
                success: true,
                data: stats
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // GET /api/hotels/neighborhoods - Obtener barrios disponibles
    async getNeighborhoods(req, res) {
        try {
            const hotels = await this.service.getAllHotels();
            const neighborhoods = [...new Set(hotels.map(hotel => hotel.address.neighborhood))].sort();
            
            res.status(200).json({
                success: true,
                data: neighborhoods
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new HotelController();

