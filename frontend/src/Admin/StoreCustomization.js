import React, { useState, useEffect } from 'react';

const StoreCustomizations = () => {
    const [activeTab, setActiveTab] = useState('Home Page');
    const [activeSlider, setActiveSlider] = useState('Slider 1');

    // Home Page Slides State
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState({
        eyebrow: '',
        title: '',
        blurb: '',
        ctaText: 'Shop Now',
        ctaHref: '/',
        backgroundColor: '',
        lightText: true,
        badge: ''
    });
    const [uploading, setUploading] = useState(false);

    // Clients State
    const [clients, setClients] = useState([]);
    const [currentClient, setCurrentClient] = useState({
        name: '',
        websiteUrl: '#',
        altText: ''
    });
    const [uploadingClient, setUploadingClient] = useState(false);

    // Popup Ad State
    const [popups, setPopups] = useState([]);
    const [loadingPopups, setLoadingPopups] = useState(true);
    const [currentPopup, setCurrentPopup] = useState({
        _id: null,
        title: '',
        link: '/',
        status: true,
        startDate: '',
        endDate: ''
    });
    const [uploadingPopup, setUploadingPopup] = useState(false);

    const API_BASE = (process.env.REACT_APP_API_BASE || 'http://52.66.98.128:5001').replace(/\/api$/, '');

    const toAbsUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `${API_BASE}/${cleanPath}`;
    };

    const tabs = ['Home Page', 'Client', 'Popup Ads'];

    useEffect(() => {
        fetchSlides();
        fetchClients();
        fetchPopups();
    }, []);

    // Home Page Slides Functions
    const fetchSlides = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/slides/store/default`);
            const result = await response.json();
            if (result.success) {
                setSlides(result.data);
            }
        } catch (error) {
            console.error('Error fetching slides:', error);
        }
    };

    const handleSaveSlide = async () => {
        if (!currentSlide.title) {
            alert('Please enter a title');
            return;
        }

        const formData = new FormData();
        // Append image if any
        const fileInput = document.getElementById('slide-image');
        if (fileInput && fileInput.files[0]) {
            formData.append('image', fileInput.files[0]);
        } else if (!currentSlide._id) {
            alert('Please select an image for the new slide');
            return;
        }

        Object.keys(currentSlide).forEach(key => {
            if (key !== '_id' && key !== 'image' && currentSlide[key] !== undefined && currentSlide[key] !== null) {
                formData.append(key, currentSlide[key]);
            }
        });
        formData.append('storeId', 'default');

        setUploading(true);
        try {
            const url = currentSlide._id ? `${API_BASE}/api/slides/${currentSlide._id}` : `${API_BASE}/api/slides`;
            const method = currentSlide._id ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
                await fetchSlides();
                resetForm();
                if (fileInput) fileInput.value = '';
                alert(currentSlide._id ? 'Slide updated successfully!' : 'Slide created successfully!');
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error saving slide:', error);
            alert('Network error: Unable to save slide');
        } finally {
            setUploading(false);
        }
    };

    const handleEditSlide = (slide) => {
        setCurrentSlide({
            _id: slide._id,
            eyebrow: slide.eyebrow || '',
            title: slide.title || '',
            blurb: slide.blurb || '',
            ctaText: slide.ctaText || 'Shop Now',
            ctaHref: slide.ctaHref || '/',
            backgroundColor: slide.backgroundColor || '',
            lightText: slide.lightText !== false,
            badge: slide.badge || '',
            order: slide.order || 0
        });
        // Scroll to form
        const form = document.querySelector('.add-new-slide-form');
        if (form) form.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDeleteSlide = async (slideId) => {
        if (!window.confirm('Are you sure you want to delete this slide?')) return;
        try {
            const response = await fetch(`${API_BASE}/api/slides/${slideId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.success) {
                await fetchSlides();
            } else {
                alert('Error deleting slide: ' + result.message);
            }
        } catch (error) {
            console.error('Error deleting slide:', error);
            alert('Error deleting slide');
        }
    };

    const resetForm = () => {
        setCurrentSlide({
            _id: null,
            eyebrow: '',
            title: '',
            blurb: '',
            ctaText: 'Shop Now',
            ctaHref: '/',
            backgroundColor: '',
            lightText: true,
            badge: ''
        });
    };

    const handleInputChange = (field, value) => {
        setCurrentSlide(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Clients Functions
    const fetchClients = async () => {
        try {
            const response = await fetch(`${API_BASE}/api/clients/store/default`);
            const result = await response.json();
            if (result.success) {
                setClients(result.data);
            }
        } catch (error) {
            console.error('Error fetching clients:', error);
        }
    };

    const handleSaveClient = async () => {
        if (!currentClient.name) {
            alert('Please enter a client name');
            return;
        }

        const formData = new FormData();
        const fileInput = document.getElementById('client-image');
        if (fileInput && fileInput.files[0]) {
            formData.append('image', fileInput.files[0]);
        } else if (!currentClient._id) {
            alert('Please select a logo for the new client');
            return;
        }

        Object.keys(currentClient).forEach(key => {
            if (key !== '_id' && key !== 'image' && currentClient[key] !== undefined && currentClient[key] !== null) {
                formData.append(key, currentClient[key]);
            }
        });
        formData.append('storeId', 'default');

        setUploadingClient(true);
        try {
            const url = currentClient._id ? `${API_BASE}/api/clients/${currentClient._id}` : `${API_BASE}/api/clients`;
            const method = currentClient._id ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
                await fetchClients();
                resetClientForm();
                if (fileInput) fileInput.value = '';
                alert(currentClient._id ? 'Client updated successfully!' : 'Client created successfully!');
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error saving client:', error);
            alert('Network error: Unable to save client');
        } finally {
            setUploadingClient(false);
        }
    };

    const handleEditClient = (client) => {
        setCurrentClient({
            _id: client._id,
            name: client.name || '',
            websiteUrl: client.websiteUrl || '#',
            altText: client.altText || ''
        });
        const form = document.querySelector('.add-new-client-form');
        if (form) form.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDeleteClient = async (clientId) => {
        if (!window.confirm('Are you sure you want to delete this client?')) return;
        try {
            const response = await fetch(`${API_BASE}/api/clients/${clientId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.success) {
                await fetchClients();
            } else {
                alert('Error deleting client: ' + result.message);
            }
        } catch (error) {
            console.error('Error deleting client:', error);
            alert('Error deleting client');
        }
    };

    const handleClientInputChange = (field, value) => {
        setCurrentClient(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const resetClientForm = () => {
        setCurrentClient({
            _id: null,
            name: '',
            websiteUrl: '#',
            altText: ''
        });
    };

    // Popup Ad Functions
    const fetchPopups = async () => {
        try {
            setLoadingPopups(true);
            const response = await fetch(`${API_BASE}/api/popups`);
            const result = await response.json();
            if (result.success) {
                setPopups(result.data);
            }
        } catch (error) {
            console.error('Error fetching popups:', error);
        } finally {
            setLoadingPopups(false);
        }
    };

    const handleSavePopup = async () => {
        if (!currentPopup.title) {
            alert('Please enter a title');
            return;
        }

        const formData = new FormData();
        const fileInput = document.getElementById('popup-image');
        if (fileInput && fileInput.files[0]) {
            formData.append('image', fileInput.files[0]);
        } else if (!currentPopup._id) {
            alert('Please select an image for the new popup');
            return;
        }

        Object.keys(currentPopup).forEach(key => {
            if (key !== '_id' && key !== 'image' && currentPopup[key] !== undefined && currentPopup[key] !== null) {
                formData.append(key, currentPopup[key]);
            }
        });
        formData.append('storeId', 'default');

        setUploadingPopup(true);
        try {
            const url = currentPopup._id ? `${API_BASE}/api/popups/${currentPopup._id}` : `${API_BASE}/api/popups`;
            const method = currentPopup._id ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                body: formData,
            });
            const result = await response.json();
            if (result.success) {
                await fetchPopups();
                resetPopupForm();
                if (fileInput) fileInput.value = '';
                alert(currentPopup._id ? 'Popup updated successfully!' : 'Popup created successfully!');
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error saving popup:', error);
            alert('Network error: Unable to save popup');
        } finally {
            setUploadingPopup(false);
        }
    };

    const handleEditPopup = (popup) => {
        setCurrentPopup({
            _id: popup._id,
            title: popup.title || '',
            link: popup.link || '/',
            status: popup.status !== false,
            startDate: popup.startDate ? new Date(popup.startDate).toISOString().split('T')[0] : '',
            endDate: popup.endDate ? new Date(popup.endDate).toISOString().split('T')[0] : ''
        });
        const form = document.querySelector('.add-new-popup-form');
        if (form) form.scrollIntoView({ behavior: 'smooth' });
    };

    const handleDeletePopup = async (popupId) => {
        if (!window.confirm('Are you sure you want to delete this popup?')) return;
        try {
            const response = await fetch(`${API_BASE}/api/popups/${popupId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.success) {
                await fetchPopups();
            } else {
                alert('Error deleting popup: ' + result.message);
            }
        } catch (error) {
            console.error('Error deleting popup:', error);
            alert('Error deleting popup');
        }
    };

    const handlePopupInputChange = (field, value) => {
        setCurrentPopup(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const resetPopupForm = () => {
        setCurrentPopup({
            _id: null,
            title: '',
            link: '/',
            status: true,
            startDate: '',
            endDate: ''
        });
    };

    const sliders = ['Slider'];

    return (
        <div className="store-customizations">
            <div className="header-bar">
                <h1>Store Customizations</h1>
                <select className="language-select">
                    <option>en</option>
                </select>
            </div>

            <div className="tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="content">
                <button className="update-btn" onClick={activeTab === 'Home Page' ? fetchSlides : fetchClients}>
                    Refresh
                </button>

                {/* Home Page Tab */}
                {activeTab === 'Home Page' && (
                    <div className="section">
                        <div className="section-header">
                            <span className="icon">⚙</span>
                            <h2>Main Slider</h2>
                        </div>

                        <div className="slider-tabs">
                            {sliders.map((slider, index) => (
                                <button
                                    key={slider}
                                    className={`slider-tab ${activeSlider === slider ? 'active' : ''}`}
                                    onClick={() => setActiveSlider(slider)}
                                >
                                    {slider}
                                </button>
                            ))}
                        </div>

                        {/* Existing Slides Preview */}
                        <div className="form-group">
                            <label>Existing Slides ({slides.length})</label>
                            <div className="slides-preview">
                                {slides.length === 0 ? (
                                    <p className="no-items">No slides available. Create your first slide below.</p>
                                ) : (
                                    slides.map((slide, index) => (
                                        <div key={slide._id} className="slide-preview-item" onClick={() => handleEditSlide(slide)} style={{ cursor: 'pointer' }}>
                                            <div className="uploaded-image">
                                                <img
                                                    src={toAbsUrl(slide.image)}
                                                    alt={slide.title}
                                                    onError={(e) => {
                                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="60"%3E%3Crect fill="%23f0f0f0" width="100" height="60"/%3E%3C/svg%3E';
                                                    }}
                                                />
                                                <button
                                                    className="remove-btn-small"
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteSlide(slide._id); }}
                                                    title="Delete slide"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            <div className="slide-info">
                                                <p><strong>{slide.title}</strong></p>
                                                <p>{slide.eyebrow}</p>
                                                <small>Order: {slide.order}</small>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Add New Slide Form */}
                        <div className="form-group add-new-slide-form">
                            <label>{currentSlide._id ? 'Edit Slide' : 'Add New Slide'}</label>

                            <div className="input-group">
                                <label>Title *</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={currentSlide.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="Enter slide title"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Eyebrow Text</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={currentSlide.eyebrow}
                                    onChange={(e) => handleInputChange('eyebrow', e.target.value)}
                                    placeholder="e.g., Starting at ₹9,999"
                                />
                            </div>

                            <div className="input-group">
                                <label>Description</label>
                                <textarea
                                    className="textarea-field"
                                    rows="3"
                                    value={currentSlide.blurb}
                                    onChange={(e) => handleInputChange('blurb', e.target.value)}
                                    placeholder="e.g., Exchange bonus + bank offers"
                                />
                            </div>

                            <div className="input-group">
                                <label>Button Text</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={currentSlide.ctaText}
                                    onChange={(e) => handleInputChange('ctaText', e.target.value)}
                                    placeholder="e.g., Shop Now"
                                />
                            </div>

                            <div className="input-group">
                                <label>Button Link</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={currentSlide.ctaHref}
                                    onChange={(e) => handleInputChange('ctaHref', e.target.value)}
                                    placeholder="e.g., /shop/phones"
                                />
                            </div>

                            <div className="input-group">
                                <label>Background Color</label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input
                                        type="color"
                                        className="input-field"
                                        value={currentSlide.backgroundColor || '#ffffff'}
                                        onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                                        style={{ width: '60px', height: '40px', padding: '0' }}
                                    />
                                    <input
                                        type="text"
                                        className="input-field"
                                        value={currentSlide.backgroundColor}
                                        onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                                        placeholder="#ffffff"
                                        style={{ flex: 1 }}
                                    />
                                </div>
                            </div>

                            <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <label style={{ marginBottom: 0 }}>Light Text</label>
                                <label className="toggle">
                                    <input
                                        type="checkbox"
                                        checked={currentSlide.lightText}
                                        onChange={(e) => handleInputChange('lightText', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                                <span className="toggle-label">
                                    {currentSlide.lightText ? 'Yes' : 'No'}
                                </span>
                            </div>

                            <div className="form-group">
                                <label>Slider Image {currentSlide._id ? '(Leave blank to keep existing)' : '*'}</label>
                                <div className="upload-area">
                                    <input
                                        type="file"
                                        id="slide-image"
                                        accept=".jpeg,.jpg,.png,.webp"
                                        style={{ display: 'none' }}
                                        disabled={uploading || !currentSlide.title}
                                        onChange={(e) => {
                                            // Optional: show preview
                                            if (e.target.files[0]) {
                                                console.log('File selected:', e.target.files[0].name);
                                            }
                                        }}
                                    />
                                    <label htmlFor="slide-image" className="upload-label">
                                        <div className="upload-icon">↑</div>
                                        <p className="upload-text">
                                            Click to select image
                                        </p>
                                        <p className="upload-hint">(Only *.jpeg, *.webp and *.png images will be accepted)</p>
                                        {!currentSlide.title && (
                                            <p className="upload-warning" style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>
                                                * Please enter a title first
                                            </p>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <button
                                    className="update-btn"
                                    style={{ position: 'static', flex: 1 }}
                                    onClick={handleSaveSlide}
                                    disabled={uploading}
                                >
                                    {uploading ? 'Saving...' : (currentSlide._id ? 'Update Slide' : 'Create Slide')}
                                </button>
                                {currentSlide._id && (
                                    <button
                                        className="update-btn"
                                        style={{ position: 'static', background: '#6b7280' }}
                                        onClick={resetForm}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Client Tab */}
                {activeTab === 'Client' && (
                    <div className="section">
                        <div className="section-header">
                            <span className="icon">👥</span>
                            <h2>Client Logos Management</h2>
                        </div>

                        {/* Existing Clients Preview */}
                        <div className="form-group">
                            <label>Existing Client Logos ({clients.length})</label>
                            <div className="slides-preview">
                                {clients.length === 0 ? (
                                    <p className="no-items">No client logos available. Add your first client logo below.</p>
                                ) : (
                                    clients.map((client) => (
                                        <div key={client._id} className="slide-preview-item" onClick={() => handleEditClient(client)} style={{ cursor: 'pointer' }}>
                                            <div className="uploaded-image">
                                                <img
                                                    src={toAbsUrl(client.image)}
                                                    alt={client.name}
                                                    style={{ width: '100px', height: '60px', objectFit: 'contain' }}
                                                    onError={(e) => {
                                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="60"%3E%3Crect fill="%23f0f0f0" width="100" height="60"/%3E%3C/svg%3E';
                                                    }}
                                                />
                                                <button
                                                    className="remove-btn-small"
                                                    onClick={(e) => { e.stopPropagation(); handleDeleteClient(client._id); }}
                                                    title="Delete client"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            <div className="slide-info">
                                                <p><strong>{client.name}</strong></p>
                                                <p>{client.websiteUrl !== '#' ? client.websiteUrl : 'No website'}</p>
                                                <small>Alt: {client.altText || client.name}</small>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Add New Client Form */}
                        <div className="form-group add-new-client-form">
                            <label>{currentClient._id ? 'Edit Client Logo' : 'Add New Client Logo'}</label>

                            <div className="input-group">
                                <label>Client Name *</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={currentClient.name}
                                    onChange={(e) => handleClientInputChange('name', e.target.value)}
                                    placeholder="Enter client name"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Website URL</label>
                                <input
                                    type="url"
                                    className="input-field"
                                    value={currentClient.websiteUrl}
                                    onChange={(e) => handleClientInputChange('websiteUrl', e.target.value)}
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div className="input-group">
                                <label>Alt Text</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={currentClient.altText}
                                    onChange={(e) => handleClientInputChange('altText', e.target.value)}
                                    placeholder="Alternative text for image (optional)"
                                />
                            </div>

                            <div className="form-group">
                                <label>Client Logo Image {currentClient._id ? '(Leave blank to keep existing)' : '*'}</label>
                                <div className="upload-area">
                                    <input
                                        type="file"
                                        id="client-image"
                                        accept=".jpeg,.jpg,.png,.webp,.svg"
                                        style={{ display: 'none' }}
                                        disabled={uploadingClient || !currentClient.name}
                                        onChange={(e) => {
                                            if (e.target.files[0]) {
                                                console.log('File selected:', e.target.files[0].name);
                                            }
                                        }}
                                    />
                                    <label htmlFor="client-image" className="upload-label">
                                        <div className="upload-icon">↑</div>
                                        <p className="upload-text">
                                            Click to select client logo
                                        </p>
                                        <p className="upload-hint">(Only *.jpeg, *.webp, *.png, and *.svg images will be accepted)</p>
                                        {!currentClient.name && (
                                            <p className="upload-warning" style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>
                                                * Please enter client name first
                                            </p>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <button
                                    className="update-btn"
                                    style={{ position: 'static', flex: 1 }}
                                    onClick={handleSaveClient}
                                    disabled={uploadingClient}
                                >
                                    {uploadingClient ? 'Saving...' : (currentClient._id ? 'Update Client' : 'Add Client')}
                                </button>
                                {currentClient._id && (
                                    <button
                                        className="update-btn"
                                        style={{ position: 'static', background: '#6b7280' }}
                                        onClick={resetClientForm}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Popup Ads Tab */}
                {activeTab === 'Popup Ads' && (
                    <div className="section">
                        <div className="section-header">
                            <span className="icon">📢</span>
                            <h2>Popup Ads Management</h2>
                        </div>

                        {/* Existing Popups Preview */}
                        <div className="form-group">
                            <label>Existing Popup Ads ({popups.length})</label>
                            <div className="slides-preview">
                                {loadingPopups ? (
                                    <p className="no-items">Loading popups...</p>
                                ) : popups.length === 0 ? (
                                    <p className="no-items">No popup ads available. Create your first popup below.</p>
                                ) : (
                                    popups.map((popup) => (
                                        <div key={popup._id} className="slide-preview-item" onClick={() => handleEditPopup(popup)} style={{ cursor: 'pointer' }}>
                                            <div className="uploaded-image">
                                                <img
                                                    src={toAbsUrl(popup.image)}
                                                    alt={popup.title}
                                                    style={{ width: '100px', height: '100px', objectFit: 'contain' }}
                                                    onError={(e) => {
                                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f0f0f0" width="100" height="100"/%3E%3C/svg%3E';
                                                    }}
                                                />
                                                <button
                                                    className="remove-btn-small"
                                                    onClick={(e) => { e.stopPropagation(); handleDeletePopup(popup._id); }}
                                                    title="Delete popup"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            <div className="slide-info">
                                                <p><strong>{popup.title}</strong></p>
                                                <p><span className={`status-tag ${popup.status ? 'active' : 'inactive'}`} style={{
                                                    fontSize: '10px',
                                                    padding: '2px 6px',
                                                    borderRadius: '10px',
                                                    background: popup.status ? '#d1fae5' : '#fee2e2',
                                                    color: popup.status ? '#065f46' : '#991b1b'
                                                }}>
                                                    {popup.status ? 'Active' : 'Inactive'}
                                                </span></p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Add New Popup Form */}
                        <div className="form-group add-new-popup-form">
                            <label>{currentPopup._id ? 'Edit Popup Ad' : 'Create New Popup Ad'}</label>

                            <div className="input-group">
                                <label>Popup Title *</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={currentPopup.title}
                                    onChange={(e) => handlePopupInputChange('title', e.target.value)}
                                    placeholder="e.g., PoE Splitter Offer"
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Target Link (URL)</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={currentPopup.link}
                                    onChange={(e) => handlePopupInputChange('link', e.target.value)}
                                    placeholder="e.g., /product/65..."
                                />
                            </div>

                            <div className="input-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <label style={{ marginBottom: 0 }}>Active Status</label>
                                <label className="toggle">
                                    <input
                                        type="checkbox"
                                        checked={currentPopup.status}
                                        onChange={(e) => handlePopupInputChange('status', e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                                <span className="toggle-label">
                                    {currentPopup.status ? 'Shown' : 'Hidden'}
                                </span>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div className="input-group" style={{ flex: 1 }}>
                                    <label>Start Date (Optional)</label>
                                    <input
                                        type="date"
                                        className="input-field"
                                        value={currentPopup.startDate}
                                        onChange={(e) => handlePopupInputChange('startDate', e.target.value)}
                                    />
                                </div>
                                <div className="input-group" style={{ flex: 1 }}>
                                    <label>End Date (Optional)</label>
                                    <input
                                        type="date"
                                        className="input-field"
                                        value={currentPopup.endDate}
                                        onChange={(e) => handlePopupInputChange('endDate', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Popup Banner Image {currentPopup._id ? '(Leave blank to keep existing)' : '*'}</label>
                                <div className="upload-area">
                                    <input
                                        type="file"
                                        id="popup-image"
                                        accept=".jpeg,.jpg,.png,.webp"
                                        style={{ display: 'none' }}
                                        disabled={uploadingPopup || !currentPopup.title}
                                    />
                                    <label htmlFor="popup-image" className="upload-label">
                                        <div className="upload-icon">↑</div>
                                        <p className="upload-text">
                                            Click to select banner
                                        </p>
                                        <p className="upload-hint">(Recommended: 400x400 or 500x500px square image)</p>
                                        {!currentPopup.title && (
                                            <p className="upload-warning" style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>
                                                * Please enter a title first
                                            </p>
                                        )}
                                    </label>
                                </div>
                            </div>

                            <div className="form-actions" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <button
                                    className="update-btn"
                                    style={{ position: 'static', flex: 1 }}
                                    onClick={handleSavePopup}
                                    disabled={uploadingPopup}
                                >
                                    {uploadingPopup ? 'Saving...' : (currentPopup._id ? 'Update Popup' : 'Create Popup')}
                                </button>
                                {currentPopup._id && (
                                    <button
                                        className="update-btn"
                                        style={{ position: 'static', background: '#6b7280' }}
                                        onClick={resetPopupForm}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                }
                .store-customizations {
                  background: #f5f5f5;
                  min-height: 100vh;
                }
                .header-bar {
                  background: white;
                  padding: 20px 30px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  border-bottom: 1px solid #e5e5e5;
                }
                .header-bar h1 {
                  font-size: 20px;
                  font-weight: 600;
                  color: #1a1a1a;
                }
                .language-select {
                  padding: 8px 30px 8px 15px;
                  border: 1px solid #d1d1d1;
                  border-radius: 4px;
                  background: white;
                  cursor: pointer;
                  font-size: 14px;
                }
                .tabs {
                  background: white;
                  padding: 15px 30px 0;
                  display: flex;
                  gap: 5px;
                  overflow-x: auto;
                  border-bottom: 1px solid #e5e5e5;
                }
                .tab {
                  padding: 12px 20px;
                  background: transparent;
                  border: none;
                  cursor: pointer;
                  font-size: 14px;
                  color: #666;
                  white-space: nowrap;
                  border-bottom: 3px solid transparent;
                  transition: all 0.3s;
                }
                .tab.active {
                  color: #10b981;
                  border-bottom-color: #10b981;
                  font-weight: 500;
                }
                .content {
                  padding: 30px;
                  position: relative;
                }
                .update-btn {
                  position: absolute;
                  top: 30px;
                  right: 30px;
                  background: #10b981;
                  color: white;
                  border: none;
                  padding: 10px 30px;
                  border-radius: 6px;
                  cursor: pointer;
                  font-size: 14px;
                  font-weight: 500;
                  transition: background 0.3s;
                }
                .update-btn:hover {
                  background: #059669;
                }
                .section {
                  background: white;
                  border-radius: 8px;
                  padding: 25px;
                  margin-bottom: 25px;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                }
                .section-header {
                  display: flex;
                  align-items: center;
                  gap: 10px;
                  margin-bottom: 25px;
                  padding-bottom: 15px;
                  border-bottom: 1px solid #e5e5e5;
                }
                .icon {
                  font-size: 18px;
                  color: #666;
                }
                .section-header h2 {
                  font-size: 18px;
                  font-weight: 600;
                  color: #1a1a1a;
                }
                .form-group {
                  margin-bottom: 25px;
                }
                .status-tag {
                  display: inline-block;
                  font-weight: 500;
                  text-transform: uppercase;
                  letter-spacing: 0.025em;
                }
                .status-tag.active {
                  background: #d1fae5;
                  color: #065f46;
                }
                .status-tag.inactive {
                  background: #fee2e2;
                  color: #991b1b;
                }
                .form-group h3 {
                  font-size: 15px;
                  font-weight: 500;
                  color: #666;
                  margin-bottom: 15px;
                }
                .form-group label {
                  display: block;
                  font-size: 14px;
                  color: #1a1a1a;
                  margin-bottom: 8px;
                  font-weight: 500;
                }
                .input-field {
                  width: 100%;
                  padding: 10px 15px;
                  border: 1px solid #d1d1d1;
                  border-radius: 6px;
                  font-size: 14px;
                  transition: border-color 0.3s;
                }
                .input-field:focus {
                  outline: none;
                  border-color: #10b981;
                }
                .textarea-field {
                  width: 100%;
                  padding: 10px 15px;
                  border: 1px solid #d1d1d1;
                  border-radius: 6px;
                  font-size: 14px;
                  font-family: inherit;
                  resize: vertical;
                  transition: border-color 0.3s;
                }
                .textarea-field:focus {
                  outline: none;
                  border-color: #10b981;
                }
                .upload-area {
                  border: 2px dashed #d1d1d1;
                  border-radius: 8px;
                  padding: 50px;
                  text-align: center;
                  background: #fafafa;
                  cursor: pointer;
                  transition: all 0.3s;
                }
                .upload-area:hover {
                  border-color: #10b981;
                  background: #f0fdf4;
                }
                .upload-area:has(input:disabled) {
                  opacity: 0.6;
                  cursor: not-allowed;
                }
                .upload-area:has(input:disabled):hover {
                  border-color: #d1d1d1;
                  background: #fafafa;
                }
                .upload-icon {
                  font-size: 36px;
                  color: #10b981;
                  margin-bottom: 10px;
                }
                .upload-text {
                  font-size: 14px;
                  color: #1a1a1a;
                  margin-bottom: 5px;
                }
                .upload-hint {
                  font-size: 12px;
                  color: #999;
                }
                .upload-warning {
                  color: #ef4444;
                  font-size: 12px;
                  margin-top: 5px;
                }
                .remove-btn {
                  margin-top: 10px;
                  background: transparent;
                  border: none;
                  color: #ef4444;
                  font-size: 24px;
                  cursor: pointer;
                  padding: 5px 10px;
                }
                .slider-tabs {
                  display: flex;
                  gap: 5px;
                  margin-bottom: 25px;
                  border-bottom: 1px solid #e5e5e5;
                }
                .slider-tab {
                  padding: 10px 20px;
                  background: transparent;
                  border: none;
                  cursor: pointer;
                  font-size: 13px;
                  color: #666;
                  border-bottom: 2px solid transparent;
                  transition: all 0.3s;
                }
                .slider-tab.active {
                  color: #1a1a1a;
                  border-bottom-color: #d1d1d1;
                  background: #f9f9f9;
                }
                .slides-preview {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 20px;
                  margin-top: 15px;
                }
                .slide-preview-item {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  gap: 10px;
                  padding: 15px;
                  border: 1px solid #e5e5e5;
                  border-radius: 8px;
                  background: #fafafa;
                  min-width: 150px;
                }
                .uploaded-image {
                  position: relative;
                  display: inline-block;
                }
                .uploaded-image img {
                  width: 100px;
                  height: 60px;
                  object-fit: cover;
                  border-radius: 6px;
                  border: 1px solid #e5e5e5;
                }
                .remove-btn-small {
                  position: absolute;
                  top: -8px;
                  right: -8px;
                  background: #ef4444;
                  color: white;
                  border: none;
                  border-radius: 50%;
                  width: 24px;
                  height: 24px;
                  font-size: 16px;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  line-height: 1;
                  transition: background 0.3s;
                }
                .remove-btn-small:hover {
                  background: #dc2626;
                }
                .slide-info {
                  text-align: center;
                  font-size: 12px;
                  max-width: 120px;
                }
                .slide-info p {
                  margin: 2px 0;
                  word-break: break-word;
                }
                .slide-info strong {
                  color: #1a1a1a;
                }
                .slide-info small {
                  color: #666;
                  font-size: 11px;
                }
                .no-items {
                  color: #666;
                  font-style: italic;
                  text-align: center;
                  padding: 20px;
                  width: 100%;
                }
                .input-group {
                  margin-bottom: 20px;
                }
                .input-group label {
                  display: block;
                  margin-bottom: 5px;
                  font-weight: 500;
                  color: #1a1a1a;
                }
                .toggle {
                  position: relative;
                  display: inline-flex;
                  align-items: center;
                  cursor: pointer;
                }
                .toggle input {
                  opacity: 0;
                  width: 0;
                  height: 0;
                }
                .toggle-slider {
                  position: relative;
                  display: inline-block;
                  width: 50px;
                  height: 26px;
                  background-color: #ccc;
                  border-radius: 34px;
                  transition: 0.4s;
                }
                .toggle-slider:before {
                  position: absolute;
                  content: "";
                  height: 20px;
                  width: 20px;
                  left: 3px;
                  bottom: 3px;
                  background-color: white;
                  border-radius: 50%;
                  transition: 0.4s;
                }
                .toggle input:checked + .toggle-slider {
                  background-color: #10b981;
                }
                .toggle input:checked + .toggle-slider:before {
                  transform: translateX(24px);
                }
                .toggle-label {
                  margin-left: 10px;
                  font-size: 13px;
                  font-weight: 500;
                  color: #10b981;
                }
                @media (max-width: 768px) {
                  .slides-preview {
                    justify-content: center;
                  }
                  .slide-preview-item {
                    min-width: 140px;
                  }
                }
                @media (max-width: 480px) {
                  .content {
                    padding: 15px;
                  }
                  .section {
                    padding: 15px;
                  }
                  .upload-area {
                    padding: 30px 15px;
                  }
                }
            `}</style>
        </div>
    );
};

export default StoreCustomizations;
