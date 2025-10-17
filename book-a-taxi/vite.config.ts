import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		// Enable code splitting
		rollupOptions: {
			output: {
				manualChunks: {
					// Separate vendor chunks for better caching
					vendor: ['react', 'react-dom'],
					router: ['react-router-dom'],
					forms: ['react-hook-form'],
				},
			},
		},
		// Optimize chunk size
		chunkSizeWarningLimit: 1000,
		// Enable source maps for production debugging
		sourcemap: true,
		// Minify for production
		minify: 'terser',
	},
	// Optimize dependencies
	optimizeDeps: {
		include: ['react', 'react-dom', 'react-router-dom', 'react-hook-form'],
	},
	// Configure server for development
	server: {
		// Optimize HMR
		hmr: {
			overlay: true,
		},
	},
	// CSS optimization
	css: {
		// Enable CSS modules
		modules: {
			localsConvention: 'camelCase',
		},
		// PostCSS configuration
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
	},
	// Asset optimization
	assetsInclude: ['**/*.woff', '**/*.woff2'],
	// Define environment variables
	define: {
		__APP_VERSION__: JSON.stringify(
			process.env.npm_package_version || '1.0.0',
		),
	},
});
