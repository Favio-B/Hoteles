import React, { memo } from 'react';
import { FaStar, FaMapMarkerAlt, FaCalendarCheck, FaTimes } from 'react-icons/fa';

const ComparisonModal = memo(({ 
  showComparison, 
  setShowComparison, 
  comparisonList, 
  getAmenityIcon, 
  getPriceRangeColor, 
  bookHotel 
}) => {
  if (!showComparison) return null;

  return (
    <div className="modal-overlay" onClick={() => setShowComparison(false)}>
      <div className="modal-content comparison-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Comparar Hoteles</h2>
          <button 
            className="modal-close"
            onClick={() => setShowComparison(false)}
            aria-label="Cerrar comparación"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="comparison-table" role="table" aria-label="Tabla de comparación de hoteles">
          <div className="comparison-header" role="row">
            <div className="comparison-cell" role="columnheader">Característica</div>
            {comparisonList.map(hotel => (
              <div key={hotel._id} className="comparison-cell hotel-name" role="columnheader">
                <img 
                  src={hotel.images[0]?.url || 'https://via.placeholder.com/150x100'} 
                  alt={hotel.name}
                  loading="lazy"
                />
                <h4>{hotel.name}</h4>
                <div className="hotel-rating" aria-label={`Calificación: ${hotel.rating} de 5 estrellas`}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < hotel.rating ? 'star-filled' : 'star-empty'} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="comparison-row" role="row">
            <div className="comparison-cell" role="cell">Precio</div>
            {comparisonList.map(hotel => (
              <div key={hotel._id} className="comparison-cell" role="cell">
                <span 
                  className="price-badge" 
                  style={{ backgroundColor: getPriceRangeColor(hotel.priceRange) }}
                  aria-label={`Rango de precio: ${hotel.priceRange}`}
                >
                  {hotel.priceRange}
                </span>
              </div>
            ))}
          </div>
          
          <div className="comparison-row" role="row">
            <div className="comparison-cell" role="cell">Ubicación</div>
            {comparisonList.map(hotel => (
              <div key={hotel._id} className="comparison-cell" role="cell">
                <FaMapMarkerAlt aria-hidden="true" /> 
                <span>{hotel.address.neighborhood}</span>
              </div>
            ))}
          </div>
          
          <div className="comparison-row" role="row">
            <div className="comparison-cell" role="cell">Amenidades</div>
            {comparisonList.map(hotel => (
              <div key={hotel._id} className="comparison-cell" role="cell">
                <div className="amenities-list">
                  {hotel.amenities.map(amenity => (
                    <span key={amenity} className="amenity-tag">
                      {getAmenityIcon(amenity)} {amenity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="comparison-row" role="row">
            <div className="comparison-cell" role="cell">Acciones</div>
            {comparisonList.map(hotel => (
              <div key={hotel._id} className="comparison-cell" role="cell">
                <button 
                  className="btn btn-primary"
                  onClick={() => bookHotel(hotel)}
                  aria-label={`Reservar ${hotel.name}`}
                >
                  <FaCalendarCheck /> Reservar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

ComparisonModal.displayName = 'ComparisonModal';

export default ComparisonModal;
