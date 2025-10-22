const bcrypt = require('bcrypt');
const User = require('../models/User');

// Get salt rounds from environment or default to 12
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;

// Registration controller function
const register = async (req, res, next) => {
	try {
		const { email, password, role } = req.body;

		// Check if user already exists
		const existingUser = await User.findOne({ email: email.toLowerCase() });
		if (existingUser) {
			const error = new Error('User with this email already exists');
			error.statusCode = 409;
			return next(error);
		}

		// Hash password using bcrypt
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

		// Create new user
		const newUser = new User({
			email: email.toLowerCase(),
			password: hashedPassword,
			role,
		});

		// Save user to database
		const savedUser = await newUser.save();

		// Return success response (exclude password from response)
		res.status(201).json({
			success: true,
			message: 'User registered successfully',
			user: {
				id: savedUser._id,
				email: savedUser.email,
				role: savedUser.role,
			},
		});
	} catch (error) {
		next(error);
	}
};

// Login controller function
const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		// Find user by email
		const user = await User.findOne({ email: email.toLowerCase() });
		if (!user) {
			const error = new Error('Invalid credentials');
			error.statusCode = 401;
			return next(error);
		}

		// Compare password with hashed password using bcrypt
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			const error = new Error('Invalid credentials');
			error.statusCode = 401;
			return next(error);
		}

		// Return success response (exclude password from response)
		res.status(200).json({
			success: true,
			message: 'Login successful',
			user: {
				id: user._id,
				email: user.email,
				role: user.role,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	register,
	login,
};
