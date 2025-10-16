import { useEffect, useCallback, useRef } from 'react';

/**
 * Hook for measuring and optimizing component performance
 */
export const usePerformance = (componentName: string) => {
	const renderStartTime = useRef<number>(0);
	const mountTime = useRef<number>(0);

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
export const useDebounce = <T>(value: T, delay: number): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

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
export const useThrottle = <T extends (...args: unknown[]) => unknown>(
	callback: T,
	delay: number,
): T => {
	const lastRun = useRef<number>(0);
	const timeoutRef = useRef<number>(0);

	return useCallback(
		((...args: Parameters<T>) => {
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
		}) as T,
		[callback, delay],
	);
};

/**
 * Hook for intersection observer (lazy loading)
 */
export const useIntersectionObserver = (
	options: IntersectionObserverInit = {},
) => {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const [hasIntersected, setHasIntersected] = useState(false);
	const elementRef = useRef<HTMLElement>(null);

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
	const preloadedResources = useRef<Set<string>>(new Set());

	const preloadImage = useCallback((src: string): Promise<void> => {
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

	const preloadRoute = useCallback(
		async (routeImport: () => Promise<unknown>) => {
			try {
				await routeImport();
			} catch (error) {
				console.warn('Failed to preload route:', error);
			}
		},
		[],
	);

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
export const useStableCallback = <T extends (...args: unknown[]) => unknown>(
	callback: T,
	deps: React.DependencyList,
): T => {
	const callbackRef = useRef<T>(callback);
	const depsRef = useRef<React.DependencyList>(deps);

	// Update callback if dependencies changed
	useEffect(() => {
		callbackRef.current = callback;
		depsRef.current = deps;
	});

	return useCallback(
		((...args: Parameters<T>) => {
			return callbackRef.current(...args);
		}) as T,
		[], // Empty deps array since we manage updates manually
	);
};

// Import useState for useDebounce
import { useState } from 'react';
