import { useState } from 'react';
import { authService } from '../services/authService';

const Registration = ({ onRegistrationSuccess }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		role: '',
	});
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);
	const [fieldErrors, setFieldErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

		// Clear field-specific errors when user starts typing
		if (fieldErrors[name]) {
			setFieldErrors({
				...fieldErrors,
				[name]: '',
			});
		}

		// Clear general error when user makes changes
		if (error) {
			setError('');
		}
	};

	const validateForm = () => {
		const errors = {};

		// Required field validation
		if (!formData.email.trim()) {
			errors.email = 'Email is required';
		} else {
			// Email format validation
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(formData.email)) {
				errors.email = 'Please enter a valid email address';
			}
		}

		if (!formData.password) {
			errors.password = 'Password is required';
		} else if (formData.password.length < 6) {
			errors.password = 'Password must be at least 6 characters long';
		}

		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		setFieldErrors({});
		setLoading(true);

		// Validate form
		const errors = validateForm();
		if (Object.keys(errors).length > 0) {
			setFieldErrors(errors);
			setLoading(false);
			return;
		}

		try {
			const response = await authService.register(formData);

			if (response.success) {
				setSuccess(
					response.message ||
						'Registration successful! You can now log in.',
				);
				// Clear form on success
				setFormData({
					email: '',
					password: '',
					role: 'customer',
				});
				if (onRegistrationSuccess) {
					onRegistrationSuccess(response.user);
				}
			} else {
				setError(
					response.message ||
						'Registration failed. Please try again.',
				);
			}
		} catch (err) {
			setError(err.message || 'Registration failed. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'>
			<h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>

			{error && (
				<div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
					{error}
				</div>
			)}

			{success && (
				<div className='mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded'>
					{success}
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-800 mb-2'
					>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
							fieldErrors.email
								? 'border-red-500 focus:ring-red-500'
								: 'border-gray-300 focus:ring-blue-500'
						}`}
						required
					/>
					{fieldErrors.email && (
						<p className='mt-1 text-sm text-red-600'>
							{fieldErrors.email}
						</p>
					)}
				</div>

				<div className='mb-4'>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-800 mb-2'
					>
						Password
					</label>
					<input
						type='password'
						id='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
							fieldErrors.password
								? 'border-red-500 focus:ring-red-500'
								: 'border-gray-300 focus:ring-blue-500'
						}`}
						required
					/>
					{fieldErrors.password && (
						<p className='mt-1 text-sm text-red-600'>
							{fieldErrors.password}
						</p>
					)}
					<p className='mt-1 text-sm text-gray-500'>
						Password must be at least 6 characters long
					</p>
				</div>

				<div className='mb-6'>
					<label
						htmlFor='role'
						className='block text-sm font-medium text-gray-700 mb-2'
					>
						Role
					</label>
					<select
						id='role'
						name='role'
						value={formData.role}
						onChange={handleChange}
						className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800'
					>
						<option value='customer'>Customer</option>
						<option value='admin'>Admin</option>
					</select>
				</div>

				<button
					type='submit'
					disabled={loading}
					className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50'
				>
					{loading ? 'Registering...' : 'Register'}
				</button>
			</form>
		</div>
	);
};

export default Registration;
