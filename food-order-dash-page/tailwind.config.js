/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./*.html', './src/**/*.{js,ts,jsx,tsx,html}'],
	theme: {
		extend: {
			colors: {
				'diner-red': '#DB5535',
				'diner-dark-red': '#883726',
				'diner-light-teal': '#6DB39D',
				'diner-mid-teal': '#0E8985',
				'diner-dark-teal': '#00414A',
				'diner-light': '#EAD1B1',
				'atomic-blue': '#0E8985',
				'atomic-pink': '#DB5535',
				'atomic-mint': '#6DB39D',
				'atomic-orange': '#DB5535',
				'atomic-purple': '#883726',
				'retro-dark': '#00414A',
				'retro-silver': '#EAD1B1',
				'neon-yellow': '#EAD1B1',
				chrome: '#EAD1B1',
			},
			fontFamily: {
				atomic: ['Orbitron', 'monospace'],
				retro: ['Space Mono', 'monospace'],
			},
			animation: {
				'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
				'atomic-spin': 'atomic-spin 3s linear infinite',
				'hover-float': 'hover-float 2s ease-in-out infinite',
			},
		},
	},
	plugins: [],
};
