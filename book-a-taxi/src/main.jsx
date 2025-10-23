import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
	registerSW,
	monitorPerformance,
	requestPersistentStorage,
} from './utils/serviceWorker';

// Initialize performance monitoring
monitorPerformance();

// Request persistent storage for better caching
requestPersistentStorage();

// Register service worker for caching and offline functionality
registerSW({
	onSuccess: () => {
		console.log('App is ready for offline use');
	},
	onUpdate: () => {
		console.log('New content available, please refresh');
		// You could show a toast notification here
	},
	onOfflineReady: () => {
		console.log('App is ready to work offline');
	},
});

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
