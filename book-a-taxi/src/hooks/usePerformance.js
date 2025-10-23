import { useEffect, useCallback, useRef, useState } from 'react';

/**
 * Hook for measuring and optimizing component performance
 */
export const usePerformance = (componentName) => {
	const renderStartTime = useRef(0);
	const mountTime = useRef(0);

	useEffect(() => {
		mountTime.current = performance.now();

		return () => {
			const unmountTime = performance.now();
			const totalLifetime = unmountTime - mountTime.current;

			if (import.meta.env.DEV) {
				console.log(
					`${componentName} lifetime: ${totalLifetime.toFixed(2)}ms`,
				);
			}
		};
	}, [componentName]);

	const startRender = useCallback(() => {
		renderStartTime.current = performance.now();
	}, []);

	const endRender = useCallback(() => {
		if (renderStartTime.current > 0) {
			const renderTime = performance.now() - renderStartTime.current;

			if (import.meta.env.DEV && renderTime > 16) {
				console.warn(
					`${componentName} render took ${renderTime.toFixed(
						2,
					)}ms (>16ms)`,
				);
			}

			renderStartTime.current = 0;
		}
	}, [componentName]);

	return { startRender, endRender };
};

/**
 * Hook for debouncing values to improve performance
 */
export const useDebounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};

/**
 * Hook for throttling function calls
 */
export const useThrottle = (callback, delay) => {
	const lastRun = useRef(0);
	const timeoutRef = useRef(0);

	return useCallback(
		(...args) => {
			const now = Date.now();

			if (now - lastRun.current >= delay) {
				callback(...args);
				lastRun.current = now;
			} else {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = setTimeout(() => {
					callback(...args);
					lastRun.current = Date.now();
				}, delay - (now - lastRun.current));
			}
		},
		[callback, delay],
	);
};

/**
 * Hook for intersection observer (lazy loading)
 */
export const useIntersectionObserver = (options = {}) => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const [hasIntersected, setHasIntersected] = useState(false);
	const elementRef = useRef(null);

	useEffect(() => {
		const element = elementRef.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsIntersecting(entry.isIntersecting);
				if (entry.isIntersecting && !hasIntersected) {
					setHasIntersected(true);
				}
			},
			{
				threshold: 0.1,
				rootMargin: '50px',
				...options,
			},
		);

		observer.observe(element);

		return () => {
			observer.unobserve(element);
		};
	}, [hasIntersected, options]);

	return { elementRef, isIntersecting, hasIntersected };
};

/**
 * Hook for preloading resources
 */
export const usePreload = () => {
	const preloadedResources = useRef(new Set());

	const preloadImage = useCallback((src) => {
		if (preloadedResources.current.has(src)) {
			return Promise.resolve();
		}

		return new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => {
				preloadedResources.current.add(src);
				resolve();
			};
			img.onerror = reject;
			img.src = src;
		});
	}, []);

	const preloadRoute = useCallback(async (routeImport) => {
		try {
			await routeImport();
		} catch (error) {
			console.warn('Failed to preload route:', error);
		}
	}, []);

	return { preloadImage, preloadRoute };
};

/**
 * Hook for managing component visibility and lazy rendering
 */
export const useLazyRender = (threshold = 0.1) => {
	const { elementRef, hasIntersected } = useIntersectionObserver({
		threshold,
		rootMargin: '100px',
	});

	return { elementRef, shouldRender: hasIntersected };
};

/**
 * Hook for optimizing re-renders with memoization
 */
export const useStableCallback = (callback, deps) => {
	const callbackRef = useRef(callback);
	const depsRef = useRef(deps);

	// Update callback if dependencies changed
	useEffect(() => {
		callbackRef.current = callback;
		depsRef.current = deps;
	});

	return useCallback(
		(...args) => {
			return callbackRef.current(...args);
		},
		[], // Empty deps array since we manage updates manually
	);
};
