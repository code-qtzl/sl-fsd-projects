import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Base styles first
import './styles/gameTheme.css'; // Game theme CSS overrides
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
