import express from 'express';
import {
  createChallenge,
  getChallenges,
  getChallengeById,
  getUserChallenges,
  updateChallenge,
  deleteChallenge,
  joinChallenge,
  leaveChallenge,
  inviteToChallenge,
  updateProgress,
} from '../controllers/challenges.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/challenges
// @desc    Create a new challenge
// @access  Private
router.post('/', auth, createChallenge);

// @route   GET /api/challenges
// @desc    Get all challenges with filters
// @access  Private
router.get('/', auth, getChallenges);

// @route   GET /api/challenges/me
// @desc    Get current user's challenges (created + joined)
// @access  Private
router.get('/me', auth, getUserChallenges);

// @route   GET /api/challenges/:id
// @desc    Get challenge by ID
// @access  Private
router.get('/:id', auth, getChallengeById);

// @route   PUT /api/challenges/:id
// @desc    Update a challenge
// @access  Private
router.put('/:id', auth, updateChallenge);

// @route   DELETE /api/challenges/:id
// @desc    Delete a challenge
// @access  Private
router.delete('/:id', auth, deleteChallenge);

// @route   POST /api/challenges/join/:id
// @desc    Join a challenge
// @access  Private
router.post('/join/:id', auth, joinChallenge);

// @route   DELETE /api/challenges/leave/:id
// @desc    Leave a challenge
// @access  Private
router.delete('/leave/:id', auth, leaveChallenge);

// @route   POST /api/challenges/invite/:id
// @desc    Invite users to a challenge
// @access  Private
router.post('/invite/:id', auth, inviteToChallenge);

// @route   POST /api/challenges/progress/:id
// @desc    Update user progress in a challenge
// @access  Private
router.post('/progress/:id', auth, updateProgress);

export default router; 