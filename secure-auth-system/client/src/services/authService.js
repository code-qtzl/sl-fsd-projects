import axios from 'axios';

// Create axios instance with base configuration
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	timeout: 10000, // 10 second timeout
});

// Auth service functions
export const authService = {
	// Register a new user
	register: async (userData) => {
		try {
			const response = await api.post('/auth/register', userData);
			return response.data;
		} catch (error) {
			// Handle different types of errors
			if (error.response) {
				// Server responded with error status
				throw new Error(
					error.response.data.message || 'Registration failed',
				);
			} else if (error.request) {
				// Network error
				throw new Error('Network error. Please check your connection.');
			} else {
				// Other error
				throw new Error('An unexpected error occurred');
			}
		}
	},

	// Login user
	login: async (credentials) => {
		try {
			const response = await api.post('/auth/login', credentials);
			return response.data;
		} catch (error) {
			// Handle different types of errors
			if (error.response) {
				// Server responded with error status
				throw new Error(error.response.data.message || 'Login failed');
			} else if (error.request) {
				// Network error
				throw new Error('Network error. Please check your connection.');
			} else {
				// Other error
				throw new Error('An unexpected error occurred');
			}
		}
	},
};

export default authService;
