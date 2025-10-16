import React from 'react';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
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
				<section className='bg-blue-600 rounded-lg p-8 text-center text-white'>
					<h2 className='text-2xl font-bold mb-4'>
						Ready to Get Started?
					</h2>
					<p className='text-lg mb-6 max-w-2xl mx-auto'>
						Join thousands of satisfied customers who trust
						BookATaxi for their transportation needs.
					</p>
					<Link
						to='/booking'
						className='inline-block bg-white text-blue-600 px-6 py-3 rounded text-lg font-medium hover:bg-gray-100 transition-colors duration-200'
					>
						Book Your First Ride
					</Link>
				</section>
			</div>
		</div>
	);
};

export default Services;
