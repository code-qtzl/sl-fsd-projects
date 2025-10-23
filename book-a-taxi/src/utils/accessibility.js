/**
 * Accessibility utility functions
 */

/**
 * Manages focus for modal dialogs and overlays
 */
export class FocusManager {
	constructor() {
		this.previousActiveElement = null;
		this.focusableElements = null;
		this.container = null;
	}

	/**
	 * Trap focus within a container element
	 */
	trapFocus(container) {
		this.container = container;
		this.previousActiveElement = document.activeElement;

		// Get all focusable elements within the container
		this.focusableElements = container.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
		);

		if (this.focusableElements.length > 0) {
			// Focus the first focusable element
			this.focusableElements[0].focus();
		}

		// Add event listener for tab key
		document.addEventListener('keydown', this.handleTabKey);
	}

	/**
	 * Release focus trap and restore previous focus
	 */
	releaseFocus() {
		document.removeEventListener('keydown', this.handleTabKey);

		if (
			this.previousActiveElement &&
			'focus' in this.previousActiveElement
		) {
			this.previousActiveElement.focus();
		}

		this.container = null;
		this.focusableElements = null;
		this.previousActiveElement = null;
	}

	handleTabKey = (event) => {
		if (
			event.key !== 'Tab' ||
			!this.focusableElements ||
			this.focusableElements.length === 0
		) {
			return;
		}

		const firstElement = this.focusableElements[0];
		const lastElement =
			this.focusableElements[this.focusableElements.length - 1];

		if (event.shiftKey) {
			// Shift + Tab
			if (document.activeElement === firstElement) {
				event.preventDefault();
				lastElement.focus();
			}
		} else {
			// Tab
			if (document.activeElement === lastElement) {
				event.preventDefault();
				firstElement.focus();
			}
		}
	};
}

/**
 * Announces messages to screen readers
 */
export class ScreenReaderAnnouncer {
	constructor() {
		this.announcer = null;
		this.createAnnouncer();
	}

	createAnnouncer() {
		this.announcer = document.createElement('div');
		this.announcer.setAttribute('aria-live', 'polite');
		this.announcer.setAttribute('aria-atomic', 'true');
		this.announcer.className = 'sr-only';
		document.body.appendChild(this.announcer);
	}

	/**
	 * Announce a message to screen readers
	 */
	announce(message, priority = 'polite') {
		if (!this.announcer) {
			this.createAnnouncer();
		}

		if (this.announcer) {
			this.announcer.setAttribute('aria-live', priority);
			this.announcer.textContent = message;

			// Clear the message after a short delay to allow for re-announcements
			setTimeout(() => {
				if (this.announcer) {
					this.announcer.textContent = '';
				}
			}, 1000);
		}
	}

	/**
	 * Clean up the announcer element
	 */
	destroy() {
		if (this.announcer && this.announcer.parentNode) {
			this.announcer.parentNode.removeChild(this.announcer);
			this.announcer = null;
		}
	}
}

/**
 * Keyboard navigation utilities
 */
export const KeyboardUtils = {
	/**
	 * Check if an element is focusable
	 */
	isFocusable(element) {
		const focusableSelectors = [
			'button:not([disabled])',
			'[href]',
			'input:not([disabled])',
			'select:not([disabled])',
			'textarea:not([disabled])',
			'[tabindex]:not([tabindex="-1"])',
			'[contenteditable="true"]',
		];

		return focusableSelectors.some((selector) => element.matches(selector));
	},

	/**
	 * Get all focusable elements within a container
	 */
	getFocusableElements(container) {
		const focusableSelectors = [
			'button:not([disabled])',
			'[href]',
			'input:not([disabled])',
			'select:not([disabled])',
			'textarea:not([disabled])',
			'[tabindex]:not([tabindex="-1"])',
			'[contenteditable="true"]',
		].join(', ');

		return Array.from(container.querySelectorAll(focusableSelectors));
	},

	/**
	 * Handle arrow key navigation in a list
	 */
	handleArrowNavigation(event, items, currentIndex, onIndexChange) {
		let newIndex = currentIndex;

		switch (event.key) {
			case 'ArrowDown':
			case 'ArrowRight':
				event.preventDefault();
				newIndex =
					currentIndex < items.length - 1 ? currentIndex + 1 : 0;
				break;
			case 'ArrowUp':
			case 'ArrowLeft':
				event.preventDefault();
				newIndex =
					currentIndex > 0 ? currentIndex - 1 : items.length - 1;
				break;
			case 'Home':
				event.preventDefault();
				newIndex = 0;
				break;
			case 'End':
				event.preventDefault();
				newIndex = items.length - 1;
				break;
			default:
				return;
		}

		onIndexChange(newIndex);
		items[newIndex]?.focus();
	},
};

/**
 * ARIA utilities
 */
export const AriaUtils = {
	/**
	 * Generate a unique ID for ARIA relationships
	 */
	generateId(prefix = 'aria') {
		return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
	},

	/**
	 * Set up ARIA relationship between elements
	 */
	setAriaRelationship(element, relatedElement, relationship) {
		if (!relatedElement.id) {
			relatedElement.id = this.generateId();
		}
		element.setAttribute(`aria-${relationship}`, relatedElement.id);
	},

	/**
	 * Update ARIA live region
	 */
	updateLiveRegion(element, message) {
		element.textContent = message;
	},
};

/**
 * Color contrast utilities
 */
export const ContrastUtils = {
	/**
	 * Calculate relative luminance of a color
	 */
	getLuminance(r, g, b) {
		const [rs, gs, bs] = [r, g, b].map((c) => {
			c = c / 255;
			return c <= 0.03928
				? c / 12.92
				: Math.pow((c + 0.055) / 1.055, 2.4);
		});
		return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
	},

	/**
	 * Calculate contrast ratio between two colors
	 */
	getContrastRatio(color1, color2) {
		const lum1 = this.getLuminance(...color1);
		const lum2 = this.getLuminance(...color2);
		const brightest = Math.max(lum1, lum2);
		const darkest = Math.min(lum1, lum2);
		return (brightest + 0.05) / (darkest + 0.05);
	},

	/**
	 * Check if color combination meets WCAG AA standards
	 */
	meetsWCAGAA(color1, color2) {
		return this.getContrastRatio(color1, color2) >= 4.5;
	},

	/**
	 * Check if color combination meets WCAG AAA standards
	 */
	meetsWCAGAAA(color1, color2) {
		return this.getContrastRatio(color1, color2) >= 7;
	},
};

/**
 * Motion preferences utilities
 */
export const MotionUtils = {
	/**
	 * Check if user prefers reduced motion
	 */
	prefersReducedMotion() {
		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	},

	/**
	 * Get appropriate animation duration based on user preferences
	 */
	getAnimationDuration(normalDuration) {
		return this.prefersReducedMotion() ? 0 : normalDuration;
	},

	/**
	 * Apply animation with respect to motion preferences
	 */
	safeAnimate(element, keyframes, options) {
		if (this.prefersReducedMotion()) {
			return null;
		}
		return element.animate(keyframes, options);
	},
};

/**
 * Form accessibility utilities
 */
export const FormUtils = {
	/**
	 * Associate form field with error message
	 */
	associateFieldWithError(field, errorElement) {
		AriaUtils.setAriaRelationship(field, errorElement, 'describedby');
		field.setAttribute('aria-invalid', 'true');
	},

	/**
	 * Clear field error association
	 */
	clearFieldError(field) {
		field.removeAttribute('aria-describedby');
		field.setAttribute('aria-invalid', 'false');
	},

	/**
	 * Announce form validation results
	 */
	announceValidationResults(announcer, errors, fieldCount) {
		if (errors.length === 0) {
			announcer.announce('Form submitted successfully', 'polite');
		} else {
			const message = `Form has ${errors.length} error${
				errors.length > 1 ? 's' : ''
			} out of ${fieldCount} fields. Please review and correct the highlighted fields.`;
			announcer.announce(message, 'assertive');
		}
	},
};

// Create global instances
export const globalFocusManager = new FocusManager();
export const globalAnnouncer = new ScreenReaderAnnouncer();
