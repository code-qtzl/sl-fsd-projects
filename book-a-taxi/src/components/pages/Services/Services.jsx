import React from 'react';
import { Link } from 'react-router-dom';

const Services= () => {
	return (
		<div className='min-h-screen bg-white'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				{/* Service Types */}
				<section className='mb-16'>
					<div className='text-center mb-12'>
						<h2 className='text-3xl font-bold text-gray-900 mb-8'>
							Choose Your Ride
						</h2>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<div className='bg-white p-6 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow duration-200'>
							<div className='text-5xl mb-4'>🚗</div>
							<h3 className='text-xl font-bold text-gray-900 mb-2'>
								Economy
							</h3>
							<p className='text-2xl font-bold text-blue-600 mb-4'>
								Starting at $8
							</p>
							<p className='text-gray-600 mb-4'>
								Affordable rides for your daily commute
							</p>
							<ul className='text-left text-sm text-gray-600 space-y-1'>
								<li className='flex items-center'>
									<span className='text-green-500 mr-2'>
										✓
									</span>
									Standard vehicles
								</li>
								<li className='flex items-center'>
									<span className='text-green-500 mr-2'>
										✓
									</span>
									Professional drivers
								</li>
								<li className='flex items-center'>
									<span className='text-green-500 mr-2'>
										✓
									</span>
									Clean and comfortable
								</li>
							</ul>
						</div>
						<div className='bg-white p-6 border-2 border-blue-500 rounded-lg text-center hover:shadow-md transition-shadow duration-200 relative'>
							<div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium'>
								Popular
							</div>
							<div className='text-5xl mb-4'>🚙</div>
							<h3 className='text-xl font-bold text-gray-900 mb-2'>
								Premium
							</h3>
							<p className='text-2xl font-bold text-blue-600 mb-4'>
								Starting at $12
							</p>
							<p className='text-gray-600 mb-4'>
								Enhanced comfort for business and leisure
							</p>
							<ul className='text-left text-sm text-gray-600 space-y-1'>
								<li className='flex items-center'>
									<span className='text-green-500 mr-2'>
										✓
									</span>
									Premium vehicles
								</li>
								<li className='flex items-center'>
									<span className='text-green-500 mr-2'>
										✓
									</span>
									Extra legroom
								</li>
								<li className='flex items-center'>
									<span className='text-green-500 mr-2'>
										✓
									</span>
									Climate control
								</li>
							</ul>
						</div>
						<div className='bg-white p-6 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow duration-200'>
							<div className='text-5xl mb-4'>🚐</div>
							<h3 className='text-xl font-bold text-gray-900 mb-2'>
								Luxury
							</h3>
							<p className='text-2xl font-bold text-blue-600 mb-4'>
								Starting at $20
							</p>
							<p className='text-gray-600 mb-4'>
								Executive service for special occasions
							</p>
							<ul className='text-left text-sm text-gray-600 space-y-1'>
								<li className='flex items-center'>
									<span className='text-green-500 mr-2'>
										✓
									</span>
									Luxury vehicles
								</li>
								<li className='flex items-center'>
									<span className='text-green-500 mr-2'>
										✓
									</span>
									Premium amenities
								</li>
								<li className='flex items-center'>
									<span className='text-green-500 mr-2'>
										✓
									</span>
									White-glove service
								</li>
							</ul>
						</div>
					</div>
				</section>

				{/* Call to Action */}
				<section className='relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 rounded-2xl p-12 text-center text-white overflow-hidden shadow-2xl'>
					{/* Decorative background elements */}
					<div className='absolute inset-0 bg-black opacity-20'></div>
					<div className='absolute top-0 left-0 w-full h-full'>
						<div className='absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full'></div>
						<div className='absolute bottom-10 right-10 w-16 h-16 bg-yellow-300 opacity-20 rounded-full'></div>
						<div className='absolute top-1/2 right-20 w-12 h-12 bg-green-400 opacity-15 rounded-full'></div>
					</div>

					{/* Content */}
					<div className='relative z-10'>
						<div className='inline-flex items-center justify-center w-8 h-8 bg-white bg-opacity-20 rounded-full mb-6'>
							<svg
								className='text-yellow-300'
								style={{ width: '16px', height: '16px' }}
								fill='currentColor'
								viewBox='0 0 20 20'
							>
								<path
									fillRule='evenodd'
									d='M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z'
									clipRule='evenodd'
								/>
							</svg>
						</div>

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

export default Services;
