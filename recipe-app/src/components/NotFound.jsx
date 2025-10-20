import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function NotFound() {
	const location = useLocation();
	const [countdown, setCountdown] = useState(10);
	const [autoRedirect, setAutoRedirect] = useState(true);

	useEffect(() => {
		if (!autoRedirect) return;

		const timer = setInterval(() => {
			setCountdown((prev) => {
				if (prev <= 1) {
					window.location.href = '/';
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [autoRedirect]);

	const handleCancelRedirect = () => {
		setAutoRedirect(false);
	};

	return (
		<div className='text-neutral-light'>
			<div className='text-center py-8 md:py-12 lg:py-16'>
				{/* Animated 404 */}
				<div className='mb-6 md:mb-8'>
					<h1 className='text-6xl md:text-8xl lg:text-9xl font-bold mb-2 md:mb-4 text-accent-coral game-title game-glow'>
						404
					</h1>
					<div className='text-4xl md:text-6xl mb-4 game-float'>
						🍽️💨
					</div>
				</div>

				{/* Error Message */}
				<div className='max-w-2xl mx-auto mb-6 md:mb-8'>
					<h2 className='text-xl md:text-2xl lg:text-3xl font-semibold mb-3 md:mb-4 text-accent-yellow game-title'>
						Recipe Not Found in Our Kitchen!
					</h2>
					<p className='text-sm md:text-base lg:text-lg mb-4 md:mb-6 text-neutral-light/80 leading-relaxed'>
						Looks like this recipe has vanished from our cookbook!
						The page you're looking for doesn't exist in our
						culinary realm.
					</p>

					{/* Current Path Info */}
					<div className='bg-primary-dark/50 rounded-lg p-3 md:p-4 border border-primary-teal/20 mb-4 md:mb-6'>
						<p className='text-xs md:text-sm text-neutral-light/60 mb-1'>
							You tried to access:
						</p>
						<code className='text-accent-yellow text-xs md:text-sm font-mono bg-primary-dark/70 px-2 py-1 rounded'>
							{location.pathname}
						</code>
					</div>
				</div>

				{/* Auto-redirect Notice */}
				{autoRedirect && (
					<div className='bg-accent-blue/10 border border-accent-blue/30 rounded-lg p-3 md:p-4 mb-6 md:mb-8 max-w-md mx-auto'>
						<p className='text-xs md:text-sm text-accent-blue mb-2'>
							🔄 Auto-redirecting to recipe list in {countdown}{' '}
							seconds
						</p>
						<button
							onClick={handleCancelRedirect}
							className='text-xs text-accent-coral hover:text-accent-yellow transition-colors underline'
						>
							Cancel auto-redirect
						</button>
					</div>
				)}

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-6 md:mb-8'>
					<Link
						to='/'
						className='game-button text-sm md:text-base px-6 md:px-8 py-2 md:py-3 inline-flex items-center gap-2'
					>
						🏠{' '}
						<span className='hidden sm:inline'>
							Return to Recipe List
						</span>
						<span className='sm:hidden'>Home</span>
					</Link>
					<button
						onClick={() => window.history.back()}
						className='game-button bg-accent-blue hover:bg-primary-teal text-sm md:text-base px-6 md:px-8 py-2 md:py-3 inline-flex items-center gap-2'
					>
						← <span className='hidden sm:inline'>Go Back</span>
						<span className='sm:hidden'>Back</span>
					</button>
				</div>

				{/* Helpful Suggestions */}
				<div className='max-w-lg mx-auto'>
					<h3 className='text-base md:text-lg font-semibold mb-3 md:mb-4 text-accent-yellow'>
						🔍 What you can do:
					</h3>
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm'>
						<div className='bg-primary-dark/50 rounded-lg p-3 border border-primary-teal/20'>
							<div className='text-primary-teal font-semibold mb-1'>
								Browse Recipes
							</div>
							<div className='text-neutral-light/70'>
								Discover amazing recipes in our collection
							</div>
						</div>
						<div className='bg-primary-dark/50 rounded-lg p-3 border border-primary-teal/20'>
							<div className='text-primary-teal font-semibold mb-1'>
								Search Recipes
							</div>
							<div className='text-neutral-light/70'>
								Find recipes by ingredients or cuisine
							</div>
						</div>
					</div>
				</div>

				{/* Gaming Stats */}
				<div className='mt-8 md:mt-12 pt-6 md:pt-8 border-t border-primary-teal/20'>
					<div className='flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm'>
						<div className='flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-accent-coral/20 rounded-full border border-accent-coral/30'>
							<span>💔</span>
							<span>Recipe Lost</span>
						</div>
						<div className='flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-accent-blue/20 rounded-full border border-accent-blue/30'>
							<span>🎯</span>
							<span className='hidden sm:inline'>
								Navigation Challenge
							</span>
							<span className='sm:hidden'>Nav Challenge</span>
						</div>
						<div className='flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-accent-yellow/20 rounded-full border border-accent-yellow/30'>
							<span>🏆</span>
							<span className='hidden sm:inline'>
								Explorer Badge
							</span>
							<span className='sm:hidden'>Explorer</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
