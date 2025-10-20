import { useState } from 'react';

function SearchBar({
	onSearch,
	placeholder = 'Search recipes...',
	initialValue = '',
}) {
	const [searchTerm, setSearchTerm] = useState(initialValue);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);
		onSearch(value);
	};

	const handleClear = () => {
		setSearchTerm('');
		onSearch('');
	};

	return (
		<div className='relative mb-4 md:mb-6'>
			{/* Search Input Container */}
			<div className='relative'>
				{/* Search Icon */}
				<div className='absolute inset-y-0 left-0 pl-2 md:pl-3 flex items-center pointer-events-none'>
					<svg
						className='h-4 w-4 md:h-5 md:w-5 text-primary-teal'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
						/>
					</svg>
				</div>

				{/* Search Input */}
				<input
					type='text'
					value={searchTerm}
					onChange={handleInputChange}
					placeholder={placeholder}
					className='game-input w-full pl-8 md:pl-10 pr-10 md:pr-12 py-2 md:py-3 text-sm md:text-base lg:text-lg'
				/>

				{/* Clear Button */}
				{searchTerm && (
					<button
						onClick={handleClear}
						className='absolute inset-y-0 right-0 pr-2 md:pr-3 flex items-center text-neutral-light/60 hover:text-accent-coral'
						aria-label='Clear search'
					>
						<svg
							className='h-4 w-4 md:h-5 md:w-5'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</button>
				)}
			</div>

			{/* Gaming-style Search Enhancement */}
			<div className='absolute inset-0 rounded-lg bg-gradient-to-r from-primary-teal/10 to-accent-blue/10 opacity-0 hover:opacity-100 pointer-events-none'></div>
		</div>
	);
}

export default SearchBar;
