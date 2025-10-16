import React from 'react';

export interface Service {
	id: 'economy' | 'premium' | 'luxury';
	name: string;
	description: string;
	basePrice: number;
	pricePerMile: number;
	features: string[];
	vehicleType: string;
	maxPassengers: number;
}

interface ServiceSelectionProps {
	selectedService: string;
	onServiceSelect: (serviceId: string) => void;
}

const services: Service[] = [
	{
		id: 'economy',
		name: 'Economy',
		description: 'Affordable rides for everyday travel',
		basePrice: 5.0,
		pricePerMile: 1.5,
		features: [
			'Standard vehicle',
			'Professional driver',
			'Basic amenities',
		],
		vehicleType: 'Sedan',
		maxPassengers: 4,
	},
	{
		id: 'premium',
		name: 'Premium',
		description: 'Comfortable rides with enhanced features',
		basePrice: 8.0,
		pricePerMile: 2.0,
		features: [
			'Premium vehicle',
			'Professional driver',
			'Climate control',
			'Phone charger',
		],
		vehicleType: 'SUV',
		maxPassengers: 6,
	},
	{
		id: 'luxury',
		name: 'Luxury',
		description: 'Premium experience with top-tier vehicles',
		basePrice: 15.0,
		pricePerMile: 3.5,
		features: [
			'Luxury vehicle',
			'Professional chauffeur',
			'Premium amenities',
			'Refreshments',
			'Wi-Fi',
		],
		vehicleType: 'Luxury Sedan',
		maxPassengers: 4,
	},
];

const ServiceSelection: React.FC<ServiceSelectionProps> = ({
	selectedService,
	onServiceSelect,
}) => {
	return (
		<div className='mb-8'>
			<div className='space-y-4'>
				{services.map((service) => (
					<div
						key={service.id}
						className={`border-2 rounded-2xl p-4 bg-white cursor-pointer transition-all duration-200 relative ${
							selectedService === service.id
								? 'border-primary bg-yellow-50'
								: 'border-gray-200 hover:border-gray-300'
						}`}
						onClick={() => onServiceSelect(service.id)}
						role='button'
						tabIndex={0}
						onKeyDown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								onServiceSelect(service.id);
							}
						}}
						aria-label={`Select ${service.name} service`}
					>
						<div className='flex items-center justify-between'>
							<div className='flex items-center'>
								<div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4'>
									<span className='text-2xl'>
										{service.id === 'economy'
											? '🚗'
											: service.id === 'premium'
											? '🚙'
											: '🚐'}
									</span>
								</div>
								<div>
									<h3 className='text-lg font-semibold text-content-primary'>
										{service.name}
									</h3>
									<p className='text-sm text-content-secondary'>
										{service.description}
									</p>
								</div>
							</div>
							<div className='text-right'>
								<div className='text-lg font-bold text-content-primary'>
									${service.basePrice.toFixed(2)}
								</div>
								<div className='text-xs text-content-tertiary'>
									+ ${service.pricePerMile.toFixed(2)}/mile
								</div>
							</div>
						</div>

						{selectedService === service.id && (
							<div className='absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center'>
								<span className='text-white text-sm'>✓</span>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default ServiceSelection;
