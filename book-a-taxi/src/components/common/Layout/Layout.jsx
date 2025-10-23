import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

const Layout = ({
	children,
	pageTitle,
	isLoading = false,
	error = null,
	onRetry,
}) => {
	// Set page title if provided
	React.useEffect(() => {
		if (pageTitle) {
			document.title = `${pageTitle} | BookATaxi`;
		} else {
			document.title = 'BookATaxi - Your Reliable Ride Service';
		}
	}, [pageTitle]);

	const renderContent = () => {
		if (error) {
			return (
				<div className={styles.error}>
					<div
						className={styles.errorIcon}
						role='img'
						aria-label='Error'
					>
						⚠️
					</div>
					<h2 className={styles.errorTitle}>Something went wrong</h2>
					<p className={styles.errorMessage}>
						{error ||
							'An unexpected error occurred. Please try again.'}
					</p>
					{onRetry && (
						<button
							className={styles.errorButton}
							onClick={onRetry}
							type='button'
						>
							Try Again
						</button>
					)}
				</div>
			);
		}

		if (isLoading) {
			return (
				<div className={styles.loading}>
					<div
						className={styles.loadingSpinner}
						role='status'
						aria-label='Loading'
					>
						<span className='sr-only'>Loading...</span>
					</div>
				</div>
			);
		}

		return children;
	};

	return (
		<div className={styles.layout}>
			{/* Skip to main content link for accessibility */}
			<a href='#main-content' className={styles.skipLink}>
				Skip to main content
			</a>

			<div className={styles.header}>
				<Header />
			</div>

			<main
				id='main-content'
				className={styles.main}
				role='main'
				tabIndex={-1}
			>
				<div className={styles.container}>
					<div className={styles.pageContent}>{renderContent()}</div>
				</div>
			</main>

			<div className={styles.footer}>
				<Footer />
			</div>
		</div>
	);
};

export default Layout;
