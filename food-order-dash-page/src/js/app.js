// Online Food Ordering Application - Main JavaScript File

class FoodOrderingApp {
	constructor() {
		this.menuItems = [];
		this.cart = [];
		this.filteredItems = [];
		this.currentCategory = 'all';
		this.searchTerm = '';

		this.init();
	}

	async init() {
		await this.loadMenuItems();
		this.setupEventListeners();
		this.renderMenuItems();
		this.updateCartDisplay();
	}

	// Load menu items from JSON file
	async loadMenuItems() {
		try {
			const response = await fetch('src/data/menu.json');
			if (!response.ok) {
				throw new Error('Failed to load menu items');
			}
			this.menuItems = await response.json();
			this.filteredItems = [...this.menuItems];
			this.hideLoadingSpinner();
		} catch (error) {
			console.error('Error loading menu items:', error);
			this.showErrorMessage(
				'Failed to load menu items. Please try again later.',
			);
			this.hideLoadingSpinner();
		}
	}

	// Setup all event listeners
	setupEventListeners() {
		// Navigation
		this.setupNavigationListeners();

		// Search functionality
		this.setupSearchListeners();

		// Filter functionality
		this.setupFilterListeners();

		// Cart functionality
		this.setupCartListeners();

		// Contact form
		this.setupContactFormListener();

		// Mobile menu
		this.setupMobileMenuListener();
	}

	setupNavigationListeners() {
		// Smooth scrolling for navigation links
		document.querySelectorAll('.nav-link').forEach((link) => {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const targetId = link.getAttribute('href').substring(1);
				const targetElement = document.getElementById(targetId);

				if (targetElement) {
					targetElement.scrollIntoView({
						behavior: 'smooth',
						block: 'start',
					});
				}

				// Update active navigation
				this.updateActiveNavigation(link);

				// Close mobile menu if open
				this.closeMobileMenu();
			});
		});

		// Update navigation on scroll
		window.addEventListener('scroll', () => {
			this.updateNavigationOnScroll();
		});
	}

	setupSearchListeners() {
		const searchInput = document.getElementById('searchInput');
		if (searchInput) {
			searchInput.addEventListener(
				'input',
				this.debounce((e) => {
					this.searchTerm = e.target.value.toLowerCase();
					this.filterAndRenderItems();
				}, 300),
			);
		}
	}

	setupFilterListeners() {
		document.querySelectorAll('.retro-filter-btn').forEach((button) => {
			button.addEventListener('click', (e) => {
				const category = e.target.getAttribute('data-category');
				this.currentCategory = category;

				// Update active filter button
				document
					.querySelectorAll('.retro-filter-btn')
					.forEach((btn) => btn.classList.remove('active'));
				e.target.classList.add('active');

				this.filterAndRenderItems();
			});
		});
	}

	setupCartListeners() {
		const cartBtn = document.getElementById('cartBtn');
		const cartModal = document.getElementById('cartModal');
		const closeCartModal = document.getElementById('closeCartModal');
		const checkoutBtn = document.getElementById('checkoutBtn');

		if (cartBtn) {
			cartBtn.addEventListener('click', () => {
				this.showCartModal();
			});
		}

		if (closeCartModal) {
			closeCartModal.addEventListener('click', () => {
				this.hideCartModal();
			});
		}

		if (cartModal) {
			cartModal.addEventListener('click', (e) => {
				if (e.target === cartModal) {
					this.hideCartModal();
				}
			});
		}

		if (checkoutBtn) {
			checkoutBtn.addEventListener('click', () => {
				this.processCheckout();
			});
		}
	}

	setupContactFormListener() {
		const contactForm = document.getElementById('contactForm');
		if (contactForm) {
			contactForm.addEventListener('submit', (e) => {
				e.preventDefault();
				this.handleContactFormSubmission(e);
			});
		}
	}

	setupMobileMenuListener() {
		const mobileMenuBtn = document.getElementById('mobileMenuBtn');
		const mobileMenu = document.getElementById('mobileMenu');

		if (mobileMenuBtn) {
			mobileMenuBtn.addEventListener('click', () => {
				mobileMenu.classList.toggle('hidden');
			});
		}

		// Close mobile menu when clicking on mobile nav links
		document.querySelectorAll('.mobile-nav').forEach((link) => {
			link.addEventListener('click', () => {
				this.closeMobileMenu();
			});
		});
	}

	// Filter and render items based on category and search
	filterAndRenderItems() {
		this.filteredItems = this.menuItems.filter((item) => {
			const matchesCategory =
				this.currentCategory === 'all' ||
				item.category === this.currentCategory;
			const matchesSearch =
				item.name.toLowerCase().includes(this.searchTerm) ||
				item.description.toLowerCase().includes(this.searchTerm);
			return matchesCategory && matchesSearch;
		});

		this.renderMenuItems();
	}

	// Render menu items to the DOM
	renderMenuItems() {
		const menuGrid = document.getElementById('menuGrid');
		if (!menuGrid) return;

		if (this.filteredItems.length === 0) {
			menuGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-4xl text-diner-light-teal mb-4" style="filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.8));"></i>
                    <h3 class="text-xl font-semibold text-diner-light mb-2 font-atomic" style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);">No items found</h3>
                    <p class="text-diner-light/80 font-retro" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);">Try adjusting your search or filter criteria</p>
                </div>
            `;
			return;
		}

		menuGrid.innerHTML = this.filteredItems
			.map((item) => this.createMenuItemHTML(item))
			.join('');

		// Add event listeners to "Add to Cart" buttons
		this.setupAddToCartListeners();
	}

	// Create HTML for a single menu item
	createMenuItemHTML(item) {
		return `
            <div class="menu-card bg-gradient-to-br from-diner-dark-teal/95 to-diner-mid-teal/90 backdrop-blur-lg border-2 border-diner-light-teal/60 rounded-2xl p-6 hover:border-diner-light-teal transition-all duration-300 transform hover:scale-105 shadow-2xl">
                <div class="relative overflow-hidden rounded-xl mb-4">
                    <img src="${item.image}" alt="${
			item.name
		}" class="w-full h-48 object-cover rounded-xl" 
                         onerror="this.src='https://via.placeholder.com/400x300?text=Atomic+Food'">
                    <div class="absolute top-3 right-3 bg-gradient-to-r from-diner-light-teal to-diner-mid-teal text-diner-dark-teal rounded-full px-3 py-2 text-sm font-bold font-atomic shadow-lg"
                         style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);">
                        $${item.price.toFixed(2)}
                    </div>
                    <div class="absolute top-3 left-3 bg-gradient-to-r from-diner-red to-diner-dark-red text-diner-light rounded-full px-2 py-1 text-xs font-bold uppercase tracking-wider shadow-lg"
                         style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);">
                        ${this.getCategoryIcon(item.category)}
                    </div>
                </div>
                <div class="menu-card-content">
                    <h3 class="text-xl font-atomic font-bold text-diner-light mb-3"
                        style="text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9); color: #EAD1B1 !important;">${
							item.name
						}</h3>
                    <p class="text-sm font-retro leading-relaxed mb-4 menu-description"
                       style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8); color: rgba(234, 209, 177, 0.95) !important;">${
							item.description
						}</p>
                    <div class="flex items-center justify-between mb-4" style="color: rgba(234, 209, 177, 0.9) !important;">
                        <span class="text-sm font-retro font-medium"
                              style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8); color: rgba(234, 209, 177, 0.9) !important;">
                            <i class="fas fa-atom text-diner-light-teal mr-1" style="filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8));"></i> ${
								item.nutrition.calories
							} cal
                        </span>
                        <span class="text-sm font-retro font-medium"
                              style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8); color: rgba(234, 209, 177, 0.9) !important;">
                            <i class="fas fa-rocket text-diner-red mr-1" style="filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8));"></i> QUANTUM SPEED
                        </span>
                    </div>
                    <button class="w-full bg-gradient-to-r from-diner-red to-diner-dark-red text-diner-light py-3 px-6 rounded-lg font-bold uppercase tracking-wider hover:from-diner-dark-red hover:to-diner-red transition-all duration-300 transform hover:scale-105 shadow-lg add-to-cart-btn" 
                            style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);"
                            data-item-id="${item.id}">
                        <i class="fas fa-plus mr-2"></i>ADD TO CART
                    </button>
                </div>
            </div>
        `;
	}

	// Setup event listeners for "Add to Cart" buttons
	setupAddToCartListeners() {
		document.querySelectorAll('.add-to-cart-btn').forEach((button) => {
			button.addEventListener('click', (e) => {
				const itemId = parseInt(e.target.getAttribute('data-item-id'));
				this.addToCart(itemId);

				// Visual feedback
				e.target.innerHTML = '<i class="fas fa-check mr-2"></i>Added!';
				e.target.classList.add('success-animation');

				setTimeout(() => {
					e.target.innerHTML =
						'<i class="fas fa-plus mr-2"></i>Add to Cart';
					e.target.classList.remove('success-animation');
				}, 1000);
			});
		});
	}

	// Add item to cart
	addToCart(itemId) {
		const item = this.menuItems.find((item) => item.id === itemId);
		if (!item) return;

		const existingItem = this.cart.find(
			(cartItem) => cartItem.id === itemId,
		);

		if (existingItem) {
			existingItem.quantity += 1;
		} else {
			this.cart.push({
				...item,
				quantity: 1,
			});
		}

		this.updateCartDisplay();
		this.animateCartBadge();
		this.showToast('Item added to cart!', 'success');
		this.saveCartToStorage();
	}

	// Remove item from cart
	removeFromCart(itemId) {
		this.cart = this.cart.filter((item) => item.id !== itemId);
		this.updateCartDisplay();
		this.renderCartItems();
		this.saveCartToStorage();
	}

	// Update item quantity in cart
	updateCartQuantity(itemId, quantity) {
		const item = this.cart.find((cartItem) => cartItem.id === itemId);
		if (item) {
			if (quantity <= 0) {
				this.removeFromCart(itemId);
			} else {
				item.quantity = quantity;
				this.updateCartDisplay();
				this.renderCartItems();
				this.saveCartToStorage();
			}
		}
	}

	// Update cart display (badge and total)
	updateCartDisplay() {
		const cartCount = document.getElementById('cartCount');
		const cartTotal = document.getElementById('cartTotal');

		const totalItems = this.cart.reduce(
			(sum, item) => sum + item.quantity,
			0,
		);
		const totalPrice = this.cart.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		);

		if (cartCount) {
			cartCount.textContent = totalItems;
		}

		if (cartTotal) {
			cartTotal.textContent = totalPrice.toFixed(2);
		}
	}

	// Show cart modal
	showCartModal() {
		const cartModal = document.getElementById('cartModal');
		if (cartModal) {
			cartModal.classList.remove('hidden');
			this.renderCartItems();
		}
	}

	// Hide cart modal
	hideCartModal() {
		const cartModal = document.getElementById('cartModal');
		if (cartModal) {
			cartModal.classList.add('hidden');
		}
	}

	// Render cart items in modal
	renderCartItems() {
		const cartItems = document.getElementById('cartItems');
		const cartEmpty = document.getElementById('cartEmpty');
		const cartFooter = document.getElementById('cartFooter');

		if (this.cart.length === 0) {
			if (cartItems) cartItems.innerHTML = '';
			if (cartEmpty) cartEmpty.classList.remove('hidden');
			if (cartFooter) cartFooter.classList.add('hidden');
			return;
		}

		if (cartEmpty) cartEmpty.classList.add('hidden');
		if (cartFooter) cartFooter.classList.remove('hidden');

		if (cartItems) {
			cartItems.innerHTML = this.cart
				.map((item) => this.createCartItemHTML(item))
				.join('');
			this.setupCartItemListeners();
		}
	}

	// Create HTML for cart item
	createCartItemHTML(item) {
		return `
            <div class="cart-item">
                <div class="flex items-center space-x-3">
                    <img src="${item.image}" alt="${
			item.name
		}" class="w-16 h-16 object-cover rounded-lg">
                    <div class="flex-1">
                        <h4 class="font-semibold">${item.name}</h4>
                        <p class="text-sm text-gray-600">$${item.price.toFixed(
							2,
						)} each</p>
                    </div>
                </div>
                <div class="flex items-center space-x-3">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="app.updateCartQuantity(${
							item.id
						}, ${item.quantity - 1})">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="app.updateCartQuantity(${
							item.id
						}, ${item.quantity + 1})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <div class="text-right">
                        <p class="font-semibold">$${(
							item.price * item.quantity
						).toFixed(2)}</p>
                        <button class="text-red-500 hover:text-red-700 text-sm" onclick="app.removeFromCart(${
							item.id
						})">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
	}

	// Setup cart item event listeners
	setupCartItemListeners() {
		// Event listeners are handled via onclick attributes in the HTML for simplicity
		// In a production app, you might want to use proper event delegation
	}

	// Process checkout
	processCheckout() {
		if (this.cart.length === 0) {
			this.showToast('Your cart is empty!', 'error');
			return;
		}

		// Simulate checkout process
		this.showToast('Processing your order...', 'info');

		setTimeout(() => {
			this.cart = [];
			this.updateCartDisplay();
			this.hideCartModal();
			this.showToast(
				'Order placed successfully! You will receive a confirmation email shortly.',
				'success',
			);
			this.saveCartToStorage();
		}, 2000);
	}

	// Handle contact form submission
	handleContactFormSubmission(e) {
		const formData = new FormData(e.target);
		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			message: formData.get('message'),
		};

		// Simulate form submission
		this.showToast('Sending message...', 'info');

		setTimeout(() => {
			this.showToast(
				'Message sent successfully! We will get back to you soon.',
				'success',
			);
			e.target.reset();
		}, 1500);
	}

	// Utility functions
	debounce(func, wait) {
		let timeout;
		return function executedFunction(...args) {
			const later = () => {
				clearTimeout(timeout);
				func(...args);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	hideLoadingSpinner() {
		const spinner = document.getElementById('loadingSpinner');
		if (spinner) {
			spinner.style.display = 'none';
		}
	}

	showErrorMessage(message) {
		const menuGrid = document.getElementById('menuGrid');
		if (menuGrid) {
			menuGrid.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-600 mb-2">Error</h3>
                    <p class="text-gray-500">${message}</p>
                </div>
            `;
		}
	}

	showToast(message, type = 'info') {
		const toast = document.createElement('div');
		toast.className = `toast ${type}`;
		toast.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${this.getToastIcon(type)} mr-3"></i>
                <span>${message}</span>
            </div>
        `;

		document.body.appendChild(toast);

		setTimeout(() => {
			toast.remove();
		}, 3000);
	}

	getToastIcon(type) {
		const icons = {
			success: 'check-circle',
			error: 'exclamation-circle',
			info: 'info-circle',
		};
		return icons[type] || 'info-circle';
	}

	animateCartBadge() {
		const cartCount = document.getElementById('cartCount');
		if (cartCount) {
			cartCount.classList.add('cart-badge-animate');
			setTimeout(() => {
				cartCount.classList.remove('cart-badge-animate');
			}, 600);
		}
	}

	updateActiveNavigation(activeLink) {
		document.querySelectorAll('.nav-link').forEach((link) => {
			link.classList.remove('active');
		});
		activeLink.classList.add('active');
	}

	updateNavigationOnScroll() {
		const sections = ['home', 'menu', 'about', 'contact'];
		const scrollPos = window.scrollY + 100;

		sections.forEach((sectionId) => {
			const section = document.getElementById(sectionId);
			const navLink = document.querySelector(`a[href="#${sectionId}"]`);

			if (section && navLink) {
				const sectionTop = section.offsetTop;
				const sectionBottom = sectionTop + section.offsetHeight;

				if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
					document.querySelectorAll('.nav-link').forEach((link) => {
						link.classList.remove('active');
					});
					navLink.classList.add('active');
				}
			}
		});
	}

	closeMobileMenu() {
		const mobileMenu = document.getElementById('mobileMenu');
		if (mobileMenu) {
			mobileMenu.classList.add('hidden');
		}
	}

	saveCartToStorage() {
		localStorage.setItem('foodOrderCart', JSON.stringify(this.cart));
	}

	loadCartFromStorage() {
		const savedCart = localStorage.getItem('foodOrderCart');
		if (savedCart) {
			this.cart = JSON.parse(savedCart);
			this.updateCartDisplay();
		}
	}

	// Helper function to get category icon
	getCategoryIcon(category) {
		const icons = {
			appetizers: 'STARTER',
			'main-course': 'MAIN',
			desserts: 'SWEET',
			beverages: 'DRINK',
		};
		return icons[category] || 'FOOD';
	}
}

// Utility function for smooth scrolling to menu
function scrollToMenu() {
	const menuSection = document.getElementById('menu');
	if (menuSection) {
		menuSection.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
	app = new FoodOrderingApp();
	app.loadCartFromStorage();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
	module.exports = FoodOrderingApp;
}
