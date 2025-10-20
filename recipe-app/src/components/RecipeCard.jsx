import { Link } from 'react-router-dom';
import { useState } from 'react';

function RecipeCard({ recipe }) {
	const [imageError, setImageError] = useState(false);
	const [imageLoading, setImageLoading] = useState(true);

	const handleImageError = (e) => {
		console.warn(`Failed to load image: ${recipe.image}`, e);
		setImageError(true);
		setImageLoading(false);
	};

	const handleImageLoad = (e) => {
		console.log(`Successfully loaded image: ${recipe.image}`, e.target.src);
		setImageLoading(false);
	};

	const getDifficultyClass = (difficulty) => {
		switch (difficulty.toLowerCase()) {
			case 'easy':
				return 'difficulty-easy';
			case 'medium':
				return 'difficulty-medium';
			case 'hard':
				return 'difficulty-hard';
			default:
				return 'difficulty-medium';
		}
	};

	const formatCookTime = (minutes) => {
		if (minutes < 60) {
			return `${minutes}m`;
		}
		const hours = Math.floor(minutes / 60);
		const remainingMinutes = minutes % 60;
		return remainingMinutes > 0
			? `${hours}h ${remainingMinutes}m`
			: `${hours}h`;
	};

	return (
		<Link to={`/recipe/${recipe.id}`} className='block'>
			<div className='game-card game-card-hover p-4 md:p-6 h-full flex flex-col'>
				{/* Recipe Image */}
				<div className='w-full h-36 md:h-48 bg-gradient-to-br from-primary-teal/20 to-accent-blue/20 rounded-lg mb-3 md:mb-4 flex items-center justify-center border border-primary-teal/30 relative overflow-hidden'>
					{recipe.image && !imageError ? (
						<>
							{imageLoading && (
								<div className='absolute inset-0 flex items-center justify-center bg-primary-teal/10'>
									<div className='w-6 h-6 border-2 border-primary-teal border-t-transparent rounded-full'></div>
								</div>
							)}
							<img
								src={recipe.image}
								alt={recipe.name}
								className={`w-full h-full object-cover ${
									imageLoading ? 'opacity-0' : 'opacity-100'
								}`}
								onError={handleImageError}
								onLoad={handleImageLoad}
							/>
						</>
					) : (
						<div className='text-primary-teal/60 text-3xl md:text-4xl'>
							🍽️
						</div>
					)}
				</div>

				{/* Recipe Header */}
				<div className='flex-1'>
					<h3 className='game-title text-lg md:text-xl font-bold mb-2 line-clamp-2'>
						{recipe.name}
					</h3>

					<p className='game-subtitle text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 md:line-clamp-3'>
						{recipe.description}
					</p>

					{/* Gaming Elements Row */}
					<div className='flex items-center justify-between mb-3 md:mb-4 gap-2'>
						<div className='xp-badge flex-shrink-0'>
							⭐ {recipe.gameElements.xpReward} XP
						</div>
						<div
							className={`difficulty-badge flex-shrink-0 ${getDifficultyClass(
								recipe.difficulty,
							)}`}
						>
							<span className='hidden sm:inline'>
								{recipe.gameElements.difficulty}
							</span>
							<span className='sm:hidden'>
								{recipe.gameElements.difficulty.charAt(0)}
							</span>
						</div>
					</div>

					{/* Recipe Info */}
					<div className='flex items-center justify-between text-xs md:text-sm text-neutral-light/80 mb-3 md:mb-4'>
						<div className='flex items-center gap-1'>
							<span>⏱️</span>
							<span>{formatCookTime(recipe.cookTime)}</span>
						</div>
						<div className='flex items-center gap-1'>
							<span>👥</span>
							<span className='hidden sm:inline'>
								{recipe.servings} servings
							</span>
							<span className='sm:hidden'>{recipe.servings}</span>
						</div>
					</div>

					{/* Tags */}
					<div className='flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4'>
						{recipe.tags.slice(0, 2).map((tag, index) => (
							<span
								key={index}
								className='px-1.5 md:px-2 py-0.5 md:py-1 bg-primary-teal/20 text-primary-teal text-xs rounded-full border border-primary-teal/30 truncate max-w-16 sm:max-w-20 md:max-w-none'
							>
								{tag}
							</span>
						))}
						{/* Show third tag only on larger screens */}
						{recipe.tags.length > 2 && (
							<span className='hidden md:inline-block px-2 py-1 bg-primary-teal/20 text-primary-teal text-xs rounded-full border border-primary-teal/30'>
								{recipe.tags[2]}
							</span>
						)}
						{recipe.tags.length > 2 && (
							<span className='px-1.5 md:px-2 py-0.5 md:py-1 bg-accent-yellow/20 text-accent-yellow text-xs rounded-full border border-accent-yellow/30'>
								<span className='md:hidden'>
									+{recipe.tags.length - 2}
								</span>
								<span className='hidden md:inline'>
									+{recipe.tags.length - 3}
								</span>
							</span>
						)}
					</div>
				</div>

				{/* Achievements Preview */}
				{recipe.gameElements.achievements &&
					recipe.gameElements.achievements.length > 0 && (
						<div className='mt-auto pt-4 border-t border-primary-teal/20'>
							<div className='flex items-center gap-2 text-xs text-accent-yellow'>
								<span>🏆</span>
								<span className='truncate'>
									{recipe.gameElements.achievements[0]}
									{recipe.gameElements.achievements.length >
										1 &&
										` +${
											recipe.gameElements.achievements
												.length - 1
										} more`}
								</span>
							</div>
						</div>
					)}
			</div>
		</Link>
	);
}

export default RecipeCard;
