import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook for searching and filtering recipes
 * @param {Array} recipes - Array of recipe objects to search through
 * @param {string} searchTerm - The search term to filter by
 * @param {number} debounceMs - Debounce delay in milliseconds (default: 300)
 * @returns {Object} - Object containing filtered recipes and search state
 */
function useRecipeSearch(recipes, searchTerm, debounceMs = 300) {
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
	const [isSearching, setIsSearching] = useState(false);
	const [searchError, setSearchError] = useState(null);

	// Debounce the search term to prevent excessive filtering
	useEffect(() => {
		setIsSearching(true);
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
			setIsSearching(false);
		}, debounceMs);

		return () => clearTimeout(timer);
	}, [searchTerm, debounceMs]);

	// Memoized filtered recipes to prevent unnecessary recalculations
	const filteredRecipes = useMemo(() => {
		try {
			setSearchError(null);

			// Validate input data
			if (!Array.isArray(recipes)) {
				throw new Error('Recipes must be an array');
			}

			if (!debouncedSearchTerm.trim()) {
				return recipes;
			}

			const searchLower = debouncedSearchTerm.toLowerCase().trim();

			return recipes.filter((recipe) => {
				// Validate recipe structure
				if (!recipe || typeof recipe !== 'object') {
					console.warn('Invalid recipe object found:', recipe);
					return false;
				}
				try {
					// Search in recipe name
					if (
						recipe.name &&
						typeof recipe.name === 'string' &&
						recipe.name.toLowerCase().includes(searchLower)
					) {
						return true;
					}

					// Search in recipe description
					if (
						recipe.description &&
						typeof recipe.description === 'string' &&
						recipe.description.toLowerCase().includes(searchLower)
					) {
						return true;
					}

					// Search in ingredients
					if (Array.isArray(recipe.ingredients)) {
						const ingredientMatch = recipe.ingredients.some(
							(ingredient) =>
								ingredient &&
								ingredient.name &&
								typeof ingredient.name === 'string' &&
								ingredient.name
									.toLowerCase()
									.includes(searchLower),
						);
						if (ingredientMatch) {
							return true;
						}
					}

					// Search in tags
					if (Array.isArray(recipe.tags)) {
						const tagMatch = recipe.tags.some(
							(tag) =>
								tag &&
								typeof tag === 'string' &&
								tag.toLowerCase().includes(searchLower),
						);
						if (tagMatch) {
							return true;
						}
					}

					// Search in difficulty level
					if (
						recipe.difficulty &&
						typeof recipe.difficulty === 'string' &&
						recipe.difficulty.toLowerCase().includes(searchLower)
					) {
						return true;
					}

					// Search in game difficulty
					if (
						recipe.gameElements &&
						recipe.gameElements.difficulty &&
						typeof recipe.gameElements.difficulty === 'string' &&
						recipe.gameElements.difficulty
							.toLowerCase()
							.includes(searchLower)
					) {
						return true;
					}

					// Search in achievements
					if (
						recipe.gameElements &&
						Array.isArray(recipe.gameElements.achievements)
					) {
						const achievementMatch =
							recipe.gameElements.achievements.some(
								(achievement) =>
									achievement &&
									typeof achievement === 'string' &&
									achievement
										.toLowerCase()
										.includes(searchLower),
							);
						if (achievementMatch) {
							return true;
						}
					}

					return false;
				} catch (recipeError) {
					console.warn(
						'Error processing recipe during search:',
						recipeError,
						recipe,
					);
					return false;
				}
			});
		} catch (error) {
			console.error('Error during recipe search:', error);
			setSearchError(error.message);
			return recipes; // Return original recipes on error
		}
	}, [recipes, debouncedSearchTerm]);

	// Calculate search statistics
	const searchStats = useMemo(() => {
		const hasSearchTerm = debouncedSearchTerm.trim().length > 0;
		const totalRecipes = recipes.length;
		const filteredCount = filteredRecipes.length;
		const hasResults = filteredCount > 0;

		return {
			hasSearchTerm,
			totalRecipes,
			filteredCount,
			hasResults,
			isFiltered: hasSearchTerm && filteredCount < totalRecipes,
			isEmpty: hasSearchTerm && filteredCount === 0,
		};
	}, [recipes.length, filteredRecipes.length, debouncedSearchTerm]);

	return {
		filteredRecipes,
		searchStats,
		isSearching,
		debouncedSearchTerm,
		searchError,
	};
}

export default useRecipeSearch;
