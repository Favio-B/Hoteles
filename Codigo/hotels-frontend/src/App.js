import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar, FaSearch, FaMapMarkerAlt, FaWifi, FaCar, FaSwimmingPool, FaDumbbell, FaUtensils, FaGlassMartini, FaSpa, FaConciergeBell, FaSnowflake, FaTv, FaWineBottle, FaLock } from 'react-icons/fa';
import './App.css';

const API_BASE_URL = 'http://localhost:9090/api';

function App() {
  const [hotels, setHotels] = useState([]);
  const [mostSearched, setMostSearched] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [neighborhoods, setNeighborhoods] = useState([]);

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
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/hotels/search?query=${encodeURIComponent(searchQuery)}`);
      setFilteredHotels(response.data.data);
    } catch (err) {
      setError('Error al buscar hoteles');
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

  if (loading) {
    return (
      <div className="loading">
        <div>Cargando hoteles...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={fetchData}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>🏨 Hoteles Bogotá</h1>
          <p>Descubre los mejores hoteles en la capital de Colombia</p>
        </div>
      </header>

      <main className="main">
        <div className="container">
          {/* Búsqueda y Filtros */}
          <section className="search-section">
            <div className="search-container">
              <div className="search-input">
                <input
                  type="text"
                  placeholder="Buscar hoteles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className="filters">
              <select
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

              <select
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

              <button className="btn btn-secondary" onClick={handleFilter}>
                Filtrar
              </button>
            </div>
          </section>

          {/* Hoteles Más Buscados */}
          <section className="most-searched">
            <h2>🔥 Los Más Buscados</h2>
            <div className="hotels-grid">
              {mostSearched.map(hotel => (
                <div key={hotel._id} className="hotel-card featured">
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
                      <span>👁️ {hotel.searchCount} búsquedas</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Todos los Hoteles */}
          <section className="all-hotels">
            <h2>🏨 Todos los Hoteles ({filteredHotels.length})</h2>
            <div className="hotels-grid">
              {filteredHotels.map(hotel => (
                <div key={hotel._id} className="hotel-card">
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
                      <span>👁️ {hotel.searchCount} búsquedas</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Hoteles Bogotá. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

