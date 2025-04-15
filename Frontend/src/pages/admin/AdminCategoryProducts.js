import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './AdminCategoryProducts.css';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    categoryId: '',
    imageUrl: '',
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/products-by-category', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const allProducts = res.data.flatMap(cat => cat.Products);
    setProducts(allProducts);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    await axios.post('http://localhost:5000/api/admin/products', newProduct, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
    setNewProduct({ name: '', price: '', description: '', categoryId: '', imageUrl: '' });
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  return (
    <div className="admin-products">
      <h2>📦 Manage Products</h2>
      <div>
        <h3>Add Product</h3>
        <input name="name" placeholder="Name" value={newProduct.name} onChange={handleInputChange} />
        <input name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} />
        <input name="description" placeholder="Description" value={newProduct.description} onChange={handleInputChange} />
        <input name="categoryId" placeholder="Category ID" value={newProduct.categoryId} onChange={handleInputChange} />
        <input name="imageUrl" placeholder="Image URL" value={newProduct.imageUrl} onChange={handleInputChange} />
        <button onClick={addProduct}>Add</button>
      </div>
      <div>
        <h3>Product List</h3>
        {products.map(product => (
          <div key={product.id}>
            {product.name} - ₹{product.price} - <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}