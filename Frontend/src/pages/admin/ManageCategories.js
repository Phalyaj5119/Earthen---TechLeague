// src/pages/admin/ManageCategories.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editMode, setEditMode] = useState(null);
  const [editName, setEditName] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/categories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(res.data);
    } catch (err) {
      alert('Failed to fetch categories');
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/categories', { name: newCategory }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      alert('Failed to add category');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategories();
    } catch (err) {
      alert('Failed to delete category');
    }
  };

  const handleEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/categories/${id}`, { name: editName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditMode(null);
      setEditName('');
      fetchCategories();
    } catch (err) {
      alert('Failed to update category');
    }
  };

  return (
    <div>
      <h2>Manage Categories</h2>

      <form onSubmit={handleAddCategory} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          required
        />
        <button type="submit">Add Category</button>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>
                {editMode === cat.id ? (
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  cat.name
                )}
              </td>
              <td>
                {editMode === cat.id ? (
                  <button onClick={() => handleEdit(cat.id)}>Save</button>
                ) : (
                  <button onClick={() => {
                    setEditMode(cat.id);
                    setEditName(cat.name);
                  }}>Edit</button>
                )}
                <button onClick={() => handleDelete(cat.id)}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="3">No categories found</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
