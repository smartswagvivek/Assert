const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Route imports
const authRoutes = require('./routes/authRoutes');
const assetRoutes = require('./routes/assetRoutes');

const app = express();
let isMongoConnected = false;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isMongoConnected = true;
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    isMongoConnected = false;
    console.error('MongoDB connection error:', error.message);
    // Keep API process alive on platform and retry connection.
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);

// Root route for platform health checks (Render commonly checks "/")
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    mongodb: isMongoConnected ? 'connected' : 'disconnected',
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(isMongoConnected ? 200 : 503).json({
    success: isMongoConnected,
    message: isMongoConnected ? 'Server is running' : 'MongoDB not connected',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

const DEFAULT_PORT = Number(process.env.PORT) || 5000;
let server;

const startServer = (port, retries = 10) => {
  server = app
    .listen(port, () => {
      console.log(`Server running on port ${port}`);
    })
    .on('error', (err) => {
      if (err.code === 'EADDRINUSE' && retries > 0) {
        const nextPort = port + 1;
        console.warn(`Port ${port} is in use. Retrying on port ${nextPort}...`);
        startServer(nextPort, retries - 1);
        return;
      }
      console.error('Server startup error:', err.message);
      process.exit(1);
    });
};

startServer(DEFAULT_PORT);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
