import React, { useState, useCallback } from 'react';
import { 
  FaTimes, FaBed, FaUsers, FaShower, FaCoffee, FaWifi, FaTv, 
  FaSnowflake, FaWineBottle, FaLock, FaCheck, FaPlus, FaMinus,
  FaCreditCard, FaUser, FaEnvelope, FaPhone, FaCalendarAlt,
  FaGift, FaShieldAlt, FaClock, FaParking, FaSpa
} from 'react-icons/fa';
import './BookingModal.css';

const BookingModal = ({ 
  hotel, 
  roomTypes, 
  additionalServices, 
  selectedRoom, 
  setSelectedRoom,
  checkIn, 
  checkOut, 
  guests, 
  onClose 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    return Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
  };

  const calculateRoomTotal = () => {
    if (!selectedRoom) return 0;
    return selectedRoom.price * calculateNights();
  };

  const calculateServicesTotal = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const calculateTaxes = () => {
    const subtotal = calculateRoomTotal() + calculateServicesTotal();
    return Math.round(subtotal * 0.19); // 19% IVA
  };

  const calculateTotal = () => {
    return calculateRoomTotal() + calculateServicesTotal() + calculateTaxes();
  };

  const toggleService = (service) => {
    setSelectedServices(prev => 
      prev.some(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const getAmenityIcon = useCallback((amenity) => {
    const icons = {
      'WiFi': <FaWifi />,
      'TV': <FaTv />,
      'Aire acondicionado': <FaSnowflake />,
      'Baño privado': <FaShower />,
      'Minibar': <FaWineBottle />,
      'Caja fuerte': <FaLock />,
      'Sala de estar': <FaUsers />
    };
    return icons[amenity] || <FaWifi />;
  }, []);

  const getServiceIcon = (serviceName) => {
    const icons = {
      'Desayuno Continental': <FaCoffee />,
      'Late Check-out': <FaClock />,
      'Servicio de Spa': <FaSpa />,
      'Parking Premium': <FaParking />
    };
    return icons[serviceName] || <FaGift />;
  };

  const handleSubmit = () => {
    // Simular procesamiento de reserva
    alert(`Reserva confirmada para ${hotel.name}!\n\nTotal: ${formatPrice(calculateTotal())}\n\nTe contactaremos pronto para confirmar los detalles.`);
    onClose();
  };

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Reservar en {hotel.name}</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-content">
          {/* Paso 1: Selección de habitación */}
          {currentStep === 1 && (
            <div className="step-content">
              <h3>Selecciona tu habitación</h3>
              <div className="rooms-grid">
                {roomTypes.map(room => (
                  <div 
                    key={room.id} 
                    className={`room-card ${selectedRoom?.id === room.id ? 'selected' : ''} ${!room.available ? 'unavailable' : ''}`}
                    onClick={() => room.available && setSelectedRoom(room)}
                  >
                    <div className="room-image">
                      <img src={room.images[0]} alt={room.name} />
                      {!room.available && <div className="unavailable-badge">No disponible</div>}
                    </div>
                    
                    <div className="room-info">
                      <h4>{room.name}</h4>
                      <p>{room.description}</p>
                      
                      <div className="room-amenities">
                        {room.amenities.map(amenity => (
                          <span key={amenity} className="amenity-tag">
                            {getAmenityIcon(amenity)}
                            {amenity}
                          </span>
                        ))}
                      </div>
                      
                      <div className="room-details">
                        <div className="detail-item">
                          <FaUsers />
                          <span>{room.capacity} huéspedes</span>
                        </div>
                        <div className="detail-item">
                          <FaBed />
                          <span>1 cama</span>
                        </div>
                      </div>
                      
                      <div className="room-price">
                        <span className="price">{formatPrice(room.price)}</span>
                        <span className="period">por noche</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="step-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => setCurrentStep(2)}
                  disabled={!selectedRoom}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Paso 2: Servicios adicionales */}
          {currentStep === 2 && (
            <div className="step-content">
              <h3>Servicios adicionales</h3>
              <p className="step-description">Personaliza tu estadía con estos servicios opcionales</p>
              
              <div className="services-grid">
                {additionalServices.map(service => (
                  <div 
                    key={service.id}
                    className={`service-card ${selectedServices.some(s => s.id === service.id) ? 'selected' : ''}`}
                    onClick={() => toggleService(service)}
                  >
                    <div className="service-icon">
                      {getServiceIcon(service.name)}
                    </div>
                    
                    <div className="service-info">
                      <h4>{service.name}</h4>
                      <p>{service.description}</p>
                      {service.popular && <span className="popular-badge">Popular</span>}
                    </div>
                    
                    <div className="service-price">
                      <span>{formatPrice(service.price)}</span>
                    </div>
                    
                    <div className="service-checkbox">
                      {selectedServices.some(s => s.id === service.id) ? (
                        <FaCheck className="checked" />
                      ) : (
                        <div className="unchecked" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="step-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => setCurrentStep(1)}
                >
                  Atrás
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => setCurrentStep(3)}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Paso 3: Información del huésped */}
          {currentStep === 3 && (
            <div className="step-content">
              <h3>Información del huésped</h3>
              
              <div className="guest-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre *</label>
                    <input
                      type="text"
                      value={guestInfo.firstName}
                      onChange={(e) => setGuestInfo({...guestInfo, firstName: e.target.value})}
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Apellido *</label>
                    <input
                      type="text"
                      value={guestInfo.lastName}
                      onChange={(e) => setGuestInfo({...guestInfo, lastName: e.target.value})}
                      placeholder="Tu apellido"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={guestInfo.email}
                      onChange={(e) => setGuestInfo({...guestInfo, email: e.target.value})}
                      placeholder="tu@email.com"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Teléfono *</label>
                    <input
                      type="tel"
                      value={guestInfo.phone}
                      onChange={(e) => setGuestInfo({...guestInfo, phone: e.target.value})}
                      placeholder="+57 300 123 4567"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Solicitudes especiales</label>
                  <textarea
                    value={guestInfo.specialRequests}
                    onChange={(e) => setGuestInfo({...guestInfo, specialRequests: e.target.value})}
                    placeholder="Cama extra, habitación en piso alto, etc."
                    rows="3"
                  />
                </div>
              </div>
              
              <div className="step-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => setCurrentStep(2)}
                >
                  Atrás
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => setCurrentStep(4)}
                  disabled={!guestInfo.firstName || !guestInfo.lastName || !guestInfo.email || !guestInfo.phone}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Paso 4: Resumen y pago */}
          {currentStep === 4 && (
            <div className="step-content">
              <h3>Resumen de tu reserva</h3>
              
              <div className="booking-summary">
                <div className="summary-section">
                  <h4>Detalles de la reserva</h4>
                  <div className="summary-item">
                    <span>Hotel:</span>
                    <span>{hotel.name}</span>
                  </div>
                  <div className="summary-item">
                    <span>Habitación:</span>
                    <span>{selectedRoom.name}</span>
                  </div>
                  <div className="summary-item">
                    <span>Fechas:</span>
                    <span>{checkIn} - {checkOut}</span>
                  </div>
                  <div className="summary-item">
                    <span>Huéspedes:</span>
                    <span>{guests} persona{guests > 1 ? 's' : ''}</span>
                  </div>
                  <div className="summary-item">
                    <span>Noches:</span>
                    <span>{calculateNights()}</span>
                  </div>
                </div>
                
                {selectedServices.length > 0 && (
                  <div className="summary-section">
                    <h4>Servicios adicionales</h4>
                    {selectedServices.map(service => (
                      <div key={service.id} className="summary-item">
                        <span>{service.name}</span>
                        <span>{formatPrice(service.price)}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="summary-section">
                  <h4>Desglose de precios</h4>
                  <div className="price-breakdown">
                    <div className="price-item">
                      <span>Habitación ({calculateNights()} noches)</span>
                      <span>{formatPrice(calculateRoomTotal())}</span>
                    </div>
                    {selectedServices.map(service => (
                      <div key={service.id} className="price-item">
                        <span>{service.name}</span>
                        <span>{formatPrice(service.price)}</span>
                      </div>
                    ))}
                    <div className="price-item">
                      <span>Impuestos (19% IVA)</span>
                      <span>{formatPrice(calculateTaxes())}</span>
                    </div>
                    <div className="price-item total">
                      <span>Total</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="payment-section">
                <h4>Método de pago</h4>
                <div className="payment-methods">
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <FaCreditCard />
                    <span>Tarjeta de crédito/débito</span>
                  </label>
                  
                  <label className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <FaUser />
                    <span>Transferencia bancaria</span>
                  </label>
                </div>
              </div>
              
              <div className="security-features">
                <div className="security-item">
                  <FaShieldAlt />
                  <span>Reserva 100% segura</span>
                </div>
                <div className="security-item">
                  <FaGift />
                  <span>Mejor precio garantizado</span>
                </div>
                <div className="security-item">
                  <FaTimes />
                  <span>Cancelación gratuita</span>
                </div>
              </div>
              
              <div className="step-actions">
                <button 
                  className="btn btn-outline"
                  onClick={() => setCurrentStep(3)}
                >
                  Atrás
                </button>
                <button 
                  className="btn btn-primary btn-large"
                  onClick={handleSubmit}
                >
                  <FaCreditCard />
                  Confirmar Reserva - {formatPrice(calculateTotal())}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
