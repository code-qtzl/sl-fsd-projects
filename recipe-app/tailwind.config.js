/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				xs: '475px',
				'3xl': '1600px',
			},
			colors: {
				// Gaming theme color palette
				primary: {
					dark: '#1d233b',
					teal: '#5aa89a',
				},
				accent: {
					yellow: '#ffb800',
					coral: '#ff8888',
					blue: '#448bff',
				},
				neutral: {
					light: '#f8f8f8',
				},
			},
			fontFamily: {
				gaming: [
					'Segoe UI',
					'Tahoma',
					'Geneva',
					'Verdana',
					'sans-serif',
				],
			},
			spacing: {
				18: '4.5rem',
				88: '22rem',
			},
			maxWidth: {
				'8xl': '88rem',
				'9xl': '96rem',
			},
			animation: {
				glow: 'glow 2s ease-in-out infinite alternate',
				float: 'float 3s ease-in-out infinite',
			},
			keyframes: {
				glow: {
					'0%, 100%': {
						boxShadow: '0 0 5px #5aa89a',
					},
					'50%': {
						boxShadow: '0 0 20px #5aa89a, 0 0 30px #5aa89a',
					},
				},
				float: {
					'0%, 100%': {
						transform: 'translateY(0px)',
					},
					'50%': {
						transform: 'translateY(-5px)',
					},
				},
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
