import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Register a new user
export const register = async (req, res) => {
  try {
    console.log('Registration request body:', req.body);
    const { firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      console.log('Missing required fields:', { firstName, lastName, email, password: password ? '(provided)' : '(missing)' });
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    // Save user
    const savedUser = await newUser.save();
    console.log('User saved successfully:', savedUser._id);

    // Generate JWT token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        profilePicture: savedUser.profilePicture,
      },
    });
  } catch (error) {
    console.error('Registration error details:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('following', 'firstName lastName profilePicture')
      .populate('followers', 'firstName lastName profilePicture');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get current user error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      bio,
      location,
      fitnessGoals,
      profilePicture,
    } = req.body;

    // Build user object
    const userFields = {};
    if (firstName) userFields.firstName = firstName;
    if (lastName) userFields.lastName = lastName;
    if (bio) userFields.bio = bio;
    if (location) userFields.location = location;
    if (fitnessGoals) userFields.fitnessGoals = fitnessGoals;
    if (profilePicture) userFields.profilePicture = profilePicture;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: userFields },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user preferences
export const updatePreferences = async (req, res) => {
  try {
    const { distanceUnit, paceUnit, privacySettings, notifications } = req.body;

    // Build preferences object
    const preferencesFields = {};
    if (distanceUnit) preferencesFields['preferences.distanceUnit'] = distanceUnit;
    if (paceUnit) preferencesFields['preferences.paceUnit'] = paceUnit;
    if (privacySettings) preferencesFields['preferences.privacySettings'] = privacySettings;
    if (notifications !== undefined) preferencesFields['preferences.notifications'] = notifications;

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { $set: preferencesFields },
      { new: true }
    ).select('-password');

    res.json(updatedUser);
  } catch (error) {
    console.error('Update preferences error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('following', 'firstName lastName profilePicture')
      .populate('followers', 'firstName lastName profilePicture');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user by ID error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Follow / Unfollow user
export const followUser = async (req, res) => {
  try {
    // Make sure user is not following themselves
    if (req.userId === req.params.id) {
      return res.status(400).json({ message: 'You cannot follow yourself' });
    }

    const currentUser = await User.findById(req.userId);
    const userToFollow = await User.findById(req.params.id);

    if (!userToFollow) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if already following
    if (currentUser.following.includes(req.params.id)) {
      // Unfollow
      await User.findByIdAndUpdate(req.userId, {
        $pull: { following: req.params.id },
      });

      await User.findByIdAndUpdate(req.params.id, {
        $pull: { followers: req.userId },
      });

      res.json({ message: 'User unfollowed successfully' });
    } else {
      // Follow
      await User.findByIdAndUpdate(req.userId, {
        $push: { following: req.params.id },
      });

      await User.findByIdAndUpdate(req.params.id, {
        $push: { followers: req.userId },
      });

      res.json({ message: 'User followed successfully' });
    }
  } catch (error) {
    console.error('Follow/unfollow error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search users
export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const users = await User.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    }).select('firstName lastName email profilePicture');

    res.json(users);
  } catch (error) {
    console.error('Search users error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
}; 