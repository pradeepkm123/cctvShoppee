import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'https://cctvshoppee.onrender.com';

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/api/clients/store/default`);
      const result = await response.json();
      
      console.log('Clients API Response:', result);
      
      if (result.success) {
        setClients(result.data);
      } else {
        setError(result.message || 'Failed to load clients');
      }
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError('Network error: Unable to fetch clients');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Remove leading slash if present
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    
    // Construct full URL
    return `${API_BASE}/${cleanPath}`;
  };

  const brandSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div>
        <section className="tp-brand-area" style={{ marginBottom: '2%' }}>
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-brand-slider p-relative text-center">
                  <p>Loading clients...</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <section className="tp-brand-area" style={{ marginBottom: '2%' }}>
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-brand-slider p-relative text-center">
                  <p>Error: {error}</p>
                  <button onClick={fetchClients}>Retry</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div>
        <section className="tp-brand-area" style={{ marginBottom: '2%' }}>
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="tp-brand-slider p-relative text-center">
                  <p>No clients available</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="tp-brand-area" style={{ marginBottom: '2%' }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="tp-brand-slider p-relative">
                <Slider {...brandSliderSettings}>
                  {clients.map((client) => (
                    <div key={client._id} className="tp-brand-item text-center">
                      <a href={client.websiteUrl} target="_blank" rel="noopener noreferrer">
                        <img 
                          src={getImageUrl(client.image)} 
                          alt={client.altText || client.name}
                          style={{ 
                            maxWidth: '150px', 
                            maxHeight: '80px', 
                            objectFit: 'contain' 
                          }}
                          onError={(e) => {
                            console.error('Error loading client image:', client.image);
                            e.target.src = 'https://via.placeholder.com/150x80/cccccc/969696?text=Logo';
                          }}
                        />
                      </a>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Clients;
