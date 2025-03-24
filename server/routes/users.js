import express from 'express';
import {
  register,
  login,
  getCurrentUser,
  updateProfile,
  updatePreferences,
  getUserById,
  followUser,
  searchUsers,
} from '../controllers/users.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/users/test
// @desc    Test the registration endpoint
// @access  Public
router.get('/test', (req, res) => {
  res.json({ message: 'Registration endpoint is working' });
});

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

// @route   GET /api/users/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, getCurrentUser);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, updateProfile);

// @route   PUT /api/users/preferences
// @desc    Update user preferences
// @access  Private
router.put('/preferences', auth, updatePreferences);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, getUserById);

// @route   PUT /api/users/follow/:id
// @desc    Follow or unfollow a user
// @access  Private
router.put('/follow/:id', auth, followUser);

// @route   GET /api/users/search
// @desc    Search for users
// @access  Private
router.get('/search', auth, searchUsers);

export default router; 