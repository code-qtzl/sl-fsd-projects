// Recipe utility functions for data manipulation and formatting

/**
 * Formats cooking time into a human-readable string
 * @param {number} minutes - Time in minutes
 * @returns {string} Formatted time string
 */
export const formatCookTime = (minutes) => {
	if (minutes < 60) {
		return `${minutes} min`;
	}

	const hours = Math.floor(minutes / 60);
	const remainingMinutes = minutes % 60;

	if (remainingMinutes === 0) {
		return `${hours} hr${hours > 1 ? 's' : ''}`;
	}

	return `${hours} hr${hours > 1 ? 's' : ''} ${remainingMinutes} min`;
};

/**
 * Formats servings count with proper pluralization
 * @param {number} servings - Number of servings
 * @returns {string} Formatted servings string
 */
export const formatServings = (servings) => {
	return `${servings} serving${servings > 1 ? 's' : ''}`;
};

/**
 * Gets difficulty level color for styling
 * @param {string} difficulty - Recipe difficulty level
 * @returns {string} CSS color class or hex color
 */
export const getDifficultyColor = (difficulty) => {
	const difficultyColors = {
		Easy: '#5AA89A', // Teal
		Medium: '#FFB800', // Yellow
		Hard: '#FF8888', // Coral
		Novice: '#5AA89A',
		Apprentice: '#FFB800',
		Warrior: '#FF8888',
		Veteran: '#FF8888',
		Master: '#448BFF', // Blue
		Legendary: '#1D233B', // Dark navy
	};

	return difficultyColors[difficulty] || '#F8F8F8';
};

/**
 * Calculates total time (prep + cook time)
 * @param {number} prepTime - Preparation time in minutes
 * @param {number} cookTime - Cooking time in minutes
 * @returns {number} Total time in minutes
 */
export const getTotalTime = (prepTime, cookTime) => {
	return prepTime + cookTime;
};

/**
 * Formats ingredient list for display
 * @param {Array} ingredients - Array of ingredient objects
 * @returns {Array} Formatted ingredient strings
 */
export const formatIngredients = (ingredients) => {
	return ingredients.map((ingredient) => {
		const optionalText = ingredient.optional ? ' (optional)' : '';
		return `${ingredient.amount} ${ingredient.name}${optionalText}`;
	});
};

/**
 * Gets all unique tags from a list of recipes
 * @param {Array} recipes - Array of recipe objects
 * @returns {Array} Sorted array of unique tags
 */
export const getAllTags = (recipes) => {
	const tagSet = new Set();

	recipes.forEach((recipe) => {
		recipe.tags.forEach((tag) => tagSet.add(tag));
	});

	return Array.from(tagSet).sort();
};

/**
 * Filters recipes based on search criteria
 * @param {Array} recipes - Array of recipe objects to filter
 * @param {string} searchTerm - Search term to match against
 * @returns {Array} Filtered array of recipes
 */
export const filterRecipes = (recipes, searchTerm) => {
	if (!searchTerm || searchTerm.trim() === '') {
		return recipes;
	}

	const term = searchTerm.toLowerCase().trim();

	return recipes.filter((recipe) => {
		// Search in recipe name
		if (recipe.name.toLowerCase().includes(term)) {
			return true;
		}

		// Search in recipe description
		if (recipe.description.toLowerCase().includes(term)) {
			return true;
		}

		// Search in ingredients
		const ingredientMatch = recipe.ingredients.some((ingredient) =>
			ingredient.name.toLowerCase().includes(term),
		);
		if (ingredientMatch) {
			return true;
		}

		// Search in tags
		const tagMatch = recipe.tags.some((tag) =>
			tag.toLowerCase().includes(term),
		);
		if (tagMatch) {
			return true;
		}

		// Search in instructions
		const instructionMatch = recipe.instructions.some((instruction) =>
			instruction.description.toLowerCase().includes(term),
		);
		if (instructionMatch) {
			return true;
		}

		return false;
	});
};

/**
 * Filters recipes by specific criteria
 * @param {Array} recipes - Array of recipe objects to filter
 * @param {Object} filters - Filter criteria object
 * @returns {Array} Filtered array of recipes
 */
export const filterRecipesByCriteria = (recipes, filters) => {
	let filteredRecipes = [...recipes];

	// Filter by difficulty
	if (filters.difficulty && filters.difficulty.length > 0) {
		filteredRecipes = filteredRecipes.filter(
			(recipe) =>
				filters.difficulty.includes(recipe.difficulty) ||
				filters.difficulty.includes(recipe.gameElements.difficulty),
		);
	}

	// Filter by maximum cook time
	if (filters.maxCookTime) {
		filteredRecipes = filteredRecipes.filter(
			(recipe) => recipe.cookTime <= filters.maxCookTime,
		);
	}

	// Filter by tags
	if (filters.tags && filters.tags.length > 0) {
		filteredRecipes = filteredRecipes.filter((recipe) =>
			filters.tags.some((tag) => recipe.tags.includes(tag)),
		);
	}

	// Filter by servings
	if (filters.servings) {
		filteredRecipes = filteredRecipes.filter(
			(recipe) => recipe.servings >= filters.servings,
		);
	}

	return filteredRecipes;
};

/**
 * Sorts recipes by specified criteria
 * @param {Array} recipes - Array of recipe objects to sort
 * @param {string} sortBy - Sort criteria ('name', 'cookTime', 'difficulty', 'xp')
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} Sorted array of recipes
 */
export const sortRecipes = (recipes, sortBy = 'name', order = 'asc') => {
	const sortedRecipes = [...recipes];

	sortedRecipes.sort((a, b) => {
		let valueA, valueB;

		switch (sortBy) {
			case 'name':
				valueA = a.name.toLowerCase();
				valueB = b.name.toLowerCase();
				break;
			case 'cookTime':
				valueA = a.cookTime;
				valueB = b.cookTime;
				break;
			case 'difficulty': {
				// Define difficulty order for sorting
				const difficultyOrder = {
					Easy: 1,
					Novice: 1,
					Medium: 2,
					Apprentice: 2,
					Warrior: 2,
					Hard: 3,
					Veteran: 3,
					Master: 3,
					Legendary: 4,
				};
				valueA =
					difficultyOrder[a.difficulty] ||
					difficultyOrder[a.gameElements.difficulty] ||
					0;
				valueB =
					difficultyOrder[b.difficulty] ||
					difficultyOrder[b.gameElements.difficulty] ||
					0;
				break;
			}
			case 'xp':
				valueA = a.gameElements.xpReward;
				valueB = b.gameElements.xpReward;
				break;
			case 'servings':
				valueA = a.servings;
				valueB = b.servings;
				break;
			default:
				valueA = a.name.toLowerCase();
				valueB = b.name.toLowerCase();
		}

		if (order === 'desc') {
			return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
		} else {
			return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
		}
	});

	return sortedRecipes;
};

/**
 * Gets recipe statistics for dashboard/summary views
 * @param {Array} recipes - Array of recipe objects
 * @returns {Object} Statistics object
 */
export const getRecipeStats = (recipes) => {
	if (!recipes || recipes.length === 0) {
		return {
			totalRecipes: 0,
			averageCookTime: 0,
			totalXP: 0,
			difficultyBreakdown: {},
			tagBreakdown: {},
		};
	}

	const totalRecipes = recipes.length;
	const totalCookTime = recipes.reduce(
		(sum, recipe) => sum + recipe.cookTime,
		0,
	);
	const averageCookTime = Math.round(totalCookTime / totalRecipes);
	const totalXP = recipes.reduce(
		(sum, recipe) => sum + recipe.gameElements.xpReward,
		0,
	);

	// Difficulty breakdown
	const difficultyBreakdown = {};
	recipes.forEach((recipe) => {
		const difficulty = recipe.difficulty;
		difficultyBreakdown[difficulty] =
			(difficultyBreakdown[difficulty] || 0) + 1;
	});

	// Tag breakdown
	const tagBreakdown = {};
	recipes.forEach((recipe) => {
		recipe.tags.forEach((tag) => {
			tagBreakdown[tag] = (tagBreakdown[tag] || 0) + 1;
		});
	});

	return {
		totalRecipes,
		averageCookTime,
		totalXP,
		difficultyBreakdown,
		tagBreakdown,
	};
};

/**
 * Validates recipe data structure
 * @param {Object} recipe - Recipe object to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export const validateRecipe = (recipe) => {
	const errors = [];

	// Required fields
	const requiredFields = [
		'id',
		'name',
		'description',
		'cookTime',
		'prepTime',
		'servings',
		'difficulty',
		'ingredients',
		'instructions',
		'tags',
	];

	requiredFields.forEach((field) => {
		if (!recipe[field]) {
			errors.push(`Missing required field: ${field}`);
		}
	});

	// Validate arrays
	if (recipe.ingredients && !Array.isArray(recipe.ingredients)) {
		errors.push('Ingredients must be an array');
	}

	if (recipe.instructions && !Array.isArray(recipe.instructions)) {
		errors.push('Instructions must be an array');
	}

	if (recipe.tags && !Array.isArray(recipe.tags)) {
		errors.push('Tags must be an array');
	}

	// Validate numeric fields
	if (
		recipe.cookTime &&
		(typeof recipe.cookTime !== 'number' || recipe.cookTime < 0)
	) {
		errors.push('Cook time must be a positive number');
	}

	if (
		recipe.prepTime &&
		(typeof recipe.prepTime !== 'number' || recipe.prepTime < 0)
	) {
		errors.push('Prep time must be a positive number');
	}

	if (
		recipe.servings &&
		(typeof recipe.servings !== 'number' || recipe.servings < 1)
	) {
		errors.push('Servings must be a positive number');
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
};
