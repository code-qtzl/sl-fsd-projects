function LoadingSpinner({
	size = 'md',
	message = 'Loading...',
	className = '',
}) {
	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-6 h-6',
		lg: 'w-8 h-8',
		xl: 'w-12 h-12',
	};

	const containerClasses = {
		sm: 'gap-1 text-xs',
		md: 'gap-2 text-sm',
		lg: 'gap-3 text-base',
		xl: 'gap-4 text-lg',
	};

	return (
		<div
			className={`flex items-center justify-center ${containerClasses[size]} ${className}`}
		>
			<div
				className={`${sizeClasses[size]} border-2 border-primary-teal border-t-transparent rounded-full`}
			></div>
			{message && (
				<span className='text-neutral-light/80 font-medium'>
					{message}
				</span>
			)}
		</div>
	);
}

export default LoadingSpinner;
