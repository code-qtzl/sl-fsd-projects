import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getRecipeById } from '../data/mockRecipes';
import LoadingSpinner from './LoadingSpinner';

function RecipeDetail() {
	const { id } = useParams();
	const [recipe, setRecipe] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [imageError, setImageError] = useState(false);

	const handleImageError = () => {
		setImageError(true);
	};

	useEffect(() => {
		const loadRecipe = async () => {
			setLoading(true);
			setError(null);
			setImageError(false);

			try {
				// Simulate async loading with a small delay
				await new Promise((resolve) => setTimeout(resolve, 300));

				const foundRecipe = getRecipeById(id);
				if (!foundRecipe) {
					setError('Recipe not found');
				} else {
					setRecipe(foundRecipe);
				}
			} catch (err) {
				setError('Failed to load recipe');
				console.error('Error loading recipe:', err);
			} finally {
				setLoading(false);
			}
		};

		loadRecipe();
	}, [id]);

	if (loading) {
		return (
			<div className='text-neutral-light max-w-6xl mx-auto'>
				{/* Navigation Skeleton */}
				<div className='mb-3 sm:mb-4 md:mb-6'>
					<div className='h-4 md:h-5 bg-primary-teal/20 rounded w-32 md:w-40'></div>
				</div>

				{/* Recipe Header Skeleton */}
				<div className='bg-primary-dark/50 rounded-lg p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 border border-primary-teal/20'>
					<div className='flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6'>
						<div className='lg:w-1/3'>
							<div className='w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-primary-teal/20 rounded-lg'></div>
						</div>
						<div className='lg:w-2/3'>
							<div className='h-6 sm:h-8 md:h-10 bg-accent-yellow/20 rounded mb-2 sm:mb-3 md:mb-4'></div>
							<div className='h-4 md:h-5 bg-primary-teal/10 rounded mb-3 sm:mb-4 md:mb-6 w-3/4'></div>

							{/* Stats Skeleton */}
							<div className='grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6'>
								{Array.from({ length: 4 }).map((_, i) => (
									<div
										key={i}
										className='bg-primary-dark/70 p-2 sm:p-2.5 md:p-3 rounded-lg'
									>
										<div className='h-4 md:h-5 bg-accent-yellow/20 rounded mb-1'></div>
										<div className='h-3 bg-primary-teal/10 rounded'></div>
									</div>
								))}
							</div>

							{/* Gaming Elements Skeleton */}
							<div className='bg-gradient-to-r from-primary-teal/20 to-accent-blue/20 p-3 md:p-4 rounded-lg border border-primary-teal/30'>
								<div className='h-5 md:h-6 bg-accent-yellow/20 rounded mb-2 md:mb-3 w-32'></div>
								<div className='flex flex-wrap gap-2 md:gap-4'>
									<div className='h-4 md:h-5 bg-primary-teal/20 rounded w-16'></div>
									<div className='h-4 md:h-5 bg-primary-teal/20 rounded w-20'></div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Content Skeleton */}
				<div className='grid lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8'>
					<div className='lg:col-span-1'>
						<div className='bg-primary-dark/50 rounded-lg p-3 sm:p-4 md:p-6 border border-primary-teal/20'>
							<div className='h-5 md:h-6 bg-accent-yellow/20 rounded mb-3 md:mb-4 w-24'></div>
							<div className='space-y-3'>
								{Array.from({ length: 6 }).map((_, i) => (
									<div
										key={i}
										className='h-10 bg-primary-teal/10 rounded'
									></div>
								))}
							</div>
						</div>
					</div>
					<div className='lg:col-span-2'>
						<div className='bg-primary-dark/50 rounded-lg p-3 sm:p-4 md:p-6 border border-primary-teal/20'>
							<div className='h-5 md:h-6 bg-accent-yellow/20 rounded mb-3 sm:mb-4 md:mb-6 w-32'></div>
							<div className='space-y-2 sm:space-y-3 md:space-y-4'>
								{Array.from({ length: 5 }).map((_, i) => (
									<div
										key={i}
										className='bg-primary-dark/70 p-2.5 sm:p-3 md:p-4 rounded-lg'
									>
										<div className='h-16 md:h-20 bg-primary-teal/10 rounded'></div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Loading Message */}
				<div className='text-center mt-8'>
					<LoadingSpinner
						size='lg'
						message='Loading delicious recipe details...'
					/>
				</div>
			</div>
		);
	}

	if (error || !recipe) {
		return (
			<div className='text-neutral-light max-w-6xl mx-auto'>
				<Link
					to='/'
					className='inline-flex items-center gap-1 mb-3 sm:mb-4 md:mb-6 text-primary-teal hover:text-accent-yellow transition-colors font-semibold text-sm md:text-base'
				>
					←{' '}
					<span className='hidden sm:inline'>
						Back to Recipe List
					</span>
					<span className='sm:hidden'>Back</span>
				</Link>

				<div className='bg-primary-dark/50 rounded-lg p-4 md:p-6 border border-accent-coral/30 text-center'>
					<div className='text-4xl md:text-6xl mb-4 game-float'>
						🔍
					</div>
					<h2 className='text-xl md:text-2xl font-bold mb-3 md:mb-4 text-accent-coral game-title'>
						{error === 'Recipe not found'
							? 'Recipe Not Found'
							: 'Error Loading Recipe'}
					</h2>
					<p className='text-sm md:text-base mb-4 md:mb-6 text-neutral-light/80 leading-relaxed'>
						{error === 'Recipe not found'
							? `The recipe with ID "${id}" doesn't exist in our cookbook. It might have been removed or the link is incorrect.`
							: 'There was an error loading this recipe. Please try again or return to the recipe list.'}
					</p>

					{/* Error Actions */}
					<div className='flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center mb-4 md:mb-6'>
						<Link
							to='/'
							className='game-button text-sm md:text-base px-4 md:px-6 py-2 md:py-3 inline-flex items-center gap-2'
						>
							🏠{' '}
							<span className='hidden sm:inline'>
								Browse All Recipes
							</span>
							<span className='sm:hidden'>All Recipes</span>
						</Link>
						<button
							onClick={() => window.location.reload()}
							className='game-button bg-accent-blue hover:bg-primary-teal text-sm md:text-base px-4 md:px-6 py-2 md:py-3 inline-flex items-center gap-2'
						>
							🔄{' '}
							<span className='hidden sm:inline'>Try Again</span>
							<span className='sm:hidden'>Retry</span>
						</button>
					</div>

					{/* Helpful Info */}
					<div className='text-xs md:text-sm text-neutral-light/60'>
						Recipe ID:{' '}
						<code className='bg-primary-dark/70 px-1 py-0.5 rounded font-mono'>
							{id}
						</code>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='text-neutral-light max-w-6xl mx-auto'>
			{/* Navigation */}
			<Link
				to='/'
				className='inline-flex items-center gap-1 mb-3 sm:mb-4 md:mb-6 text-primary-teal hover:text-accent-yellow transition-colors font-semibold text-sm md:text-base'
			>
				← <span className='hidden sm:inline'>Back to Recipe List</span>
				<span className='sm:hidden'>Back</span>
			</Link>

			{/* Recipe Header */}
			<div className='bg-primary-dark/50 rounded-lg p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8 border border-primary-teal/20'>
				<div className='flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-6'>
					<div className='lg:w-1/3'>
						<div className='w-full h-40 sm:h-48 md:h-56 lg:h-64 bg-gradient-to-br from-primary-teal/20 to-accent-blue/20 rounded-lg border-2 border-primary-teal/30 flex items-center justify-center relative overflow-hidden'>
							{recipe.image && !imageError ? (
								<img
									src={recipe.image}
									alt={recipe.name}
									className='w-full h-full object-cover'
									onError={handleImageError}
								/>
							) : (
								<div className='text-primary-teal/60 text-5xl md:text-6xl'>
									🍽️
								</div>
							)}
						</div>
					</div>
					<div className='lg:w-2/3'>
						<h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 text-accent-yellow game-title'>
							{recipe.name}
						</h1>
						<p className='text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-6 text-neutral-light/90 leading-relaxed'>
							{recipe.description}
						</p>

						{/* Recipe Stats */}
						<div className='grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-6'>
							<div className='bg-primary-dark/70 p-2 sm:p-2.5 md:p-3 rounded-lg text-center'>
								<div className='text-accent-yellow font-bold text-sm sm:text-base md:text-lg'>
									{recipe.prepTime}m
								</div>
								<div className='text-xs sm:text-xs md:text-sm text-neutral-light/70'>
									<span className='hidden xs:inline'>
										Prep Time
									</span>
									<span className='xs:hidden'>Prep</span>
								</div>
							</div>
							<div className='bg-primary-dark/70 p-2 sm:p-2.5 md:p-3 rounded-lg text-center'>
								<div className='text-accent-yellow font-bold text-sm sm:text-base md:text-lg'>
									{recipe.cookTime}m
								</div>
								<div className='text-xs sm:text-xs md:text-sm text-neutral-light/70'>
									<span className='hidden xs:inline'>
										Cook Time
									</span>
									<span className='xs:hidden'>Cook</span>
								</div>
							</div>
							<div className='bg-primary-dark/70 p-2 sm:p-2.5 md:p-3 rounded-lg text-center'>
								<div className='text-accent-yellow font-bold text-sm sm:text-base md:text-lg'>
									{recipe.servings}
								</div>
								<div className='text-xs sm:text-xs md:text-sm text-neutral-light/70'>
									Servings
								</div>
							</div>
							<div className='bg-primary-dark/70 p-2 sm:p-2.5 md:p-3 rounded-lg text-center'>
								<div className='text-accent-yellow font-bold text-sm sm:text-base md:text-lg'>
									{recipe.difficulty}
								</div>
								<div className='text-xs sm:text-xs md:text-sm text-neutral-light/70'>
									Difficulty
								</div>
							</div>
						</div>

						{/* Gaming Elements */}
						<div className='bg-gradient-to-r from-primary-teal/20 to-accent-blue/20 p-3 md:p-4 rounded-lg border border-primary-teal/30'>
							<h3 className='text-base md:text-lg font-semibold mb-2 md:mb-3 text-accent-yellow'>
								🎮{' '}
								<span className='hidden sm:inline'>
									Gaming Stats
								</span>
								<span className='sm:hidden'>Stats</span>
							</h3>
							<div className='flex flex-wrap gap-2 md:gap-4'>
								<div className='flex items-center gap-1 md:gap-2'>
									<span className='text-accent-yellow'>
										⭐
									</span>
									<span className='font-semibold text-sm md:text-base'>
										{recipe.gameElements.xpReward} XP
									</span>
								</div>
								<div className='flex items-center gap-1 md:gap-2'>
									<span className='text-accent-coral'>
										⚔️
									</span>
									<span className='font-semibold text-sm md:text-base'>
										{recipe.gameElements.difficulty}
									</span>
								</div>
							</div>
							{recipe.gameElements.achievements.length > 0 && (
								<div className='mt-2 md:mt-3'>
									<div className='text-xs md:text-sm text-neutral-light/70 mb-1 md:mb-2'>
										<span className='hidden sm:inline'>
											Achievements:
										</span>
										<span className='sm:hidden'>Achv:</span>
									</div>
									<div className='flex flex-wrap gap-1 md:gap-2'>
										{recipe.gameElements.achievements.map(
											(achievement, index) => (
												<span
													key={index}
													className='bg-accent-blue/20 text-accent-blue px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs md:text-sm border border-accent-blue/30'
												>
													🏆{' '}
													<span className='hidden sm:inline'>
														{achievement}
													</span>
													<span className='sm:hidden'>
														{achievement.slice(
															0,
															10,
														)}
														...
													</span>
												</span>
											),
										)}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Recipe Content */}
			<div className='grid lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8'>
				{/* Ingredients */}
				<div className='lg:col-span-1 order-2 lg:order-1'>
					<div className='bg-primary-dark/50 rounded-lg p-3 sm:p-4 md:p-6 border border-primary-teal/20'>
						<h2 className='text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 text-accent-yellow'>
							🥘 Ingredients
						</h2>
						<ul className='space-y-3'>
							{recipe.ingredients.map((ingredient, index) => (
								<li
									key={index}
									className={`flex justify-between items-start p-2 rounded ${
										ingredient.optional
											? 'bg-accent-blue/10 border border-accent-blue/20'
											: 'bg-primary-teal/10 border border-primary-teal/20'
									}`}
								>
									<span className='font-medium'>
										{ingredient.name}
									</span>
									<span className='text-neutral-light/70 text-sm ml-2'>
										{ingredient.amount}
										{ingredient.optional && (
											<span className='text-accent-blue ml-1'>
												(optional)
											</span>
										)}
									</span>
								</li>
							))}
						</ul>
					</div>

					{/* Nutrition Info */}
					<div className='bg-primary-dark/50 rounded-lg p-3 sm:p-4 md:p-6 border border-primary-teal/20 mt-3 sm:mt-4 md:mt-6'>
						<h3 className='text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 text-accent-yellow'>
							📊 Nutrition
						</h3>
						<div className='space-y-2'>
							<div className='flex justify-between'>
								<span>Calories:</span>
								<span className='font-semibold text-accent-yellow'>
									{recipe.nutrition.calories}
								</span>
							</div>
							<div className='flex justify-between'>
								<span>Protein:</span>
								<span className='font-semibold'>
									{recipe.nutrition.protein}
								</span>
							</div>
							<div className='flex justify-between'>
								<span>Carbs:</span>
								<span className='font-semibold'>
									{recipe.nutrition.carbs}
								</span>
							</div>
							<div className='flex justify-between'>
								<span>Fat:</span>
								<span className='font-semibold'>
									{recipe.nutrition.fat}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Instructions */}
				<div className='lg:col-span-2 order-1 lg:order-2'>
					<div className='bg-primary-dark/50 rounded-lg p-3 sm:p-4 md:p-6 border border-primary-teal/20'>
						<h2 className='text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6 text-accent-yellow'>
							👨‍🍳 Instructions
						</h2>
						<div className='space-y-2 sm:space-y-3 md:space-y-4'>
							{recipe.instructions.map((instruction, index) => (
								<div
									key={index}
									className='bg-primary-dark/70 p-2.5 sm:p-3 md:p-4 rounded-lg border border-primary-teal/20'
								>
									<div className='flex items-start gap-2 sm:gap-3 md:gap-4'>
										<div className='bg-primary-teal text-primary-dark font-bold text-xs sm:text-sm md:text-lg w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0'>
											{instruction.step}
										</div>
										<div className='flex-1'>
											<p className='text-neutral-light mb-1.5 sm:mb-2 text-xs sm:text-sm md:text-base leading-relaxed'>
												{instruction.description}
											</p>
											{instruction.tip && (
												<div className='bg-accent-yellow/10 border border-accent-yellow/20 p-1.5 sm:p-2 rounded text-xs sm:text-xs md:text-sm'>
													<span className='text-accent-yellow font-semibold'>
														💡{' '}
														<span className='hidden sm:inline'>
															Tip:
														</span>
													</span>{' '}
													<span className='text-neutral-light/90'>
														{instruction.tip}
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Tags */}
					<div className='mt-3 sm:mt-4 md:mt-6'>
						<h3 className='text-sm sm:text-base md:text-lg font-semibold mb-2 md:mb-3 text-accent-yellow'>
							🏷️ Tags
						</h3>
						<div className='flex flex-wrap gap-1 sm:gap-1.5 md:gap-2'>
							{recipe.tags.map((tag, index) => (
								<span
									key={index}
									className='bg-primary-teal/20 text-primary-teal px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-xs md:text-sm border border-primary-teal/30 hover:bg-primary-teal/30 transition-colors'
								>
									{tag}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Navigation */}
			<div className='mt-6 sm:mt-8 md:mt-12 text-center'>
				<Link
					to='/'
					className='game-button inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-8 py-2 sm:py-2.5 md:py-3'
				>
					←{' '}
					<span className='hidden sm:inline'>
						Back to All Recipes
					</span>
					<span className='sm:hidden'>All Recipes</span>
				</Link>
			</div>
		</div>
	);
}

export default RecipeDetail;
