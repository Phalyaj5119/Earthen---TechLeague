// src/pages/UserDashboard/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ onSelect }) {
  return (
    <div className="sidebar">
      <h3>User Dashboard</h3>
      <ul>
        <li onClick={() => onSelect('orders')}>📦 Orders</li>
        <NavLink to="/user-dashboard/order-history">🧾 Order History</NavLink>
        <NavLink to="/user-dashboard/track-order">🚚 Tracking</NavLink>
        <NavLink to="/user-dashboard/return-policy">Return Policy</NavLink>
        <NavLink to="/user-dashboard/wallet">💳 Wallet</NavLink>
        <NavLink to="/user-dashboard/profile">👤 Edit Profile</NavLink>
      </ul>
    </div>
  );
}
