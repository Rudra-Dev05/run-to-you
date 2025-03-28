# Run To You - Social Fitness & Workout Web App

Run To You is a full-featured social fitness application that enables users to track their running performance, share workouts, connect socially, create and share running routes, participate in challenges, and earn achievements.

## Features

- **User Profiles & Statistics**
  - Comprehensive user profiles with personal details, fitness goals, and preferences
  - Detailed running statistics including distance, pace, calories burned, and elevation
  - Historical performance data with visual dashboards

- **Activity Feed & Social Interaction**
  - Real-time activity feed with updates from followed users
  - Like, comment, and share functionality for social engagement
  - Follow other runners and build a community

- **Route Creation & Sharing**
  - Mapbox integration for creating, visualizing, and sharing running routes
  - Save favorite routes with detailed metrics (distance, elevation, difficulty)
  - Discover popular routes in your area

- **Challenges & Events**
  - Participate in distance, duration, or custom challenges
  - Create personal or group goals with progress tracking
  - Join community events and competitions

- **Achievements & Gamification**
  - Earn badges and rewards for reaching milestones
  - Track progress on the leaderboard
  - Unlock special achievements through consistent participation

## Tech Stack

### Frontend
- React.js with Redux for state management
- Tailwind CSS for responsive UI
- Socket.io client for real-time updates
- Mapbox API for mapping and route creation

### Backend
- Node.js with Express server
- MongoDB with Mongoose ODM
- JWT authentication
- Socket.io for real-time features

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local installation or MongoDB Atlas account)
- Mapbox API key

### Environment Setup
1. Clone the repository
```
git clone https://github.com/yourusername/run-to-you.git
cd run-to-you
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/run-to-you
JWT_SECRET=your_jwt_secret_key
MAPBOX_API_KEY=your_mapbox_api_key
NODE_ENV=development
```

3. Install server dependencies
```
npm install
```

4. Install client dependencies
```
npm run install-client
```

### Running the Application
1. For development (runs both server and client with hot-reloading)
```
npm run dev
```

2. For production build
```
npm run build
npm start
```

## API Documentation

The API is organized around REST principles. All API endpoints return JSON responses and use standard HTTP response codes.

### Base URL
In development: `http://localhost:5000/api`

### Authentication
Most endpoints require authentication. Include a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

### Main Endpoints

- Users: `/api/users`
  - Authentication, profile management, following/followers

- Runs: `/api/runs`
  - Creating, viewing, and managing runs

- Routes: `/api/routes`
  - Creating and sharing running routes

- Challenges: `/api/challenges`
  - Joining and managing challenges

- Achievements: `/api/achievements`
  - Tracking and unlocking achievements

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. #   r u n - t o - y o u  
 