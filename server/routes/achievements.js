import express from 'express';
import {
  getAchievements,
  getAchievementById,
  getUserAchievements,
  createAchievement,
  checkAchievements,
} from '../controllers/achievements.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/achievements
// @desc    Get all achievements with filters
// @access  Private
router.get('/', auth, getAchievements);

// @route   GET /api/achievements/me
// @desc    Get current user's achievements
// @access  Private
router.get('/me', auth, getUserAchievements);

// @route   GET /api/achievements/user/:userId
// @desc    Get user's achievements by user ID
// @access  Private
router.get('/user/:userId', auth, getUserAchievements);

// @route   GET /api/achievements/:id
// @desc    Get achievement by ID
// @access  Private
router.get('/:id', auth, getAchievementById);

// @route   POST /api/achievements
// @desc    Create a new achievement (admin only)
// @access  Private
router.post('/', auth, createAchievement);

// @route   POST /api/achievements/check
// @desc    Check and award achievements to the user
// @access  Private
router.post('/check', auth, checkAchievements);

export default router; 