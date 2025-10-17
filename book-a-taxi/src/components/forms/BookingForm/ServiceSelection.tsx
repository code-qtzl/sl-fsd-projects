import React from 'react';
import styles from './BookingForm.module.css';

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
		<div className={styles.serviceSelection}>
			<div className={styles.serviceGrid}>
				{services.map((service) => (
					<div
						key={service.id}
						className={`${styles.serviceCard} ${
							selectedService === service.id
								? styles.serviceCardSelected
								: ''
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
						<div className={styles.serviceCardContent}>
							<div className={styles.serviceInfo}>
								<div className={styles.serviceIcon}>
									<span>
										{service.id === 'economy'
											? '🚗'
											: service.id === 'premium'
											? '🚙'
											: '🚐'}
									</span>
								</div>
								<div className={styles.serviceDetails}>
									<h3 className={styles.serviceName}>
										{service.name}
									</h3>
									<p className={styles.serviceDescription}>
										{service.description}
									</p>
								</div>
							</div>
							<div className={styles.servicePricing}>
								<div className={styles.servicePrice}>
									${service.basePrice.toFixed(2)}
								</div>
								<div className={styles.servicePricePerMile}>
									+ ${service.pricePerMile.toFixed(2)}/mile
								</div>
							</div>
						</div>

						{selectedService === service.id && (
							<div className={styles.serviceSelectedIcon}>
								<span>✓</span>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default ServiceSelection;
