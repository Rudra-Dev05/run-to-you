import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    fitnessGoals: {
      type: String,
      default: '',
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    runs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Run',
      },
    ],
    routes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Route',
      },
    ],
    challenges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
      },
    ],
    achievements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievement',
      },
    ],
    stats: {
      totalDistance: {
        type: Number,
        default: 0,
      },
      totalRuns: {
        type: Number,
        default: 0,
      },
      totalTime: {
        type: Number,
        default: 0,
      },
      averagePace: {
        type: Number,
        default: 0,
      },
      totalElevationGain: {
        type: Number,
        default: 0,
      },
      totalCaloriesBurned: {
        type: Number,
        default: 0,
      },
    },
    preferences: {
      distanceUnit: {
        type: String,
        enum: ['km', 'mi'],
        default: 'km',
      },
      paceUnit: {
        type: String,
        enum: ['min/km', 'min/mi'],
        default: 'min/km',
      },
      privacySettings: {
        type: String,
        enum: ['public', 'followers', 'private'],
        default: 'public',
      },
      notifications: {
        type: Boolean,
        default: true,
      },
    },
    socialProfiles: {
      google: {
        id: String,
        token: String,
      },
      facebook: {
        id: String,
        token: String,
      },
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User; 