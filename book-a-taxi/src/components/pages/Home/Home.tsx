import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
	return (
		<div className='min-h-screen bg-white'>
			{/* Hero Section */}
			<section className='py-16 px-4 sm:px-6 lg:px-8 bg-gray-50'>
				<div className='max-w-4xl mx-auto text-center'>
					<div className='mb-8'>
						<div className='w-32 h-32 mx-auto bg-primary rounded-full flex items-center justify-center mb-6'>
							<div className='text-6xl'>🚕</div>
						</div>
					</div>
					<h1 className='text-3xl sm:text-4xl font-bold text-content-primary mb-6'>
						Book Your Ride in{' '}
						<span className='text-primary'>Seconds</span>
					</h1>
					<p className='text-lg text-content-secondary mb-8 max-w-2xl mx-auto'>
						Fast, reliable, and comfortable taxi service available
						24/7. Your journey starts with just a few clicks.
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto'>
						<Link
							to='/booking'
							className='bg-primary text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-yellow-500 transition-colors duration-200 shadow-lg'
						>
							Book a Ride Now
						</Link>
						<Link
							to='/services'
							className='bg-white text-content-primary border-2 border-gray-200 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-colors duration-200'
						>
							View Services
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;
