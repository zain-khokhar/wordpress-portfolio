const express = require('express');
const router = express.Router();
const {
  submitPremiumRequest,
  getAllPremiumRequests,
  approvePremiumRequest,
  rejectPremiumRequest,
  getUserPremiumRequests
} = require('../controllers/premiumRequestController');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// User routes (require authentication)
router.post('/submit', authenticateToken, submitPremiumRequest);
router.get('/user', authenticateToken, getUserPremiumRequests);

// Admin routes (require authentication + admin role)
router.get('/admin/all', authenticateToken, isAdmin, getAllPremiumRequests);
router.put('/admin/approve/:requestId', authenticateToken, isAdmin, approvePremiumRequest);
router.put('/admin/reject/:requestId', authenticateToken, isAdmin, rejectPremiumRequest);

module.exports = router;
