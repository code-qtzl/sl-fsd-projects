import React from 'react';
import { Link } from 'react-router-dom';

const NotFound= () => {
	return (
		<div className='min-h-screen bg-white flex items-center justify-center px-4'>
			<div className='max-w-lg mx-auto text-center'>
				<div className='mb-8'>
					<div className='text-6xl font-bold text-blue-600 mb-4'>
						404
					</div>
					<h1 className='text-2xl font-bold text-gray-900 mb-4'>
						Oops! Page Not Found
					</h1>
					<p className='text-lg text-gray-600 mb-8'>
						The page you're looking for seems to have taken a
						different route. Let's get you back on track!
					</p>

					{/* Illustration */}
					<div className='mb-8'>
						<div className='text-4xl mb-4'>🚕</div>
						<div className='flex justify-center space-x-2'>
							<div className='w-12 h-1 bg-gray-300 rounded'></div>
							<div className='w-12 h-1 bg-gray-300 rounded'></div>
							<div className='w-12 h-1 bg-gray-300 rounded'></div>
						</div>
					</div>

					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Link
							to='/'
							className='bg-blue-600 text-white px-6 py-3 rounded text-lg font-medium hover:bg-blue-700 transition-colors duration-200'
						>
							Go Back Home
						</Link>
						<Link
							to='/booking'
							className='bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded text-lg font-medium hover:bg-blue-50 transition-colors duration-200'
						>
							Book a Ride
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
