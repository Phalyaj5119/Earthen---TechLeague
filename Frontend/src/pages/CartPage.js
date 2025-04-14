// src/pages/CartPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CartPage.css';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      alert("Please log in to view your cart.");
    }
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data);
    } catch (err) {
      alert("Failed to fetch cart items");
    }
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h2>Your Cart</h2>
        {cartItems.length > 0 ? cartItems.map(item => (
          <div className="cart-item" key={item.id}>
            <img src={item.product.imageUrl} alt={item.product.name} />
            <div>
              <h4>{item.product.name}</h4>
              <p>₹{item.product.price} × {item.quantity}</p>
            </div>
          </div>
        )) : <p>No items in cart</p>}
      </div>

      <div className="cart-summary">
        <h3>Order Summary</h3>
        <p>Total: ₹{getTotal()}</p>
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
}
