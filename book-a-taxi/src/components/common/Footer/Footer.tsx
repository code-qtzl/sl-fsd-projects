import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='bg-gray-800 text-white' role='contentinfo'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
					{/* Company Info Section */}
					<div>
						<h3 className='text-lg font-semibold mb-4 text-white'>
							BookATaxi
						</h3>
						<p className='text-gray-300 mb-4 text-sm'>
							Your reliable taxi booking service available 24/7.
							Safe, comfortable, and affordable rides in your
							city.
						</p>
						<div className='flex space-x-3'>
							<a
								href='#'
								aria-label='Facebook'
								className='text-lg hover:text-blue-400 transition-colors duration-200'
							>
								📘
							</a>
							<a
								href='#'
								aria-label='Twitter'
								className='text-lg hover:text-blue-400 transition-colors duration-200'
							>
								🐦
							</a>
							<a
								href='#'
								aria-label='Instagram'
								className='text-lg hover:text-pink-400 transition-colors duration-200'
							>
								📷
							</a>
						</div>
					</div>

					{/* Quick Links Section */}
					<div>
						<h3 className='text-lg font-semibold mb-4 text-white'>
							Quick Links
						</h3>
						<ul className='space-y-2 text-sm'>
							<li>
								<Link
									to='/'
									className='text-gray-300 hover:text-white transition-colors duration-200'
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									to='/about'
									className='text-gray-300 hover:text-white transition-colors duration-200'
								>
									About Us
								</Link>
							</li>
							<li>
								<Link
									to='/services'
									className='text-gray-300 hover:text-white transition-colors duration-200'
								>
									Services
								</Link>
							</li>
							<li>
								<Link
									to='/booking'
									className='text-gray-300 hover:text-white transition-colors duration-200'
								>
									Book a Ride
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact Info Section */}
					<div>
						<h3 className='text-lg font-semibold mb-4 text-white'>
							Contact Info
						</h3>
						<div className='space-y-2 text-sm'>
							<p className='flex items-center text-gray-300'>
								<span className='mr-2'>📞</span>
								<span>(555) 123-4567</span>
							</p>
							<p className='flex items-center text-gray-300'>
								<span className='mr-2'>✉️</span>
								<span>info@bookataxi.com</span>
							</p>
							<p className='flex items-center text-gray-300'>
								<span className='mr-2'>🕒</span>
								<span>24/7 Service</span>
							</p>
						</div>
					</div>

					{/* Services Section */}
					<div>
						<h3 className='text-lg font-semibold mb-4 text-white'>
							Our Services
						</h3>
						<ul className='space-y-2 text-sm text-gray-300'>
							<li>Economy Rides</li>
							<li>Premium Comfort</li>
							<li>Luxury Travel</li>
							<li>Airport Transfers</li>
						</ul>
					</div>
				</div>

				{/* Copyright Section */}
				<div className='border-t border-gray-700 mt-8 pt-6'>
					<div className='flex flex-col md:flex-row justify-between items-center text-sm'>
						<p className='text-gray-400 mb-4 md:mb-0'>
							&copy; {currentYear} BookATaxi. All rights reserved.
						</p>
						<div className='flex space-x-4'>
							<a
								href='#'
								className='text-gray-400 hover:text-white transition-colors duration-200'
							>
								Privacy Policy
							</a>
							<a
								href='#'
								className='text-gray-400 hover:text-white transition-colors duration-200'
							>
								Terms of Service
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
