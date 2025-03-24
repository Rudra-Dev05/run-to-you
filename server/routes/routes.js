import express from 'express';
import {
  createRoute,
  getRoutes,
  getRouteById,
  getUserRoutes,
  updateRoute,
  deleteRoute,
  likeRoute,
  reviewRoute,
} from '../controllers/routes.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/routes
// @desc    Create a new route
// @access  Private
router.post('/', auth, createRoute);

// @route   GET /api/routes
// @desc    Get all routes with filters
// @access  Private
router.get('/', auth, getRoutes);

// @route   GET /api/routes/me
// @desc    Get current user's routes
// @access  Private
router.get('/me', auth, getUserRoutes);

// @route   GET /api/routes/:id
// @desc    Get route by ID
// @access  Private
router.get('/:id', auth, getRouteById);

// @route   PUT /api/routes/:id
// @desc    Update a route
// @access  Private
router.put('/:id', auth, updateRoute);

// @route   DELETE /api/routes/:id
// @desc    Delete a route
// @access  Private
router.delete('/:id', auth, deleteRoute);

// @route   PUT /api/routes/like/:id
// @desc    Like or unlike a route
// @access  Private
router.put('/like/:id', auth, likeRoute);

// @route   POST /api/routes/review/:id
// @desc    Review a route
// @access  Private
router.post('/review/:id', auth, reviewRoute);

export default router; 