import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntersectionObserver } from '../../../hooks/usePerformance.js';
import styles from './LazyImage.module.css';

const LazyImage = ({
	src,
	alt,
	placeholder,
	blurDataURL,
	priority = false,
	onLoad,
	onError,
	className = '',
	...props
}) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [imageSrc, setImageSrc] = useState(
		priority ? src : placeholder || blurDataURL || '',
	);

	const { elementRef, hasIntersected } = useIntersectionObserver({
		threshold: 0.1,
		rootMargin: '50px',
	});

	const imgRef = useRef(null);

	// Load image when it intersects or if it's priority
	useEffect(() => {
		if (priority || hasIntersected) {
			const img = new Image();

			img.onload = () => {
				setImageSrc(src);
				setIsLoaded(true);
				onLoad?.();
			};

			img.onerror = () => {
				setHasError(true);
				onError?.();
			};

			img.src = src;
		}
	}, [src, hasIntersected, priority, onLoad, onError]);

	const imageClasses = [
		styles.image,
		isLoaded && styles.loaded,
		hasError && styles.error,
		className,
	]
		.filter(Boolean)
		.join(' ');

	const containerClasses = [styles.container, !isLoaded && styles.loading]
		.filter(Boolean)
		.join(' ');

	if (hasError) {
		return (
			<div
				ref={elementRef}
				className={`${styles.container} ${styles.errorContainer}`}
				role='img'
				aria-label={alt}
			>
				<div className={styles.errorIcon}>📷</div>
				<span className={styles.errorText}>Image failed to load</span>
			</div>
		);
	}

	return (
		<div ref={elementRef} className={containerClasses}>
			{!isLoaded && (blurDataURL || placeholder) && (
				<img
					src={blurDataURL || placeholder}
					alt=''
					className={styles.placeholder}
					aria-hidden='true'
				/>
			)}

			{!isLoaded && !blurDataURL && !placeholder && (
				<div className={styles.skeleton} aria-hidden='true' />
			)}

			<img
				ref={imgRef}
				src={imageSrc}
				alt={alt}
				className={imageClasses}
				loading={priority ? 'eager' : 'lazy'}
				decoding='async'
				{...props}
			/>

			{!isLoaded && (
				<div className={styles.loadingOverlay} aria-hidden='true'>
					<div className={styles.loadingSpinner} />
				</div>
			)}
		</div>
	);
};

LazyImage.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	blurDataURL: PropTypes.string,
	priority: PropTypes.bool,
	onLoad: PropTypes.func,
	onError: PropTypes.func,
	className: PropTypes.string,
};

export default LazyImage;
