// src/pages/UserDashboard/Sidebar.js
import React from 'react';

export default function Sidebar({ onSelect }) {
  return (
    <div className="sidebar">
      <h3>User Dashboard</h3>
      <ul>
        <li onClick={() => onSelect('orders')}>📦 Orders</li>
        <li onClick={() => onSelect('history')}>🧾 Order History</li>
        <li onClick={() => onSelect('tracking')}>🚚 Tracking</li>
        <li onClick={() => onSelect('return')}>🔁 Return Policy</li>
        <li onClick={() => onSelect('wallet')}>💳 Wallet</li>
        <li onClick={() => onSelect('profile')}>👤 Profile Settings</li>
      </ul>
    </div>
  );
}
