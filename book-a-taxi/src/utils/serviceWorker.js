/**
 * Service Worker registration and management utilities
 */

const isLocalhost = Boolean(
	window.location.hostname === 'localhost' ||
		window.location.hostname === '[::1]' ||
		window.location.hostname.match(
			/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
		),
);

export function registerSW(config) {
	if ('serviceWorker' in navigator) {
		const publicUrl = new URL(
			import.meta.env.BASE_URL || '/',
			window.location.href,
		);
		if (publicUrl.origin !== window.location.origin) {
			return;
		}

		window.addEventListener('load', () => {
			const swUrl = `${import.meta.env.BASE_URL || '/'}sw.js`;

			if (isLocalhost) {
				checkValidServiceWorker(swUrl, config);
				navigator.serviceWorker.ready.then(() => {
					console.log(
						'This web app is being served cache-first by a service worker.',
					);
				});
			} else {
				registerValidSW(swUrl, config);
			}
		});
	}
}

function registerValidSW(swUrl, config) {
	navigator.serviceWorker
		.register(swUrl)
		.then((registration) => {
			console.log(
				'Service Worker registered successfully:',
				registration,
			);

			registration.onupdatefound = () => {
				const installingWorker = registration.installing;
				if (installingWorker == null) {
					return;
				}

				installingWorker.onstatechange = () => {
					if (installingWorker.state === 'installed') {
						if (navigator.serviceWorker.controller) {
							console.log(
								'New content is available and will be used when all tabs for this page are closed.',
							);
							if (config && config.onUpdate) {
								config.onUpdate(registration);
							}
						} else {
							console.log('Content is cached for offline use.');
							if (config && config.onSuccess) {
								config.onSuccess(registration);
							}
							if (config && config.onOfflineReady) {
								config.onOfflineReady();
							}
						}
					}
				};
			};
		})
		.catch((error) => {
			console.error('Error during service worker registration:', error);
		});
}

function checkValidServiceWorker(swUrl, config) {
	fetch(swUrl, {
		headers: { 'Service-Worker': 'script' },
	})
		.then((response) => {
			const contentType = response.headers.get('content-type');
			if (
				response.status === 404 ||
				(contentType != null &&
					contentType.indexOf('javascript') === -1)
			) {
				navigator.serviceWorker.ready.then((registration) => {
					registration.unregister().then(() => {
						window.location.reload();
					});
				});
			} else {
				registerValidSW(swUrl, config);
			}
		})
		.catch(() => {
			console.log(
				'No internet connection found. App is running in offline mode.',
			);
		});
}

export function unregisterSW() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready
			.then((registration) => {
				registration.unregister();
			})
			.catch((error) => {
				console.error(error.message);
			});
	}
}

/**
 * Check if the app is running offline
 */
export function isOffline() {
	return !navigator.onLine;
}

/**
 * Add offline/online event listeners
 */
export function addNetworkListeners(onOnline, onOffline) {
	const handleOnline = () => {
		console.log('App is back online');
		onOnline?.();
	};

	const handleOffline = () => {
		console.log('App is offline');
		onOffline?.();
	};

	window.addEventListener('online', handleOnline);
	window.addEventListener('offline', handleOffline);

	return () => {
		window.removeEventListener('online', handleOnline);
		window.removeEventListener('offline', handleOffline);
	};
}

/**
 * Request persistent storage
 */
export async function requestPersistentStorage() {
	if ('storage' in navigator && 'persist' in navigator.storage) {
		try {
			const persistent = await navigator.storage.persist();
			console.log(`Persistent storage: ${persistent}`);
			return persistent;
		} catch (error) {
			console.error('Failed to request persistent storage:', error);
			return false;
		}
	}
	return false;
}

/**
 * Get storage usage information
 */
export async function getStorageUsage() {
	if ('storage' in navigator && 'estimate' in navigator.storage) {
		try {
			const estimate = await navigator.storage.estimate();
			const usage = estimate.usage || 0;
			const quota = estimate.quota || 0;
			const usagePercentage = quota > 0 ? (usage / quota) * 100 : 0;

			return {
				usage,
				quota,
				usagePercentage,
			};
		} catch (error) {
			console.error('Failed to get storage usage:', error);
			return null;
		}
	}
	return null;
}

/**
 * Clear all caches
 */
export async function clearAllCaches() {
	if ('caches' in window) {
		try {
			const cacheNames = await caches.keys();
			await Promise.all(
				cacheNames.map((cacheName) => caches.delete(cacheName)),
			);
			console.log('All caches cleared');
		} catch (error) {
			console.error('Failed to clear caches:', error);
		}
	}
}

/**
 * Update service worker
 */
export async function updateServiceWorker() {
	if ('serviceWorker' in navigator) {
		try {
			const registration = await navigator.serviceWorker.ready;
			await registration.update();
			console.log('Service worker updated');
		} catch (error) {
			console.error('Failed to update service worker:', error);
		}
	}
}

/**
 * Skip waiting and activate new service worker
 */
export function skipWaitingAndReload() {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready.then((registration) => {
			if (registration.waiting) {
				registration.waiting.postMessage({ type: 'SKIP_WAITING' });
				window.location.reload();
			}
		});
	}
}

/**
 * Background sync for offline form submissions
 */
export function registerBackgroundSync(tag, data) {
	if (
		'serviceWorker' in navigator &&
		'sync' in window.ServiceWorkerRegistration.prototype
	) {
		navigator.serviceWorker.ready
			.then((registration) => {
				// Store data in IndexedDB for background sync
				storeForBackgroundSync(tag, data);

				// Register sync event
				return registration.sync?.register(tag);
			})
			.catch((error) => {
				console.error('Background sync registration failed:', error);
			});
	}
}

/**
 * Store data for background sync (simplified implementation)
 */
function storeForBackgroundSync(tag, data) {
	// In a real implementation, this would use IndexedDB
	const pendingData = JSON.parse(localStorage.getItem('pendingSync') || '[]');
	pendingData.push({ tag, data, timestamp: Date.now() });
	localStorage.setItem('pendingSync', JSON.stringify(pendingData));
}

/**
 * Performance monitoring
 */
export function monitorPerformance() {
	if ('performance' in window) {
		// Monitor navigation timing
		window.addEventListener('load', () => {
			setTimeout(() => {
				const navigation =
					performance.getEntriesByType('navigation')[0];
				if (navigation) {
					console.log('Performance metrics:', {
						domContentLoaded:
							navigation.domContentLoadedEventEnd -
							navigation.domContentLoadedEventStart,
						loadComplete:
							navigation.loadEventEnd - navigation.loadEventStart,
						totalTime:
							navigation.loadEventEnd - navigation.fetchStart,
					});
				}
			}, 0);
		});

		// Monitor resource timing
		const observer = new PerformanceObserver((list) => {
			list.getEntries().forEach((entry) => {
				if (entry.duration > 1000) {
					// Log slow resources
					console.warn(
						'Slow resource:',
						entry.name,
						`${entry.duration}ms`,
					);
				}
			});
		});

		observer.observe({ entryTypes: ['resource'] });
	}
}
