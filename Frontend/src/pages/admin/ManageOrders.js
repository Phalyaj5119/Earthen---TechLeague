// src/pages/admin/ManageOrders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [statuses] = useState(['Packed', 'In Transit', 'Delivered', 'Received', 'Returned']);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      alert('Error fetching orders');
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/orders/${orderId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders(); // Refresh orders after update
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div>
      <h2>Manage Orders</h2>
      <table border="1" cellPadding="10" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Product ID</th>
            <th>Status</th>
            <th>Change Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userId}</td>
              <td>{order.productId}</td>
              <td>{order.status}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="5">No orders found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
