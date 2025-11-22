const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  requirements: {
    type: String,
    required: [true, 'Requirements are required'],
    trim: true
  },
  interest: {
    type: String,
    required: [true, 'Interest is required'],
    trim: true
  },
  source: {
    type: String,
    required: [true, 'Source is required'],
    trim: true
  },
  consent: {
    type: Boolean,
    required: [true, 'Consent is required'],
    validate: {
      validator: function(value) {
        return value === true;
      },
      message: 'Consent must be granted to submit the form'
    }
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending'
  },
  adminReply: {
    type: String,
    default: ''
  },
  repliedAt: {
    type: Date
  },
  repliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);
