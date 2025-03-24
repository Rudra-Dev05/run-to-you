import mongoose from 'mongoose';

const runSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    distance: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,  // In seconds
      required: true,
    },
    pace: {
      type: Number,  // In seconds per km or mile
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Route',
    },
    routeData: {
      coordinates: [
        {
          latitude: Number,
          longitude: Number,
          elevation: Number,
          timestamp: Date,
        },
      ],
      startLocation: {
        latitude: Number,
        longitude: Number,
        name: String,
      },
      endLocation: {
        latitude: Number,
        longitude: Number,
        name: String,
      },
    },
    weatherConditions: {
      temperature: Number,
      humidity: Number,
      windSpeed: Number,
      conditions: String,
    },
    elevationGain: {
      type: Number,
      default: 0,
    },
    caloriesBurned: {
      type: Number,
      default: 0,
    },
    images: [
      {
        url: String,
        caption: String,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isPrivate: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Challenge',
    },
    achievements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievement',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying
runSchema.index({ user: 1, startTime: -1 });
runSchema.index({ startTime: -1 });

const Run = mongoose.model('Run', runSchema);

export default Run; 