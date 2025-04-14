import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CartSidebar.css';

export default function CartSidebar({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (isOpen) fetchCartItems();
  }, [isOpen]);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  const getTotal = () =>
    cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/user/checkout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("🎉 Order placed!");
      onClose();
    } catch (err) {
      alert("Checkout failed");
    }
  };

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>✖</button>
      <h3>Your Cart</h3>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <img src={item.product.imageUrl} alt={item.product.name} />
            <div>
              <p>{item.product.name}</p>
              <p>₹{item.product.price} x {item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
      <p><strong>Total: ₹{getTotal()}</strong></p>
      <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
    </div>
  );
}
