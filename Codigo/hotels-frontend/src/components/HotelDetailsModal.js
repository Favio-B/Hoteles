import React, { memo } from 'react';
import { FaStar, FaMapMarkerAlt, FaHeart, FaCalendarCheck, FaUser, FaComment, FaTimes } from 'react-icons/fa';

const HotelDetailsModal = memo(({ 
  selectedHotel, 
  showHotelDetails, 
  setShowHotelDetails, 
  getAmenityIcon, 
  isFavorite, 
  toggleFavorite, 
  bookHotel,
  userReviews,
  newReview,
  setNewReview,
  addReview
}) => {
  if (!showHotelDetails || !selectedHotel) return null;

  return (
    <div className="modal-overlay" onClick={() => setShowHotelDetails(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{selectedHotel.name}</h2>
          <button 
            className="modal-close"
            onClick={() => setShowHotelDetails(false)}
            aria-label="Cerrar modal"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="hotel-gallery">
            <img 
              src={selectedHotel.images[0]?.url || 'https://via.placeholder.com/600x400'} 
              alt={selectedHotel.name}
              className="main-image"
              loading="lazy"
            />
          </div>
          
          <div className="hotel-info">
            <div className="hotel-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < selectedHotel.rating ? 'star-filled' : 'star-empty'} />
                ))}
              </div>
              <span className="rating-text">{selectedHotel.rating}/5</span>
            </div>
            
            <div className="hotel-location">
              <FaMapMarkerAlt />
              <span>{selectedHotel.address.street}, {selectedHotel.address.neighborhood}</span>
            </div>
            
            <p className="hotel-description-full">{selectedHotel.description}</p>
            
            <div className="hotel-amenities-full">
              <h4>Amenidades:</h4>
              <div className="amenities-grid">
                {selectedHotel.amenities.map(amenity => (
                  <span key={amenity} className="amenity-item">
                    {getAmenityIcon(amenity)} {amenity}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="hotel-actions-modal">
              <button 
                className="btn btn-primary"
                onClick={() => bookHotel(selectedHotel)}
              >
                <FaCalendarCheck /> Reservar Ahora
              </button>
              
              <button 
                className={`btn ${isFavorite(selectedHotel) ? 'btn-secondary' : 'btn-outline'}`}
                onClick={() => toggleFavorite(selectedHotel)}
              >
                <FaHeart /> {isFavorite(selectedHotel) ? 'En Favoritos' : 'Agregar a Favoritos'}
              </button>
            </div>
          </div>
        </div>
        
        {/* Sección de Reseñas */}
        <div className="reviews-section">
          <h3>Reseñas de Usuarios</h3>
          
          {/* Formulario para nueva reseña */}
          <div className="new-review">
            <h4>Agregar Reseña</h4>
            <div className="review-form">
              <div className="form-group">
                <label htmlFor="review-author">Tu nombre:</label>
                <input 
                  id="review-author"
                  type="text"
                  value={newReview.author}
                  onChange={(e) => setNewReview({...newReview, author: e.target.value})}
                  placeholder="Ingresa tu nombre"
                  aria-describedby="author-help"
                />
                <small id="author-help" className="form-help">Campo obligatorio</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="review-rating">Calificación:</label>
                <div className="rating-input" role="radiogroup" aria-labelledby="rating-label">
                  <span id="rating-label" className="sr-only">Selecciona una calificación</span>
                  {[1,2,3,4,5].map(star => (
                    <button
                      key={star}
                      type="button"
                      className={`rating-star ${star <= newReview.rating ? 'active' : ''}`}
                      onClick={() => setNewReview({...newReview, rating: star})}
                      aria-label={`Calificar con ${star} estrella${star > 1 ? 's' : ''}`}
                      aria-pressed={star <= newReview.rating}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="review-comment">Comentario:</label>
                <textarea 
                  id="review-comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Escribe tu reseña aquí..."
                  rows="3"
                  aria-describedby="comment-help"
                />
                <small id="comment-help" className="form-help">Mínimo 10 caracteres</small>
              </div>
              
              <button 
                className="btn btn-primary"
                onClick={addReview}
                disabled={!newReview.comment.trim() || !newReview.author.trim()}
                aria-describedby="submit-help"
              >
                <FaComment /> Agregar Reseña
              </button>
              <small id="submit-help" className="form-help">Completa todos los campos para habilitar el botón</small>
            </div>
          </div>
          
          {/* Lista de reseñas */}
          <div className="reviews-list">
            {userReviews.map(review => (
              <article key={review.id} className="review-item">
                <div className="review-header">
                  <div className="review-author">
                    <FaUser /> {review.author}
                  </div>
                  <div className="review-rating" aria-label={`Calificación: ${review.rating} de 5 estrellas`}>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? 'star-filled' : 'star-empty'} />
                    ))}
                  </div>
                  <time className="review-date" dateTime={review.date}>{review.date}</time>
                </div>
                <p className="review-comment">{review.comment}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

HotelDetailsModal.displayName = 'HotelDetailsModal';

export default HotelDetailsModal;
