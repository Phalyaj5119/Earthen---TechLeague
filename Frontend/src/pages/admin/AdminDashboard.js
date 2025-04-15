import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './AdminDashboard.css';
import { FaUserShield, FaListAlt, FaBoxes, FaShoppingCart, FaCreditCard, FaSignOutAlt } from 'react-icons/fa'; // Import icons

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-title-container">
          <h1>Admin Panel</h1>
        </div>
        <nav>
          <NavLink to="/admin/roles" className="nav-link">
            <FaUserShield className="nav-icon" /> Manage Roles
          </NavLink>
          <NavLink to="/admin/categories" className="nav-link">
            <FaListAlt className="nav-icon" /> Categories
          </NavLink>
          <NavLink to="/admin/products" className="nav-link">
            <FaBoxes className="nav-icon" /> Products
          </NavLink>
          <NavLink to="/admin/orders" className="nav-link">
            <FaShoppingCart className="nav-icon" /> Orders
          </NavLink>
          <NavLink to="/admin/payments" className="nav-link">
            <FaCreditCard className="nav-icon" /> Payments
          </NavLink>
          <NavLink to="/admin/logout" className="nav-link">
            <FaSignOutAlt className="nav-icon" /> Logout
          </NavLink>
        </nav>
      </aside>
      <main className="admin-main">
        <Outlet /> {/* This will render the content for each child route */}
      </main>
    </div>
  );
}
