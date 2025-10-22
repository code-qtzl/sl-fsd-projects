import { useState } from 'react';
import { authService } from '../services/authService';

const Login = ({ onLoginSuccess }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');
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
		}

		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
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
			const response = await authService.login(formData);

			if (response.success) {
				// Clear form on success
				setFormData({
					email: '',
					password: '',
				});
				if (onLoginSuccess) {
					onLoginSuccess(response.user);
				}
			} else {
				setError(
					response.message ||
						'Login failed. Please check your credentials.',
				);
			}
		} catch (err) {
			setError(
				err.message || 'Login failed. Please check your credentials.',
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md'>
			<h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>

			{error && (
				<div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
					{error}
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className='mb-4'>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700 mb-2'
					>
						Email
					</label>
					<input
						type='email'
						id='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-slate-800 ${
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

				<div className='mb-6'>
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-700 mb-2'
					>
						Password
					</label>
					<input
						type='password'
						id='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 text-slate-800 ${
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
				</div>

				<button
					type='submit'
					disabled={loading}
					className='w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50'
				>
					{loading ? 'Logging in...' : 'Login'}
				</button>
			</form>
		</div>
	);
};

export default Login;
