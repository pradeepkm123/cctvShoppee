import React, { useState, useEffect } from 'react';
import { AlertTriangle, ShoppingCart, MessageSquare, Bell, Trash2, Filter, Check } from 'lucide-react';

const NotificationsAlerts = () => {
  const [activeTab, setActiveTab] = useState('All Notifications');
  const [notifications, setNotifications] = useState([]);
  const [settings, setSettings] = useState({
    lowStock: true,
    newOrders: true,
    systemUpdates: true,
    customerMessages: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAndGenerateNotifications = async () => {
      try {
        setLoading(true);
        
        // Fetch orders
        const ordersResponse = await fetch('https://cctvshoppee.onrender.com/api/orders/public');
        if (!ordersResponse.ok) throw new Error('Orders API error');
        const ordersData = await ordersResponse.json();
        const orders = ordersData.orders || ordersData || [];

        // Fetch products
        const productsResponse = await fetch('https://cctvshoppee.onrender.com/api/products');
        if (!productsResponse.ok) throw new Error('Products API error');
        const productsData = await productsResponse.json();
        const products = productsData.products || productsData || [];

        // Generate notifications from real data
        const generatedNotifications = [];

        // 1. New Order Notifications (orders from last 24 hours)
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        
        const recentOrders = orders.filter(order => {
          const orderDate = new Date(order.createdAt || order.orderDate || order.date);
          return orderDate >= twentyFourHoursAgo;
        });

        recentOrders.forEach(order => {
          const orderDate = new Date(order.createdAt || order.orderDate || order.date);
          const timeDiff = Math.floor((new Date() - orderDate) / (1000 * 60)); // minutes ago
          
          let timeText = '';
          if (timeDiff < 1) timeText = 'Just now';
          else if (timeDiff < 60) timeText = `${timeDiff} mins ago`;
          else if (timeDiff < 1440) timeText = `${Math.floor(timeDiff / 60)} hours ago`;
          else timeText = `${Math.floor(timeDiff / 1440)} days ago`;

          generatedNotifications.push({
            id: `order-${order._id || order.orderNumber}`,
            type: 'order',
            title: 'New Order Received',
            message: `Order ${order.orderNumber || `#${order._id}`} from ${order.user?.name || order.customerName || 'Customer'} (₹${parseFloat(order.totalAmount || order.amount || 0).toFixed(2)})`,
            time: timeText,
            icon: 'cart',
            color: '#dbeafe',
            iconColor: '#3b82f6',
            isRead: false,
            timestamp: orderDate
          });
        });

        // 2. Low Stock Notifications
        const lowStockProducts = products.filter(product => {
          const stock = parseFloat(product.stockQuantity || product.quantity || product.stock || 0);
          return stock < 5; // Low stock threshold
        });

        lowStockProducts.forEach(product => {
          const stock = parseFloat(product.stockQuantity || product.quantity || product.stock || 0);
          generatedNotifications.push({
            id: `stock-${product._id || product.sku}`,
            type: 'low-stock',
            title: stock < 3 ? 'Critical Stock Alert' : 'Low Stock Alert',
            message: `${product.name} stock is ${stock < 3 ? 'critically' : ''} low (${stock} remaining)`,
            time: 'Recently',
            icon: 'alert',
            color: '#fee2e2',
            iconColor: '#dc2626',
            isRead: false,
            timestamp: new Date()
          });
        });

        // 3. System notifications (mock data for demo)
        generatedNotifications.push({
          id: 'system-1',
          type: 'system',
          title: 'System Update',
          message: 'Inventory sync completed successfully',
          time: '2 hours ago',
          icon: 'bell',
          color: '#e0e7ff',
          iconColor: '#6366f1',
          isRead: true,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
        });

        // Sort by timestamp (newest first)
        generatedNotifications.sort((a, b) => b.timestamp - a.timestamp);

        setNotifications(generatedNotifications);
      } catch (error) {
        console.error('Error fetching notifications data:', error);
        // Fallback to sample data if API fails
        setNotifications([
          {
            id: 1,
            type: 'order',
            title: 'New Order Received',
            message: 'Order #ORD-1240 from John Doe (₹234.50)',
            time: '12 mins ago',
            icon: 'cart',
            color: '#dbeafe',
            iconColor: '#3b82f6',
            isRead: false
          },
          {
            id: 2,
            type: 'low-stock',
            title: 'Critical Stock Alert',
            message: 'Laptop Stand stock is critically low (3 remaining)',
            time: '4 hours ago',
            icon: 'alert',
            color: '#fee2e2',
            iconColor: '#dc2626',
            isRead: false
          },
          {
            id: 3,
            type: 'low-stock',
            title: 'Low Stock Alert',
            message: 'Wireless Mouse stock is below threshold (5 remaining)',
            time: '5 mins ago',
            icon: 'alert',
            color: '#fee2e2',
            iconColor: '#dc2626',
            isRead: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndGenerateNotifications();
  }, []);

  // Calculate counts from real data
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const lowStockCount = notifications.filter(n => n.type === 'low-stock').length;
  const newOrdersCount = notifications.filter(n => n.type === 'order').length;
  const messageCount = notifications.filter(n => n.type === 'message').length;
  const systemCount = notifications.filter(n => n.type === 'system').length;

  const filteredNotifications = activeTab === 'Unread' 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const toggleSetting = (setting) => {
    setSettings({ ...settings, [setting]: !settings[setting] });
  };

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'alert':
        return <AlertTriangle size={20} />;
      case 'cart':
        return <ShoppingCart size={20} />;
      case 'message':
        return <MessageSquare size={20} />;
      case 'bell':
        return <Bell size={20} />;
      default:
        return <Bell size={20} />;
    }
  };

  const StatCard = ({ label, value }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>{label}</div>
      <div style={{ fontSize: '32px', fontWeight: '600', color: '#111827' }}>{value}</div>
    </div>
  );

  const NotificationItem = ({ notification }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '12px',
      border: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      position: 'relative'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '8px',
        backgroundColor: notification.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: notification.iconColor,
        flexShrink: 0
      }}>
        {getIcon(notification.icon)}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
          {notification.title}
        </div>
        <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>
          {notification.message}
        </div>
        <div style={{ fontSize: '12px', color: '#9ca3af' }}>
          {notification.time}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {!notification.isRead && (
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#3b82f6'
          }} />
        )}
        <button
          onClick={() => markAsRead(notification.id)}
          style={{
            background: 'none',
            border: 'none',
            color: notification.isRead ? '#059669' : '#9ca3af',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <Check size={18} />
        </button>
        <button
          onClick={() => deleteNotification(notification.id)}
          style={{
            background: 'none',
            border: 'none',
            color: '#ef4444',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );

  const ToggleSwitch = ({ checked, onChange }) => (
    <div
      onClick={onChange}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        backgroundColor: checked ? '#059669' : '#e5e7eb',
        position: 'relative',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
      }}
    >
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        top: '2px',
        left: checked ? '22px' : '2px',
        transition: 'left 0.2s'
      }} />
    </div>
  );

  if (loading) {
    return (
      <div style={{
        padding: '32px',
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center', color: '#6b7280' }}>
          <p>Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      padding: '32px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginBottom: '8px' }}>
              Notifications & Alerts
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Stay updated with all system notifications</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={markAllRead}
              style={{
                backgroundColor: 'white',
                color: '#374151',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Check size={16} /> Mark All Read
            </button>
            <button
              onClick={clearAll}
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Trash2 size={16} /> Clear All
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          <StatCard label="Total Notifications" value={notifications.length} />
          <StatCard label="Unread" value={unreadCount} />
          <StatCard label="Low Stock Alerts" value={lowStockCount} />
          <StatCard label="New Orders" value={newOrdersCount} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '24px' }}>
          {/* Main Content */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            {/* Tabs */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setActiveTab('All Notifications')}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    background: activeTab === 'All Notifications' ? '#f3f4f6' : 'transparent',
                    color: '#374151',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s'
                  }}
                >
                  All Notifications
                </button>
                <button
                  onClick={() => setActiveTab('Unread')}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    background: activeTab === 'Unread' ? '#d1fae5' : 'transparent',
                    color: activeTab === 'Unread' ? '#059669' : '#374151',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  Unread
                  {unreadCount > 0 && (
                    <span style={{
                      backgroundColor: '#dc2626',
                      color: 'white',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
              <button style={{
                padding: '8px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                background: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '14px',
                color: '#374151'
              }}>
                <Filter size={16} /> Filter
              </button>
            </div>

            {/* Notifications List */}
            <div style={{ padding: '20px' }}>
              {filteredNotifications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#9ca3af' }}>
                  No notifications to display
                </div>
              ) : (
                filteredNotifications.map(notification => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Notification Settings */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              padding: '24px',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '20px'
              }}>
                Notification Settings
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                      Low Stock Alerts
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      Get notified when stock is low
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={settings.lowStock}
                    onChange={() => toggleSetting('lowStock')}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                      New Orders
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      Get notified of new orders
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={settings.newOrders}
                    onChange={() => toggleSetting('newOrders')}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                      System Updates
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      Get notified of system updates
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={settings.systemUpdates}
                    onChange={() => toggleSetting('systemUpdates')}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                      Customer Messages
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      Get notified of new messages
                    </div>
                  </div>
                  <ToggleSwitch
                    checked={settings.customerMessages}
                    onChange={() => toggleSetting('customerMessages')}
                  />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              padding: '24px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '20px'
              }}>
                Quick Stats
              </h3>

              <div style={{
                padding: '12px',
                backgroundColor: '#fef2f2',
                borderRadius: '8px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={18} color="#dc2626" />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Low Stock</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#dc2626' }}>
                  {notifications.filter(n => n.type === 'low-stock' && !n.isRead).length}
                </span>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: '#eff6ff',
                borderRadius: '8px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingCart size={18} color="#3b82f6" />
                  <span style={{ fontSize: '14px', color: '#374151' }}>New Orders</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#3b82f6' }}>
                  {notifications.filter(n => n.type === 'order' && !n.isRead).length}
                </span>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: '#f0fdf4',
                borderRadius: '8px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={18} color="#059669" />
                  <span style={{ fontSize: '14px', color: '#374151' }}>Messages</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#059669' }}>
                  {notifications.filter(n => n.type === 'message' && !n.isRead).length}
                </span>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: '#f5f3ff',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Bell size={18} color="#6366f1" />
                  <span style={{ fontSize: '14px', color: '#374151' }}>System</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#6366f1' }}>
                  {notifications.filter(n => n.type === 'system' && !n.isRead).length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsAlerts;
