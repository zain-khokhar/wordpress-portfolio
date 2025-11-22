const mongoose = require('mongoose');

const premiumRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  repositoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Repository',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: false,
    default: 'User is requesting premium access to this repository'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adminResponse: {
    type: String,
    default: ''
  },
  respondedAt: {
    type: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('PremiumRequest', premiumRequestSchema);
