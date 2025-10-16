import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
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

export default About;
