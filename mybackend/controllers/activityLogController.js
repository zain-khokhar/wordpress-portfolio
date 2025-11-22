const ActivityLog = require('../models/ActivityLog');

// Get all activity logs (Admin only)
exports.getAllLogs = async (req, res) => {
  try {
    const { limit = 100, action, userId, startDate, endDate } = req.query;

    let query = {};

    if (action) {
      query.action = action;
    }

    if (userId) {
      query.userId = userId;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    const logs = await ActivityLog.find(query)
      .populate('userId', 'email role')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    const totalCount = await ActivityLog.countDocuments(query);

    res.status(200).json({
      count: logs.length,
      total: totalCount,
      logs
    });
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    res.status(500).json({
      message: 'An error occurred while fetching activity logs',
      error: error.message
    });
  }
};

// Get logs for specific user
exports.getUserLogs = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50 } = req.query;

    const logs = await ActivityLog.find({ userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.status(200).json({
      count: logs.length,
      logs
    });
  } catch (error) {
    console.error('Error fetching user logs:', error);
    res.status(500).json({
      message: 'An error occurred while fetching user logs',
      error: error.message
    });
  }
};

// Get activity statistics
exports.getActivityStats = async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    const stats = await ActivityLog.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$action',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const totalActivities = await ActivityLog.countDocuments({
      createdAt: { $gte: startDate }
    });

    res.status(200).json({
      period: `Last ${days} days`,
      totalActivities,
      breakdown: stats
    });
  } catch (error) {
    console.error('Error fetching activity stats:', error);
    res.status(500).json({
      message: 'An error occurred while fetching activity stats',
      error: error.message
    });
  }
};

// Clear old logs (Admin only - optional)
exports.clearOldLogs = async (req, res) => {
  try {
    const { daysOld = 90 } = req.body;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - parseInt(daysOld));

    const result = await ActivityLog.deleteMany({
      createdAt: { $lt: cutoffDate }
    });

    res.status(200).json({
      message: `Deleted logs older than ${daysOld} days`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error clearing old logs:', error);
    res.status(500).json({
      message: 'An error occurred while clearing old logs',
      error: error.message
    });
  }
};

// Helper function to create log entry (can be used by other controllers)
exports.createLog = async (logData) => {
  try {
    const log = new ActivityLog(logData);
    await log.save();
    return log;
  } catch (error) {
    console.error('Error creating activity log:', error);
    return null;
  }
};

module.exports = exports;
