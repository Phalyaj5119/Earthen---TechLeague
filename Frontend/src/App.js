import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import LandingPage from './pages/LandingPage';
import ProductDetailPage from './pages/ProductDetailPage';
import UserDashboard from './pages/UserDashboard/UserDashboard';

import UserOrderHistory from './pages/user/UserOrderHistory';
import UserTrackOrder from './pages/user/UserTrackOrder';
import ReturnPolicy from './pages/user/ReturnPolicy';
import UserWallet from './pages/user/UserWallet';
import UserProfile from './pages/user/UserProfile';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageCategories from './pages/admin/ManageCategories';
import ManageOrders from './pages/admin/ManageOrders';
import ManagePayments from './pages/admin/ManagePayments';
import ManageRoles from './pages/admin/ManageRoles';

import Shop from './pages/Shop';
import WishlistPage from './pages/WishlistPage';
import About from './pages/AboutUs';

import AdminRoute from './components/routes/AdminRoute'; // 👈 Make sure this exists
import './components/Navbar.css';
import './styles/landingPage.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/about" element={<About />} />

        {/* User Routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/dashboard/order-history" element={<UserOrderHistory />} />
        <Route path="/user/dashboard/track-order" element={<UserTrackOrder />} />
        <Route path="/user/dashboard/return-policy" element={<ReturnPolicy />} />
        <Route path="/user/dashboard/wallet" element={<UserWallet />} />
        <Route path="/user/dashboard/profile" element={<UserProfile />} />

        {/* Admin Routes with Protection */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
          <Route path="users" element={<ManageUsers />} />
          <Route path="roles" element={<ManageRoles />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="payments" element={<ManagePayments />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



