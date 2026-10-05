const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

// Initialize Express application
const app = express();

// Middlewares
app.use(cors()); // Allow Cross-Origin requests from React frontend
app.use(express.json()); // Parse incoming JSON request bodies
app.use(express.urlencoded({ extended: false }));

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'MERN Auth API is running smoothly 🚀' });
});

// Authentication routes
app.use('/api/auth', require('./routes/authRoutes'));

// Fallback for 404 routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
