import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartSidebar from './CartSidebar'; // Fix path if needed
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa'; // Import the icons
import '../components/Navbar.css';

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [menuActive, setMenuActive] = useState(false); // State to toggle the menu

  {/*const toggleMenu = () => {
    setMenuActive(!menuActive); // Toggle menu visibility
  }; */}

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          {/* Add logo here if needed */}
        </div>

{/*
        {/* Hamburger Menu for Mobile */}
        {/* <div className="hamburger" onClick={toggleMenu}> */}
         {/* <div></div>
          <div></div>
          <div></div>
        </div> */}
        {/* Navigation Links */}
        <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        {/* Desktop Icons (Profile & Cart) */}
        <div className="nav-right">
          <button className="profile-btn">
            <FaUserCircle color="white" size={30} />
          </button>
          <button onClick={() => setShowCart(true)} className="cart-btn">
            <FaShoppingCart color="white" size={30} />
          </button>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={showCart} onClose={() => setShowCart(false)} />
    </>
  );
}
