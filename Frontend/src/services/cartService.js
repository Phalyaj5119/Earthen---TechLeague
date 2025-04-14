import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cart';
const token = localStorage.getItem('token');
const authHeader = { headers: { Authorization: `Bearer ${token}` } };

export const addToCart = async (productId, quantity = 1) =>
  await axios.post(API_URL, { productId, quantity }, authHeader);

export const getCartItems = async () =>
  await axios.get(API_URL, authHeader);

export const removeFromCart = async (productId) =>
  await axios.delete(`${API_URL}/${productId}`, authHeader);

export const updateQuantity = async (productId, quantity) =>
  await axios.put(`${API_URL}/${productId}`, { quantity }, authHeader);
