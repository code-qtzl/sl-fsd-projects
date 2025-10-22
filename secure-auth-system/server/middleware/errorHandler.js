// Error handling middleware for structured error responses
const errorHandler = (err, req, res, next) => {
	console.error('Error:', err);

	// Default error response
	let error = {
		success: false,
		message: 'Internal server error',
		statusCode: 500,
	};

	// Mongoose validation error
	if (err.name === 'ValidationError') {
		const messages = Object.values(err.errors).map((val) => val.message);
		error.message = messages.join('. ');
		error.statusCode = 400;
	}

	// Mongoose duplicate key error (E11000)
	if (err.code === 11000) {
		const field = Object.keys(err.keyValue)[0];
		error.message = `${field} already exists`;
		error.statusCode = 409;
	}

	// Mongoose CastError (invalid ObjectId)
	if (err.name === 'CastError') {
		error.message = 'Invalid ID format';
		error.statusCode = 400;
	}

	// JWT errors (if implemented later)
	if (err.name === 'JsonWebTokenError') {
		error.message = 'Invalid token';
		error.statusCode = 401;
	}

	if (err.name === 'TokenExpiredError') {
		error.message = 'Token expired';
		error.statusCode = 401;
	}

	// Custom error with statusCode property
	if (err.statusCode) {
		error.statusCode = err.statusCode;
		error.message = err.message;
	}

	res.status(error.statusCode).json({
		success: false,
		message: error.message,
	});
};

module.exports = errorHandler;
