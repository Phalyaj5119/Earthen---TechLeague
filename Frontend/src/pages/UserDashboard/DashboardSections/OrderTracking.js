// src/pages/UserDashboard/DashboardSections/OrderTracking.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderTracking.css'; // Optional for styling the progress

export default function OrderTracking() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchActiveOrders();
  }, []);

  const fetchActiveOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/active-orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Tracking fetch error:", err);
    }
  };

  const statusSteps = ['Packed', 'In Transit', 'Delivered'];

  const getStep = (status) => {
    switch (status) {
      case 'Packed': return 1;
      case 'In Transit': return 2;
      case 'Delivered': return 3;
      default: return 0;
    }
  };

  return (
    <div>
      <h2>📦 Track Your Orders</h2>
      {orders.length ? orders.map(order => (
        <div key={order.id} className="tracking-card">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <div className="status-bar">
            {statusSteps.map((step, index) => (
              <span key={index} className={`step ${getStep(order.status) >= index + 1 ? 'active' : ''}`}>
                {step}
              </span>
            ))}
          </div>
        </div>
      )) : <p>No active orders to track.</p>}
    </div>
  );
}
