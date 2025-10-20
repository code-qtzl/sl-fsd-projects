import { useState, useEffect } from 'react';
import { mockRecipes } from '../data/mockRecipes';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import SkeletonCard from './SkeletonCard';
import LoadingSpinner from './LoadingSpinner';
import useRecipeSearch from '../hooks/useRecipeSearch';

function RecipeList() {
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');

	// Use the custom search hook
	const { filteredRecipes, searchStats, isSearching, searchError } =
		useRecipeSearch(recipes, searchTerm);

	useEffect(() => {
		// Simulate loading state for better UX
		const loadRecipes = () => {
			setLoading(true);
			// Simulate async data loading
			setTimeout(() => {
				setRecipes(mockRecipes);
				setLoading(false);
			}, 300);
		};

		loadRecipes();
	}, []);

	const handleSearch = (term) => {
		setSearchTerm(term);
	};

	const handleClearSearch = () => {
		setSearchTerm('');
	};

	if (loading) {
		return (
			<div className='text-neutral-light'>
				{/* Header Section */}
				<div className='mb-8'>
					<h2 className='game-title text-3xl font-bold mb-2'>
						Recipe Collection
					</h2>
					<p className='game-subtitle text-lg'>
						Loading epic recipes...
					</p>
				</div>

				{/* Search Bar Skeleton */}
				<div className='mb-6'>
					<div className='h-12 bg-primary-teal/20 rounded-lg'></div>
				</div>

				{/* Loading Skeleton Grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'>
					{Array.from({ length: 6 }).map((_, index) => (
						<SkeletonCard key={index} />
					))}
				</div>
			</div>
		);
	}

	return (
		<div className='text-neutral-light'>
			{/* Header Section */}
			<div className='mb-6 md:mb-8'>
				<h2 className='game-title text-2xl md:text-3xl lg:text-4xl font-bold mb-2'>
					Recipe Collection
				</h2>
				<p className='game-subtitle text-base md:text-lg'>
					Discover {recipes.length} epic recipes and level up your
					cooking skills!
				</p>

				{/* Recipe Stats */}
				<div className='flex flex-wrap gap-2 md:gap-4 mt-4 text-xs md:text-sm'>
					<div className='flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-primary-teal/20 rounded-full border border-primary-teal/30'>
						<span>⭐</span>
						<span className='whitespace-nowrap'>
							{recipes.reduce(
								(total, recipe) =>
									total + recipe.gameElements.xpReward,
								0,
							)}{' '}
							<span className='hidden sm:inline'>Total </span>XP
						</span>
					</div>
					<div className='flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-accent-blue/20 rounded-full border border-accent-blue/30'>
						<span>🏆</span>
						<span className='whitespace-nowrap'>
							{recipes.reduce(
								(total, recipe) =>
									total +
									recipe.gameElements.achievements.length,
								0,
							)}{' '}
							<span className='hidden sm:inline'>
								Achievements
							</span>
							<span className='sm:hidden'>Achv</span>
						</span>
					</div>
					<div className='flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-accent-yellow/20 rounded-full border border-accent-yellow/30'>
						<span>🍽️</span>
						<span className='whitespace-nowrap'>
							{recipes.reduce(
								(total, recipe) => total + recipe.servings,
								0,
							)}{' '}
							<span className='hidden sm:inline'>Total </span>
							Servings
						</span>
					</div>
				</div>
			</div>

			{/* Search Bar */}
			<SearchBar
				onSearch={handleSearch}
				placeholder='Search recipes by name, ingredients, tags, or difficulty...'
				initialValue={searchTerm}
			/>

			{/* Search Error Display */}
			{searchError && (
				<div className='mb-4 md:mb-6 bg-accent-coral/10 border border-accent-coral/30 rounded-lg p-3 md:p-4'>
					<div className='flex items-center gap-2 text-accent-coral'>
						<span>⚠️</span>
						<span className='font-semibold text-sm md:text-base'>
							Search Error
						</span>
					</div>
					<p className='text-xs md:text-sm text-neutral-light/80 mt-1'>
						{searchError}. Showing all recipes instead.
					</p>
				</div>
			)}

			{/* Search Results Info */}
			{searchStats.hasSearchTerm && (
				<div className='mb-4 md:mb-6 flex items-center justify-between flex-wrap gap-2 md:gap-4'>
					<div className='flex items-center gap-2 md:gap-4'>
						<div className='text-xs md:text-sm text-neutral-light/80'>
							{isSearching ? (
								<LoadingSpinner
									size='sm'
									message={
										<>
											<span className='hidden sm:inline'>
												Searching...
											</span>
											<span className='sm:hidden'>
												...
											</span>
										</>
									}
								/>
							) : (
								<span>
									<span className='hidden sm:inline'>
										Found{' '}
									</span>
									<span className='text-accent-yellow font-semibold'>
										{searchStats.filteredCount}
									</span>
									<span className='hidden sm:inline'>
										{' '}
										of {searchStats.totalRecipes} recipes
									</span>
									<span className='sm:hidden'>
										/{searchStats.totalRecipes}
									</span>
								</span>
							)}
						</div>
						{searchStats.isFiltered && (
							<div className='text-xs px-2 py-1 bg-primary-teal/20 rounded-full border border-primary-teal/30'>
								<span className='hidden sm:inline'>
									Filtered results
								</span>
								<span className='sm:hidden'>Filtered</span>
							</div>
						)}
					</div>
					{searchStats.hasSearchTerm && (
						<button
							onClick={handleClearSearch}
							className='text-xs md:text-sm text-accent-coral hover:text-accent-yellow flex items-center gap-1'
						>
							<svg
								className='w-3 h-3 md:w-4 md:h-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
							<span className='hidden sm:inline'>
								Clear search
							</span>
							<span className='sm:hidden'>Clear</span>
						</button>
					)}
				</div>
			)}

			{/* Recipe Grid */}
			{filteredRecipes.length > 0 ? (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'>
					{filteredRecipes.map((recipe) => (
						<RecipeCard key={recipe.id} recipe={recipe} />
					))}
				</div>
			) : (
				/* No Results State */
				<div className='text-center py-12'>
					{searchStats.isEmpty ? (
						/* No Search Results */
						<>
							<div className='text-6xl mb-4'>🔍</div>
							<h3 className='text-xl font-semibold mb-2 text-neutral-light/80'>
								No recipes match your search
							</h3>
							<p className='text-neutral-light/60 mb-6'>
								Try searching for different ingredients, recipe
								names, or cooking styles.
								<br />
								<span className='text-sm'>
									Search suggestions: "spicy", "chicken",
									"easy", "pasta", "healthy"
								</span>
							</p>
							<div className='flex flex-wrap gap-3 justify-center mb-6'>
								{[
									'spicy',
									'chicken',
									'easy',
									'pasta',
									'healthy',
								].map((suggestion) => (
									<button
										key={suggestion}
										onClick={() => handleSearch(suggestion)}
										className='px-3 py-1 text-sm bg-primary-teal/20 hover:bg-primary-teal/30 border border-primary-teal/30 hover:border-primary-teal rounded-full'
									>
										{suggestion}
									</button>
								))}
							</div>
							<button
								onClick={handleClearSearch}
								className='game-button'
							>
								Show All Recipes
							</button>
						</>
					) : (
						/* No Recipes Loaded */
						<>
							<div className='text-6xl mb-4'>🍽️</div>
							<h3 className='text-xl font-semibold mb-2 text-neutral-light/80'>
								No recipes found
							</h3>
							<p className='text-neutral-light/60 mb-6'>
								Check back later for new culinary adventures!
							</p>
							<button
								onClick={() => window.location.reload()}
								className='game-button'
							>
								Refresh Recipes
							</button>
						</>
					)}
				</div>
			)}

			{/* Footer Stats */}
			{filteredRecipes.length > 0 && (
				<div className='mt-12 pt-8 border-t border-primary-teal/20 text-center'>
					<p className='game-subtitle text-sm'>
						{searchStats.hasSearchTerm ? (
							<>
								Found {filteredRecipes.length} recipe
								{filteredRecipes.length !== 1 ? 's' : ''}{' '}
								matching your search.
								<br />
								Choose one above and begin your culinary
								adventure!
							</>
						) : (
							'Ready to start your culinary adventure? Choose a recipe above and begin cooking!'
						)}
					</p>
				</div>
			)}
		</div>
	);
}

export default RecipeList;
