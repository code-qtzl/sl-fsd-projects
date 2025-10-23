import React from 'react';
import { Link } from 'react-router-dom';

const About= () => {
	return (
		<div className='min-h-screen bg-white'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Services Highlights */}
				<section className='mb-16'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl font-bold text-gray-900 mb-8'>
							Why Choose BookATaxi?
						</h2>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
						<div className='bg-white p-6 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow duration-200'>
							<div className='text-4xl mb-4'>⚡</div>
							<h3 className='text-lg font-semibold text-gray-900 mb-3'>
								Fast Booking
							</h3>
							<p className='text-gray-600 text-sm'>
								Book your ride in under 30 seconds with our
								streamlined process
							</p>
						</div>
						<div className='bg-white p-6 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow duration-200'>
							<div className='text-4xl mb-4'>🛡️</div>
							<h3 className='text-lg font-semibold text-gray-900 mb-3'>
								Safe & Secure
							</h3>
							<p className='text-gray-600 text-sm'>
								Professional drivers, insured vehicles, and
								real-time tracking
							</p>
						</div>
						<div className='bg-white p-6 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow duration-200'>
							<div className='text-4xl mb-4'>💰</div>
							<h3 className='text-lg font-semibold text-gray-900 mb-3'>
								Fair Pricing
							</h3>
							<p className='text-gray-600 text-sm'>
								Transparent pricing with no hidden fees or surge
								charges
							</p>
						</div>
						<div className='bg-white p-6 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow duration-200'>
							<div className='text-4xl mb-4'>🕒</div>
							<h3 className='text-lg font-semibold text-gray-900 mb-3'>
								24/7 Service
							</h3>
							<p className='text-gray-600 text-sm'>
								Round-the-clock availability for all your
								transportation needs
							</p>
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section className='relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 rounded-2xl p-12 text-center text-white overflow-hidden shadow-2xl'>
					{/* Content */}
					<div className='relative z-10'>
						<h2 className='text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent'>
							Ready to Get Started?
						</h2>
						<p className='text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-blue-100'>
							Join thousands of satisfied customers who trust
							<span className='font-semibold text-yellow-300'>
								{' '}
								BookATaxi{' '}
							</span>
							for their transportation needs.
						</p>

						<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
							<Link
								to='/booking'
								className='group inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 rounded-full text-lg font-bold hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl'
							>
								<span>Book Your First Ride</span>
								<svg
									className='ml-2 group-hover:translate-x-1 transition-transform duration-300'
									style={{ width: '12px', height: '12px' }}
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
										clipRule='evenodd'
									/>
								</svg>
							</Link>

							<div className='flex items-center text-blue-200'>
								<div className='flex -space-x-2 mr-3'>
									<div className='w-8 h-8 bg-green-400 rounded-full border-2 border-white'></div>
									<div className='w-8 h-8 bg-blue-400 rounded-full border-2 border-white'></div>
									<div className='w-8 h-8 bg-purple-400 rounded-full border-2 border-white'></div>
								</div>
								<span className='text-sm font-medium'>
									10,000+ Happy Customers
								</span>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default About;
