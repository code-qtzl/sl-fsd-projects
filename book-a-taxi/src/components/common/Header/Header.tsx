import React from 'react';
import Navigation from '../Navigation/Navigation';

const Header: React.FC = () => {
	return (
		<header className='bg-white shadow-sm' role='banner'>
			<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center py-4'>
					<div className='flex items-center'>
						<div className='w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3'>
							<span className='text-xl'>🚕</span>
						</div>
						<div>
							<h1 className='text-xl font-bold text-content-primary'>
								BookATaxi
							</h1>
							<p className='text-xs text-content-tertiary'>
								Your reliable ride, anytime
							</p>
						</div>
					</div>
					<Navigation />
				</div>
			</div>
		</header>
	);
};

export default Header;
