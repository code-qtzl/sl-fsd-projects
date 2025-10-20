import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
	return (
		<ErrorBoundary fallbackMessage='The Recipe Quest app encountered an unexpected error. Please refresh the page or try again later.'>
			<Router>
				<Routes>
					<Route path='/' element={<Layout />}>
						<Route
							index
							element={
								<ErrorBoundary fallbackMessage='Unable to load the recipe list. Please refresh the page to try again.'>
									<RecipeList />
								</ErrorBoundary>
							}
						/>
						<Route
							path='recipe/:id'
							element={
								<ErrorBoundary fallbackMessage='Unable to load this recipe. It might not exist or there was an error loading the details.'>
									<RecipeDetail />
								</ErrorBoundary>
							}
						/>
						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</Router>
		</ErrorBoundary>
	);
}

export default App;
