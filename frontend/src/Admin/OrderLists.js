import React, { useState } from 'react';
import OrderManagementTable from './OrderManagementTable';
import OrderDetails from './OrderDetails';

function OrderLists() {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleBackToTable = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      {selectedOrder ? (
        <OrderDetails order={selectedOrder} onBack={handleBackToTable} />
      ) : (
        <OrderManagementTable onOrderClick={handleOrderClick} />
      )}
    </div>
  );
}

export default OrderLists;
