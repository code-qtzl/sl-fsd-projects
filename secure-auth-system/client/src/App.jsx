import { useState } from 'react';
import Registration from './components/Registration';
import Login from './components/Login';
import Welcome from './components/Welcome';
import './App.css';

function App() {
	const [user, setUser] = useState(null);
	const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'welcome'

	const handleLoginSuccess = (userData) => {
		console.log('Login success - userData received:', userData);
		const newUser = {
			id: userData.id,
			email: userData.email,
			role: userData.role,
			isAuthenticated: true,
		};
		console.log('Setting user state to:', newUser);
		setUser(newUser);
		setCurrentView('welcome');
	};

	const handleRegistrationSuccess = () => {
		setCurrentView('login');
	};

	const handleLogout = () => {
		setUser(null);
		setCurrentView('login');
	};

	const switchToRegister = () => {
		setCurrentView('register');
	};

	const switchToLogin = () => {
		setCurrentView('login');
	};

	return (
		<div className='min-h-screen bg-gray-100 py-8'>
			<div className='container mx-auto px-4'>
				<h1 className='text-3xl font-bold text-center mb-8 text-gray-800'>
					Authentication System
				</h1>

				{currentView === 'welcome' && user ? (
					<Welcome user={user} onLogout={handleLogout} />
				) : currentView === 'register' ? (
					<div>
						<Registration
							onRegistrationSuccess={handleRegistrationSuccess}
						/>
						<div className='text-center mt-4'>
							<button
								onClick={switchToLogin}
								className='text-blue-500 hover:text-blue-700 underline'
							>
								Already have an account? Login here
							</button>
						</div>
					</div>
				) : (
					<div>
						<Login onLoginSuccess={handleLoginSuccess} />
						<div className='text-center mt-4'>
							<button
								onClick={switchToRegister}
								className='text-blue-500 hover:text-blue-700 underline'
							>
								Don't have an account? Register here
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
