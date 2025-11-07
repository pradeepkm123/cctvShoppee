// InvoicePage.js
import React from "react";

const InvoicePage = ({ order, customer, onBack }) => {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #eee",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <button
        onClick={onBack}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Back to Order
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <img
            src="https://via.placeholder.com/100x100?text=Logo"
            alt="Company Logo"
            style={{ width: "80px", height: "80px", borderRadius: "50%" }}
          />
          <h2 style={{ margin: "0", color: "#d35400" }}>Zylker Design Labs</h2>
          <p style={{ margin: "5px 0" }}>14B, Northern Street</p>
          <p style={{ margin: "5px 0" }}>Greater South Avenue</p>
          <p style={{ margin: "5px 0" }}>New York, New York 10001</p>
          <p style={{ margin: "5px 0" }}>U.S.A</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <h1 style={{ color: "#d35400", margin: "0" }}>INVOICE</h1>
          <p style={{ margin: "5px 0" }}># INV-{order._id}</p>
          <p style={{ margin: "5px 0", fontSize: "18px", fontWeight: "bold" }}>Balance Due</p>
          <p style={{ margin: "5px 0", fontSize: "20px", color: "#d35400" }}>
            ₹{order.totalAmount?.toLocaleString("en-IN") || "0"}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <h3 style={{ margin: "0" }}>Bill To</h3>
          <p style={{ margin: "5px 0", fontWeight: "bold" }}>{customer.name}</p>
          <p style={{ margin: "5px 0" }}>{order.deliveryAddress?.street || "3242 Chandler Hollow Road"}</p>
          <p style={{ margin: "5px 0" }}>
            {order.deliveryAddress?.city || "Pittsburgh"}, {order.deliveryAddress?.state || "PA"}{" "}
            {order.deliveryAddress?.zip || "15222"}
          </p>
        </div>
        <div>
          <h3 style={{ margin: "0" }}>Ship To</h3>
          <p style={{ margin: "5px 0" }}>{order.deliveryAddress?.street || "3242 Chandler Hollow Road"}</p>
          <p style={{ margin: "5px 0" }}>
            {order.deliveryAddress?.city || "Pittsburgh"}, {order.deliveryAddress?.state || "PA"}{" "}
            {order.deliveryAddress?.zip || "15222"}
          </p>
        </div>
        <div>
          <p style={{ margin: "5px 0" }}>
            <strong>Invoice Date:</strong> {new Date(order.createdAt).toLocaleDateString("en-IN")}
          </p>
          <p style={{ margin: "5px 0" }}>
            <strong>Terms:</strong> Due on Receipt
          </p>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#d35400", color: "white" }}>
            <th style={{ padding: "10px", textAlign: "left" }}>#</th>
            <th style={{ padding: "10px", textAlign: "left" }}>Item & Description</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Qty</th>
            <th style={{ padding: "10px", textAlign: "center" }}>Rate</th>
            <th style={{ padding: "10px", textAlign: "right" }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>{index + 1}</td>
              <td style={{ padding: "10px" }}>
                <strong>{item.productId?.name || "Unknown Product"}</strong>
                <br />
                <small>{item.productId?.description || ""}</small>
              </td>
              <td style={{ padding: "10px", textAlign: "center" }}>{item.quantity}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>₹{item.price?.toFixed(2) || "0.00"}</td>
              <td style={{ padding: "10px", textAlign: "right" }}>₹{(item.price * item.quantity)?.toFixed(2) || "0.00"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <p style={{ margin: "5px 0" }}>
          <strong>Sub Total:</strong> ₹{order.totalAmount?.toLocaleString("en-IN") || "0"}
        </p>
        <p style={{ margin: "5px 0" }}>
          <strong>Tax Rate:</strong> 5.00%
        </p>
        <p style={{ margin: "5px 0", fontSize: "18px" }}>
          <strong>Total:</strong> ₹{(order.totalAmount * 1.05)?.toFixed(2) || "0.00"}
        </p>
      </div>

      <div style={{ backgroundColor: "#d35400", color: "white", padding: "10px", textAlign: "right", fontSize: "18px", fontWeight: "bold" }}>
        Balance Due: ₹{(order.totalAmount * 1.05)?.toFixed(2) || "0.00"}
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3 style={{ margin: "0" }}>Notes</h3>
        <p style={{ margin: "5px 0" }}>Thanks for your business.</p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3 style={{ margin: "0" }}>Terms & Conditions</h3>
        <p style={{ margin: "5px 0" }}>All payments must be made in full before the commencement of any design work.</p>
      </div>
    </div>
  );
};

export default InvoicePage;
