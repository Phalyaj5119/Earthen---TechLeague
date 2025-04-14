import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPaymentHistory.css';

export default function AdminPaymentHistory() {
  const [payments, setPayments] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/payment-history', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPayments(res.data);
  };

  return (
    <div className="admin-payment-history">
      <h2>💳 Payment History</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Order ID</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(pay => (
            <tr key={pay.id}>
              <td>{pay.User?.name}</td>
              <td>{pay.User?.email}</td>
              <td>{pay.Order?.id}</td>
              <td>{pay.Order?.status}</td>
              <td>₹{pay.amount}</td>
              <td>{new Date(pay.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
