const express = require('express');
const router = express.Router();
const {
  getAllLogs,
  getUserLogs,
  getActivityStats,
  clearOldLogs
} = require('../controllers/activityLogController');

// Admin routes (require authentication + admin role)
router.get('/all', getAllLogs);
router.get('/user/:userId', getUserLogs);
router.get('/stats', getActivityStats);
router.delete('/clear', clearOldLogs);

module.exports = router;
