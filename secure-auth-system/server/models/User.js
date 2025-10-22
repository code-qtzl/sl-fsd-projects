const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
		lowercase: true,
		trim: true,
		validate: {
			validator: function (email) {
				// Basic email validation regex
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
			},
			message: 'Please provide a valid email address',
		},
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		minlength: [6, 'Password must be at least 6 characters long'],
	},
	role: {
		type: String,
		required: [true, 'Role is required'],
		enum: {
			values: ['admin', 'customer'],
			message: 'Role must be either admin or customer',
		},
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Create indexes for better performance
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
