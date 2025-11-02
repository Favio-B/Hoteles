<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
﻿import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from './components/Breadcrumb';
import NavBar from './components/NavBar';
>>>>>>> 80d62c4 (Commit 4)
import axios from 'axios';
import { FaStar, FaSearch, FaMapMarkerAlt, FaWifi, FaCar, FaSwimmingPool, FaDumbbell, FaUtensils, FaGlassMartini, FaSpa, FaConciergeBell, FaSnowflake, FaTv, FaWineBottle, FaLock } from 'react-icons/fa';
import './App.css';

// Componente principal con funcionalidades de búsqueda y filtrado

const API_BASE_URL = 'http://localhost:9090/api';

function App() {
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> 80d62c4 (Commit 4)
  const [hotels, setHotels] = useState([]);
  const [mostSearched, setMostSearched] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [hotelsRes, mostSearchedRes, neighborhoodsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/hotels`),
        axios.get(`${API_BASE_URL}/hotels/most-searched?limit=5`),
        axios.get(`${API_BASE_URL}/hotels/neighborhoods`)
      ]);

      setHotels(hotelsRes.data.data);
      setMostSearched(mostSearchedRes.data.data);
      setNeighborhoods(neighborhoodsRes.data.data);
      setFilteredHotels(hotelsRes.data.data);
    } catch (err) {
      setError('Error al cargar los datos de hoteles');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setFilteredHotels(hotels);
      setSearchError('');
      setHasSearched(false);
      return;
    }

    // Validación de entrada
    if (searchQuery.length < 2) {
      setSearchError('La búsqueda debe tener al menos 2 caracteres');
      return;
    }

    try {
      setIsSearching(true);
      setSearchError('');
      setHasSearched(true);
      const response = await axios.get(`${API_BASE_URL}/hotels/search?query=${encodeURIComponent(searchQuery)}`);
      setFilteredHotels(response.data.data);
      
      if (response.data.data.length === 0) {
        setSearchError('No se encontraron hoteles con ese criterio de búsqueda');
      }
    } catch (err) {
      setSearchError('Error al buscar hoteles. Inténtalo de nuevo.');
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleFilter = () => {
    let filtered = hotels;

    if (selectedPriceRange) {
      filtered = filtered.filter(hotel => hotel.priceRange === selectedPriceRange);
    }

    if (selectedNeighborhood) {
      filtered = filtered.filter(hotel => hotel.address.neighborhood === selectedNeighborhood);
    }

    setFilteredHotels(filtered);
    setHasSearched(true); // Marcar que se ha aplicado un filtro
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      'WiFi': <FaWifi />,
      'Estacionamiento': <FaCar />,
      'Piscina': <FaSwimmingPool />,
      'Gimnasio': <FaDumbbell />,
      'Restaurante': <FaUtensils />,
      'Bar': <FaGlassMartini />,
      'Spa': <FaSpa />,
      'Servicio de habitaciones': <FaConciergeBell />,
      'Aire acondicionado': <FaSnowflake />,
      'TV': <FaTv />,
      'Minibar': <FaWineBottle />,
      'Caja fuerte': <FaLock />
    };
    return icons[amenity] || <FaWifi />;
  };

  const getPriceRangeColor = (priceRange) => {
    const colors = {
      'Económico': '#10b981',
      'Medio': '#f59e0b',
      'Alto': '#ef4444',
      'Lujo': '#8b5cf6'
    };
    return colors[priceRange] || '#64748b';
  };

  // Funciones para el slider
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mostSearched.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mostSearched.length) % mostSearched.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play del slider
  useEffect(() => {
    if (mostSearched.length > 0 && !hasSearched) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [mostSearched.length, hasSearched]);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <div className="loading-text">Cargando hoteles...</div>
        <div className="loading-subtitle">Preparando la mejor experiencia para ti</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <div className="error-icon">!</div>
        <h2>Oops! Algo salió mal</h2>
        <p>{error}</p>
        <div className="error-actions">
          <button className="btn btn-primary" onClick={fetchData}>
            Reintentar
          </button>
          <button className="btn btn-secondary" onClick={() => window.location.reload()}>
            Recargar página
          </button>
<<<<<<< HEAD
        </div>
      </div>
=======
                              </div>
                       </div>
>>>>>>> 80d62c4 (Commit 4)
    );
  }

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>Hoteles Bogotá</h1>
          <p>Descubre los mejores hoteles en la capital de Colombia</p>
        </div>
      </header>
<<<<<<< HEAD

      <main className="main">
        <div className="container">
=======
      <NavBar />
      {/* Menú de navegación global */}
      <Breadcrumb items={[{ label: 'Inicio' }]} />

      <main className="main">
        <div className="container">
          <div id="hotels" />
>>>>>>> 80d62c4 (Commit 4)
          {/* Búsqueda y Filtros */}
          <section className="search-section">
            <div className="search-container">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Buscar hoteles por nombre o barrio..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchError('');
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className={searchError ? 'error' : ''}
                  aria-label="Buscar hoteles"
                />
                <button 
                  className="btn btn-primary" 
                  onClick={handleSearch}
                  disabled={isSearching}
                  aria-label="Buscar"
                >
                  {isSearching ? 'Buscando...' : <FaSearch />}
                </button>
              </div>
              
              {searchError && (
                <div className="search-error">
                  <span>{searchError}</span>
                </div>
              )}
            </div>

            <div className="filters-toggle">
              <button 
                className="btn btn-outline" 
                onClick={() => setShowFilters(!showFilters)}
                aria-expanded={showFilters}
              >
{showFilters ? 'Ocultar' : 'Mostrar'} Filtros
              </button>
              
              {hasSearched && (
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedPriceRange('');
                    setSelectedNeighborhood('');
                    setFilteredHotels(hotels);
                    setHasSearched(false);
                    setSearchError('');
                  }}
                >
Ver Todos los Hoteles
                </button>
              )}
              
              {(selectedPriceRange || selectedNeighborhood) && (
                <div className="active-filters">
                  <span className="filter-tag">
                    {selectedPriceRange && `${selectedPriceRange}`}
                    {selectedPriceRange && selectedNeighborhood && ' • '}
                    {selectedNeighborhood && `${selectedNeighborhood}`}
                  </span>
                </div>
              )}
            </div>

            {showFilters && (
              <div className="filters">
                <div className="filter-group">
                  <label htmlFor="price-filter">Rango de Precio:</label>
                  <select
                    id="price-filter"
                    value={selectedPriceRange}
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">Todos los precios</option>
                    <option value="Económico">Económico</option>
                    <option value="Medio">Medio</option>
                    <option value="Alto">Alto</option>
                    <option value="Lujo">Lujo</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="neighborhood-filter">Barrio:</label>
                  <select
                    id="neighborhood-filter"
                    value={selectedNeighborhood}
                    onChange={(e) => setSelectedNeighborhood(e.target.value)}
                    className="filter-select"
                  >
                    <option value="">Todos los barrios</option>
                    {neighborhoods.map(neighborhood => (
                      <option key={neighborhood} value={neighborhood}>
{neighborhood}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-actions">
                  <button className="btn btn-secondary" onClick={handleFilter}>
                    Aplicar Filtros
                  </button>
                  <button 
                    className="btn btn-outline" 
                    onClick={() => {
                      setSelectedPriceRange('');
                      setSelectedNeighborhood('');
                      setFilteredHotels(hotels);
                      setSearchQuery('');
                      setHasSearched(false);
                      setSearchError('');
                    }}
                  >
                    Limpiar Todo
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Hoteles Más Buscados - Slider */}
          {!hasSearched && mostSearched.length > 0 && (
            <section className="most-searched">
              <h2>Los Más Buscados</h2>
              <div className="slider-container">
                <div className="slider-wrapper">
                  <button className="slider-btn prev" onClick={prevSlide}>
                    ‹
                  </button>
                  
                  <div className="slider">
                    <div 
                      className="slider-track"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      {mostSearched.map(hotel => (
                        <div key={hotel._id} className="slider-slide">
<<<<<<< HEAD
                          <div className="hotel-card featured">
=======
                          <div className="hotel-card featured" onClick={() => navigate(`/hotels/${hotel._id}`)}>
>>>>>>> 80d62c4 (Commit 4)
                            <div className="hotel-image">
                              <img src={hotel.images[0]?.url || 'https://via.placeholder.com/400x250'} alt={hotel.name} />
                              <div className="hotel-badge">Más Buscado</div>
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
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button className="slider-btn next" onClick={nextSlide}>
                    ›
                  </button>
                </div>
                
                {/* Indicadores del slider */}
                <div className="slider-indicators">
                  {mostSearched.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${index === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Resultados de Búsqueda */}
          {hasSearched && (
            <section className="search-results">
              <h2>
                {searchQuery ? `Resultados para "${searchQuery}"` : 'Hoteles Filtrados'} 
                ({filteredHotels.length})
              </h2>
              <p className="results-info">
                {filteredHotels.length === 0 
                  ? 'No se encontraron hoteles con los criterios seleccionados'
                  : `Mostrando ${filteredHotels.length} hotel${filteredHotels.length !== 1 ? 'es' : ''}`
                }
              </p>
              {filteredHotels.length > 0 ? (
                <div className="hotels-grid">
                  {filteredHotels.map(hotel => (
<<<<<<< HEAD
                    <div key={hotel._id} className="hotel-card">
=======
                    <div key={hotel._id} className="hotel-card" onClick={() => navigate(`/hotels/${hotel._id}`)}>
>>>>>>> 80d62c4 (Commit 4)
                      <div className="hotel-image">
                        <img src={hotel.images[0]?.url || 'https://via.placeholder.com/400x250'} alt={hotel.name} />
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
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">!</div>
                  <h3>No se encontraron hoteles</h3>
                  <p>Intenta con otros términos de búsqueda o filtros diferentes</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => {
                      setSearchQuery('');
                      setHasSearched(false);
                      setFilteredHotels(hotels);
                    }}
                  >
                    Ver todos los hoteles
                  </button>
                </div>
              )}
            </section>
          )}
        </div>
<<<<<<< HEAD
      </main>

      <footer className="footer">
        <div className="container">
=======
        <div className="container">
          {/* Sección Información adicional */}
          <section id="info" className="info-section">
            <h2>Información adicional</h2>
            <p>
              Explora hoteles por barrios, rango de precio y amenidades. Nuestra plataforma
              te muestra tendencias, reseñas verificadas y estadísticas útiles para decidir.
            </p>
          </section>

          {/* Sección Sobre */}
          <section id="about" className="about-section">
            <h2>Sobre esta página</h2>
            <p>
              Hoteles Bogotá es una app de ejemplo con frontend React y backend Express.
              Usamos MongoDB y Docker para facilitar desarrollo y despliegue.
            </p>
          </section>
        </div>
        
      </main>

        <footer className="footer">
        <div className="container">
          <div id="contact" className="contact-block">
            <h2>Contáctanos</h2>
            <p>¿Dudas o sugerencias? Escríbenos a <a href="mailto:soporte@hoteles-bogota.test">soporte@hoteles-bogota.test</a></p>
          </div>
>>>>>>> 80d62c4 (Commit 4)
          <p>&copy; 2024 Hoteles Bogotá. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

<<<<<<< HEAD
=======



>>>>>>> 80d62c4 (Commit 4)
