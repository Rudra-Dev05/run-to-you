import Challenge from '../models/challenge.js';
import User from '../models/user.js';
import Run from '../models/run.js';
import Achievement from '../models/achievement.js';
import mongoose from 'mongoose';

// Create a new challenge
export const createChallenge = async (req, res) => {
  try {
    const {
      name,
      description,
      type,
      goal,
      startDate,
      endDate,
      visibility,
      invitedUsers,
      route,
      rules,
      rewards,
      category,
      tags,
      badge,
    } = req.body;

    // Create new challenge
    const newChallenge = new Challenge({
      name,
      description,
      creator: req.userId,
      type,
      goal,
      startDate,
      endDate,
      visibility,
      invitedUsers,
      route,
      rules,
      rewards,
      category,
      tags,
      badge,
    });

    // Add creator as first participant
    newChallenge.participants.push({
      user: req.userId,
      joinedAt: Date.now(),
      progress: 0,
      completed: false,
    });

    // Save challenge
    const savedChallenge = await newChallenge.save();

    // Add challenge to user's challenges
    await User.findByIdAndUpdate(req.userId, {
      $push: { challenges: savedChallenge._id },
    });

    // Create achievement for completing this challenge if it has a badge
    if (badge && badge.name && badge.imageUrl) {
      const achievement = new Achievement({
        name: `Complete ${name}`,
        description: `Successfully complete the "${name}" challenge`,
        category: 'challenge',
        level: 1,
        criteria: {
          type: 'custom',
          value: 1,
          unit: 'completion',
          timeFrame: 'custom',
        },
        icon: badge.imageUrl,
        badgeUrl: badge.imageUrl,
        unlockMessage: `Congratulations! You've completed the "${name}" challenge!`,
        points: 100,
        isHidden: false,
        isSystem: false,
        challenge: savedChallenge._id,
        rarity: 'uncommon',
      });

      await achievement.save();
    }

    res.status(201).json(savedChallenge);
  } catch (error) {
    console.error('Create challenge error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all challenges with filtering
export const getChallenges = async (req, res) => {
  try {
    const {
      type,
      category,
      active,
      visibility,
      search,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const query = {};

    // Basic filters
    if (type) {
      query.type = { $in: type.split(',') };
    }

    if (category) {
      query.category = { $in: category.split(',') };
    }

    if (active === 'true') {
      query.isActive = true;
      query.endDate = { $gte: new Date() };
    } else if (active === 'false') {
      query.$or = [
        { isActive: false },
        { endDate: { $lt: new Date() } },
      ];
    }

    // Visibility filters (public or invited)
    query.$or = [
      { visibility: 'public' },
      { 
        $and: [
          { visibility: 'inviteOnly' },
          { invitedUsers: req.userId },
        ]
      },
      { creator: req.userId }, // User can see their own challenges
    ];

    if (search) {
      const searchQuery = { $regex: search, $options: 'i' };
      query.$and = [
        query.$or, // Keep existing $or conditions
        {
          $or: [
            { name: searchQuery },
            { description: searchQuery },
            { tags: searchQuery },
          ],
        },
      ];
      delete query.$or; // Remove to avoid conflicting $or operators
    }

    // Set sort criteria
    let sortCriteria = { createdAt: -1 }; // default sort by newest
    if (sortBy === 'startDate') sortCriteria = { startDate: 1 };
    if (sortBy === 'endDate') sortCriteria = { endDate: 1 };
    if (sortBy === 'participants') sortCriteria = { 'participants.length': -1 };

    const challenges = await Challenge.find(query)
      .populate('creator', 'firstName lastName profilePicture')
      .populate('route', 'name distance')
      .sort(sortCriteria)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Challenge.countDocuments(query);

    res.json({
      challenges,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    console.error('Get challenges error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get challenge by ID
export const getChallengeById = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('creator', 'firstName lastName profilePicture')
      .populate('participants.user', 'firstName lastName profilePicture stats')
      .populate('invitedUsers', 'firstName lastName profilePicture')
      .populate('route', 'name distance path difficulty');

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if private and user is not creator or participant
    if (
      challenge.visibility === 'private' &&
      challenge.creator._id.toString() !== req.userId &&
      !challenge.participants.some((p) => p.user._id.toString() === req.userId) &&
      !challenge.invitedUsers.some((u) => u._id.toString() === req.userId)
    ) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(challenge);
  } catch (error) {
    console.error('Get challenge by ID error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's challenges (created + joined)
export const getUserChallenges = async (req, res) => {
  try {
    const { active, page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    let query = {
      $or: [
        { creator: req.userId },
        { 'participants.user': req.userId },
      ],
    };

    if (active === 'true') {
      query.isActive = true;
      query.endDate = { $gte: new Date() };
    } else if (active === 'false') {
      query.$and = [
        { $or: [{ isActive: false }, { endDate: { $lt: new Date() } }] },
        { $or: query.$or }, // Keep the original $or
      ];
      delete query.$or; // Remove to avoid conflicting $or operators
    }

    const challenges = await Challenge.find(query)
      .populate('creator', 'firstName lastName profilePicture')
      .populate('route', 'name distance')
      .sort({ startDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Challenge.countDocuments(query);

    res.json({
      challenges,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    console.error('Get user challenges error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update challenge
export const updateChallenge = async (req, res) => {
  try {
    const {
      name,
      description,
      isActive,
      visibility,
      rules,
      rewards,
      tags,
      badge,
      updates,
    } = req.body;

    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if user is the creator
    if (challenge.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update fields
    if (name) challenge.name = name;
    if (description !== undefined) challenge.description = description;
    if (isActive !== undefined) challenge.isActive = isActive;
    if (visibility) challenge.visibility = visibility;
    if (rules) challenge.rules = rules;
    if (rewards) challenge.rewards = rewards;
    if (tags) challenge.tags = tags;
    if (badge) challenge.badge = badge;

    // Add update if provided
    if (updates && updates.message) {
      challenge.updates.unshift({
        message: updates.message,
        date: Date.now(),
      });
    }

    const updatedChallenge = await challenge.save();
    res.json(updatedChallenge);
  } catch (error) {
    console.error('Update challenge error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete challenge
export const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if user is the creator
    if (challenge.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Remove challenge from all participants' lists
    for (const participant of challenge.participants) {
      await User.findByIdAndUpdate(participant.user, {
        $pull: { challenges: challenge._id },
      });
    }

    // Delete any associated achievements
    await Achievement.deleteMany({ challenge: challenge._id });

    await Challenge.findByIdAndDelete(req.params.id);
    res.json({ message: 'Challenge deleted successfully' });
  } catch (error) {
    console.error('Delete challenge error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Join a challenge
export const joinChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if challenge is active
    if (!challenge.isActive || challenge.endDate < new Date()) {
      return res.status(400).json({ message: 'Challenge is not active' });
    }

    // Check if already a participant
    if (challenge.participants.some((p) => p.user.toString() === req.userId)) {
      return res.status(400).json({ message: 'Already joined this challenge' });
    }

    // Check if challenge is invite-only and user is invited
    if (
      challenge.visibility === 'inviteOnly' &&
      !challenge.invitedUsers.includes(req.userId) &&
      challenge.creator.toString() !== req.userId
    ) {
      return res.status(403).json({ message: 'This challenge is invite-only' });
    }

    // Add user as participant
    challenge.participants.push({
      user: req.userId,
      joinedAt: Date.now(),
      progress: 0,
      completed: false,
    });

    // If user was in invitedUsers list, remove them
    challenge.invitedUsers = challenge.invitedUsers.filter(
      (id) => id.toString() !== req.userId
    );

    await challenge.save();

    // Add challenge to user's challenges
    await User.findByIdAndUpdate(req.userId, {
      $push: { challenges: challenge._id },
    });

    res.json({ message: 'Successfully joined the challenge', challenge });
  } catch (error) {
    console.error('Join challenge error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Leave a challenge
export const leaveChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if user is a participant
    if (!challenge.participants.some((p) => p.user.toString() === req.userId)) {
      return res.status(400).json({ message: 'Not a participant of this challenge' });
    }

    // Check if user is the creator
    if (challenge.creator.toString() === req.userId) {
      return res.status(400).json({ message: 'Creator cannot leave the challenge, delete it instead' });
    }

    // Remove user from participants
    challenge.participants = challenge.participants.filter(
      (p) => p.user.toString() !== req.userId
    );

    await challenge.save();

    // Remove challenge from user's challenges
    await User.findByIdAndUpdate(req.userId, {
      $pull: { challenges: challenge._id },
    });

    res.json({ message: 'Successfully left the challenge' });
  } catch (error) {
    console.error('Leave challenge error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Invite users to a challenge
export const inviteToChallenge = async (req, res) => {
  try {
    const { userIds } = req.body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ message: 'User IDs required' });
    }

    const challenge = await Challenge.findById(req.params.id);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if user is the creator
    if (challenge.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Add users to invited list if not already participants
    for (const userId of userIds) {
      // Skip if already a participant or already invited
      if (
        challenge.participants.some((p) => p.user.toString() === userId) ||
        challenge.invitedUsers.some((id) => id.toString() === userId)
      ) {
        continue;
      }

      challenge.invitedUsers.push(userId);
    }

    await challenge.save();
    res.json({ message: 'Users invited successfully', challenge });
  } catch (error) {
    console.error('Invite to challenge error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user progress in a challenge
export const updateProgress = async (req, res) => {
  try {
    const { runId } = req.body;

    if (!runId) {
      return res.status(400).json({ message: 'Run ID is required' });
    }

    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if user is a participant
    const participantIndex = challenge.participants.findIndex(
      (p) => p.user.toString() === req.userId
    );

    if (participantIndex === -1) {
      return res.status(400).json({ message: 'Not a participant of this challenge' });
    }

    // Get the run to calculate progress
    const run = await Run.findById(runId);

    if (!run) {
      return res.status(404).json({ message: 'Run not found' });
    }

    // Check if run belongs to user
    if (run.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Cannot use someone else\'s run' });
    }

    // Check if run is within challenge period
    const runDate = new Date(run.startTime);
    if (runDate < new Date(challenge.startDate) || runDate > new Date(challenge.endDate)) {
      return res.status(400).json({ message: 'Run is outside of challenge period' });
    }

    // Calculate progress based on challenge type
    let progressIncrement = 0;
    if (challenge.type === 'distance') {
      progressIncrement = run.distance; // in km or miles
    } else if (challenge.type === 'duration') {
      progressIncrement = run.duration; // in seconds
    } else if (challenge.type === 'elevation') {
      progressIncrement = run.elevationGain || 0; // in meters
    } else if (challenge.type === 'streak') {
      // For streak challenges, we count the number of days with runs
      progressIncrement = 1;
    }

    // Update participant's progress
    challenge.participants[participantIndex].progress += progressIncrement;

    // Check if participant has completed the challenge
    if (challenge.participants[participantIndex].progress >= challenge.goal.value) {
      challenge.participants[participantIndex].completed = true;
      challenge.participants[participantIndex].completedDate = Date.now();

      // Award achievement if this challenge has one
      const achievement = await Achievement.findOne({ challenge: challenge._id });
      if (achievement) {
        const alreadyAwarded = achievement.earnedBy.some(
          (e) => e.user.toString() === req.userId
        );

        if (!alreadyAwarded) {
          achievement.earnedBy.push({
            user: req.userId,
            earnedAt: Date.now(),
          });

          await achievement.save();

          // Add achievement to user's achievements
          await User.findByIdAndUpdate(req.userId, {
            $push: { achievements: achievement._id },
          });
        }
      }
    }

    // Update leaderboard
    const leaderboard = challenge.participants
      .map((p) => ({
        user: p.user,
        score: p.progress,
      }))
      .sort((a, b) => b.score - a.score);

    // Assign ranks
    for (let i = 0; i < leaderboard.length; i++) {
      if (i > 0 && leaderboard[i].score === leaderboard[i - 1].score) {
        leaderboard[i].rank = leaderboard[i - 1].rank;
      } else {
        leaderboard[i].rank = i + 1;
      }
    }

    challenge.leaderboard = leaderboard;
    await challenge.save();

    res.json({
      message: 'Progress updated',
      progress: challenge.participants[participantIndex].progress,
      completed: challenge.participants[participantIndex].completed,
      leaderboard: challenge.leaderboard,
    });
  } catch (error) {
    console.error('Update progress error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
}; 