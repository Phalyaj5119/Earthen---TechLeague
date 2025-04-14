// src/pages/Shop.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Shop.css'; // Add styling here

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [filterColor, setFilterColor] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [selectedCat, filterColor, filterPrice]);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:5000/api/categories');
    setCategories(res.data);
  };

  const fetchProducts = async () => {
    let url = 'http://localhost:5000/api/products?';
    if (selectedCat) url += `category=${selectedCat}&`;
    if (filterColor) url += `color=${filterColor}&`;
    if (filterPrice) url += `price=${filterPrice}`;
    const res = await axios.get(url);
    setProducts(res.data);
  };

  const handleAddToCart = (productId) => {
    if (!token) return alert("Please log in to add to cart.");
    // TODO: Call backend to add to cart
  };

  const handleWishlist = (productId) => {
    if (!token) return alert("Please log in to add to wishlist.");
    // TODO: Call backend to add to wishlist
  };

  return (
    <div className="shop-container">
      <aside className="sidebar">
        <h3>Categories</h3>
        <ul>
          {categories.map(cat => (
            <li key={cat.id} onClick={() => setSelectedCat(cat.name)}>
              {cat.name}
            </li>
          ))}
        </ul>

        <h4>Color</h4>
        <select onChange={(e) => setFilterColor(e.target.value)}>
          <option value="">All</option>
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="White">White</option>
        </select>

        <h4>Price</h4>
        <select onChange={(e) => setFilterPrice(e.target.value)}>
          <option value="">All</option>
          <option value="0-500">Under ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="1000-9999">₹1000+</option>
        </select>
      </aside>

      <main className="products-grid">
        {products.length > 0 ? products.map(prod => (
          <div className="product-card" key={prod.id}>
            <img src={prod.imageUrl} alt={prod.name} />
            <h4>{prod.name}</h4>
            <p>{prod.description}</p>
            <p>₹{prod.price}</p>
            <div className="product-actions">
              <button onClick={() => handleWishlist(prod.id)}>❤️</button>
              <button onClick={() => handleAddToCart(prod.id)}>🛒</button>
            </div>
          </div>
        )) : <p>No products found</p>}
      </main>
    </div>
  );
}
