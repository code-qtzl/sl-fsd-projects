// Mock recipe data for the Recipe App
// Includes gaming elements like XP rewards, achievements, and difficulty levels

export const mockRecipes = [
	{
		id: '1',
		name: "Dragon's Breath Spicy Ramen",
		description:
			'A fiery bowl of ramen that will test your heat tolerance and reward your bravery',
		image: '/images/01_dragons_breath_spicy_ramen.webp',
		cookTime: 25,
		prepTime: 15,
		servings: 2,
		difficulty: 'Hard',
		ingredients: [
			{ name: 'Ramen noodles', amount: '2 packages', optional: false },
			{ name: 'Chicken broth', amount: '4 cups', optional: false },
			{ name: 'Sriracha sauce', amount: '3 tbsp', optional: false },
			{ name: 'Soy sauce', amount: '2 tbsp', optional: false },
			{ name: 'Garlic', amount: '3 cloves', optional: false },
			{ name: 'Green onions', amount: '2 stalks', optional: false },
			{ name: 'Soft-boiled egg', amount: '2 eggs', optional: true },
			{ name: 'Chili oil', amount: '1 tbsp', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Bring chicken broth to a boil in a large pot',
				tip: 'Use low-sodium broth for better control',
			},
			{
				step: 2,
				description: 'Add minced garlic and simmer for 5 minutes',
				tip: "Don't let garlic burn",
			},
			{
				step: 3,
				description: 'Stir in sriracha and soy sauce',
				tip: 'Taste and adjust heat level',
			},
			{
				step: 4,
				description:
					'Cook ramen noodles according to package directions',
				tip: 'Slightly undercook for better texture',
			},
			{
				step: 5,
				description:
					'Serve hot with green onions and optional toppings',
				tip: 'Have milk ready for the heat!',
			},
		],
		tags: ['spicy', 'asian', 'noodles', 'comfort-food'],
		nutrition: {
			calories: 450,
			protein: '18g',
			carbs: '65g',
			fat: '12g',
		},
		gameElements: {
			xpReward: 150,
			difficulty: 'Legendary',
			achievements: ['Fire Breather', 'Spice Master', 'Noodle Ninja'],
		},
	},
	{
		id: '2',
		name: 'Healing Potion Smoothie',
		description:
			'A magical blend of fruits that restores health and energy',
		image: '/images/02_healing_potion_smoothie.avif',
		cookTime: 5,
		prepTime: 10,
		servings: 1,
		difficulty: 'Easy',
		ingredients: [
			{ name: 'Banana', amount: '1 large', optional: false },
			{ name: 'Blueberries', amount: '1/2 cup', optional: false },
			{ name: 'Spinach', amount: '1 cup', optional: false },
			{ name: 'Almond milk', amount: '1 cup', optional: false },
			{ name: 'Honey', amount: '1 tbsp', optional: true },
			{ name: 'Chia seeds', amount: '1 tsp', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Add all ingredients to blender',
				tip: 'Add liquids first for easier blending',
			},
			{
				step: 2,
				description: 'Blend on high for 60 seconds until smooth',
				tip: 'Stop and scrape sides if needed',
			},
			{
				step: 3,
				description: 'Pour into glass and serve immediately',
				tip: 'Add ice for extra refreshment',
			},
		],
		tags: ['healthy', 'smoothie', 'breakfast', 'vegetarian'],
		nutrition: {
			calories: 280,
			protein: '8g',
			carbs: '52g',
			fat: '6g',
		},
		gameElements: {
			xpReward: 50,
			difficulty: 'Novice',
			achievements: ['Health Guru', 'Green Machine'],
		},
	},
	{
		id: '3',
		name: "Warrior's Feast Burger",
		description:
			'A mighty burger fit for champions, loaded with protein and flavor',
		image: '/images/03_warriors_feast_burger.jpg',
		cookTime: 20,
		prepTime: 15,
		servings: 4,
		difficulty: 'Medium',
		ingredients: [
			{ name: 'Ground beef', amount: '1 lb', optional: false },
			{ name: 'Burger buns', amount: '4 pieces', optional: false },
			{ name: 'Cheddar cheese', amount: '4 slices', optional: false },
			{ name: 'Lettuce', amount: '4 leaves', optional: false },
			{ name: 'Tomato', amount: '1 large', optional: false },
			{ name: 'Red onion', amount: '1/2 medium', optional: true },
			{ name: 'Bacon', amount: '8 strips', optional: true },
			{ name: 'Special sauce', amount: '1/4 cup', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Form ground beef into 4 equal patties',
				tip: "Don't overwork the meat",
			},
			{
				step: 2,
				description: 'Season patties with salt and pepper',
				tip: 'Season just before cooking',
			},
			{
				step: 3,
				description:
					'Grill or pan-fry patties for 4-5 minutes per side',
				tip: "Don't press down on patties",
			},
			{
				step: 4,
				description: 'Add cheese in last minute of cooking',
				tip: 'Cover to melt cheese faster',
			},
			{
				step: 5,
				description: 'Assemble burgers with desired toppings',
				tip: 'Toast buns for extra flavor',
			},
		],
		tags: ['burger', 'beef', 'grilled', 'american'],
		nutrition: {
			calories: 650,
			protein: '35g',
			carbs: '45g',
			fat: '35g',
		},
		gameElements: {
			xpReward: 100,
			difficulty: 'Warrior',
			achievements: ['Grill Master', 'Meat Lover', 'Burger Champion'],
		},
	},
	{
		id: '4',
		name: "Mage's Mystical Pasta",
		description:
			'An enchanted pasta dish with creamy sauce and magical herbs',
		image: '/images/04_mages_mtical_pasta.webp',
		cookTime: 30,
		prepTime: 10,
		servings: 3,
		difficulty: 'Medium',
		ingredients: [
			{ name: 'Fettuccine pasta', amount: '12 oz', optional: false },
			{ name: 'Heavy cream', amount: '1 cup', optional: false },
			{
				name: 'Parmesan cheese',
				amount: '1/2 cup grated',
				optional: false,
			},
			{ name: 'Garlic', amount: '4 cloves', optional: false },
			{ name: 'Fresh basil', amount: '1/4 cup', optional: false },
			{ name: 'Mushrooms', amount: '8 oz', optional: true },
			{ name: 'White wine', amount: '1/4 cup', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Cook pasta according to package directions',
				tip: 'Save some pasta water',
			},
			{
				step: 2,
				description: 'Sauté garlic and mushrooms in butter',
				tip: "Don't crowd the mushrooms",
			},
			{
				step: 3,
				description: 'Add cream and simmer until thickened',
				tip: "Don't let it boil",
			},
			{
				step: 4,
				description: 'Toss with pasta and cheese',
				tip: 'Add pasta water if too thick',
			},
			{
				step: 5,
				description: 'Garnish with fresh basil',
				tip: 'Serve immediately while hot',
			},
		],
		tags: ['pasta', 'italian', 'creamy', 'vegetarian'],
		nutrition: {
			calories: 520,
			protein: '18g',
			carbs: '58g',
			fat: '24g',
		},
		gameElements: {
			xpReward: 120,
			difficulty: 'Apprentice',
			achievements: ['Pasta Master', 'Cream Wizard'],
		},
	},
];
// Add more recipes to the array
mockRecipes.push(
	{
		id: '5',
		name: "Ninja's Silent Sushi",
		description:
			'Stealthy sushi rolls that appear simple but hide complex flavors',
		image: '/images/05_ninjas_silent_sushi.avif',
		cookTime: 45,
		prepTime: 30,
		servings: 4,
		difficulty: 'Hard',
		ingredients: [
			{ name: 'Sushi rice', amount: '2 cups', optional: false },
			{ name: 'Nori sheets', amount: '6 pieces', optional: false },
			{ name: 'Fresh salmon', amount: '8 oz', optional: false },
			{ name: 'Cucumber', amount: '1 medium', optional: false },
			{ name: 'Avocado', amount: '2 pieces', optional: false },
			{ name: 'Rice vinegar', amount: '3 tbsp', optional: false },
			{ name: 'Wasabi', amount: '2 tbsp', optional: true },
			{ name: 'Pickled ginger', amount: '1/4 cup', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Prepare sushi rice with vinegar seasoning',
				tip: 'Let rice cool to room temperature',
			},
			{
				step: 2,
				description: 'Cut fish and vegetables into strips',
				tip: 'Use very sharp knife',
			},
			{
				step: 3,
				description: 'Place nori on bamboo mat, spread rice',
				tip: 'Wet hands to prevent sticking',
			},
			{
				step: 4,
				description: 'Add fillings and roll tightly',
				tip: "Don't overfill the roll",
			},
			{
				step: 5,
				description: 'Cut into pieces with wet knife',
				tip: 'Clean knife between cuts',
			},
		],
		tags: ['sushi', 'japanese', 'raw-fish', 'rice'],
		nutrition: {
			calories: 380,
			protein: '22g',
			carbs: '45g',
			fat: '12g',
		},
		gameElements: {
			xpReward: 200,
			difficulty: 'Master',
			achievements: ['Sushi Sensei', 'Precision Cutter', 'Raw Talent'],
		},
	},
	{
		id: '6',
		name: "Goblin's Green Salad",
		description:
			'A surprisingly delicious salad that even goblins would fight over',
		image: '/images/06_MixedGreensKey.jpg',
		cookTime: 0,
		prepTime: 15,
		servings: 2,
		difficulty: 'Easy',
		ingredients: [
			{ name: 'Mixed greens', amount: '4 cups', optional: false },
			{ name: 'Cherry tomatoes', amount: '1 cup', optional: false },
			{ name: 'Cucumber', amount: '1 medium', optional: false },
			{ name: 'Red bell pepper', amount: '1 medium', optional: false },
			{ name: 'Feta cheese', amount: '1/2 cup', optional: true },
			{ name: 'Olive oil', amount: '3 tbsp', optional: false },
			{ name: 'Lemon juice', amount: '2 tbsp', optional: false },
			{ name: 'Sunflower seeds', amount: '1/4 cup', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Wash and dry all vegetables thoroughly',
				tip: 'Use salad spinner for best results',
			},
			{
				step: 2,
				description: 'Chop vegetables into bite-sized pieces',
				tip: 'Keep pieces uniform for even eating',
			},
			{
				step: 3,
				description: 'Whisk olive oil and lemon juice for dressing',
				tip: 'Add salt and pepper to taste',
			},
			{
				step: 4,
				description: 'Toss salad with dressing just before serving',
				tip: "Don't overdress the salad",
			},
		],
		tags: ['salad', 'healthy', 'vegetarian', 'fresh'],
		nutrition: {
			calories: 220,
			protein: '8g',
			carbs: '15g',
			fat: '16g',
		},
		gameElements: {
			xpReward: 40,
			difficulty: 'Novice',
			achievements: ['Veggie Warrior', 'Fresh Start'],
		},
	},
	{
		id: '7',
		name: 'Phoenix Fire Chicken Wings',
		description:
			'Wings so hot they will make you rise from the ashes of flavor',
		image: '/images/07_phoenix_fire_chicken_wings.jpg',
		cookTime: 35,
		prepTime: 20,
		servings: 4,
		difficulty: 'Medium',
		ingredients: [
			{ name: 'Chicken wings', amount: '2 lbs', optional: false },
			{ name: 'Hot sauce', amount: '1/2 cup', optional: false },
			{ name: 'Butter', amount: '4 tbsp', optional: false },
			{ name: 'Garlic powder', amount: '1 tsp', optional: false },
			{ name: 'Paprika', amount: '1 tsp', optional: false },
			{ name: 'Cayenne pepper', amount: '1/2 tsp', optional: true },
			{ name: 'Blue cheese dressing', amount: '1/2 cup', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Preheat oven to 425°F',
				tip: 'Line baking sheet with parchment',
			},
			{
				step: 2,
				description: 'Season wings with spices',
				tip: 'Pat wings dry first for crispier skin',
			},
			{
				step: 3,
				description: 'Bake for 25-30 minutes until crispy',
				tip: 'Flip halfway through cooking',
			},
			{
				step: 4,
				description: 'Mix hot sauce and melted butter',
				tip: 'Adjust heat level to preference',
			},
			{
				step: 5,
				description: 'Toss hot wings in sauce and serve',
				tip: 'Serve with cooling dip',
			},
		],
		tags: ['chicken', 'spicy', 'wings', 'american'],
		nutrition: {
			calories: 420,
			protein: '28g',
			carbs: '2g',
			fat: '32g',
		},
		gameElements: {
			xpReward: 110,
			difficulty: 'Warrior',
			achievements: ['Wing Commander', 'Fire Starter', 'Heat Seeker'],
		},
	},
);

// Export individual recipe by ID for easy access
export const getRecipeById = (id) => {
	return mockRecipes.find((recipe) => recipe.id === id);
};

// Export all recipe IDs
export const getAllRecipeIds = () => {
	return mockRecipes.map((recipe) => recipe.id);
};

// Add more recipes to reach minimum of 15
mockRecipes.push(
	{
		id: '8',
		name: "Dwarf's Hearty Stew",
		description:
			'A robust stew that would satisfy even the hungriest dwarf miner',
		image: '/images/08_dwarfs_hearty_stew.jpg',
		cookTime: 90,
		prepTime: 25,
		servings: 6,
		difficulty: 'Medium',
		ingredients: [
			{ name: 'Beef chuck', amount: '2 lbs', optional: false },
			{ name: 'Potatoes', amount: '4 large', optional: false },
			{ name: 'Carrots', amount: '4 medium', optional: false },
			{ name: 'Onion', amount: '1 large', optional: false },
			{ name: 'Beef broth', amount: '4 cups', optional: false },
			{ name: 'Tomato paste', amount: '2 tbsp', optional: false },
			{ name: 'Red wine', amount: '1/2 cup', optional: true },
			{ name: 'Fresh thyme', amount: '2 sprigs', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Brown beef chunks in heavy pot',
				tip: "Don't overcrowd the pot",
			},
			{
				step: 2,
				description: 'Add onions and cook until softened',
				tip: 'Scrape up browned bits',
			},
			{
				step: 3,
				description: 'Add broth, wine, and tomato paste',
				tip: 'Bring to gentle simmer',
			},
			{
				step: 4,
				description: 'Simmer covered for 1 hour',
				tip: 'Check liquid level occasionally',
			},
			{
				step: 5,
				description: 'Add vegetables and cook 30 more minutes',
				tip: 'Test meat tenderness with fork',
			},
		],
		tags: ['stew', 'beef', 'comfort-food', 'hearty'],
		nutrition: {
			calories: 480,
			protein: '32g',
			carbs: '28g',
			fat: '24g',
		},
		gameElements: {
			xpReward: 140,
			difficulty: 'Veteran',
			achievements: ['Stew Master', 'Comfort King', 'Patience Virtue'],
		},
	},
	{
		id: '9',
		name: "Elf's Enchanted Pancakes",
		description: 'Light, fluffy pancakes with a touch of forest magic',
		image: '/images/09_elfs_enchanted_pancakes.webp',
		cookTime: 20,
		prepTime: 10,
		servings: 4,
		difficulty: 'Easy',
		ingredients: [
			{ name: 'All-purpose flour', amount: '2 cups', optional: false },
			{ name: 'Milk', amount: '1 3/4 cups', optional: false },
			{ name: 'Eggs', amount: '2 large', optional: false },
			{ name: 'Baking powder', amount: '2 tsp', optional: false },
			{ name: 'Sugar', amount: '2 tbsp', optional: false },
			{ name: 'Salt', amount: '1/2 tsp', optional: false },
			{ name: 'Vanilla extract', amount: '1 tsp', optional: true },
			{ name: 'Blueberries', amount: '1 cup', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Mix dry ingredients in large bowl',
				tip: 'Sift flour for extra fluffiness',
			},
			{
				step: 2,
				description: 'Whisk wet ingredients separately',
				tip: "Don't overmix the batter",
			},
			{
				step: 3,
				description: 'Combine wet and dry ingredients gently',
				tip: 'Lumps are okay',
			},
			{
				step: 4,
				description: 'Cook on griddle until bubbles form',
				tip: 'Medium heat works best',
			},
			{
				step: 5,
				description: 'Flip once and cook until golden',
				tip: 'Serve immediately while hot',
			},
		],
		tags: ['pancakes', 'breakfast', 'sweet', 'vegetarian'],
		nutrition: {
			calories: 320,
			protein: '12g',
			carbs: '58g',
			fat: '6g',
		},
		gameElements: {
			xpReward: 60,
			difficulty: 'Novice',
			achievements: ['Breakfast Champion', 'Fluffy Master'],
		},
	},
	{
		id: '10',
		name: "Orc's Battle Tacos",
		description:
			'Fierce tacos packed with bold flavors for warriors on the go',
		image: '/images/10_orcs_battle_tacos.webp',
		cookTime: 25,
		prepTime: 15,
		servings: 4,
		difficulty: 'Medium',
		ingredients: [
			{ name: 'Ground turkey', amount: '1 lb', optional: false },
			{ name: 'Taco shells', amount: '8 pieces', optional: false },
			{ name: 'Black beans', amount: '1 can', optional: false },
			{ name: 'Corn', amount: '1 cup', optional: false },
			{ name: 'Lettuce', amount: '2 cups shredded', optional: false },
			{
				name: 'Cheddar cheese',
				amount: '1 cup shredded',
				optional: false,
			},
			{ name: 'Salsa', amount: '1/2 cup', optional: true },
			{ name: 'Sour cream', amount: '1/2 cup', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Brown ground turkey with taco seasoning',
				tip: 'Break up meat as it cooks',
			},
			{
				step: 2,
				description: 'Warm taco shells in oven',
				tip: 'Wrap in foil to prevent breaking',
			},
			{
				step: 3,
				description: 'Heat black beans and corn',
				tip: 'Drain and rinse beans first',
			},
			{
				step: 4,
				description: 'Prepare all toppings in separate bowls',
				tip: 'Let everyone build their own',
			},
			{
				step: 5,
				description: 'Assemble tacos with desired toppings',
				tip: "Don't overfill the shells",
			},
		],
		tags: ['tacos', 'mexican', 'ground-turkey', 'customizable'],
		nutrition: {
			calories: 380,
			protein: '26g',
			carbs: '32g',
			fat: '18g',
		},
		gameElements: {
			xpReward: 90,
			difficulty: 'Warrior',
			achievements: ['Taco Warrior', 'Flavor Fighter'],
		},
	},
	{
		id: '11',
		name: "Wizard's Wisdom Soup",
		description:
			'A brain-boosting soup that enhances mental clarity and focus',
		image: '/images/11_wizards_wisdom_soup.webp',
		cookTime: 40,
		prepTime: 20,
		servings: 4,
		difficulty: 'Easy',
		ingredients: [
			{ name: 'Vegetable broth', amount: '6 cups', optional: false },
			{ name: 'Lentils', amount: '1 cup', optional: false },
			{ name: 'Carrots', amount: '2 medium', optional: false },
			{ name: 'Celery', amount: '2 stalks', optional: false },
			{ name: 'Onion', amount: '1 medium', optional: false },
			{ name: 'Garlic', amount: '3 cloves', optional: false },
			{ name: 'Turmeric', amount: '1 tsp', optional: true },
			{ name: 'Fresh parsley', amount: '1/4 cup', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Sauté onion, carrots, and celery',
				tip: 'Cook until vegetables soften',
			},
			{
				step: 2,
				description: 'Add garlic and cook 1 minute more',
				tip: "Don't let garlic burn",
			},
			{
				step: 3,
				description: 'Add broth, lentils, and seasonings',
				tip: 'Bring to a boil first',
			},
			{
				step: 4,
				description: 'Simmer 25-30 minutes until lentils are tender',
				tip: 'Stir occasionally',
			},
			{
				step: 5,
				description: 'Garnish with fresh parsley',
				tip: 'Adjust seasoning before serving',
			},
		],
		tags: ['soup', 'lentils', 'healthy', 'vegetarian'],
		nutrition: {
			calories: 240,
			protein: '14g',
			carbs: '42g',
			fat: '2g',
		},
		gameElements: {
			xpReward: 70,
			difficulty: 'Apprentice',
			achievements: ['Wisdom Seeker', 'Health Guru', 'Soup Master'],
		},
	},
	{
		id: '12',
		name: "Pirate's Treasure Fish",
		description:
			'Golden-crusted fish that is worth its weight in doubloons',
		image: '/images/12_pirates_treasure_fish.jpg',
		cookTime: 20,
		prepTime: 15,
		servings: 4,
		difficulty: 'Medium',
		ingredients: [
			{ name: 'White fish fillets', amount: '4 pieces', optional: false },
			{ name: 'Breadcrumbs', amount: '1 cup', optional: false },
			{ name: 'Parmesan cheese', amount: '1/2 cup', optional: false },
			{ name: 'Lemon', amount: '1 large', optional: false },
			{ name: 'Olive oil', amount: '3 tbsp', optional: false },
			{ name: 'Garlic powder', amount: '1 tsp', optional: false },
			{ name: 'Paprika', amount: '1 tsp', optional: true },
			{ name: 'Fresh dill', amount: '2 tbsp', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Preheat oven to 400°F',
				tip: 'Line baking sheet with parchment',
			},
			{
				step: 2,
				description: 'Mix breadcrumbs, cheese, and seasonings',
				tip: 'Add lemon zest for extra flavor',
			},
			{
				step: 3,
				description: 'Brush fish with olive oil and lemon juice',
				tip: 'Pat fish dry first',
			},
			{
				step: 4,
				description: 'Press breadcrumb mixture onto fish',
				tip: 'Press firmly to help coating stick',
			},
			{
				step: 5,
				description: 'Bake 12-15 minutes until fish flakes',
				tip: "Don't overcook or fish will be dry",
			},
		],
		tags: ['fish', 'baked', 'crispy', 'lemon'],
		nutrition: {
			calories: 290,
			protein: '32g',
			carbs: '18g',
			fat: '12g',
		},
		gameElements: {
			xpReward: 100,
			difficulty: 'Veteran',
			achievements: ['Treasure Hunter', 'Golden Touch', 'Sea Master'],
		},
	},
	{
		id: '13',
		name: "Knight's Noble Risotto",
		description: 'A creamy, elegant risotto worthy of the royal court',
		image: '/images/13_knights_noble_risotto.jpg',
		cookTime: 35,
		prepTime: 10,
		servings: 4,
		difficulty: 'Hard',
		ingredients: [
			{ name: 'Arborio rice', amount: '1 1/2 cups', optional: false },
			{ name: 'Chicken broth', amount: '5 cups', optional: false },
			{ name: 'White wine', amount: '1/2 cup', optional: false },
			{ name: 'Onion', amount: '1 small', optional: false },
			{ name: 'Parmesan cheese', amount: '3/4 cup', optional: false },
			{ name: 'Butter', amount: '3 tbsp', optional: false },
			{ name: 'Mushrooms', amount: '8 oz', optional: true },
			{ name: 'Fresh herbs', amount: '2 tbsp', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Heat broth in separate pot, keep warm',
				tip: 'Warm broth is essential for creamy risotto',
			},
			{
				step: 2,
				description: 'Sauté onion in butter until translucent',
				tip: "Don't brown the onion",
			},
			{
				step: 3,
				description: 'Add rice and stir for 2 minutes',
				tip: 'Toast rice until edges are translucent',
			},
			{
				step: 4,
				description: 'Add wine and stir until absorbed',
				tip: 'Let wine cook off completely',
			},
			{
				step: 5,
				description:
					'Add warm broth one ladle at a time, stirring constantly',
				tip: 'Wait for each addition to absorb',
			},
			{
				step: 6,
				description: 'Finish with cheese and butter',
				tip: 'Remove from heat before final additions',
			},
		],
		tags: ['risotto', 'italian', 'creamy', 'elegant'],
		nutrition: {
			calories: 420,
			protein: '16g',
			carbs: '58g',
			fat: '14g',
		},
		gameElements: {
			xpReward: 180,
			difficulty: 'Master',
			achievements: [
				'Risotto Royalty',
				'Patience Master',
				'Creamy Champion',
			],
		},
	},
	{
		id: '14',
		name: "Barbarian's Protein Bowl",
		description: 'A massive bowl of gains for the strongest warriors',
		image: '/images/15_barbarians_protein_bowl.jpg',
		cookTime: 25,
		prepTime: 15,
		servings: 2,
		difficulty: 'Easy',
		ingredients: [
			{ name: 'Quinoa', amount: '1 cup', optional: false },
			{ name: 'Grilled chicken', amount: '8 oz', optional: false },
			{ name: 'Black beans', amount: '1 can', optional: false },
			{ name: 'Sweet potato', amount: '1 large', optional: false },
			{ name: 'Avocado', amount: '1 medium', optional: false },
			{ name: 'Broccoli', amount: '2 cups', optional: false },
			{ name: 'Olive oil', amount: '2 tbsp', optional: false },
			{ name: 'Lime', amount: '1 medium', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Cook quinoa according to package directions',
				tip: 'Rinse quinoa before cooking',
			},
			{
				step: 2,
				description: 'Roast diced sweet potato at 425°F for 20 minutes',
				tip: 'Toss with oil and seasonings',
			},
			{
				step: 3,
				description: 'Steam broccoli until tender-crisp',
				tip: "Don't overcook vegetables",
			},
			{
				step: 4,
				description: 'Grill or cook chicken until done',
				tip: 'Let meat rest before slicing',
			},
			{
				step: 5,
				description: 'Assemble bowls with all components',
				tip: 'Arrange colorfully for best presentation',
			},
		],
		tags: ['protein-bowl', 'healthy', 'quinoa', 'meal-prep'],
		nutrition: {
			calories: 580,
			protein: '42g',
			carbs: '68g',
			fat: '18g',
		},
		gameElements: {
			xpReward: 130,
			difficulty: 'Warrior',
			achievements: [
				'Protein Powerhouse',
				'Gains Goblin',
				'Muscle Builder',
			],
		},
	},
	{
		id: '15',
		name: "Fairy's Magical Cookies",
		description: 'Delicate cookies that sparkle with sweetness and joy',
		image: '/images/14_fairys_magical_cookies.JPG',
		cookTime: 12,
		prepTime: 30,
		servings: 24,
		difficulty: 'Easy',
		ingredients: [
			{
				name: 'All-purpose flour',
				amount: '2 1/4 cups',
				optional: false,
			},
			{ name: 'Butter', amount: '1 cup softened', optional: false },
			{ name: 'Brown sugar', amount: '3/4 cup', optional: false },
			{ name: 'White sugar', amount: '3/4 cup', optional: false },
			{ name: 'Eggs', amount: '2 large', optional: false },
			{ name: 'Vanilla extract', amount: '2 tsp', optional: false },
			{ name: 'Baking soda', amount: '1 tsp', optional: false },
			{ name: 'Chocolate chips', amount: '2 cups', optional: true },
		],
		instructions: [
			{
				step: 1,
				description: 'Preheat oven to 375°F',
				tip: 'Line baking sheets with parchment',
			},
			{
				step: 2,
				description: 'Cream butter and sugars until fluffy',
				tip: 'This takes about 3-4 minutes',
			},
			{
				step: 3,
				description: 'Beat in eggs and vanilla',
				tip: 'Add one egg at a time',
			},
			{
				step: 4,
				description: 'Mix in flour and baking soda',
				tip: "Don't overmix the dough",
			},
			{
				step: 5,
				description: 'Drop spoonfuls on baking sheet',
				tip: 'Leave space between cookies',
			},
			{
				step: 6,
				description: 'Bake 9-11 minutes until golden',
				tip: 'Centers should still look slightly soft',
			},
		],
		tags: ['cookies', 'dessert', 'sweet', 'baking'],
		nutrition: {
			calories: 180,
			protein: '2g',
			carbs: '26g',
			fat: '8g',
		},
		gameElements: {
			xpReward: 80,
			difficulty: 'Novice',
			achievements: ['Sweet Tooth', 'Cookie Monster', 'Baking Fairy'],
		},
	},
);
