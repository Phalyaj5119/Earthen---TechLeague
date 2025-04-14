// src/pages/admin/AdminSidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AdminSidebar.css';

export default function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h3>Admin Panel</h3>
      <ul>
      <NavLink to="/admin-dashboard/users">Manage Users</NavLink>
        <li><Link to="/admin/categories">Categories</Link></li>
        <NavLink to="/admin-dashboard/products-category">Category View</NavLink>
        <li><Link to="/admin/orders">Orders</Link></li>
        <li><Link to="/admin/payments">Payments</Link></li>
        <NavLink to="/admin-dashboard/payment-history">Payment History</NavLink>
        <li><button onClick={() => {
          localStorage.clear();
          window.location.href = '/';
        }}>Logout</button></li>
      </ul>
    </div>
  );
}
