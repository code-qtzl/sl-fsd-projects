import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ErrorBoundary.module.css';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI
		return { hasError: true, error };
	}

	componentDidCatch(error, errorInfo) {
		// Log error to console in development
		if (import.meta.env.DEV) {
			console.error('ErrorBoundary caught an error:', error, errorInfo);
		}

		// In production, you would log this to an error reporting service
		this.setState({
			error,
			errorInfo,
		});
	}

	handleRetry = () => {
		this.setState({
			hasError: false,
			error: undefined,
			errorInfo: undefined,
		});
	};

	handleReload = () => {
		window.location.reload();
	};

	render() {
		if (this.state.hasError) {
			// Custom fallback UI
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className={styles.errorBoundary}>
					<div className={styles.errorContainer}>
						<div
							className={styles.errorIcon}
							role='img'
							aria-label='Error'
						>
							⚠️
						</div>
						<h1 className={styles.errorTitle}>
							Something went wrong
						</h1>
						<p className={styles.errorMessage}>
							We're sorry, but something unexpected happened.
							Please try refreshing the page or contact support if
							the problem persists.
						</p>

						{import.meta.env.DEV && this.state.error && (
							<details className={styles.errorDetails}>
								<summary className={styles.errorSummary}>
									Error Details (Development Only)
								</summary>
								<pre className={styles.errorStack}>
									{this.state.error.toString()}
									{this.state.errorInfo?.componentStack}
								</pre>
							</details>
						)}

						<div className={styles.errorActions}>
							<button
								className={styles.retryButton}
								onClick={this.handleRetry}
								type='button'
							>
								Try Again
							</button>
							<button
								className={styles.reloadButton}
								onClick={this.handleReload}
								type='button'
							>
								Reload Page
							</button>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
	fallback: PropTypes.func,
};

export default ErrorBoundary;
