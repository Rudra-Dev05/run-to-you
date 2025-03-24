import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Config - Load environment variables
dotenv.config();
console.log('Env loaded:', process.env.MONGODB_URI ? 'success' : 'failed');
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Routes
import userRoutes from './routes/users.js';
import runRoutes from './routes/runs.js';
import routeRoutes from './routes/routes.js';
import challengeRoutes from './routes/challenges.js';
import achievementRoutes from './routes/achievements.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/runs', runRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/achievements', achievementRoutes);

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Create HTTP server
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});

// Socket handlers
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Handle joining user's personal room
  socket.on('join_user_room', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined their personal room`);
  });

  // Handle joining challenge room
  socket.on('join_challenge', (challengeId) => {
    socket.join(`challenge_${challengeId}`);
    console.log(`User joined challenge room ${challengeId}`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Production setup
if (process.env.NODE_ENV === 'production') {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Add a mock response for demo purposes
app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running without database connection for demo purposes' });
});

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/run-to-you')
  .then(() => {
    console.log('Connected to MongoDB');
    startServer();
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    console.log('Starting server without database connection for demo purposes');
    startServer();
  });

function startServer() {
  server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
} 