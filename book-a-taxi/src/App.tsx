import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner';
import './App.css';

// Lazy load page components for code splitting
const Home = React.lazy(() => import('./components/pages/Home/Home'));
const About = React.lazy(() => import('./components/pages/About/About'));
const Services = React.lazy(
	() => import('./components/pages/Services/Services'),
);
const Contact = React.lazy(() => import('./components/pages/Contact/Contact'));
const Booking = React.lazy(() => import('./components/pages/Booking/Booking'));
const NotFound = React.lazy(
	() => import('./components/pages/NotFound/NotFound'),
);

function App() {
	return (
		<ErrorBoundary>
			<Router>
				<Layout>
					<Suspense fallback={<LoadingSpinner />}>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/about' element={<About />} />
							<Route path='/services' element={<Services />} />
							<Route path='/contact' element={<Contact />} />
							<Route path='/booking' element={<Booking />} />
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Suspense>
				</Layout>
			</Router>
		</ErrorBoundary>
	);
}

export default App;
