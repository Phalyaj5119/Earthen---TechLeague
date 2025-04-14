// src/pages/ProductDetailPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${productId}`);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async () => {
    if (!token) return navigate('/login');
    await axios.post('http://localhost:5000/api/cart', { productId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Added to cart');
  };

  const handleAddToWishlist = async () => {
    if (!token) return navigate('/login');
    await axios.post('http://localhost:5000/api/wishlist', { productId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Added to wishlist');
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-detail">
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>₹{product.price}</p>
        <p>{product.description}</p>
        <p><strong>Color:</strong> {product.color}</p>
        <div className="product-actions">
          <button onClick={handleAddToCart}>🛒 Add to Cart</button>
          <button onClick={handleAddToWishlist}>❤️ Wishlist</button>
        </div>
      </div>
    </div>
  );
}
