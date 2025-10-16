import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
		terserOptions: {
			compress: {
				drop_console: true, // Remove console.log in production
				drop_debugger: true,
			},
		},
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
		// PostCSS configuration is handled by postcss.config.js
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
