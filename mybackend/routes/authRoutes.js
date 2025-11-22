const express = require('express');
const router = express.Router();
const { register , getAllUsers ,  deleteUser , blockUser, getProfile} = require('../controllers/authController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

router.post('/login', register);
router.get('/admin', getAllUsers);
// DELETE endpoint
router.delete('/admin/:id', deleteUser);
// put request for admin
router.put('/users/:id/block', blockUser);
// Get user profile (protected route)
router.get('/profile', authenticateToken, getProfile);

module.exports = router;
