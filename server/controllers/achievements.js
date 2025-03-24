import Achievement from '../models/achievement.js';
import User from '../models/user.js';
import Run from '../models/run.js';

// Get all achievements
export const getAchievements = async (req, res) => {
  try {
    const { category, level, isHidden, rarity, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const query = {};

    if (category) {
      query.category = { $in: category.split(',') };
    }

    if (level) {
      query.level = { $in: level.split(',').map(Number) };
    }

    if (isHidden === 'true') {
      query.isHidden = true;
    } else if (isHidden === 'false') {
      query.isHidden = false;
    }

    if (rarity) {
      query.rarity = { $in: rarity.split(',') };
    }

    const achievements = await Achievement.find(query)
      .sort({ category: 1, level: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Achievement.countDocuments(query);

    res.json({
      achievements,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    console.error('Get achievements error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get achievement by ID
export const getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id)
      .populate('earnedBy.user', 'firstName lastName profilePicture')
      .populate('challenge', 'name description');

    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    // Check if achievement is hidden and user hasn't earned it
    const userEarned = achievement.earnedBy.some(
      (e) => e.user._id.toString() === req.userId
    );

    if (achievement.isHidden && !userEarned) {
      // Return limited info for hidden achievements
      return res.json({
        _id: achievement._id,
        name: '???',
        description: 'This achievement is hidden. Complete the required tasks to unlock it.',
        category: achievement.category,
        level: achievement.level,
        isHidden: true,
        rarity: achievement.rarity,
      });
    }

    res.json(achievement);
  } catch (error) {
    console.error('Get achievement by ID error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's achievements
export const getUserAchievements = async (req, res) => {
  try {
    const userId = req.params.userId || req.userId;
    const { category, level, rarity, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get user with populated achievements
    const user = await User.findById(userId).populate({
      path: 'achievements',
      match: {
        ...(category && { category: { $in: category.split(',') } }),
        ...(level && { level: { $in: level.split(',').map(Number) } }),
        ...(rarity && { rarity: { $in: rarity.split(',') } }),
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle pagination manually since populate doesn't support it directly
    const achievementIds = user.achievements.map((a) => a._id);
    const totalAchievements = achievementIds.length;
    const paginatedIds = achievementIds.slice(skip, skip + parseInt(limit));

    const achievements = await Achievement.find({
      _id: { $in: paginatedIds },
    });

    res.json({
      achievements,
      totalPages: Math.ceil(totalAchievements / parseInt(limit)),
      currentPage: parseInt(page),
      total: totalAchievements,
    });
  } catch (error) {
    console.error('Get user achievements error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new achievement (admin only for system-wide achievements)
export const createAchievement = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      level,
      criteria,
      icon,
      badgeUrl,
      unlockMessage,
      points,
      isHidden,
      rarity,
    } = req.body;

    // Create new achievement
    const newAchievement = new Achievement({
      name,
      description,
      category,
      level,
      criteria,
      icon,
      badgeUrl,
      unlockMessage,
      points,
      isHidden: isHidden !== undefined ? isHidden : false,
      isSystem: true, // System achievement
      rarity: rarity || 'common',
    });

    const savedAchievement = await newAchievement.save();
    res.status(201).json(savedAchievement);
  } catch (error) {
    console.error('Create achievement error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Check and award achievements to the user
export const checkAchievements = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all system achievements that the user hasn't earned yet
    const userAchievementIds = user.achievements.map((a) => a.toString());
    const potentialAchievements = await Achievement.find({
      isSystem: true,
      _id: { $nin: userAchievementIds },
    });

    const earnedAchievements = [];

    // Check each achievement against user stats
    for (const achievement of potentialAchievements) {
      let achieved = false;

      switch (achievement.category) {
        case 'distance':
          // Check total distance
          if (achievement.criteria.type === 'cumulative') {
            achieved = user.stats.totalDistance >= achievement.criteria.value;
          } else if (achievement.criteria.type === 'single') {
            // Check for a single run with the required distance
            const longestRun = await Run.findOne({ user: req.userId })
              .sort({ distance: -1 })
              .limit(1);
            achieved = longestRun && longestRun.distance >= achievement.criteria.value;
          }
          break;

        case 'duration':
          // Check total duration
          if (achievement.criteria.type === 'cumulative') {
            achieved = user.stats.totalTime >= achievement.criteria.value;
          } else if (achievement.criteria.type === 'single') {
            // Check for a single run with the required duration
            const longestDurationRun = await Run.findOne({ user: req.userId })
              .sort({ duration: -1 })
              .limit(1);
            achieved = longestDurationRun && longestDurationRun.duration >= achievement.criteria.value;
          }
          break;

        case 'streak':
          // Streak achievements require custom streak calculation
          if (achievement.criteria.type === 'streak') {
            // Calculate longest streak logic
            // This would require a more complex query to find consecutive dates
            // Simplified example: count total runs
            const runCount = user.stats.totalRuns;
            achieved = runCount >= achievement.criteria.value;
          }
          break;

        case 'social':
          // Social achievements based on followers/following
          if (achievement.criteria.unit === 'followers') {
            achieved = user.followers.length >= achievement.criteria.value;
          } else if (achievement.criteria.unit === 'following') {
            achieved = user.following.length >= achievement.criteria.value;
          }
          break;

        case 'milestone':
          // Milestone achievements
          if (achievement.criteria.unit === 'runs') {
            achieved = user.stats.totalRuns >= achievement.criteria.value;
          }
          break;

        // Add more categories as needed
      }

      if (achieved) {
        // Add to user's achievements
        await User.findByIdAndUpdate(req.userId, {
          $push: { achievements: achievement._id },
        });

        // Add user to achievement's earnedBy
        achievement.earnedBy.push({
          user: req.userId,
          earnedAt: Date.now(),
        });
        await achievement.save();

        earnedAchievements.push(achievement);
      }
    }

    res.json({
      message: earnedAchievements.length > 0 ? 'New achievements earned!' : 'No new achievements',
      earnedAchievements,
    });
  } catch (error) {
    console.error('Check achievements error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
}; 