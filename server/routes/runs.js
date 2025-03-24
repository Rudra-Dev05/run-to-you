import express from 'express';
import {
  createRun,
  getUserRuns,
  getRunById,
  updateRun,
  deleteRun,
  likeRun,
  commentOnRun,
  deleteComment,
  getRunsFeed,
} from '../controllers/runs.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/runs
// @desc    Create a new run
// @access  Private
router.post('/', auth, createRun);

// @route   GET /api/runs/user/:userId
// @desc    Get all runs for a user
// @access  Private
router.get('/user/:userId', auth, getUserRuns);

// @route   GET /api/runs/me
// @desc    Get current user's runs
// @access  Private
router.get('/me', auth, getUserRuns);

// @route   GET /api/runs/feed
// @desc    Get runs from followed users
// @access  Private
router.get('/feed', auth, getRunsFeed);

// @route   GET /api/runs/:id
// @desc    Get run by ID
// @access  Private
router.get('/:id', auth, getRunById);

// @route   PUT /api/runs/:id
// @desc    Update a run
// @access  Private
router.put('/:id', auth, updateRun);

// @route   DELETE /api/runs/:id
// @desc    Delete a run
// @access  Private
router.delete('/:id', auth, deleteRun);

// @route   PUT /api/runs/like/:id
// @desc    Like or unlike a run
// @access  Private
router.put('/like/:id', auth, likeRun);

// @route   POST /api/runs/comment/:id
// @desc    Comment on a run
// @access  Private
router.post('/comment/:id', auth, commentOnRun);

// @route   DELETE /api/runs/comment/:id/:commentId
// @desc    Delete a comment
// @access  Private
router.delete('/comment/:id/:commentId', auth, deleteComment);

export default router; 