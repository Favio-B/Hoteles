const HotelRepository = require('../repositories/HotelRepository');
const HotelFactory = require('../factories/HotelFactory');

// Observer Pattern para notificaciones
class HotelObserver {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    notify(event, data) {
        this.observers.forEach(observer => {
            if (observer.update) {
                observer.update(event, data);
            }
        });
    }
}

// Service Layer Pattern para lógica de negocio
class HotelService {
    constructor() {
        this.repository = HotelRepository;
        this.observer = new HotelObserver();
        this.factory = HotelFactory;
    }

    async getAllHotels(filters = {}) {
        try {
            const hotels = await this.repository.findAll(filters);
            this.observer.notify('hotels_retrieved', { count: hotels.length });
            return hotels;
        } catch (error) {
            this.observer.notify('error', { message: error.message });
            throw error;
        }
    }

    async getHotelById(id) {
        try {
            const hotel = await this.repository.findById(id);
            await this.repository.incrementSearchCount(id);
            this.observer.notify('hotel_viewed', { hotelId: id, hotelName: hotel.name });
            return hotel;
        } catch (error) {
            this.observer.notify('error', { message: error.message });
            throw error;
        }
    }

    async getMostSearchedHotels(limit = 10) {
        try {
            const hotels = await this.repository.findMostSearched(limit);
            this.observer.notify('most_searched_retrieved', { count: hotels.length });
            return hotels;
        } catch (error) {
            this.observer.notify('error', { message: error.message });
            throw error;
        }
    }

    async searchHotels(query) {
        try {
            const hotels = await this.repository.searchByName(query);
            this.observer.notify('search_performed', { query, count: hotels.length });
            return hotels;
        } catch (error) {
            this.observer.notify('error', { message: error.message });
            throw error;
        }
    }

    async createHotel(hotelData) {
        try {
            // Usar Factory Pattern para crear el hotel
            const validatedData = this.factory.createHotelData(hotelData);
            const hotel = await this.repository.create(validatedData);
            this.observer.notify('hotel_created', { hotelId: hotel._id, hotelName: hotel.name });
            return hotel;
        } catch (error) {
            this.observer.notify('error', { message: error.message });
            throw error;
        }
    }

    async updateHotel(id, updateData) {
        try {
            const hotel = await this.repository.update(id, updateData);
            this.observer.notify('hotel_updated', { hotelId: id, hotelName: hotel.name });
            return hotel;
        } catch (error) {
            this.observer.notify('error', { message: error.message });
            throw error;
        }
    }

<<<<<<< HEAD
=======
    async addReviewToHotel(id, reviewData) {
        try {
            // Validación básica
            if (!reviewData || !reviewData.author || !reviewData.comment || !reviewData.rating) {
                throw new Error('Campos de reseña incompletos');
            }
            const rating = Number(reviewData.rating);
            if (isNaN(rating) || rating < 1 || rating > 5) {
                throw new Error('Rating inválido');
            }
            const normalized = {
                author: String(reviewData.author).trim(),
                comment: String(reviewData.comment).trim(),
                rating,
                verified: Boolean(reviewData.verified)
            };
            const hotel = await this.repository.addReview(id, normalized);
            this.observer.notify('review_added', { hotelId: id, rating: normalized.rating });
            return hotel;
        } catch (error) {
            this.observer.notify('error', { message: error.message });
            throw error;
        }
    }

>>>>>>> 80d62c4 (Commit 4)
    async deleteHotel(id) {
        try {
            const hotel = await this.repository.delete(id);
            this.observer.notify('hotel_deleted', { hotelId: id, hotelName: hotel.name });
            return hotel;
        } catch (error) {
            this.observer.notify('error', { message: error.message });
            throw error;
        }
    }

    // Método para suscribirse a eventos
    subscribeToEvents(observer) {
        this.observer.subscribe(observer);
    }

    // Método para obtener estadísticas
    async getStatistics() {
        try {
            const allHotels = await this.repository.findAll();
            const mostSearched = await this.repository.findMostSearched(5);
            
            const stats = {
                totalHotels: allHotels.length,
                averageRating: allHotels.reduce((acc, hotel) => acc + hotel.rating, 0) / allHotels.length,
                topSearched: mostSearched.map(hotel => ({
                    name: hotel.name,
                    searchCount: hotel.searchCount
                })),
                priceRanges: {
                    Económico: allHotels.filter(h => h.priceRange === 'Económico').length,
                    Medio: allHotels.filter(h => h.priceRange === 'Medio').length,
                    Alto: allHotels.filter(h => h.priceRange === 'Alto').length,
                    Lujo: allHotels.filter(h => h.priceRange === 'Lujo').length
                }
            };

            this.observer.notify('statistics_retrieved', stats);
            return stats;
        } catch (error) {
            this.observer.notify('error', { message: error.message });
            throw error;
        }
    }
}

module.exports = new HotelService();

