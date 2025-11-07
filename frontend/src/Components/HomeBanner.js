// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import {
//     Autoplay,
//     Navigation,
//     Pagination,
//     Keyboard,
//     Parallax,
//     EffectFade,
// } from 'swiper/modules';


// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';


// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';
// import './HomeBanner.css';

// const slides = [
//     {
//         id: 1,
//         image:
//             'https://rukminim2.flixcart.com/fk-p-flap/3240/540/image/841cfd128694775a.jpeg?q=60',
//         eyebrow: 'Starting at ₹9,999',
//         title: 'Smartphones Mega Sale',
//         blurb: 'Exchange bonus + bank offers',
//         ctaText: 'Shop Now',
//         ctaHref: '/shop/phones',

//         light: true,
//     },
//     {
//         id: 2,
//         image:
//             'https://rukminim2.flixcart.com/fk-p-flap/960/160/image/5b309e98775e22e4.jpg?q=60',
//         eyebrow: 'From ₹1,299',
//         title: 'Headphones & Audio',
//         blurb: 'Top brands, crazy deals',
//         ctaText: 'Explore',
//         ctaHref: '/shop/audio',
//         bg: '#14213d',
//         light: true,
//     },
//     {
//         id: 3,
//         image:
//             'https://rukminim2.flixcart.com/fk-p-flap/960/160/image/bd6d765adf73c8d4.jpg?q=60',
//         eyebrow: 'Monsoon Specials',
//         title: 'Home & Kitchen',
//         blurb: 'Cookware, decor, essentials',
//         ctaText: 'Browse',
//         ctaHref: '/shop/home',
//         light: false,
//     },
// ];

// export default function HomeBanner() {
//     return (
//         <section className="hb-wrap" aria-label="Featured deals">
//             <Swiper
//                 modules={[Autoplay, Navigation, Pagination, Keyboard, Parallax, EffectFade]}
//                 className="hb-swiper"
//                 slidesPerView={1}
//                 loop
//                 speed={800}
//                 effect="fade"
//                 autoplay={{ delay: 3500, disableOnInteraction: false }}
//                 pagination={{ clickable: true }}
//                 navigation
//                 keyboard={{ enabled: true }}
//                 parallax
//             >
//                 {slides.map((s) => (
//                     <SwiperSlide key={s.id}>
//                         <div className="hb-slide" style={{ backgroundColor: s.bg }}>
//                             {/* Background image (native lazy) */}
//                             <img
//                                 src={s.image}
//                                 loading="lazy"
//                                 alt={s.title}
//                                 className="hb-bg"
//                             />

//                             <div className={`hb-content ${s.light ? 'hb-light' : ''}`}>
//                                 <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.11)', padding: '20px',borderRadius:'15px' }}>
//                                     {s.badge && (
//                                         <span className="hb-badge" data-swiper-parallax="-40">
//                                             {s.badge}
//                                         </span>
//                                     )}
//                                     {s.eyebrow && (
//                                         <p className="hb-eyebrow" data-swiper-parallax="-60">
//                                             {s.eyebrow}
//                                         </p>
//                                     )}
//                                     <h2 className="hb-title" data-swiper-parallax="-100">
//                                         {s.title}
//                                     </h2>
//                                     {s.blurb && (
//                                         <p className="hb-blurb" data-swiper-parallax="-120">
//                                             {s.blurb}
//                                         </p>
//                                     )}
//                                     <div className="hb-cta" data-swiper-parallax="-140">
//                                         <a className="hb-btn" href={s.ctaHref}>
//                                             {s.ctaText}
//                                             <svg width="16" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//                                                 <path d="M16 7H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                                 <path d="M9.95 1L16 7L9.95 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//                                             </svg>
//                                         </a>
//                                     </div>
//                                 </div>

//                             </div>

//                             <div className="hb-overlay" />
//                         </div>
//                     </SwiperSlide>
//                 ))}
//             </Swiper>
//         </section>
//     );
// }




import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
    Autoplay,
    Navigation,
    Pagination,
    Keyboard,
    Parallax,
    EffectFade,
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './HomeBanner.css';

const API_BASE = process.env.REACT_APP_API_BASE || 'https://cctvshoppee.onrender.com';

export default function HomeBanner({ storeId = 'default' }) {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSlides();
    }, [storeId]);

    const fetchSlides = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(`${API_BASE}/api/slides/store/${storeId}`);
            const result = await response.json();
            
            console.log('API Response:', result);
            
            if (result.success) {
                // Process image URLs
                const processedSlides = result.data.map(slide => ({
                    ...slide,
                    imageUrl: getImageUrl(slide.image)
                }));
                setSlides(processedSlides);
            } else {
                setError(result.message || 'Failed to load slides');
            }
        } catch (err) {
            console.error('Error fetching slides:', err);
            setError('Network error: Unable to fetch slides');
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

    // Debug: Log image URLs
    useEffect(() => {
        if (slides.length > 0) {
            console.log('Processed slides with image URLs:');
            slides.forEach((slide, index) => {
                console.log(`Slide ${index + 1}:`, {
                    title: slide.title,
                    originalImage: slide.image,
                    imageUrl: slide.imageUrl
                });
            });
        }
    }, [slides]);

    if (loading) {
        return (
            <section className="hb-wrap" aria-label="Featured deals">
                <div className="hb-loading" style={{ 
                    padding: '60px 20px', 
                    textAlign: 'center',
                    backgroundColor: '#f5f5f5',
                    color: '#666'
                }}>
                    Loading slides...
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="hb-wrap" aria-label="Featured deals">
                <div className="hb-error" style={{ 
                    padding: '60px 20px', 
                    textAlign: 'center',
                    backgroundColor: '#fff3cd',
                    color: '#856404',
                    border: '1px solid #ffeaa7'
                }}>
                    <p>{error}</p>
                    <button 
                        onClick={fetchSlides}
                        style={{
                            marginTop: '10px',
                            padding: '8px 16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Retry
                    </button>
                </div>
            </section>
        );
    }

    if (slides.length === 0) {
        return (
            <section className="hb-wrap" aria-label="Featured deals">
                <div className="hb-empty" style={{ 
                    padding: '60px 20px', 
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa',
                    color: '#6c757d'
                }}>
                    No slides available for this store
                </div>
            </section>
        );
    }

    return (
        <section className="hb-wrap" aria-label="Featured deals">
            <Swiper
                modules={[Autoplay, Navigation, Pagination, Keyboard, Parallax, EffectFade]}
                className="hb-swiper"
                slidesPerView={1}
                loop={slides.length > 1}
                speed={800}
                effect="fade"
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={slides.length > 1}
                keyboard={{ enabled: true }}
                parallax
            >
                {slides.map((s) => (
                    <SwiperSlide key={s._id}>
                        <div className="hb-slide" style={{ backgroundColor: s.backgroundColor || 'transparent' }}>
                            {/* Background image */}
                            <img
                                src={s.imageUrl}
                                loading="lazy"
                                alt={s.title}
                                className="hb-bg"
                                onError={(e) => {
                                    console.error('Error loading image:', {
                                        original: s.image,
                                        url: s.imageUrl,
                                        element: e.target
                                    });
                                    // Fallback image
                                    e.target.src = 'https://via.placeholder.com/1200x400/4f46e5/ffffff?text=Banner+Image';
                                }}
                            />

                           
                            <div className="hb-overlay" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
