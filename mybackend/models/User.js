const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' },
  isBlocked: { type: Boolean, default: false },
  premiumAccess: [{
    repositoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Repository'
    },
    grantedAt: {
      type: Date,
      default: Date.now
    }
  }],
  profile: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    company: { type: String, default: '' },
    phone: { type: String, default: '' }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
