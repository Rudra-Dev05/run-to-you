import mongoose from 'mongoose';

const routeSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
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
    estimatedDuration: {
      type: Number,
      default: 0,
    },
    elevationGain: {
      type: Number,
      default: 0,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'moderate', 'hard', 'expert'],
      default: 'moderate',
    },
    routeType: {
      type: String,
      enum: ['loop', 'out_and_back', 'point_to_point'],
      default: 'loop',
    },
    startLocation: {
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
      name: String,
      address: String,
    },
    endLocation: {
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
      name: String,
      address: String,
    },
    path: [
      {
        latitude: Number,
        longitude: Number,
        elevation: Number,
      },
    ],
    mapboxGeojson: {
      type: Object,
    },
    terrain: {
      type: String,
      enum: ['road', 'trail', 'mixed'],
      default: 'road',
    },
    surfaceType: {
      type: String,
      enum: ['paved', 'gravel', 'dirt', 'sand', 'mixed'],
      default: 'paved',
    },
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
    tags: [String],
    isPublic: {
      type: Boolean,
      default: true,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: String,
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    pointsOfInterest: [
      {
        name: String,
        description: String,
        coordinates: {
          latitude: Number,
          longitude: Number,
        },
        type: {
          type: String,
          enum: ['water', 'restroom', 'viewpoint', 'parking', 'other'],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
routeSchema.index({ creator: 1 });
routeSchema.index({ isPublic: 1, startLocation: 1 });
routeSchema.index({ 'startLocation.coordinates': '2dsphere' });

const Route = mongoose.model('Route', routeSchema);

export default Route; 