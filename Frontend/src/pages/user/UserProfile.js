import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

export default function UserProfile() {
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    profilePicture: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await axios.get('http://localhost:5000/api/user/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setFormData(res.data);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put('http://localhost:5000/api/user/profile', formData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert("Profile updated!");
  };

  return (
    <div className="profile-container">
      <h2>👤 Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name="name" value={formData.name} onChange={handleChange} required />

        <label>Email</label>
        <input name="email" value={formData.email} disabled />

        <label>Contact</label>
        <input name="contact" value={formData.contact} onChange={handleChange} />

        <label>Address</label>
        <textarea name="address" value={formData.address} onChange={handleChange} />

        <label>Profile Picture URL</label>
        <input name="profilePicture" value={formData.profilePicture} onChange={handleChange} />

        {formData.profilePicture && (
          <img src={formData.profilePicture} alt="Preview" className="profile-preview" />
        )}

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
