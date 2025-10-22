const express = require('express');
const { register, login } = require('../controllers/authController');
const {
	validateRegistration,
	validateLogin,
} = require('../middleware/validation');

const router = express.Router();

// POST /api/auth/register - User registration endpoint
router.post('/register', validateRegistration, register);

// POST /api/auth/login - User login endpoint
router.post('/login', validateLogin, login);

module.exports = router;
