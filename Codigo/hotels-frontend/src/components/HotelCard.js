import React, { memo } from 'react';
import { FaStar, FaMapMarkerAlt, FaHeart, FaBalanceScale, FaEye, FaCalendarCheck } from 'react-icons/fa';

// Componente memoizado para tarjetas de hoteles
const HotelCard = memo(({ 
  hotel, 
  getAmenityIcon, 
  getPriceRangeColor, 
  isFavorite, 
  isInComparison, 
  toggleFavorite, 
  toggleComparison, 
  viewHotelDetails, 
  bookHotel,
  isFeatured = false 
}) => {
  return (
    <div className={`hotel-card ${isFeatured ? 'featured' : ''}`}>
      <div className="hotel-image">
        <img 
          src={hotel.images[0]?.url || 'https://via.placeholder.com/400x250'} 
          alt={hotel.name}
          loading="lazy"
        />
        {isFeatured && <div className="hotel-badge">Más Buscado</div>}
      </div>
      
      <div className="hotel-content">
        <h3>{hotel.name}</h3>
        <p className="hotel-description">{hotel.description}</p>
        
        <div className="hotel-location">
          <FaMapMarkerAlt />
          <span>{hotel.address.neighborhood}, {hotel.address.city}</span>
        </div>
        
        <div className="hotel-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < hotel.rating ? 'star-filled' : 'star-empty'} />
            ))}
          </div>
          <span className="rating-text">{hotel.rating}/5</span>
        </div>
        
        <div className="hotel-price-range">
          <span 
            className="price-badge"
            style={{ backgroundColor: getPriceRangeColor(hotel.priceRange) }}
          >
            {hotel.priceRange}
          </span>
        </div>
        
        <div className="hotel-amenities">
          {hotel.amenities.slice(0, 4).map(amenity => (
            <span key={amenity} className="amenity-icon" title={amenity}>
              {getAmenityIcon(amenity)}
            </span>
          ))}
        </div>
        
        <div className="search-count">
          <span>{hotel.searchCount} búsquedas</span>
        </div>
        
        {/* Botones de acción */}
        <div className="hotel-actions">
          <button 
            className={`action-btn ${isFavorite(hotel) ? 'active' : ''}`}
            onClick={() => toggleFavorite(hotel)}
            title={isFavorite(hotel) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            aria-label={isFavorite(hotel) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <FaHeart />
          </button>
          
          <button 
            className={`action-btn ${isInComparison(hotel) ? 'active' : ''}`}
            onClick={() => toggleComparison(hotel)}
            title={isInComparison(hotel) ? 'Quitar de comparación' : 'Agregar a comparación'}
            disabled={!isInComparison(hotel) && comparisonList.length >= 3}
            aria-label={isInComparison(hotel) ? 'Quitar de comparación' : 'Agregar a comparación'}
          >
            <FaBalanceScale />
          </button>
          
          <button 
            className="action-btn"
            onClick={() => viewHotelDetails(hotel)}
            title="Ver detalles"
            aria-label="Ver detalles del hotel"
          >
            <FaEye />
          </button>
          
          <button 
            className="action-btn book-btn"
            onClick={() => bookHotel(hotel)}
            title="Reservar"
            aria-label="Reservar hotel"
          >
            <FaCalendarCheck />
          </button>
        </div>
      </div>
    </div>
  );
});

HotelCard.displayName = 'HotelCard';

export default HotelCard;
