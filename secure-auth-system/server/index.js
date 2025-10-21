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
		process.exit(1);
	}
};

// Connect to database
connectDB();

// Basic health check route
app.get('/api/health', (req, res) => {
	res.json({ success: true, message: 'Server is running' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

module.exports = app;
