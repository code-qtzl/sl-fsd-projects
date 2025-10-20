function SkeletonCard() {
	return (
		<div className='game-card p-4 md:p-6 h-full loading-state'>
			{/* Image Skeleton */}
			<div className='w-full h-36 md:h-48 bg-primary-teal/20 rounded-lg mb-3 md:mb-4 border border-primary-teal/30 skeleton-loading'></div>

			{/* Title Skeleton */}
			<div className='mb-2'>
				<div className='h-5 md:h-6 bg-primary-teal/20 rounded mb-1 skeleton-loading'></div>
				<div className='h-5 md:h-6 bg-primary-teal/15 rounded w-3/4 skeleton-loading'></div>
			</div>

			{/* Description Skeleton */}
			<div className='mb-3 md:mb-4'>
				<div className='h-3 md:h-4 bg-primary-teal/10 rounded mb-1 skeleton-loading'></div>
				<div className='h-3 md:h-4 bg-primary-teal/10 rounded mb-1 w-5/6 skeleton-loading'></div>
				<div className='h-3 md:h-4 bg-primary-teal/10 rounded w-2/3 skeleton-loading'></div>
			</div>

			{/* Gaming Elements Skeleton */}
			<div className='flex items-center justify-between mb-3 md:mb-4 gap-2'>
				<div className='h-6 md:h-7 bg-accent-yellow/20 rounded-full w-16 md:w-20 skeleton-loading'></div>
				<div className='h-6 md:h-7 bg-accent-coral/20 rounded-full w-16 md:w-20 skeleton-loading'></div>
			</div>

			{/* Recipe Info Skeleton */}
			<div className='flex items-center justify-between text-xs md:text-sm mb-3 md:mb-4'>
				<div className='h-4 bg-primary-teal/10 rounded w-12 md:w-16 skeleton-loading'></div>
				<div className='h-4 bg-primary-teal/10 rounded w-16 md:w-20 skeleton-loading'></div>
			</div>

			{/* Tags Skeleton */}
			<div className='flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4'>
				<div className='h-5 md:h-6 bg-primary-teal/20 rounded-full w-12 md:w-16 skeleton-loading'></div>
				<div className='h-5 md:h-6 bg-primary-teal/20 rounded-full w-16 md:w-20 skeleton-loading'></div>
				<div className='h-5 md:h-6 bg-primary-teal/20 rounded-full w-10 md:w-14 skeleton-loading'></div>
			</div>

			{/* Achievement Skeleton */}
			<div className='mt-auto pt-4 border-t border-primary-teal/20'>
				<div className='flex items-center gap-2'>
					<div className='h-4 bg-accent-yellow/20 rounded w-4 skeleton-loading'></div>
					<div className='h-4 bg-accent-yellow/20 rounded flex-1 skeleton-loading'></div>
				</div>
			</div>
		</div>
	);
}

export default SkeletonCard;
