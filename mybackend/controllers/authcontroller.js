const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password, role } = req.body

    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res
        .status(400)
        .json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      email,
      password: hashedPassword,
      role: role || 'user'
    })

    // Generate token for auto-login after signup
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    return res
      .status(201)
      .json({ message: 'User registered successfully', token, userId: user._id })
  } catch (err) {
    return res
      .status(500)
      .json({ message: 'Server error', error: err.message })
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // --- 1) Check for admin login FIRST (exact match required) ---
    if (email === process.env.ADMIN_MAIL) {
      // If admin email is used, ONLY accept admin password
      if (password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(
          { email, role: 'admin' },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        )
        console.log('✅ Admin login successful:', email);
        return res
          .status(200)
          .json({ message: 'Admin access granted', token, role: 'admin' })
      } else {
        // Admin email with wrong password - reject immediately
        console.log('❌ Admin login failed - wrong password for:', email);
        return res.status(401).json({ message: 'Invalid admin credentials. Use admin dashboard password.' })
      }
    }

    // --- 2) Normal user login (only if NOT admin email) ---
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Check if user is blocked
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Your account has been blocked. Please contact admin.' })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    console.log('✅ User login successful:', email, 'Role:', user.role);
    return res
      .status(200)
      .json({ 
        message: 'Login successful', 
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        }
      })
  } catch (err) {
    console.error('❌ Signin error:', err);
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