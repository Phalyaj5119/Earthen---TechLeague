// src/pages/admin/AdminDashboard.js
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>Admin</h2>
        <nav>
          <NavLink to="/admin/roles">Manage Roles</NavLink>
          <NavLink to="/admin/categories">Categories</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
          <NavLink to="/admin/payments">Payments</NavLink>
          <NavLink to="/admin/logout">Logout</NavLink>
        </nav>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
