import { Outlet } from 'react-router-dom';

function Layout() {
	return (
		<div className='min-h-screen bg-primary-dark flex flex-col'>
			<main className='flex-1 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12 max-w-7xl'>
				<Outlet />
			</main>

			<footer className='bg-primary-dark border-t border-primary-teal/20 py-3 md:py-4 mt-auto'>
				<div className='container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center text-neutral-light/60'>
					<p className='text-xs sm:text-sm md:text-base'>
						<span className='hidden sm:inline'>
							&copy; 2025 Recipe Quest - Level up your cooking!
						</span>
						<span className='sm:hidden'>
							&copy; 2025 Recipe Quest
						</span>
					</p>
				</div>
			</footer>
		</div>
	);
}

export default Layout;
