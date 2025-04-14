import React, { useState } from 'react';
import axios from 'axios';
import './UserTrackOrder.css';

export default function UserTrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  const handleTrack = async () => {
    if (!orderId) return setError('Please enter an order ID');

    try {
      const res = await axios.get(`http://localhost:5000/api/user/track-order/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrder(res.data);
      setError('');
    } catch (err) {
      setError('Order not found or you are not authorized');
      setOrder(null);
    }
  };

  return (
    <div className="track-order-container">
      <h2>📦 Track Your Order</h2>
      <input
        type="text"
        placeholder="Enter your Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <button onClick={handleTrack}>Track</button>

      {error && <p className="error">{error}</p>}

      {order && (
        <div className="order-status">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}
