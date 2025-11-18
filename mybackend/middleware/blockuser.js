// checkBlocked.js
module.exports = function (req, res, next) {
  if (req.user && req.user.isBlocked) {
    return res.status(403).json({ message: 'Access denied, user is blocked' });
  }
  next(); // continue if not blocked
};
