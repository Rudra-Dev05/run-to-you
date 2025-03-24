import Run from '../models/run.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

// Create a new run
export const createRun = async (req, res) => {
  try {
    const {
      title,
      description,
      distance,
      duration,
      pace,
      startTime,
      endTime,
      routeData,
      weatherConditions,
      elevationGain,
      caloriesBurned,
      images,
      isPrivate,
      tags,
      route,
      challenge,
    } = req.body;

    // Create new run
    const newRun = new Run({
      user: req.userId,
      title,
      description,
      distance,
      duration,
      pace,
      startTime,
      endTime,
      routeData,
      weatherConditions,
      elevationGain,
      caloriesBurned,
      images,
      isPrivate,
      tags,
      route,
      challenge,
    });

    // Save run
    const savedRun = await newRun.save();

    // Update user stats
    await User.findByIdAndUpdate(req.userId, {
      $push: { runs: savedRun._id },
      $inc: {
        'stats.totalDistance': distance,
        'stats.totalRuns': 1,
        'stats.totalTime': duration,
        'stats.totalElevationGain': elevationGain || 0,
        'stats.totalCaloriesBurned': caloriesBurned || 0,
      },
    });

    // Recalculate average pace
    const user = await User.findById(req.userId);
    if (user.stats.totalRuns > 0) {
      const averagePace = user.stats.totalTime / user.stats.totalDistance;
      await User.findByIdAndUpdate(req.userId, {
        'stats.averagePace': averagePace,
      });
    }

    res.status(201).json(savedRun);
  } catch (error) {
    console.error('Create run error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all runs for a user
export const getUserRuns = async (req, res) => {
  try {
    const userId = req.params.userId || req.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Check if requesting other user's private runs
    let query = { user: userId };
    if (userId !== req.userId) {
      query.isPrivate = false;
    }

    const runs = await Run.find(query)
      .sort({ startTime: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'firstName lastName profilePicture')
      .populate('route', 'name distance');

    const total = await Run.countDocuments(query);

    res.json({
      runs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error('Get user runs error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get run by ID
export const getRunById = async (req, res) => {
  try {
    const run = await Run.findById(req.params.id)
      .populate('user', 'firstName lastName profilePicture')
      .populate('route', 'name distance path difficulty')
      .populate('challenge', 'name description')
      .populate('comments.user', 'firstName lastName profilePicture');

    if (!run) {
      return res.status(404).json({ message: 'Run not found' });
    }

    // Check if run is private and not owned by requester
    if (run.isPrivate && run.user._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(run);
  } catch (error) {
    console.error('Get run by ID error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update run
export const updateRun = async (req, res) => {
  try {
    const {
      title,
      description,
      isPrivate,
      tags,
    } = req.body;

    const run = await Run.findById(req.params.id);

    if (!run) {
      return res.status(404).json({ message: 'Run not found' });
    }

    // Check if user owns the run
    if (run.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update fields
    if (title) run.title = title;
    if (description !== undefined) run.description = description;
    if (isPrivate !== undefined) run.isPrivate = isPrivate;
    if (tags) run.tags = tags;

    const updatedRun = await run.save();
    res.json(updatedRun);
  } catch (error) {
    console.error('Update run error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete run
export const deleteRun = async (req, res) => {
  try {
    const run = await Run.findById(req.params.id);

    if (!run) {
      return res.status(404).json({ message: 'Run not found' });
    }

    // Check if user owns the run
    if (run.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update user stats
    await User.findByIdAndUpdate(req.userId, {
      $pull: { runs: run._id },
      $inc: {
        'stats.totalDistance': -run.distance,
        'stats.totalRuns': -1,
        'stats.totalTime': -run.duration,
        'stats.totalElevationGain': -(run.elevationGain || 0),
        'stats.totalCaloriesBurned': -(run.caloriesBurned || 0),
      },
    });

    // Recalculate average pace
    const user = await User.findById(req.userId);
    if (user.stats.totalRuns > 0) {
      const averagePace = user.stats.totalTime / user.stats.totalDistance;
      await User.findByIdAndUpdate(req.userId, {
        'stats.averagePace': averagePace,
      });
    } else {
      await User.findByIdAndUpdate(req.userId, {
        'stats.averagePace': 0,
      });
    }

    await Run.findByIdAndDelete(req.params.id);
    res.json({ message: 'Run deleted successfully' });
  } catch (error) {
    console.error('Delete run error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Like or unlike a run
export const likeRun = async (req, res) => {
  try {
    const run = await Run.findById(req.params.id);

    if (!run) {
      return res.status(404).json({ message: 'Run not found' });
    }

    // Check if run is private and not owned by requester
    if (run.isPrivate && run.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if already liked
    const likeIndex = run.likes.findIndex(
      (id) => id.toString() === req.userId
    );

    if (likeIndex === -1) {
      // Not liked, add like
      run.likes.push(req.userId);
    } else {
      // Already liked, remove like
      run.likes = run.likes.filter(
        (id) => id.toString() !== req.userId
      );
    }

    await run.save();
    res.json(run.likes);
  } catch (error) {
    console.error('Like run error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add comment to run
export const commentOnRun = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const run = await Run.findById(req.params.id);

    if (!run) {
      return res.status(404).json({ message: 'Run not found' });
    }

    // Check if run is private and not owned by requester
    if (run.isPrivate && run.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const newComment = {
      user: req.userId,
      text,
      createdAt: Date.now(),
    };

    run.comments.unshift(newComment);
    await run.save();

    // Populate the new comment with user info before returning
    const populatedRun = await Run.findById(req.params.id).populate('comments.user', 'firstName lastName profilePicture');
    res.json(populatedRun.comments);
  } catch (error) {
    console.error('Comment on run error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete comment from run
export const deleteComment = async (req, res) => {
  try {
    const run = await Run.findById(req.params.id);

    if (!run) {
      return res.status(404).json({ message: 'Run not found' });
    }

    // Find the comment
    const comment = run.comments.find(
      (comment) => comment._id.toString() === req.params.commentId
    );

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if user owns the comment or the run
    if (
      comment.user.toString() !== req.userId &&
      run.user.toString() !== req.userId
    ) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Filter out the comment
    run.comments = run.comments.filter(
      (comment) => comment._id.toString() !== req.params.commentId
    );

    await run.save();
    res.json(run.comments);
  } catch (error) {
    console.error('Delete comment error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get runs feed (from followed users)
export const getRunsFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get current user to find followed users
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get runs from followed users and own runs
    const runs = await Run.find({
      $and: [
        { 
          $or: [
            { user: { $in: user.following } },
            { user: req.userId }
          ] 
        },
        { isPrivate: false }
      ]
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'firstName lastName profilePicture')
      .populate('route', 'name distance');

    const total = await Run.countDocuments({
      $and: [
        { 
          $or: [
            { user: { $in: user.following } },
            { user: req.userId }
          ] 
        },
        { isPrivate: false }
      ]
    });

    res.json({
      runs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error('Get runs feed error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
}; 