// src/pages/admin/AdminPayments.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/payments', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(res.data);
    } catch (err) {
      alert('Failed to fetch payment data');
    }
  };

  return (
    <div>
      <h2>Payment History</h2>
      <table border="1" cellPadding="10" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? payments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.userId}</td>
              <td>{payment.orderId}</td>
              <td>₹{payment.amount}</td>
              <td>{payment.method}</td>
              <td>{payment.status}</td>
              <td>{new Date(payment.createdAt).toLocaleString()}</td>
            </tr>
          )) : <tr><td colSpan="7">No payment history</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
