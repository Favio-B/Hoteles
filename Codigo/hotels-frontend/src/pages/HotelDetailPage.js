import React, { useState, useEffect, useCallback } from 'react';
import { 
  FaStar, FaMapMarkerAlt, FaWifi, FaCar, FaSwimmingPool, FaDumbbell, 
  FaUtensils, FaGlassMartini, FaSpa, FaConciergeBell, FaSnowflake, 
  FaTv, FaWineBottle, FaLock, FaHeart, FaShare, FaCalendarAlt, 
  FaBed, FaUsers, FaShower, FaCoffee, FaWifi as FaWifiIcon, FaParking,
  FaSwimmingPool as FaPool, FaDumbbell as FaGym, FaUtensils as FaRestaurant,
  FaGlassMartini as FaBar, FaSpa as FaSpaIcon, FaConciergeBell as FaConcierge,
  FaSnowflake as FaAC, FaTv as FaTV, FaWineBottle as FaMinibar, FaLock as FaSafe,
  FaCheck, FaTimes, FaClock, FaCreditCard, FaShieldAlt, FaGift
} from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HotelDetailPage.css';
<<<<<<< HEAD
=======
import Breadcrumb from '../components/Breadcrumb';
import NavBar from '../components/NavBar';
import BookingModal from '../components/BookingModal';
>>>>>>> 80d62c4 (Commit 4)

const API_BASE_URL = 'http://localhost:9090/api';

const HotelDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', author: '' });

  // Datos simulados para habitaciones
  const roomTypes = [
    {
      id: 1,
      name: 'Habitación Estándar',
      description: 'Habitación cómoda con vista a la ciudad',
      price: 150000,
      capacity: 2,
      amenities: ['WiFi', 'TV', 'Aire acondicionado', 'Baño privado'],
      images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],
      available: true
    },
    {
      id: 2,
      name: 'Suite Ejecutiva',
      description: 'Suite amplia con sala de estar separada',
      price: 280000,
      capacity: 4,
      amenities: ['WiFi', 'TV', 'Aire acondicionado', 'Baño privado', 'Minibar', 'Sala de estar'],
      images: ['https://images.unsplash.com/photo-1611892440501-80a6aee829b7?w=800'],
      available: true
    },
    {
      id: 3,
      name: 'Suite Presidencial',
      description: 'Suite de lujo con todas las comodidades',
      price: 450000,
      capacity: 6,
      amenities: ['WiFi', 'TV', 'Aire acondicionado', 'Baño privado', 'Minibar', 'Sala de estar', 'Jacuzzi'],
      images: ['https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800'],
      available: false
    }
  ];

  // Servicios adicionales (upsells)
  const additionalServices = [
    {
      id: 1,
      name: 'Desayuno Continental',
      description: 'Desayuno buffet con opciones internacionales',
      price: 25000,
      icon: <FaCoffee />,
      popular: true
    },
    {
      id: 2,
      name: 'Late Check-out',
      description: 'Check-out hasta las 2:00 PM',
      price: 50000,
      icon: <FaClock />,
      popular: false
    },
    {
      id: 3,
      name: 'Servicio de Spa',
      description: 'Masaje relajante de 60 minutos',
      price: 120000,
      icon: <FaSpaIcon />,
      popular: false
    },
    {
      id: 4,
      name: 'Parking Premium',
      description: 'Estacionamiento cubierto y seguro',
      price: 30000,
      icon: <FaParking />,
      popular: false
    }
  ];

  useEffect(() => {
    fetchHotelDetails();
  }, [id]);

  const fetchHotelDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/hotels/${id}`);
<<<<<<< HEAD
      setHotel(response.data.data);
      
      // Simular reseñas
      setReviews([
        {
          id: 1,
          author: 'María González',
          rating: 5,
          comment: 'Excelente hotel, muy recomendado! El servicio es excepcional.',
          date: '2024-01-15',
          verified: true
        },
        {
          id: 2,
          author: 'Carlos López',
          rating: 4,
          comment: 'Buen hotel, ubicación céntrica y personal amable.',
          date: '2024-01-10',
          verified: true
        },
        {
          id: 3,
          author: 'Ana Rodríguez',
          rating: 5,
          comment: 'Las habitaciones son muy cómodas y limpias.',
          date: '2024-01-08',
          verified: false
        }
      ]);
=======
      const data = response.data.data;
      setHotel(data);
      setReviews((data && data.reviews) ? data.reviews.map((r, idx) => ({
        id: r._id || idx,
        author: r.author,
        rating: r.rating,
        comment: r.comment,
        date: (r.date || new Date()).toString().slice(0,10),
        verified: !!r.verified
      })) : []);
>>>>>>> 80d62c4 (Commit 4)
    } catch (err) {
      setError('Error al cargar los detalles del hotel');
    } finally {
      setLoading(false);
    }
  };

  const getAmenityIcon = useCallback((amenity) => {
    const icons = {
      'WiFi': <FaWifiIcon />,
      'Estacionamiento': <FaParking />,
      'Piscina': <FaPool />,
      'Gimnasio': <FaGym />,
      'Restaurante': <FaRestaurant />,
      'Bar': <FaBar />,
      'Spa': <FaSpaIcon />,
      'Servicio de habitaciones': <FaConcierge />,
      'Aire acondicionado': <FaAC />,
      'TV': <FaTV />,
      'Minibar': <FaMinibar />,
      'Caja fuerte': <FaSafe />
    };
    return icons[amenity] || <FaWifiIcon />;
  }, []);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleBooking = () => {
<<<<<<< HEAD
    if (!selectedRoom) {
      alert('Por favor selecciona una habitación');
      return;
    }
=======
    // Permite abrir el modal sin habitación previa; la selección se hace en el modal
>>>>>>> 80d62c4 (Commit 4)
    if (!checkIn || !checkOut) {
      alert('Por favor selecciona las fechas de entrada y salida');
      return;
    }
    setShowBookingModal(true);
  };

  const calculateTotal = () => {
    if (!selectedRoom) return 0;
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    return selectedRoom.price * nights;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando detalles del hotel...</p>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'Hotel no encontrado'}</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="hotel-detail-page">
<<<<<<< HEAD
=======
      <NavBar />
>>>>>>> 80d62c4 (Commit 4)
      {/* Header con navegación */}
      <div className="hotel-header">
        <div className="container">
          <button onClick={() => navigate('/')} className="back-btn">
            ← Volver a hoteles
          </button>
          <div className="hotel-title">
            <h1>{hotel.name}</h1>
            <div className="hotel-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < hotel.rating ? 'star-filled' : 'star-empty'} />
                ))}
              </div>
              <span className="rating-text">{hotel.rating}/5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Galería de imágenes */}
      <section className="hotel-gallery">
        <div className="container">
<<<<<<< HEAD
=======
          <Breadcrumb items={[{ label: 'Inicio', to: '/' }, { label: hotel.name }]} />
>>>>>>> 80d62c4 (Commit 4)
          <div className="gallery-main">
            <img 
              src={hotel.images[selectedImage]?.url || 'https://via.placeholder.com/800x500'} 
              alt={hotel.name}
              className="main-image"
            />
            <div className="gallery-controls">
              <button 
                className="gallery-btn prev"
                onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                disabled={selectedImage === 0}
              >
                ‹
              </button>
              <button 
                className="gallery-btn next"
                onClick={() => setSelectedImage(Math.min(hotel.images.length - 1, selectedImage + 1))}
                disabled={selectedImage === hotel.images.length - 1}
              >
                ›
              </button>
            </div>
          </div>
          
          <div className="gallery-thumbnails">
            {hotel.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`${hotel.name} ${index + 1}`}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Información principal */}
      <section className="hotel-info">
        <div className="container">
          <div className="info-grid">
            <div className="main-info">
              <div className="hotel-location">
                <FaMapMarkerAlt />
                <span>{hotel.address.street}, {hotel.address.neighborhood}</span>
              </div>
              
              <p className="hotel-description">{hotel.description}</p>
              
              <div className="hotel-amenities">
                <h3>Amenidades del Hotel</h3>
                <div className="amenities-grid">
                  {hotel.amenities.map(amenity => (
                    <div key={amenity} className="amenity-item">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Políticas del hotel */}
              <div className="hotel-policies">
                <h3>Políticas del Hotel</h3>
                <div className="policies-grid">
                  <div className="policy-item">
                    <FaClock />
                    <div>
                      <strong>Check-in:</strong> 3:00 PM
                    </div>
                  </div>
                  <div className="policy-item">
                    <FaClock />
                    <div>
                      <strong>Check-out:</strong> 11:00 AM
                    </div>
                  </div>
                  <div className="policy-item">
                    <FaUsers />
                    <div>
                      <strong>Política de niños:</strong> Gratis hasta 12 años
                    </div>
                  </div>
                  <div className="policy-item">
                    <FaCreditCard />
                    <div>
                      <strong>Métodos de pago:</strong> Efectivo, Tarjeta, Transferencia
                    </div>
                  </div>
                </div>
              </div>

              {/* Reseñas */}
              <div className="hotel-reviews">
                <h3>Reseñas de Huéspedes</h3>
                <div className="reviews-summary">
                  <div className="rating-breakdown">
                    <div className="rating-item">
                      <span>Excelente</span>
                      <div className="rating-bar">
                        <div className="rating-fill" style={{width: '85%'}}></div>
                      </div>
                      <span>85%</span>
                    </div>
                    <div className="rating-item">
                      <span>Muy bueno</span>
                      <div className="rating-bar">
                        <div className="rating-fill" style={{width: '15%'}}></div>
                      </div>
                      <span>15%</span>
                    </div>
                  </div>
                </div>
                
                <div className="reviews-list">
                  {reviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="review-author">
                          <FaUsers />
                          <span>{review.author}</span>
                          {review.verified && <FaCheck className="verified" />}
                        </div>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className={i < review.rating ? 'star-filled' : 'star-empty'} />
                          ))}
                        </div>
                        <div className="review-date">{review.date}</div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
<<<<<<< HEAD
=======

                {/* Agregar reseña */}
                <div className="add-review" style={{marginTop: 20}}>
                  <h4>Agrega tu reseña</h4>
                  <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12}}>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      value={newReview.author}
                      onChange={(e)=>setNewReview({...newReview, author: e.target.value})}
                    />
                    <select
                      value={newReview.rating}
                      onChange={(e)=>setNewReview({...newReview, rating: parseInt(e.target.value)})}
                    >
                      {[1,2,3,4,5].map(n=> (<option key={n} value={n}>{n} estrella{n>1?'s':''}</option>))}
                    </select>
                  </div>
                  <textarea
                    placeholder="Tu comentario"
                    value={newReview.comment}
                    onChange={(e)=>setNewReview({...newReview, comment: e.target.value})}
                    rows={4}
                    style={{width:'100%', padding:12, border:'2px solid var(--color-border)', borderRadius:8}}
                  />
                  <div style={{marginTop:12}}>
                    <button
                      className="btn btn-primary"
                      onClick={async () => {
                        if(!newReview.author || !newReview.comment){ alert('Por favor completa nombre y comentario'); return; }
                        try {
                          const payload = { author: newReview.author, rating: newReview.rating, comment: newReview.comment };
                          const resp = await axios.post(`${API_BASE_URL}/hotels/${id}/reviews`, payload);
                          const list = resp.data?.data || [];
                          setReviews(list.map((r, idx) => ({ id: r._id || idx, author: r.author, rating: r.rating, comment: r.comment, date: (r.date||new Date()).toString().slice(0,10), verified: !!r.verified })));
                          setNewReview({ rating: 5, comment: '', author: '' });
                        } catch(e) {
                          alert('No se pudo guardar la reseña');
                        }
                      }}
                    >
                      Publicar reseña
                    </button>
                  </div>
                </div>
>>>>>>> 80d62c4 (Commit 4)
              </div>
            </div>

            {/* Panel de reserva */}
            <div className="booking-panel">
              <div className="booking-card">
                <div className="price-info">
                  <span className="price-label">Desde</span>
                  <span className="price-amount">$150,000</span>
                  <span className="price-period">por noche</span>
                </div>
                
                <div className="booking-form">
                  <div className="form-group">
                    <label>Fechas</label>
                    <div className="date-inputs">
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        placeholder="Entrada"
                      />
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        placeholder="Salida"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Huéspedes</label>
                    <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))}>
                      <option value={1}>1 huésped</option>
                      <option value={2}>2 huéspedes</option>
                      <option value={3}>3 huéspedes</option>
                      <option value={4}>4 huéspedes</option>
                      <option value={5}>5+ huéspedes</option>
                    </select>
                  </div>
                  
                  <button 
                    className="btn btn-primary btn-large"
                    onClick={handleBooking}
                  >
                    <FaCalendarAlt /> Ver Disponibilidad
                  </button>
                </div>
                
                <div className="booking-features">
                  <div className="feature-item">
                    <FaShieldAlt />
                    <span>Reserva segura</span>
                  </div>
                  <div className="feature-item">
                    <FaGift />
                    <span>Mejor precio garantizado</span>
                  </div>
                  <div className="feature-item">
                    <FaTimes />
                    <span>Cancelación gratuita</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de reserva */}
      {showBookingModal && (
        <BookingModal
          hotel={hotel}
          roomTypes={roomTypes}
          additionalServices={additionalServices}
          selectedRoom={selectedRoom}
          setSelectedRoom={setSelectedRoom}
          checkIn={checkIn}
          checkOut={checkOut}
          guests={guests}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
};

export default HotelDetailPage;
