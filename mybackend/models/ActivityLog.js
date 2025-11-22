const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  userEmail: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true,
    enum: [
      'login',
      'logout',
      'register',
      'download_repo',
      'download_publication',
      'comment_posted',
      'feedback_submitted',
      'premium_request_submitted',
      'premium_access_granted',
      'premium_access_rejected',
      'user_blocked',
      'user_unblocked',
      'repo_created',
      'repo_updated',
      'repo_deleted',
      'product_created',
      'product_updated',
      'product_deleted',
      'feedback_replied',
      'feedback_deleted'
    ]
  },
  targetType: {
    type: String,
    enum: ['user', 'repository', 'product', 'feedback', 'comment', 'premium_request', 'system'],
    required: false
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  details: {
    type: String,
    required: false
  },
  ipAddress: {
    type: String,
    required: false
  },
  userAgent: {
    type: String,
    required: false
  }
}, { timestamps: true });

// Index for better query performance
activityLogSchema.index({ userId: 1, createdAt: -1 });
activityLogSchema.index({ action: 1, createdAt: -1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
