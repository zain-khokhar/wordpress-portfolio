const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// POST /api/feedback - Submit contact sales/feedback form
router.post('/', feedbackController.submitFeedback);

// GET /api/feedback - Get all feedback entries (optional - for admin)
router.get('/', feedbackController.getAllFeedback);

// PUT /api/feedback/:id/reply - Reply to feedback (admin)
router.put('/:id/reply', feedbackController.replyToFeedback);

// PUT /api/feedback/:id/status - Update feedback status (admin)
router.put('/:id/status', feedbackController.updateFeedbackStatus);

// DELETE /api/feedback/:id - Delete a feedback entry (admin)
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
