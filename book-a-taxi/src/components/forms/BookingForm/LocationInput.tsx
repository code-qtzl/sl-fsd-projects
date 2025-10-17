import React, { useState, useRef, useEffect } from 'react';
import styles from './BookingForm.module.css';

interface LocationInputProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	placeholder: string;
	error?: string;
	required?: boolean;
	id: string;
}

// Mock location suggestions - in a real app, this would come from a geocoding API
const mockLocationSuggestions = [
	'123 Main Street, Downtown',
	'456 Oak Avenue, Midtown',
	'789 Pine Road, Uptown',
	'321 Elm Street, Westside',
	'654 Maple Drive, Eastside',
	'987 Cedar Lane, Northside',
	'147 Birch Boulevard, Southside',
	'258 Willow Way, Central District',
	'369 Spruce Street, Business District',
	'741 Ash Avenue, Residential Area',
];

const LocationInput: React.FC<LocationInputProps> = ({
	label,
	value,
	onChange,
	placeholder,
	error,
	required = false,
	id,
}) => {
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);
	const suggestionsRef = useRef<HTMLUListElement>(null);

	// Filter suggestions based on input value
	useEffect(() => {
		if (value.length >= 2) {
			const filtered = mockLocationSuggestions.filter((suggestion) =>
				suggestion.toLowerCase().includes(value.toLowerCase()),
			);
			setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
		} else {
			setSuggestions([]);
		}
	}, [value]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		onChange(newValue);
		setShowSuggestions(true);
		setActiveSuggestionIndex(-1);
	};

	const handleInputFocus = () => {
		if (suggestions.length > 0) {
			setShowSuggestions(true);
		}
	};

	const handleInputBlur = () => {
		// Delay hiding suggestions to allow for click events
		setTimeout(() => {
			setShowSuggestions(false);
			setActiveSuggestionIndex(-1);
		}, 200);
	};

	const handleSuggestionClick = (suggestion: string) => {
		onChange(suggestion);
		setShowSuggestions(false);
		setActiveSuggestionIndex(-1);
		inputRef.current?.focus();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!showSuggestions || suggestions.length === 0) return;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				setActiveSuggestionIndex((prev) =>
					prev < suggestions.length - 1 ? prev + 1 : 0,
				);
				break;
			case 'ArrowUp':
				e.preventDefault();
				setActiveSuggestionIndex((prev) =>
					prev > 0 ? prev - 1 : suggestions.length - 1,
				);
				break;
			case 'Enter':
				e.preventDefault();
				if (activeSuggestionIndex >= 0) {
					handleSuggestionClick(suggestions[activeSuggestionIndex]);
				}
				break;
			case 'Escape':
				setShowSuggestions(false);
				setActiveSuggestionIndex(-1);
				break;
		}
	};

	// Validate address format
	const isValidAddress = (address: string): boolean => {
		// Basic validation: should contain at least a number and street name
		const addressPattern = /\d+\s+\w+/;
		return address.length >= 5 && addressPattern.test(address);
	};

	const hasValidationError = error || (value && !isValidAddress(value));

	return (
		<div className={styles.formGroup}>
			<label htmlFor={id} className={styles.formLabel}>
				{label} {required && <span className={styles.required}>*</span>}
			</label>
			<div className={styles.locationInputWrapper}>
				<input
					ref={inputRef}
					type='text'
					id={id}
					value={value}
					onChange={handleInputChange}
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
					onKeyDown={handleKeyDown}
					placeholder={placeholder}
					className={`${styles.formInput} ${styles.locationInput} ${
						hasValidationError ? styles.error : ''
					}`}
					aria-describedby={error ? `${id}-error` : undefined}
					aria-expanded={showSuggestions}
					aria-haspopup='listbox'
					aria-autocomplete='list'
					autoComplete='street-address'
				/>

				<div className={styles.locationIcon}>
					<svg
						width='20'
						height='20'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
					>
						<path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
						<circle cx='12' cy='10' r='3' />
					</svg>
				</div>
			</div>

			{showSuggestions && suggestions.length > 0 && (
				<ul
					ref={suggestionsRef}
					className={styles.locationSuggestions}
					role='listbox'
					aria-label='Location suggestions'
				>
					{suggestions.map((suggestion, index) => (
						<li
							key={index}
							className={`${styles.locationSuggestion} ${
								index === activeSuggestionIndex
									? styles.suggestionActive
									: ''
							}`}
							onClick={() => handleSuggestionClick(suggestion)}
							role='option'
							aria-selected={index === activeSuggestionIndex}
						>
							<div className={styles.suggestionIcon}>
								<svg
									width='16'
									height='16'
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='2'
								>
									<path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
									<circle cx='12' cy='10' r='3' />
								</svg>
							</div>
							<span className={styles.suggestionText}>
								{suggestion}
							</span>
						</li>
					))}
				</ul>
			)}

			{hasValidationError && (
				<div
					id={`${id}-error`}
					className={styles.errorMessage}
					role='alert'
				>
					<span className={styles.errorIcon}>⚠</span>
					<span>
						{error ||
							'Please enter a valid address (e.g., "123 Main Street")'}
					</span>
				</div>
			)}
		</div>
	);
};

export default LocationInput;
