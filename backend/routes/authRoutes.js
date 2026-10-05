const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Route for user registration: POST /api/auth/register
router.post('/register', registerUser);

// Route for user login: POST /api/auth/login
router.post('/login', loginUser);

// Protected route to fetch logged-in user profile: GET /api/auth/me
router.get('/me', protect, getMe);

module.exports = router;
