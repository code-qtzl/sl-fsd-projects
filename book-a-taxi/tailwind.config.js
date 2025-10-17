/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#FEC400',
				secondary: '#B7083C',
				warning: '#FB8A00',
				error: '#F44336',
				info: '#B8B8B8',
				content: {
					tertiary: '#5A5A5A',
					secondary: '#414141',
					primary: '#2A2A2A',
					disabled: '#B8B8B8',
				},
			},
		},
	},
	plugins: [],
};
