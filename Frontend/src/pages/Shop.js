import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Shop.css';
import { addToCart } from '../services/cartService';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Assuming your navbar is in the components folder

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
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories', err);
    }
  };

  const fetchProducts = async () => {
    try {
      let url = 'http://localhost:5000/api/products?';
      if (selectedCat) url += `category=${selectedCat}&`;
      if (filterColor) url += `color=${filterColor}&`;
      if (filterPrice) url += `price=${filterPrice}`;
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products', err);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!token) return alert("Please log in to add to cart.");
    try {
      await addToCart(productId, 1);
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  const handleWishlist = (productId) => {
    if (!token) return alert("Please log in to add to wishlist.");
    // TODO: Wishlist logic here
  };

  return (
    <div className="shop-container">
      
      {/* Include your existing Navbar */}
      <Navbar />
      
      {/* Shop Heading */}
      <h1 className="shop-heading">Shop</h1>

      <div className="shop-content">
        <aside className="sidebar">
          <h3>Categories</h3>
          <ul>
            {categories.map(cat => (
              <li key={cat.id} onClick={() => setSelectedCat(cat.name)} style={{ cursor: 'pointer' }}>
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
          {products.length > 0 ? (
            products.map(prod => (
              <div className="product-card" key={prod.id}>
                <Link to={`/product/${prod.id}`}>
                  <img src={prod.imageUrl} alt={prod.name} />
                </Link>
                <Link to={`/product/${prod.id}`}>
                  <h4>{prod.name}</h4>
                </Link>
                <p>{prod.description}</p>
                <p>₹{prod.price}</p>
                <div className="product-actions">
                  <button onClick={() => handleWishlist(prod.id)}>❤️</button>
                  <button onClick={() => handleAddToCart(prod.id)}>🛒</button>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </main>
      </div>
    </div>
  );
}
