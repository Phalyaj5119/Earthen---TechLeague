import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminCategoryProducts.css';

export default function AdminCategoryProducts() {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/products-by-category', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCategories(res.data);
  };

  return (
    <div className="admin-cat-products">
      <h2>📂 Products by Category</h2>
      {categories.map(cat => (
        <div key={cat.id} className="category-section">
          <h3>{cat.name}</h3>
          <div className="product-grid">
            {cat.Products.map(prod => (
              <div key={prod.id} className="product-card">
                <img src={prod.imageUrl} alt={prod.name} />
                <h4>{prod.name}</h4>
                <p>₹{prod.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
