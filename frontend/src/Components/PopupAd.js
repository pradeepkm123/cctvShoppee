import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './PopupAd.css';

const API_BASE = (process.env.REACT_APP_API_BASE || 'http://localhost:5000').replace(/\/api$/, '');

const PopupAd = () => {
    const location = useLocation();
    const [popup, setPopup] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    // Don't show popup on admin pages
    const isAdminPage = location.pathname.startsWith('/admin');

    useEffect(() => {
        // If it's an admin page, don't even fetch
        if (isAdminPage) {
            setIsVisible(false); // Ensure hidden if it was somehow visible
            return;
        }

        // Check if popup was already shown in this session
        const popupShownInSession = sessionStorage.getItem('popupShownInSession');

        if (!popupShownInSession) {
            fetchPopup();
        }
    }, [isAdminPage]);

    const fetchPopup = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/popups/active/default`);
            const result = await response.json();

            if (result.success && result.data) {
                setPopup(result.data);
                // Delay showing by 2 seconds for better UX
                setTimeout(() => {
                    setIsVisible(true);
                    sessionStorage.setItem('popupShownInSession', 'true');
                }, 2000);
            }
        } catch (error) {
            console.error('Error fetching popup:', error);
        }
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    const getAbsUrl = (path) => {
        if (!path) return '';
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `${API_BASE}/${cleanPath}`;
    };

    if (isAdminPage || !isVisible || !popup) return null;

    return (
        <div className="popup-overlay" onClick={handleClose}>
            <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                <button
                    className="popup-close-btn"
                    onClick={handleClose}
                    aria-label="Close advertising"
                >
                    &times;
                </button>
                <a href={popup.link} className="popup-content">
                    <img
                        src={getAbsUrl(popup.image)}
                        alt={popup.title}
                        className="popup-image"
                        onError={(e) => {
                            console.error('Popup image load failed');
                            setIsVisible(false);
                        }}
                    />
                </a>
            </div>
        </div>
    );
};

export default PopupAd;
