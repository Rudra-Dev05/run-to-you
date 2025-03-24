import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['distance', 'duration', 'elevation', 'streak', 'custom'],
      required: true,
    },
    goal: {
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    visibility: {
      type: String,
      enum: ['public', 'private', 'inviteOnly'],
      default: 'public',
    },
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
        progress: {
          type: Number,
          default: 0,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        completedDate: {
          type: Date,
        },
      },
    ],
    invitedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route',
    },
    leaderboard: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        score: Number,
        rank: Number,
      },
    ],
    rules: {
      type: String,
    },
    rewards: {
      type: String,
    },
    category: {
      type: String,
      enum: ['running', 'training', 'community', 'event'],
      default: 'running',
    },
    tags: [String],
    badge: {
      imageUrl: String,
      name: String,
      description: String,
    },
    updates: [
      {
        message: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
challengeSchema.index({ startDate: 1, endDate: 1 });
challengeSchema.index({ isActive: 1 });
challengeSchema.index({ visibility: 1 });

const Challenge = mongoose.model('Challenge', challengeSchema);

export default Challenge; 