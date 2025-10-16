import React, { useState, useRef, useEffect } from 'react';

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
		<div className='relative mb-4'>
			<div className='relative'>
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
					className={`w-full pl-4 pr-12 py-4 border rounded-full text-base bg-gray-50 text-content-primary transition-all duration-200 placeholder-content-disabled focus:outline-none focus:bg-white focus:ring-2 ${
						hasValidationError
							? 'border-error focus:border-error focus:ring-red-100'
							: 'border-gray-200 focus:border-primary focus:ring-yellow-100'
					}`}
					aria-describedby={error ? `${id}-error` : undefined}
					aria-expanded={showSuggestions}
					aria-haspopup='listbox'
					aria-autocomplete='list'
					autoComplete='street-address'
				/>

				<div className='absolute right-4 top-1/2 transform -translate-y-1/2 text-content-disabled pointer-events-none'>
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
					className='absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-2xl mt-2 max-h-48 overflow-y-auto z-10 shadow-lg'
					role='listbox'
					aria-label='Location suggestions'
				>
					{suggestions.map((suggestion, index) => (
						<li
							key={index}
							className={`flex items-center px-4 py-3 cursor-pointer transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl ${
								index === activeSuggestionIndex
									? 'bg-yellow-50'
									: 'hover:bg-gray-50'
							}`}
							onClick={() => handleSuggestionClick(suggestion)}
							role='option'
							aria-selected={index === activeSuggestionIndex}
						>
							<div className='text-content-disabled mr-3 flex-shrink-0'>
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
							<span className='text-content-primary text-sm'>
								{suggestion}
							</span>
						</li>
					))}
				</ul>
			)}

			{hasValidationError && (
				<div
					id={`${id}-error`}
					className='mt-2 text-sm text-error flex items-center px-4'
					role='alert'
				>
					<span className='mr-2'>⚠</span>
					{error ||
						'Please enter a valid address (e.g., "123 Main Street")'}
				</div>
			)}
		</div>
	);
};

export default LocationInput;
