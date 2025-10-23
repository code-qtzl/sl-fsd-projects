import React from 'react';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({
	size = 'medium',
	color = 'primary',
	text = 'Loading...',
	fullScreen = false,
	className = '',
}) => {
	const spinnerClasses = [
		styles.spinner,
		styles[size],
		styles[color],
		className,
	]
		.filter(Boolean)
		.join(' ');

	const containerClasses = [styles.container, fullScreen && styles.fullScreen]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={containerClasses} role='status' aria-live='polite'>
			<div className={spinnerClasses} aria-hidden='true' />
			{text && <span className={styles.text}>{text}</span>}
			<span className='sr-only'>{text}</span>
		</div>
	);
};

export default LoadingSpinner;
