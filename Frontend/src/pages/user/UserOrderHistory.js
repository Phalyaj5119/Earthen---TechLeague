import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserOrderHistory.css';

export default function UserOrderHistory() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:5000/api/user/order-history', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(res.data);
  };

  return (
    <div className="order-history-container">
      <h2>📜 Order History</h2>
      {orders.length ? (
        orders.map(order => (
          <div key={order.id} className="order-card">
            <h3>Order #{order.id} - {order.status}</h3>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <div className="items-list">
              {order.OrderItems.map(item => (
                <div key={item.id} className="item">
                  <img src={item.Product.imageUrl} alt={item.Product.name} />
                  <div>
                    <p><strong>{item.Product.name}</strong></p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : <p>No orders found.</p>}
    </div>
  );
}
