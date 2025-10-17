import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
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

// Layout wrapper component for router
function AppLayout() {
	return (
		<Layout>
			<Suspense fallback={<LoadingSpinner />}>
				<Outlet />
			</Suspense>
		</Layout>
	);
}

// Create router with the new createBrowserRouter API
const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'about',
				element: <About />,
			},
			{
				path: 'services',
				element: <Services />,
			},
			{
				path: 'contact',
				element: <Contact />,
			},
			{
				path: 'booking',
				element: <Booking />,
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

function App() {
	return (
		<ErrorBoundary>
			<RouterProvider router={router} />
		</ErrorBoundary>
	);
}

export default App;
