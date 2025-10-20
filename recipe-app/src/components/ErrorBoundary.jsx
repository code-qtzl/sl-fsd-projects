import { Component } from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, errorInfo: null };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// Log the error to console for debugging
		console.error('ErrorBoundary caught an error:', error, errorInfo);

		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	handleRetry = () => {
		this.setState({ hasError: false, error: null, errorInfo: null });
	};

	render() {
		if (this.state.hasError) {
			// Fallback UI
			return (
				<div className='text-neutral-light'>
					<div className='bg-primary-dark/50 rounded-lg p-4 md:p-6 border border-accent-coral/30 text-center'>
						<div className='text-4xl md:text-6xl mb-4 game-float'>
							⚠️
						</div>
						<h2 className='text-xl md:text-2xl font-bold mb-3 md:mb-4 text-accent-coral game-title'>
							Oops! Something went wrong
						</h2>
						<p className='text-sm md:text-base mb-4 md:mb-6 text-neutral-light/80 leading-relaxed'>
							{this.props.fallbackMessage ||
								"An unexpected error occurred while loading this component. Don't worry, your culinary adventure can continue!"}
						</p>

						{/* Error Actions */}
						<div className='flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center'>
							<button
								onClick={this.handleRetry}
								className='game-button text-sm md:text-base px-4 md:px-6 py-2 md:py-3'
							>
								🔄 Try Again
							</button>
							<Link
								to='/'
								className='game-button bg-primary-teal hover:bg-accent-blue text-sm md:text-base px-4 md:px-6 py-2 md:py-3'
							>
								🏠 Back to Recipes
							</Link>
						</div>

						{/* Development Error Details */}
						{process.env.NODE_ENV === 'development' &&
							this.state.error && (
								<details className='mt-6 text-left'>
									<summary className='cursor-pointer text-accent-yellow hover:text-accent-coral transition-colors mb-2'>
										🔧 Developer Details (Click to expand)
									</summary>
									<div className='bg-primary-dark/70 p-3 rounded border border-primary-teal/20 text-xs font-mono'>
										<div className='mb-2'>
											<strong className='text-accent-coral'>
												Error:
											</strong>
											<pre className='text-neutral-light/80 mt-1 whitespace-pre-wrap'>
												{this.state.error.toString()}
											</pre>
										</div>
										{this.state.errorInfo && (
											<div>
												<strong className='text-accent-coral'>
													Component Stack:
												</strong>
												<pre className='text-neutral-light/80 mt-1 whitespace-pre-wrap'>
													{
														this.state.errorInfo
															.componentStack
													}
												</pre>
											</div>
										)}
									</div>
								</details>
							)}
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
