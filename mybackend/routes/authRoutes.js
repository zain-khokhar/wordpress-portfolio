const express = require('express');
const router = express.Router();
const { register, signin, getAllUsers, deleteUser, blockUser, getProfile } = require('../controllers/authController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Authentication routes
router.post('/login', register);  // Signup/Register
router.post('/signin', signin);   // Sign In (separate endpoint)

// Admin routes
router.get('/admin', getAllUsers);
router.delete('/admin/:id', deleteUser);
router.put('/users/:id/block', blockUser);

// User profile route (protected)
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
