import Route from '../models/route.js';
import User from '../models/user.js';

// Create a new route
export const createRoute = async (req, res) => {
  try {
    const {
      name,
      description,
      distance,
      estimatedDuration,
      elevationGain,
      difficulty,
      routeType,
      startLocation,
      endLocation,
      path,
      mapboxGeojson,
      terrain,
      surfaceType,
      tags,
      isPublic,
      pointsOfInterest,
    } = req.body;

    // Create new route
    const newRoute = new Route({
      creator: req.userId,
      name,
      description,
      distance,
      estimatedDuration,
      elevationGain,
      difficulty,
      routeType,
      startLocation,
      endLocation,
      path,
      mapboxGeojson,
      terrain,
      surfaceType,
      tags,
      isPublic,
      pointsOfInterest,
    });

    // Save route
    const savedRoute = await newRoute.save();

    // Add route to user's routes
    await User.findByIdAndUpdate(req.userId, {
      $push: { routes: savedRoute._id },
    });

    res.status(201).json(savedRoute);
  } catch (error) {
    console.error('Create route error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all routes (with filters)
export const getRoutes = async (req, res) => {
  try {
    const {
      distance,
      difficulty,
      terrain,
      surfaceType,
      search,
      near,
      radius,
      createdBy,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const query = { isPublic: true };

    // Add filter conditions
    if (distance) {
      // Example: distance=0-5,10-15 (0-5km and 10-15km)
      const distanceRanges = distance.split(',');
      const distanceConditions = distanceRanges.map((range) => {
        const [min, max] = range.split('-').map(Number);
        return { distance: { $gte: min, $lte: max } };
      });
      query.$or = distanceConditions;
    }

    if (difficulty) {
      query.difficulty = { $in: difficulty.split(',') };
    }

    if (terrain) {
      query.terrain = { $in: terrain.split(',') };
    }

    if (surfaceType) {
      query.surfaceType = { $in: surfaceType.split(',') };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    if (createdBy) {
      query.creator = createdBy;
    }

    if (near) {
      // Location-based search using MongoDB geospatial features
      const [latitude, longitude] = near.split(',').map(Number);
      const searchRadius = parseFloat(radius) || 10; // default 10km

      if (latitude && longitude) {
        query['startLocation.coordinates'] = {
          $nearSphere: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: searchRadius * 1000, // convert km to meters
          },
        };
      }
    }

    // Set sort criteria
    let sortCriteria = { createdAt: -1 }; // default sort by newest
    if (sortBy === 'distance') sortCriteria = { distance: 1 };
    if (sortBy === 'popularity') sortCriteria = { usageCount: -1 };
    if (sortBy === 'rating') sortCriteria = { averageRating: -1 };

    const routes = await Route.find(query)
      .populate('creator', 'firstName lastName profilePicture')
      .sort(sortCriteria)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Route.countDocuments(query);

    res.json({
      routes,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total,
    });
  } catch (error) {
    console.error('Get routes error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get route by ID
export const getRouteById = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate(
      'creator',
      'firstName lastName profilePicture'
    );

    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    // Check if route is private and requester is not the creator
    if (!route.isPublic && route.creator._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update usage count if viewing someone else's route
    if (route.creator._id.toString() !== req.userId) {
      route.usageCount += 1;
      await route.save();
    }

    res.json(route);
  } catch (error) {
    console.error('Get route by ID error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get routes created by current user
export const getUserRoutes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const routes = await Route.find({ creator: req.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Route.countDocuments({ creator: req.userId });

    res.json({
      routes,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error('Get user routes error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update route
export const updateRoute = async (req, res) => {
  try {
    const {
      name,
      description,
      difficulty,
      tags,
      isPublic,
      pointsOfInterest,
    } = req.body;

    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    // Check if user owns the route
    if (route.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Update fields
    if (name) route.name = name;
    if (description !== undefined) route.description = description;
    if (difficulty) route.difficulty = difficulty;
    if (tags) route.tags = tags;
    if (isPublic !== undefined) route.isPublic = isPublic;
    if (pointsOfInterest) route.pointsOfInterest = pointsOfInterest;

    const updatedRoute = await route.save();
    res.json(updatedRoute);
  } catch (error) {
    console.error('Update route error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete route
export const deleteRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    // Check if user owns the route
    if (route.creator.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Remove route from user's routes
    await User.findByIdAndUpdate(req.userId, {
      $pull: { routes: route._id },
    });

    await Route.findByIdAndDelete(req.params.id);
    res.json({ message: 'Route deleted successfully' });
  } catch (error) {
    console.error('Delete route error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Like or unlike a route
export const likeRoute = async (req, res) => {
  try {
    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    // Check if already liked
    const likeIndex = route.likes.findIndex(
      (id) => id.toString() === req.userId
    );

    if (likeIndex === -1) {
      // Not liked, add like
      route.likes.push(req.userId);
    } else {
      // Already liked, remove like
      route.likes = route.likes.filter(
        (id) => id.toString() !== req.userId
      );
    }

    await route.save();
    res.json(route.likes);
  } catch (error) {
    console.error('Like route error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Review a route
export const reviewRoute = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const route = await Route.findById(req.params.id);

    if (!route) {
      return res.status(404).json({ message: 'Route not found' });
    }

    // Check if user already reviewed
    const reviewIndex = route.reviews.findIndex(
      (review) => review.user.toString() === req.userId
    );

    if (reviewIndex !== -1) {
      // Update existing review
      route.reviews[reviewIndex].rating = rating;
      route.reviews[reviewIndex].comment = comment || '';
      route.reviews[reviewIndex].date = Date.now();
    } else {
      // Add new review
      route.reviews.push({
        user: req.userId,
        rating,
        comment: comment || '',
        date: Date.now(),
      });
    }

    // Recalculate average rating
    const totalRating = route.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    route.averageRating = totalRating / route.reviews.length;

    await route.save();

    // Populate user info for the response
    const populatedRoute = await Route.findById(req.params.id).populate(
      'reviews.user',
      'firstName lastName profilePicture'
    );

    res.json(populatedRoute.reviews);
  } catch (error) {
    console.error('Review route error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
}; 