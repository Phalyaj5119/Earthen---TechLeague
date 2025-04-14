// src/pages/WishlistPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './WishlistPage.css';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      alert("Please log in to view your wishlist.");
      return;
    }
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlist(res.data);
    } catch (err) {
      alert("Failed to fetch wishlist items");
    }
  };

  const handleRemove = async (productId) => {
    await axios.delete(`http://localhost:5000/api/wishlist/${productId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchWishlist();
  };

  const handleAddToCart = async (productId) => {
    await axios.post('http://localhost:5000/api/cart', { productId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Added to cart!");
  };

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {wishlist.length > 0 ? (
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <div className="wishlist-card" key={item.id}>
              <Link to={`/product/${item.product.id}`}>
    <img src={item.product.imageUrl} alt={item.product.name} />
  </Link>
  <Link to={`/product/${item.product.id}`}>
    <h4>{item.product.name}</h4>
  </Link>
  <p>₹{item.product.price}</p>
              <p>₹{item.product.price}</p>
              <div className="wishlist-actions">
                <button onClick={() => handleAddToCart(item.product.id)}>🛒 Add to Cart</button>
                <button onClick={() => handleRemove(item.product.id)}>❌ Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : <p>No items in your wishlist.</p>}
    </div>
  );
}
