const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware configuration
app.use(express.json()); // JSON parsing middleware
app.use(cors()); // CORS middleware for frontend communication

// MongoDB connection using Mongoose
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('MongoDB connected successfully');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		console.log(
			'Server will continue running without database connection for testing purposes',
		);
	}
};

// Connect to database
connectDB();

// Import routes
const authRoutes = require('./routes/authRoutes');

// Import error handling middleware
const errorHandler = require('./middleware/errorHandler');

// Use routes
app.use('/api/auth', authRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
	res.json({ success: true, message: 'Server is running' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;
