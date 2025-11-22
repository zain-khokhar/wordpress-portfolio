const Feedback = require('../models/Feedback');

// Submit feedback/contact sales form
exports.submitFeedback = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      company,
      country,
      requirements,
      interest,
      source,
      consent
    } = req.body;

    // Create new feedback entry
    const feedback = new Feedback({
      firstName,
      lastName,
      email,
      company,
      country,
      requirements,
      interest,
      source,
      consent
    });

    // Save to database
    await feedback.save();

    // Return success response
    res.status(201).json({
      message: 'Feedback received'
    });

  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors
      });
    }

    // Handle other errors
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      message: 'An error occurred while submitting feedback',
      error: error.message
    });
  }
};

// Get all feedback entries (optional - for admin use)
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({
      count: feedbacks.length,
      feedbacks
    });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      message: 'An error occurred while fetching feedback',
      error: error.message
    });
  }
};

// Reply to feedback (admin use)
exports.replyToFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminReply } = req.body;
    const adminId = req.user?.id;

    const feedback = await Feedback.findById(id);
    
    if (!feedback) {
      return res.status(404).json({
        message: 'Feedback not found'
      });
    }

    feedback.adminReply = adminReply;
    feedback.status = 'resolved';
    feedback.repliedAt = new Date();
    feedback.repliedBy = adminId;
    await feedback.save();

    // Send reply email
    const { sendFeedbackReply } = require('../config/emailService');
    const userName = `${feedback.firstName} ${feedback.lastName}`;
    await sendFeedbackReply(feedback.email, userName, adminReply);

    // Log activity
    const ActivityLog = require('../models/ActivityLog');
    await ActivityLog.create({
      userId: adminId,
      userEmail: req.user?.email || 'admin',
      action: 'feedback_replied',
      targetType: 'feedback',
      targetId: feedback._id,
      details: `Replied to feedback from ${feedback.email}`
    });

    res.status(200).json({
      message: 'Reply sent successfully',
      feedback
    });
  } catch (error) {
    console.error('Error replying to feedback:', error);
    res.status(500).json({
      message: 'An error occurred while replying to feedback',
      error: error.message
    });
  }
};

// Update feedback status
exports.updateFeedbackStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const feedback = await Feedback.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!feedback) {
      return res.status(404).json({
        message: 'Feedback not found'
      });
    }
    
    res.status(200).json({
      message: 'Feedback status updated',
      feedback
    });
  } catch (error) {
    console.error('Error updating feedback status:', error);
    res.status(500).json({
      message: 'An error occurred while updating feedback status',
      error: error.message
    });
  }
};

// Delete a feedback entry (admin use)
exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndDelete(id);
    
    if (!feedback) {
      return res.status(404).json({
        message: 'Feedback not found'
      });
    }

    // Log activity
    const ActivityLog = require('../models/ActivityLog');
    const adminId = req.user?.id;
    await ActivityLog.create({
      userId: adminId,
      userEmail: req.user?.email || 'admin',
      action: 'feedback_deleted',
      targetType: 'feedback',
      targetId: id,
      details: `Deleted feedback from ${feedback.email}`
    });
    
    res.status(200).json({
      message: 'Feedback deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({
      message: 'An error occurred while deleting feedback',
      error: error.message
    });
  }
};
