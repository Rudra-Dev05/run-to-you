import mongoose from 'mongoose';

const achievementSchema = new mongoose.Schema(
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
    category: {
      type: String,
      enum: ['distance', 'duration', 'elevation', 'streak', 'speed', 'challenge', 'social', 'milestone'],
      required: true,
    },
    level: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
    },
    criteria: {
      type: {
        type: String,
        enum: ['single', 'cumulative', 'streak', 'social', 'custom'],
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      timeFrame: {
        type: String,
        enum: ['all_time', 'year', 'month', 'week', 'day', 'custom'],
        default: 'all_time',
      },
    },
    icon: {
      type: String,
      required: true,
    },
    badgeUrl: {
      type: String,
      required: true,
    },
    unlockMessage: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    isSystem: {
      type: Boolean,
      default: true,
    },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
    },
    rarity: {
      type: String,
      enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
      default: 'common',
    },
    earnedBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        earnedAt: {
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
achievementSchema.index({ category: 1, level: 1 });
achievementSchema.index({ isSystem: 1 });

const Achievement = mongoose.model('Achievement', achievementSchema);

export default Achievement; 