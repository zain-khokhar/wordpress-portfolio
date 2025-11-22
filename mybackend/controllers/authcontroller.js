const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body

    // --- 1) Admin login ---
    if (email === process.env.ADMIN_MAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )
      return res
        .status(200)
        .json({ message: 'Admin access granted', token })
    }

    // --- 2) Normal user signup ---
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res
        .status(400)
        .json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      email,
      password: hashedPassword
    })

    return res
      .status(201)
      .json({ message: 'User registered successfully', userId: user._id })
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server error', error: err.message })
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// put /api/users/:id
exports.blockUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { isBlocked } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { isBlocked: isBlocked },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: `User has been ${isBlocked ? 'blocked' : 'unblocked'}`,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(userId)
      .select('-password')
      .populate('premiumAccess.repositoryId', 'title description githubLink');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};