import React from 'react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
	return (
		<div className='min-h-screen bg-white'>
			<div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<div className='text-center mb-12'>
					<h1 className='text-3xl font-bold text-gray-900 mb-8'>
						Contact Us
					</h1>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
					{/* Contact Information */}
					<div className='bg-white p-6 border border-gray-200 rounded-lg'>
						<h2 className='text-xl font-semibold text-gray-900 mb-6'>
							Get in Touch
						</h2>
						<div className='space-y-4'>
							<div className='flex items-center'>
								<div className='bg-blue-100 p-2 rounded-full mr-4'>
									<svg
										className='w-5 h-5 text-blue-600'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
										></path>
									</svg>
								</div>
								<div>
									<h3 className='font-medium text-gray-900'>
										Phone
									</h3>
									<p className='text-gray-600'>
										1-800-123-1234
									</p>
								</div>
							</div>
							<div className='flex items-center'>
								<div className='bg-blue-100 p-2 rounded-full mr-4'>
									<svg
										className='w-5 h-5 text-blue-600'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
										></path>
									</svg>
								</div>
								<div>
									<h3 className='font-medium text-gray-900'>
										Email
									</h3>
									<p className='text-gray-600'>
										bookataki@mail.com
									</p>
								</div>
							</div>
							<div className='flex items-center'>
								<div className='bg-blue-100 p-2 rounded-full mr-4'>
									<svg
										className='w-5 h-5 text-blue-600'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
										></path>
									</svg>
								</div>
								<div>
									<h3 className='font-medium text-gray-900'>
										Hours
									</h3>
									<p className='text-gray-600'>
										24/7 Service Available
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Quick Actions */}
					<div className='bg-white p-6 border border-gray-200 rounded-lg'>
						<h2 className='text-xl font-semibold text-gray-900 mb-6'>
							Quick Actions
						</h2>
						<div className='space-y-3'>
							<Link
								to='/booking'
								className='block w-full bg-blue-600 text-white text-center py-3 px-4 rounded font-medium hover:bg-blue-700 transition-colors duration-200'
							>
								Book a Ride Now
							</Link>
							<Link
								to='/services'
								className='block w-full bg-gray-100 text-gray-700 text-center py-3 px-4 rounded font-medium hover:bg-gray-200 transition-colors duration-200'
							>
								View Our Services
							</Link>
							<Link
								to='/about'
								className='block w-full bg-gray-100 text-gray-700 text-center py-3 px-4 rounded font-medium hover:bg-gray-200 transition-colors duration-200'
							>
								Learn More About Us
							</Link>
						</div>
					</div>
				</div>

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

export default Contact;
