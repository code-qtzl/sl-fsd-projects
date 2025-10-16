// Service Worker for BookATaxi App
// Implements caching strategies for performance optimization

const CACHE_NAME = 'bookataxi-v1';
const STATIC_CACHE = 'bookataxi-static-v1';
const DYNAMIC_CACHE = 'bookataxi-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
	'/',
	'/static/js/bundle.js',
	'/static/css/main.css',
	'/manifest.json',
	'/favicon.ico',
];

// API endpoints that should be cached
const API_CACHE_PATTERNS = [/\/api\/services/, /\/api\/locations/];

// Install event - cache static assets
self.addEventListener('install', (event) => {
	console.log('Service Worker: Installing...');

	event.waitUntil(
		caches
			.open(STATIC_CACHE)
			.then((cache) => {
				console.log('Service Worker: Caching static assets');
				return cache.addAll(STATIC_ASSETS);
			})
			.then(() => {
				console.log('Service Worker: Static assets cached');
				return self.skipWaiting();
			})
			.catch((error) => {
				console.error(
					'Service Worker: Failed to cache static assets',
					error,
				);
			}),
	);
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
	console.log('Service Worker: Activating...');

	event.waitUntil(
		caches
			.keys()
			.then((cacheNames) => {
				return Promise.all(
					cacheNames.map((cacheName) => {
						if (
							cacheName !== STATIC_CACHE &&
							cacheName !== DYNAMIC_CACHE
						) {
							console.log(
								'Service Worker: Deleting old cache',
								cacheName,
							);
							return caches.delete(cacheName);
						}
					}),
				);
			})
			.then(() => {
				console.log('Service Worker: Activated');
				return self.clients.claim();
			}),
	);
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
	const { request } = event;
	const url = new URL(request.url);

	// Skip non-GET requests
	if (request.method !== 'GET') {
		return;
	}

	// Skip chrome-extension and other non-http requests
	if (!request.url.startsWith('http')) {
		return;
	}

	// Handle different types of requests with appropriate strategies
	if (isStaticAsset(request)) {
		// Cache First strategy for static assets
		event.respondWith(cacheFirst(request));
	} else if (isAPIRequest(request)) {
		// Network First strategy for API requests
		event.respondWith(networkFirst(request));
	} else if (isImageRequest(request)) {
		// Cache First strategy for images
		event.respondWith(cacheFirst(request));
	} else {
		// Stale While Revalidate for HTML pages
		event.respondWith(staleWhileRevalidate(request));
	}
});

// Cache First Strategy - good for static assets
async function cacheFirst(request) {
	try {
		const cachedResponse = await caches.match(request);
		if (cachedResponse) {
			return cachedResponse;
		}

		const networkResponse = await fetch(request);
		if (networkResponse.ok) {
			const cache = await caches.open(STATIC_CACHE);
			cache.put(request, networkResponse.clone());
		}
		return networkResponse;
	} catch (error) {
		console.error('Cache First strategy failed:', error);
		return new Response('Network error', { status: 408 });
	}
}

// Network First Strategy - good for API requests
async function networkFirst(request) {
	try {
		const networkResponse = await fetch(request);
		if (networkResponse.ok) {
			const cache = await caches.open(DYNAMIC_CACHE);
			cache.put(request, networkResponse.clone());
		}
		return networkResponse;
	} catch (error) {
		console.log('Network failed, trying cache:', error);
		const cachedResponse = await caches.match(request);
		if (cachedResponse) {
			return cachedResponse;
		}
		return new Response('Network error and no cache available', {
			status: 408,
		});
	}
}

// Stale While Revalidate Strategy - good for HTML pages
async function staleWhileRevalidate(request) {
	const cache = await caches.open(DYNAMIC_CACHE);
	const cachedResponse = await cache.match(request);

	const fetchPromise = fetch(request)
		.then((networkResponse) => {
			if (networkResponse.ok) {
				cache.put(request, networkResponse.clone());
			}
			return networkResponse;
		})
		.catch((error) => {
			console.error('Network request failed:', error);
			return cachedResponse;
		});

	return cachedResponse || fetchPromise;
}

// Helper functions to identify request types
function isStaticAsset(request) {
	const url = new URL(request.url);
	return (
		url.pathname.includes('/static/') ||
		url.pathname.endsWith('.js') ||
		url.pathname.endsWith('.css') ||
		url.pathname.endsWith('.woff') ||
		url.pathname.endsWith('.woff2')
	);
}

function isAPIRequest(request) {
	const url = new URL(request.url);
	return (
		url.pathname.startsWith('/api/') ||
		API_CACHE_PATTERNS.some((pattern) => pattern.test(url.pathname))
	);
}

function isImageRequest(request) {
	const url = new URL(request.url);
	return (
		url.pathname.endsWith('.jpg') ||
		url.pathname.endsWith('.jpeg') ||
		url.pathname.endsWith('.png') ||
		url.pathname.endsWith('.gif') ||
		url.pathname.endsWith('.webp') ||
		url.pathname.endsWith('.svg')
	);
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
	if (event.tag === 'booking-sync') {
		event.waitUntil(syncBookings());
	}
});

async function syncBookings() {
	try {
		// Get pending bookings from IndexedDB
		const pendingBookings = await getPendingBookings();

		for (const booking of pendingBookings) {
			try {
				const response = await fetch('/api/bookings', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(booking.data),
				});

				if (response.ok) {
					await removePendingBooking(booking.id);
					console.log('Booking synced successfully:', booking.id);
				}
			} catch (error) {
				console.error('Failed to sync booking:', booking.id, error);
			}
		}
	} catch (error) {
		console.error('Background sync failed:', error);
	}
}

// IndexedDB helpers for offline functionality
async function getPendingBookings() {
	// This would integrate with IndexedDB to get pending bookings
	// For now, return empty array
	return [];
}

async function removePendingBooking(id) {
	// This would remove the booking from IndexedDB
	console.log('Removing pending booking:', id);
}

// Push notification handling
self.addEventListener('push', (event) => {
	if (!event.data) return;

	const data = event.data.json();
	const options = {
		body: data.body,
		icon: '/icon-192x192.png',
		badge: '/badge-72x72.png',
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: data.primaryKey,
		},
		actions: [
			{
				action: 'explore',
				title: 'View Details',
				icon: '/icon-explore.png',
			},
			{
				action: 'close',
				title: 'Close',
				icon: '/icon-close.png',
			},
		],
	};

	event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
	event.notification.close();

	if (event.action === 'explore') {
		event.waitUntil(clients.openWindow('/booking'));
	}
});

// Error handling
self.addEventListener('error', (event) => {
	console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
	console.error('Service Worker unhandled rejection:', event.reason);
});
