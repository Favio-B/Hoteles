const Hotel = require('../models/Hotel');

// Repository Pattern para acceso a datos
class HotelRepository {
    async findAll(filters = {}) {
        try {
            const query = { isActive: true };
            
            if (filters.neighborhood) {
                query['address.neighborhood'] = filters.neighborhood;
            }
            
            if (filters.priceRange) {
                query.priceRange = filters.priceRange;
            }
            
            if (filters.minRating) {
                query.rating = { $gte: filters.minRating };
            }
            
            if (filters.amenities && filters.amenities.length > 0) {
                query.amenities = { $in: filters.amenities };
            }
            
            return await Hotel.find(query).sort({ searchCount: -1, rating: -1 });
        } catch (error) {
            throw new Error(`Error al obtener hoteles: ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const hotel = await Hotel.findById(id);
            if (!hotel) {
                throw new Error('Hotel no encontrado');
            }
            return hotel;
        } catch (error) {
            throw new Error(`Error al obtener hotel: ${error.message}`);
        }
    }

    async findMostSearched(limit = 10) {
        try {
            return await Hotel.find({ isActive: true })
                .sort({ searchCount: -1 })
                .limit(limit);
        } catch (error) {
            throw new Error(`Error al obtener hoteles más buscados: ${error.message}`);
        }
    }

    async searchByName(name) {
        try {
            return await Hotel.find({
                name: { $regex: name, $options: 'i' },
                isActive: true
            }).sort({ searchCount: -1 });
        } catch (error) {
            throw new Error(`Error al buscar hoteles: ${error.message}`);
        }
    }

    async incrementSearchCount(id) {
        try {
            return await Hotel.findByIdAndUpdate(
                id,
                { $inc: { searchCount: 1 } },
                { new: true }
            );
        } catch (error) {
            throw new Error(`Error al incrementar contador de búsquedas: ${error.message}`);
        }
    }

    async create(hotelData) {
        try {
            const hotel = new Hotel(hotelData);
            return await hotel.save();
        } catch (error) {
            throw new Error(`Error al crear hotel: ${error.message}`);
        }
    }

    async update(id, updateData) {
        try {
            const hotel = await Hotel.findByIdAndUpdate(id, updateData, { new: true });
            if (!hotel) {
                throw new Error('Hotel no encontrado');
            }
            return hotel;
        } catch (error) {
            throw new Error(`Error al actualizar hotel: ${error.message}`);
        }
    }

    async addReview(id, review) {
        try {
            const hotel = await Hotel.findById(id);
            if (!hotel) {
                throw new Error('Hotel no encontrado');
            }
            hotel.reviews.push(review);
            // Recalcular rating promedio si hay reseñas
            if (hotel.reviews.length > 0) {
                const avg = hotel.reviews.reduce((a, r) => a + r.rating, 0) / hotel.reviews.length;
                hotel.rating = Math.round(avg * 10) / 10; // un decimal
            }
            return await hotel.save();
        } catch (error) {
            throw new Error(`Error al agregar reseña: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const hotel = await Hotel.findByIdAndUpdate(
                id,
                { isActive: false },
                { new: true }
            );
            if (!hotel) {
                throw new Error('Hotel no encontrado');
            }
            return hotel;
        } catch (error) {
            throw new Error(`Error al eliminar hotel: ${error.message}`);
        }
    }
}

module.exports = new HotelRepository();

