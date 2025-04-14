// src/pages/UserDashboard/DashboardSections/OrderHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  const fetchOrderHistory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/order-history', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch order history:', err);
    }
  };

  return (
    <div>
      <h2>📚 Order History</h2>
      {orders.length ? orders.map(order => (
        <div key={order.id} className="order-card">
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹{order.totalAmount}</p>
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>{item.product.name} - Qty: {item.quantity}</li>
            ))}
          </ul>
        </div>
      )) : <p>No past orders yet.</p>}
    </div>
  );
}
