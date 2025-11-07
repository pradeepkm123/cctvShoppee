import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const mockShipmentData = {
  packageNumber: "Package 1",
  awbNumber: "AWB00381198",
  courier: "BlueDart",
  weight: "1.2 kg",
  dimensions: "25 × 15 × 10 cm",
};

const mockCustomerData = {
  name: "Customer 8",
  id: "CUST8",
  email: "customer8@example.com",
  phone: "+919000000007",
};

const OrderDetails = ({ order, onBack }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [note, setNote] = useState("");
  const [refundAmount, setRefundAmount] = useState(order.totalAmount || 0);
  const [refundReason, setRefundReason] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [timelineData, setTimelineData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Deduplicate timeline data
  const deduplicateTimelineData = (data) => {
    return data.reduce((acc, current) => {
      const isDuplicate = acc.some(
        (item) =>
          item.timestamp === current.timestamp &&
          item.status === current.status &&
          item.description === current.description
      );
      if (!isDuplicate) {
        acc.push(current);
      }
      return acc;
    }, []);
  };

  // Fetch timeline data on component mount
  useEffect(() => {
    const fetchTimelineData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`https://cctvshoppee.onrender.com/api/orders/${order._id}/timeline`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch timeline data");
        }
        const data = await response.json();
        const uniqueData = deduplicateTimelineData(data.timeline || []);
        setTimelineData(uniqueData);
      } catch (error) {
        console.error("Error fetching timeline:", error);
        // Fallback to mock data if the fetch fails
        const mockData = [
          {
            status: "CREATED",
            description: "Order has been placed",
            timestamp: new Date(order.createdAt).toLocaleString("en-IN"),
            color: "#3B82F6",
          },
          {
            status: "CONFIRMED",
            description: "Order confirmed and payment verified",
            timestamp: new Date(Date.now() + 3600000).toLocaleString("en-IN"),
            color: "#3B82F6",
          },
        ];
        setTimelineData(deduplicateTimelineData(mockData));
      } finally {
        setIsLoading(false);
      }
    };
    fetchTimelineData();
  }, [order._id, order.createdAt]);

  const getNextStatusOptions = (currentStatus) => {
    switch (currentStatus) {
      case "Pending":
      case "Created":
        return ["Confirmed", "Cancelled by admin"];
      case "Confirmed":
        return ["Allocated", "Packed", "Cancelled by admin"];
      case "Packed":
      case "Allocated":
        return ["Shipment Created", "Cancelled by admin"];
      case "Shipment Created":
        return ["Item Out to Delivery", "Cancelled by admin"];
      case "Item Out to Delivery":
        return ["Delivered", "Cancelled by admin"];
      case "Delivered":
        return ["Item Return Request"];
      default:
        return ["Pending"];
    }
  };

  const updateOrderStatusInDB = async (newStatus, note) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://cctvshoppee.onrender.com/api/orders/${order._id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus, note }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update order status");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  };

  const processRefundInDB = async (refundAmount, refundReason) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://cctvshoppee.onrender.com/api/orders/${order._id}/refund`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ refundAmount, refundReason }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to process refund");
      }
      return await response.json();
    } catch (error) {
      console.error("Error processing refund:", error);
      throw error;
    }
  };

  const cancelOrderInDB = async (reason) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://cctvshoppee.onrender.com/api/orders/${order._id}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to cancel order");
      }
      return await response.json();
    } catch (error) {
      console.error("Error cancelling order:", error);
      throw error;
    }
  };

  const handleUpdateStatus = async () => {
    try {
      await updateOrderStatusInDB(status, note);
      const newTimelineEntry = {
        status,
        description: note || `Status updated to ${status}`,
        timestamp: new Date().toLocaleString("en-IN"),
        color: "#8B5CF6",
        user: "System",
      };
      const updatedTimeline = deduplicateTimelineData([...timelineData, newTimelineEntry]);
      await fetch(`https://cctvshoppee.onrender.com/api/orders/${order._id}/timeline`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ timelineEntry: newTimelineEntry }),
      });
      setTimelineData(updatedTimeline);
      setShowUpdateDialog(false);
    } catch (error) {
      alert(error.message || "Failed to update order status. Please try again.");
    }
  };

  const handleProcessRefund = async () => {
    try {
      await processRefundInDB(refundAmount, refundReason);
      const newTimelineEntry = {
        status: "Refund Processed",
        description: `Refund of ₹${refundAmount} processed. Reason: ${refundReason}`,
        timestamp: new Date().toLocaleString("en-IN"),
        color: "#EF4444",
        user: "Admin User",
      };
      const updatedTimeline = deduplicateTimelineData([...timelineData, newTimelineEntry]);
      await fetch(`https://cctvshoppee.onrender.com/api/orders/${order._id}/timeline`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ timelineEntry: newTimelineEntry }),
      });
      setTimelineData(updatedTimeline);
      setShowRefundDialog(false);
    } catch (error) {
      alert(error.message || "Failed to process refund. Please try again.");
    }
  };

  const handleCancelOrder = async () => {
    try {
      await cancelOrderInDB(cancelReason);
      const newTimelineEntry = {
        status: "Cancelled by admin",
        description: `Order cancelled. Reason: ${cancelReason}`,
        timestamp: new Date().toLocaleString("en-IN"),
        color: "#EF4444",
        user: "Admin User",
      };
      const updatedTimeline = deduplicateTimelineData([...timelineData, newTimelineEntry]);
      await fetch(`https://cctvshoppee.onrender.com/api/orders/${order._id}/timeline`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ timelineEntry: newTimelineEntry }),
      });
      setTimelineData(updatedTimeline);
      setStatus("Cancelled by admin");
      setShowCancelDialog(false);
    } catch (error) {
      alert(error.message || "Failed to cancel order. Please try again.");
    }
  };

  const handleSendEmailUpdate = () => console.log("Send email update");
  const handleSendSMSUpdate = () => console.log("Send SMS update");
  const handleSendWhatsAppMessage = () => console.log("Send WhatsApp message");
  const handlePrintLabel = () => console.log("Print label");
  const handleTrackPackage = () => console.log("Track package");

  const handlePrintInvoice = async () => {
    const invoiceDiv = document.createElement('div');
    invoiceDiv.id = 'invoice-to-print';
    invoiceDiv.style.position = 'absolute';
    invoiceDiv.style.left = '-9999px';
    invoiceDiv.style.width = '800px';
    invoiceDiv.style.padding = '20px';
    invoiceDiv.style.backgroundColor = 'white';
    invoiceDiv.style.fontFamily = 'Arial, sans-serif';
    invoiceDiv.innerHTML = `
      <div style="max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <div>
            <img
              src="https://via.placeholder.com/100x100?text=Logo"
              alt="Company Logo"
              style="width: 80px; height: 80px; border-radius: 50%;"
            />
            <h2 style="margin: 0; color: #d35400;">Zylker Design Labs</h2>
            <p style="margin: 5px 0;">14B, Northern Street</p>
            <p style="margin: 5px 0;">Greater South Avenue</p>
            <p style="margin: 5px 0;">New York, New York 10001</p>
            <p style="margin: 5px 0;">U.S.A</p>
          </div>
          <div style="text-align: right;">
            <h1 style="color: #d35400; margin: 0;">INVOICE</h1>
            <p style="margin: 5px 0;"># INV-${order._id}</p>
            <p style="margin: 5px 0; font-size: 18px; font-weight: bold;">Balance Due</p>
            <p style="margin: 5px 0; font-size: 20px; color: #d35400;">$${order.totalAmount?.toLocaleString('en-US') || '0'}</p>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
          <div>
            <h3 style="margin: 0;">Bill To</h3>
            <p style="margin: 5px 0; font-weight: bold;">${mockCustomerData.name}</p>
            <p style="margin: 5px 0;">${order.deliveryAddress?.street || '3242 Chandler Hollow Road'}</p>
            <p style="margin: 5px 0;">${order.deliveryAddress?.city || 'Pittsburgh'}, ${order.deliveryAddress?.state || 'PA'} ${order.deliveryAddress?.zip || '15222'}</p>
          </div>
          <div>
            <h3 style="margin: 0;">Ship To</h3>
            <p style="margin: 5px 0;">${order.deliveryAddress?.street || '3242 Chandler Hollow Road'}</p>
            <p style="margin: 5px 0;">${order.deliveryAddress?.city || 'Pittsburgh'}, ${order.deliveryAddress?.state || 'PA'} ${order.deliveryAddress?.zip || '15222'}</p>
          </div>
          <div>
            <p style="margin: 5px 0;"><strong>Invoice Date:</strong> ${new Date(order.createdAt).toLocaleDateString('en-US')}</p>
            <p style="margin: 5px 0;"><strong>Terms:</strong> Due on Receipt</p>
          </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #d35400; color: white;">
              <th style="padding: 10px; text-align: left;">#</th>
              <th style="padding: 10px; text-align: left;">Item & Description</th>
              <th style="padding: 10px; text-align: center;">Qty</th>
              <th style="padding: 10px; text-align: center;">Rate</th>
              <th style="padding: 10px; text-align: right;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map((item, index) => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px;">${index + 1}</td>
                <td style="padding: 10px;">
                  <strong>${item.productId?.name || 'Unknown Product'}</strong><br />
                  <small>${item.productId?.description || ''}</small>
                </td>
                <td style="padding: 10px; text-align: center;">${item.quantity}</td>
                <td style="padding: 10px; text-align: center;">$${item.price?.toFixed(2) || '0.00'}</td>
                <td style="padding: 10px; text-align: right;">$${(item.price * item.quantity)?.toFixed(2) || '0.00'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div style="text-align: right; margin-bottom: 20px;">
          <p style="margin: 5px 0;"><strong>Sub Total:</strong> $${order.totalAmount?.toLocaleString('en-US') || '0'}</p>
          <p style="margin: 5px 0;"><strong>Tax Rate:</strong> 5.00%</p>
          <p style="margin: 5px 0; font-size: 18px;"><strong>Total:</strong> $${(order.totalAmount * 1.05)?.toFixed(2) || '0.00'}</p>
        </div>
        <div style="background-color: #d35400; color: white; padding: 10px; text-align: right; font-size: 18px; font-weight: bold;">
          Balance Due: $${(order.totalAmount * 1.05)?.toFixed(2) || '0.00'}
        </div>
        <div style="margin-top: 20px;">
          <h3 style="margin: 0;">Notes</h3>
          <p style="margin: 5px 0;">Thanks for your business.</p>
        </div>
        <div style="margin-top: 20px;">
          <h3 style="margin: 0;">Terms & Conditions</h3>
          <p style="margin: 5px 0;">All payments must be made in full before the commencement of any design work.</p>
        </div>
      </div>
    `;
    document.body.appendChild(invoiceDiv);
    const canvas = await html2canvas(invoiceDiv, {
      scale: 2,
      logging: false,
      useCORS: true,
    });
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    const pdfBlob = pdf.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
    document.body.removeChild(invoiceDiv);
  };

  const renderDetailsTab = () => (
    <div style={{ display: "flex", gap: "24px" }}>
      <div style={{ flex: 1 }}>
        <h3>Order Items</h3>
        {(order.items || []).map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "16px",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            <img
              src={`https://cctvshoppee.onrender.com/uploads/${item.productId?.image}`}
              alt={item.productId?.name || "Product"}
              style={{
                marginRight: "16px",
                border: "1px solid #e6e6e6",
                borderRadius: "5px",
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
            />
            <div style={{ flex: 1 }}>
              <h6 style={{ margin: "0 0 4px 0" }}>{item.productId?.name || "Unknown Product"}</h6>
              <p style={{ margin: "0", color: "#6B7280" }}>Quantity: {item.quantity}</p>
            </div>
            <strong style={{ fontSize: "16px" }}>
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </strong>
          </div>
        ))}
      </div>
      <div
        style={{
          flex: 1,
          padding: "10px",
          border: "1px solid #e1e2e2",
          borderRadius: "7px",
          backgroundColor: "#f9fafb",
        }}
      >
        <h3>Order Summary</h3>
        {[
          { label: "List Price", value: order.listPrice || "2,990" },
          { label: "Selling Price", value: order.sellingPrice || "999" },
          { label: "Extra Discount", value: `- ₹${order.extraDiscount || "252"}` },
          { label: "Special Price", value: order.specialPrice || "747" },
          { label: "Payment Handling Fee", value: order.paymentHandlingFee || "10" },
          { label: "Protect Promise Fee", value: order.protectPromiseFee || "9" },
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "20px 0",
            }}
          >
            <span>{item.label}</span>
            <span>₹{item.value}</span>
          </div>
        ))}
        <div style={{ borderTop: "1px solid #d1d5db", margin: "20px 0" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "12px",
            fontWeight: "bold",
          }}
        >
          <span>Total:</span>
          <span>₹{order.totalAmount?.toLocaleString("en-IN") || "0"}</span>
        </div>
      </div>
    </div>
  );

  const renderTimelineTab = () => {
    if (isLoading) return <p>Loading timeline...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    return (
      <div>
        <h3 style={{ marginBottom: "24px", color: "#374151" }}>Order Timeline</h3>
        <div style={{ position: "relative" }}>
          {timelineData.map((item, index) => (
            <div
              key={`${item.status}-${index}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: index === timelineData.length - 1 ? "0" : "32px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: item.color,
                  borderRadius: "50%",
                  marginRight: "16px",
                  marginTop: "4px",
                  flexShrink: 0,
                  zIndex: 2,
                  position: "relative",
                }}
              />
              {index < timelineData.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    left: "5px",
                    top: "16px",
                    width: "2px",
                    height: "40px",
                    backgroundColor: "#E5E7EB",
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "4px",
                  }}
                >
                  <h4
                    style={{
                      margin: "0",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    {item.status}
                  </h4>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "#6B7280",
                      marginLeft: "16px",
                    }}
                  >
                    {item.timestamp}
                  </span>
                </div>
                <p
                  style={{
                    margin: "0",
                    fontSize: "14px",
                    color: "#6B7280",
                    lineHeight: "1.4",
                  }}
                >
                  {item.description}
                </p>
                {(item.status === "Shipment Created" || item.status === "Delivered") && (
                  <div style={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
                    <img
                      src={`https://cctvshoppee.onrender.com/uploads/${order.items[0]?.productId?.image}`}
                      alt={order.items[0]?.productId?.name || "Product"}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        marginRight: "8px",
                      }}
                    />
                    <span style={{ fontSize: "14px", color: "#374151" }}>
                      {order.items[0]?.productId?.name || "Unknown Product"}
                    </span>
                  </div>
                )}
                {item.user && (
                  <p
                    style={{
                      margin: "4px 0 0 0",
                      fontSize: "12px",
                      color: "#9CA3AF",
                    }}
                  >
                    by {item.user}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderShipmentTab = () => (
    <div>
      <h3 style={{ marginBottom: "24px", color: "#374151" }}>Shipment Details</h3>
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
          padding: "20px",
          backgroundColor: "#F9FAFB",
        }}
      >
        {/* Product Preview */}
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
          <img
            src={`https://cctvshoppee.onrender.com/uploads/${order.items[0]?.productId?.image}`}
            alt={order.items[0]?.productId?.name || "Product"}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "4px",
              marginRight: "12px",
            }}
          />
          <div>
            <h4 style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: "600" }}>
              {order.items[0]?.productId?.name || "Unknown Product"}
            </h4>
            <p style={{ margin: "0", color: "#6B7280" }}>
              ₹{(order.items[0]?.price * order.items[0]?.quantity).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
        {/* Shipment Details */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h4
            style={{
              margin: "0",
              fontSize: "16px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            {mockShipmentData.packageNumber}
          </h4>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handlePrintLabel}
              style={{
                padding: "6px 12px",
                border: "1px solid #D1D5DB",
                backgroundColor: "white",
                color: "#374151",
                fontSize: "12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Print Label
            </button>
            <button
              onClick={handleTrackPackage}
              style={{
                padding: "6px 12px",
                border: "none",
                backgroundColor: "#7C3AED",
                color: "white",
                fontSize: "12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Track Package
            </button>
          </div>
        </div>
        {/* Rest of the Shipment Details */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>
                AWB Number
              </span>
              <span style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                {mockShipmentData.awbNumber}
              </span>
            </div>
            <div>
              <span style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>
                Weight
              </span>
              <span style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                {mockShipmentData.weight}
              </span>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: "16px" }}>
              <span style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>
                Courier
              </span>
              <span style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                {mockShipmentData.courier}
              </span>
            </div>
            <div>
              <span style={{ display: "block", fontSize: "12px", color: "#6B7280", marginBottom: "4px" }}>
                Dimensions
              </span>
              <span style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>
                {mockShipmentData.dimensions}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCustomerTab = () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
      {/* Customer Information */}
      <div>
        <h3 style={{ marginBottom: "24px", color: "#374151" }}>Customer Information</h3>
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#F3F4F6",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "12px",
            }}
          >
            <i className="las la-user" style={{ color: "#6B7280" }}></i>
          </div>
          <div>
            <h4 style={{ margin: "0 0 2px 0", fontSize: "16px", fontWeight: "600", color: "#374151" }}>
              {mockCustomerData.name}
            </h4>
            <p style={{ margin: "0", fontSize: "12px", color: "#6B7280" }}>
              Customer ID: {mockCustomerData.id}
            </p>
          </div>
        </div>
        {/* Product Preview */}
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
          <img
            src={`https://cctvshoppee.onrender.com/uploads/${order.items[0]?.productId?.image}`}
            alt={order.items[0]?.productId?.name || "Product"}
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              borderRadius: "4px",
              marginRight: "12px",
            }}
          />
          <div>
            <h5 style={{ margin: "0 0 2px 0", fontSize: "14px", fontWeight: "600" }}>
              {order.items[0]?.productId?.name || "Unknown Product"}
            </h5>
            <p style={{ margin: "0", fontSize: "12px", color: "#6B7280" }}>
              ₹{(order.items[0]?.price * order.items[0]?.quantity).toLocaleString("en-IN")}
            </p>
          </div>
        </div>
        {/* Rest of the Customer Information */}
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#F3F4F6",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "12px",
            }}
          >
            <i className="las la-envelope" style={{ color: "#6B7280" }}></i>
          </div>
          <div>
            <h4 style={{ margin: "0 0 2px 0", fontSize: "16px", fontWeight: "500", color: "#374151" }}>
              {mockCustomerData.email}
            </h4>
            <p style={{ margin: "0", fontSize: "12px", color: "#6B7280" }}>Email Address</p>
          </div>
        </div>
        <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: "#F3F4F6",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "12px",
            }}
          >
            <i className="las la-phone" style={{ color: "#6B7280" }}></i>
          </div>
          <div>
            <h4 style={{ margin: "0 0 2px 0", fontSize: "16px", fontWeight: "500", color: "#374151" }}>
              {mockCustomerData.phone}
            </h4>
            <p style={{ margin: "0", fontSize: "12px", color: "#6B7280" }}>Phone Number</p>
          </div>
        </div>
      </div>
      {/* Communication Buttons */}
      <div>
        <h3 style={{ marginBottom: "24px", color: "#374151" }}>Communication</h3>
        <button
          onClick={handleSendEmailUpdate}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            border: "1px solid #E5E7EB",
            backgroundColor: "white",
            color: "#374151",
            fontSize: "14px",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "12px",
          }}
        >
          <span>Send Email Update</span>
          <i className="las la-envelope" style={{ color: "#6B7280" }}></i>
        </button>
        <button
          onClick={handleSendSMSUpdate}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            border: "1px solid #E5E7EB",
            backgroundColor: "white",
            color: "#374151",
            fontSize: "14px",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "12px",
          }}
        >
          <span>Send SMS Update</span>
          <i className="las la-sms" style={{ color: "#6B7280" }}></i>
        </button>
        <button
          onClick={handleSendWhatsAppMessage}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            border: "1px solid #E5E7EB",
            backgroundColor: "white",
            color: "#374151",
            fontSize: "14px",
            borderRadius: "6px",
            cursor: "pointer",
            marginBottom: "12px",
          }}
        >
          <span>Send WhatsApp Message</span>
          <i className="lab la-whatsapp" style={{ color: "#6B7280" }}></i>
        </button>
      </div>
    </div>
  );

  // New: Render Cancel Request Tab
  const renderCancelRequestTab = () => (
    <div style={{ padding: "20px", border: "1px solid #e1e2e2", borderRadius: "7px", backgroundColor: "#f9fafb" }}>
      <h3>Cancel Request</h3>
      {order.cancelRequest ? (
        <>
          <p><strong>Reason:</strong> {order.cancelRequest.reason}</p>
          {order.cancelRequest.otherReason && <p><strong>Other Reason:</strong> {order.cancelRequest.otherReason}</p>}
          {order.cancelRequest.additionalComments && <p><strong>Additional Comments:</strong> {order.cancelRequest.additionalComments}</p>}
          <p><strong>Requested At:</strong> {new Date(order.cancelRequest.cancelledAt).toLocaleString()}</p>
        </>
      ) : (
        <p>No cancellation request found.</p>
      )}
    </div>
  );

  // New: Render Return Request Tab
  const renderReturnRequestTab = () => (
    <div style={{ padding: "20px", border: "1px solid #e1e2e2", borderRadius: "7px", backgroundColor: "#f9fafb" }}>
      <h3>Return Request</h3>
      {order.returnRequest ? (
        <>
          <p><strong>Reason:</strong> {order.returnRequest.reason}</p>
          <p><strong>Issue Description:</strong> {order.returnRequest.issueDescription}</p>
          <p><strong>Refund Choice:</strong> {order.returnRequest.refundChoice}</p>
          <p><strong>Requested At:</strong> {new Date(order.returnRequest.requestedAt).toLocaleString()}</p>
          {order.returnRequest.images && order.returnRequest.images.length > 0 && (
            <div>
              <h4>Uploaded Images:</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
                {order.returnRequest.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/uploads/${image}`}
                    alt={`Return Issue ${index + 1}`}
                    style={{ width: "100px", height: "100px", margin: "5px" }}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <p>No return request found.</p>
      )}
    </div>
  );

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: "#F9FAFB",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "16px 24px",
          marginBottom: "20px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <button
            onClick={onBack}
            style={{
              marginRight: "10px",
              padding: "8px 12px",
              border: "1px solid #D1D5DB",
              backgroundColor: "white",
              color: "#374151",
              fontSize: "14px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            <i className="las la-arrow-left"></i> Back to Orders
          </button>
          <h5 style={{ marginTop: "10px", marginLeft: "10px" }}>#{order._id}</h5>
          <p style={{ margin: "-9px 0 0 10px", color: "#6B7280" }}>
            Order placed on {new Date(order.createdAt).toLocaleDateString("en-IN")} at{" "}
            {new Date(order.createdAt).toLocaleTimeString("en-IN")}
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => setShowUpdateDialog(true)}
            style={{
              padding: "8px 12px",
              border: "1px solid #D1D5DB",
              backgroundColor: "white",
              color: "#374151",
              fontSize: "14px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            <i className="las la-sync"></i> Update Status
          </button>
          <button
            onClick={handlePrintInvoice}
            style={{
              padding: "8px 12px",
              border: "1px solid #D1D5DB",
              backgroundColor: "white",
              color: "#374151",
              fontSize: "14px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            <i className="las la-print"></i> Print Invoice
          </button>
          <button
            onClick={() => setShowRefundDialog(true)}
            style={{
              padding: "8px 12px",
              border: "1px solid #D1D5DB",
              backgroundColor: "white",
              color: "#EF4444",
              fontSize: "14px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            <i className="las la-undo"></i> Refund
          </button>
          <button
            onClick={() => setShowCancelDialog(true)}
            style={{
              padding: "8px 12px",
              border: "1px solid #D1D5DB",
              backgroundColor: "white",
              color: "#EF4444",
              fontSize: "14px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            <i className="las la-times-circle"></i> Cancel Order
          </button>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "16px 24px",
          marginBottom: "20px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <span
            style={{
              backgroundColor: "#DBEAFE",
              color: "#2563EB",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "500",
              marginRight: "8px",
            }}
          >
            {status}
          </span>
          <span
            style={{
              backgroundColor: "#FCE7F3",
              color: "#BE185D",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            Payment: {order.paymentStatus}
          </span>
        </div>
        <div style={{ display: "inline-grid" }}>
          <strong style={{ fontSize: "18px" }}>
            ₹{order.totalAmount ? order.totalAmount.toLocaleString("en-IN") : "0"}
          </strong>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "0 24px",
          marginBottom: "20px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", borderBottom: "1px solid #E5E7EB" }}>
          {["details", "timeline", "shipment", "customer", "cancelRequest", "returnRequest"].map((tab) => (
            <button
              key={tab}
              style={{
                padding: "12px 16px",
                border: "none",
                backgroundColor: "transparent",
                color: activeTab === tab ? "#2563EB" : "#6B7280",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                borderBottom: activeTab === tab ? "2px solid #2563EB" : "none",
              }}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "cancelRequest" ? "Cancel Request" : tab === "returnRequest" ? "Return Request" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        {activeTab === "details" && renderDetailsTab()}
        {activeTab === "timeline" && renderTimelineTab()}
        {activeTab === "shipment" && renderShipmentTab()}
        {activeTab === "customer" && renderCustomerTab()}
        {activeTab === "cancelRequest" && renderCancelRequestTab()}
        {activeTab === "returnRequest" && renderReturnRequestTab()}
      </div>
      <Dialog open={showUpdateDialog} onClose={() => setShowUpdateDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Update Order Status</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="New Status"
            margin="dense"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {getNextStatusOptions(order.status).map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Note (Optional)"
            margin="dense"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleUpdateStatus}>
            Update Status
          </Button>
          <Button onClick={() => setShowUpdateDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showRefundDialog} onClose={() => setShowRefundDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>Process Refund</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="number"
            label="Refund Amount"
            margin="dense"
            value={refundAmount}
            onChange={(e) => setRefundAmount(e.target.value)}
          />
          <small>
            Maximum: ₹{order.totalAmount ? order.totalAmount.toLocaleString("en-IN") : "0"}
          </small>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="Reason"
            margin="dense"
            value={refundReason}
            onChange={(e) => setRefundReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleProcessRefund}>
            Process Refund
          </Button>
          <Button onClick={() => setShowRefundDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showCancelDialog} onClose={() => setShowCancelDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle style={{ color: "#d32f2f" }}>
          <i className="las la-exclamation-triangle"></i> Cancel Order
        </DialogTitle>
        <DialogContent>
          <p
            style={{
              border: "1px solid #c9aaaa",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#fef7f7",
            }}
          >
            This action will cancel the order and may trigger an automatic refund if payment was captured.
          </p>
          <TextField
            select
            fullWidth
            label="Cancellation Reason"
            margin="dense"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          >
            <MenuItem value="Stock Unavailable">Stock Unavailable</MenuItem>
            <MenuItem value="Technical Issue">Technical Issue</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleCancelOrder}>
            Cancel Order
          </Button>
          <Button onClick={() => setShowCancelDialog(false)}>Keep Order</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

OrderDetails.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    paymentStatus: PropTypes.string.isRequired,
    totalAmount: PropTypes.number,
    createdAt: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        productId: PropTypes.shape({
          name: PropTypes.string,
          image: PropTypes.string,
        }),
        quantity: PropTypes.number,
        price: PropTypes.number,
      })
    ),
    listPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    sellingPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    extraDiscount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    specialPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    paymentHandlingFee: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    protectPromiseFee: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    cancelRequest: PropTypes.shape({
      reason: PropTypes.string,
      otherReason: PropTypes.string,
      additionalComments: PropTypes.string,
      cancelledAt: PropTypes.string,
    }),
    returnRequest: PropTypes.shape({
      reason: PropTypes.string,
      issueDescription: PropTypes.string,
      refundChoice: PropTypes.string,
      requestedAt: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
    }),
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default OrderDetails;
