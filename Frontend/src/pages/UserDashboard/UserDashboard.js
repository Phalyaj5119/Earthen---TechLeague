// src/pages/UserDashboard/UserDashboard.js
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Orders from './DashboardSections/Orders';
import History from './DashboardSections/History';
import Tracking from './DashboardSections/Tracking';
import ReturnPolicy from './DashboardSections/ReturnPolicy';
import Wallet from './DashboardSections/Wallet';
import Profile from './DashboardSections/Profile';
import './UserDashboard.css';

export default function UserDashboard() {
  const [activeSection, setActiveSection] = useState('orders');

  const renderSection = () => {
    switch (activeSection) {
      case 'orders': return <Orders />;
      case 'history': return <History />;
      case 'tracking': return <Tracking />;
      case 'return': return <ReturnPolicy />;
      case 'wallet': return <Wallet />;
      case 'profile': return <Profile />;
      default: return <Orders />;
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar onSelect={setActiveSection} />
      <div className="dashboard-content">
        {renderSection()}
      </div>
    </div>
  );
}
