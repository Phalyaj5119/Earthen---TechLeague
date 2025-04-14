// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login, signup } = require('../middlewares/authMiddleware');

// POST /api/auth/login
router.post('/login', login);

// Signup route
router.post('/signup', signup);

module.exports = router;
