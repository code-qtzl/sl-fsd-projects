// Validation middleware for input validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation for user registration
const validateRegistration = (req, res, next) => {
	const { email, password, role } = req.body;
	const errors = [];

	// Check required fields
	if (!email) {
		errors.push('Email is required');
	}
	if (!password) {
		errors.push('Password is required');
	}
	if (!role) {
		errors.push('Role is required');
	}

	// Email format validation
	if (email && !emailRegex.test(email)) {
		errors.push('Please provide a valid email address');
	}

	// Password length validation
	if (password && password.length < 6) {
		errors.push('Password must be at least 6 characters long');
	}

	// Role validation
	if (role && !['admin', 'customer'].includes(role)) {
		errors.push('Role must be either admin or customer');
	}

	// If there are validation errors, return them
	if (errors.length > 0) {
		return res.status(400).json({
			success: false,
			message: errors.join('. '),
		});
	}

	next();
};

// Validation for user login
const validateLogin = (req, res, next) => {
	const { email, password } = req.body;
	const errors = [];

	// Check required fields
	if (!email) {
		errors.push('Email is required');
	}
	if (!password) {
		errors.push('Password is required');
	}

	// Email format validation
	if (email && !emailRegex.test(email)) {
		errors.push('Please provide a valid email address');
	}

	// If there are validation errors, return them
	if (errors.length > 0) {
		return res.status(400).json({
			success: false,
			message: errors.join('. '),
		});
	}

	next();
};

module.exports = {
	validateRegistration,
	validateLogin,
};
