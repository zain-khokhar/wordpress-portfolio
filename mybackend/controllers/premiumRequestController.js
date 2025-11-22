const PremiumRequest = require('../models/PremiumRequest');
const Repository = require('../models/Repository');
const User = require('../models/User');
const ActivityLog = require('../models/ActivityLog');
const { 
  sendPremiumRequestNotification, 
  sendPremiumRequestConfirmation,
  sendPremiumAccessApproved,
  sendPremiumAccessRejected 
} = require('../config/emailService');

// Submit premium access request
exports.submitPremiumRequest = async (req, res) => {
  try {
    const { repositoryId, message } = req.body;
    const userId = req.user?.id;
    const userEmail = req.user?.email;

    if (!userId || !userEmail) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Check if repository exists
    const repository = await Repository.findById(repositoryId);
    if (!repository) {
      return res.status(404).json({ message: 'Repository not found' });
    }

    // Check if user already has access
    const user = await User.findById(userId);
    const hasAccess = user.premiumAccess.some(
      access => access.repositoryId.toString() === repositoryId
    );

    if (hasAccess) {
      return res.status(400).json({ message: 'You already have access to this repository' });
    }

    // Check if request already exists
    const existingRequest = await PremiumRequest.findOne({
      userId,
      repositoryId,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'You already have a pending request for this repository' });
    }

    // Create new request
    const premiumRequest = new PremiumRequest({
      userId,
      repositoryId,
      userEmail,
      message: message || 'User is requesting premium access to this repository'
    });

    await premiumRequest.save();

    // Log activity
    await ActivityLog.create({
      userId,
      userEmail,
      action: 'premium_request_submitted',
      targetType: 'premium_request',
      targetId: premiumRequest._id,
      details: `Premium access requested for repository: ${repository.title}`
    });

    // Send email notifications
    await sendPremiumRequestNotification(userEmail, repository.title, premiumRequest._id);
    await sendPremiumRequestConfirmation(userEmail, repository.title);

    res.status(201).json({
      message: 'Premium access request submitted successfully',
      requestId: premiumRequest._id
    });

  } catch (error) {
    console.error('Error submitting premium request:', error);
    res.status(500).json({
      message: 'An error occurred while submitting premium request',
      error: error.message
    });
  }
};

// Get all premium requests (Admin only)
exports.getAllPremiumRequests = async (req, res) => {
  try {
    const requests = await PremiumRequest.find()
      .populate('userId', 'email')
      .populate('repositoryId', 'title description isPremium')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: requests.length,
      requests
    });
  } catch (error) {
    console.error('Error fetching premium requests:', error);
    res.status(500).json({
      message: 'An error occurred while fetching premium requests',
      error: error.message
    });
  }
};

// Approve premium request (Admin only)
exports.approvePremiumRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { adminResponse } = req.body;
    const adminId = req.user?.id;

    const premiumRequest = await PremiumRequest.findById(requestId)
      .populate('userId')
      .populate('repositoryId');

    if (!premiumRequest) {
      return res.status(404).json({ message: 'Premium request not found' });
    }

    if (premiumRequest.status !== 'pending') {
      return res.status(400).json({ message: 'This request has already been processed' });
    }

    // Update request status
    premiumRequest.status = 'approved';
    premiumRequest.adminResponse = adminResponse || 'Your premium access request has been approved.';
    premiumRequest.respondedAt = new Date();
    await premiumRequest.save();

    // Grant access to user
    const user = await User.findById(premiumRequest.userId._id);
    user.premiumAccess.push({
      repositoryId: premiumRequest.repositoryId._id,
      grantedAt: new Date()
    });
    await user.save();

    // Log activity
    await ActivityLog.create({
      userId: adminId,
      userEmail: req.user?.email || 'admin',
      action: 'premium_access_granted',
      targetType: 'premium_request',
      targetId: premiumRequest._id,
      details: `Premium access granted to ${premiumRequest.userEmail} for ${premiumRequest.repositoryId.title}`
    });

    // Send approval email
    await sendPremiumAccessApproved(
      premiumRequest.userEmail,
      premiumRequest.repositoryId.title,
      premiumRequest.repositoryId.githubLink
    );

    res.status(200).json({
      message: 'Premium access granted successfully',
      request: premiumRequest
    });

  } catch (error) {
    console.error('Error approving premium request:', error);
    res.status(500).json({
      message: 'An error occurred while approving premium request',
      error: error.message
    });
  }
};

// Reject premium request (Admin only)
exports.rejectPremiumRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { adminResponse } = req.body;
    const adminId = req.user?.id;

    const premiumRequest = await PremiumRequest.findById(requestId)
      .populate('repositoryId');

    if (!premiumRequest) {
      return res.status(404).json({ message: 'Premium request not found' });
    }

    if (premiumRequest.status !== 'pending') {
      return res.status(400).json({ message: 'This request has already been processed' });
    }

    // Update request status
    premiumRequest.status = 'rejected';
    premiumRequest.adminResponse = adminResponse || 'Unfortunately, we are unable to grant premium access at this time.';
    premiumRequest.respondedAt = new Date();
    await premiumRequest.save();

    // Log activity
    await ActivityLog.create({
      userId: adminId,
      userEmail: req.user?.email || 'admin',
      action: 'premium_access_rejected',
      targetType: 'premium_request',
      targetId: premiumRequest._id,
      details: `Premium access rejected for ${premiumRequest.userEmail} for ${premiumRequest.repositoryId.title}`
    });

    // Send rejection email
    await sendPremiumAccessRejected(
      premiumRequest.userEmail,
      premiumRequest.repositoryId.title,
      premiumRequest.adminResponse
    );

    res.status(200).json({
      message: 'Premium request rejected',
      request: premiumRequest
    });

  } catch (error) {
    console.error('Error rejecting premium request:', error);
    res.status(500).json({
      message: 'An error occurred while rejecting premium request',
      error: error.message
    });
  }
};

// Get user's premium requests
exports.getUserPremiumRequests = async (req, res) => {
  try {
    const userId = req.user?.id;

    const requests = await PremiumRequest.find({ userId })
      .populate('repositoryId', 'title description isPremium')
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: requests.length,
      requests
    });
  } catch (error) {
    console.error('Error fetching user premium requests:', error);
    res.status(500).json({
      message: 'An error occurred while fetching premium requests',
      error: error.message
    });
  }
};
