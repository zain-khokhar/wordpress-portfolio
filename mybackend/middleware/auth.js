const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT token and attach user to request
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // If admin login (has email and role only)
    if (decoded.role === 'admin') {
      req.user = {
        email: decoded.email,
        role: 'admin',
        id: null
      };
      return next();
    }

    // If regular user, fetch from database
    const user = await User.findById(decoded.userId || decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: 'User account is blocked' });
    }

    req.user = {
      id: user._id,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token expired' });
    }
    return res.status(500).json({ message: 'Authentication failed' });
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Admin access required' });
};

module.exports = { authenticateToken, isAdmin };
