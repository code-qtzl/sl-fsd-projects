import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ServiceSelection, { type Service } from './ServiceSelection';
import LocationInput from './LocationInput';
import DateTimeSelection from './DateTimeSelection';
import CustomerInfo from './CustomerInfo';
import styles from './BookingForm.module.css';

interface BookingFormData {
	serviceType: string;
	pickupLocation: string;
	destination: string;
	date: string;
	time: string;
	passengers: number;
	name: string;
	phone: string;
	email: string;
	specialRequests: string;
}

const BookingForm: React.FC = () => {
	const [formData, setFormData] = useState<BookingFormData>({
		serviceType: '',
		pickupLocation: '',
		destination: '',
		date: '',
		time: '',
		passengers: 1,
		name: '',
		phone: '',
		email: '',
		specialRequests: '',
	});

	const [showSummary, setShowSummary] = useState(false);

	const {
		formState: { errors },
		handleSubmit,
		setError,
		clearErrors,
	} = useForm<BookingFormData>({
		mode: 'onBlur',
		defaultValues: formData,
	});

	// Services data for pricing calculation
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

	const selectedService = services.find((s) => s.id === formData.serviceType);

	// Calculate estimated fare (mock calculation - 10 miles average)
	const calculateEstimatedFare = (): number => {
		if (!selectedService) return 0;
		const estimatedMiles = 10; // Mock distance
		return (
			selectedService.basePrice +
			selectedService.pricePerMile * estimatedMiles
		);
	};

	const validateForm = async (): Promise<boolean> => {
		let isValid = true;

		// Clear previous errors
		clearErrors();

		// Validate service selection
		if (!formData.serviceType) {
			setError('serviceType', {
				message: 'Please select a service type',
			});
			isValid = false;
		}

		// Validate pickup location
		if (!formData.pickupLocation) {
			setError('pickupLocation', {
				message: 'Pickup location is required',
			});
			isValid = false;
		} else if (formData.pickupLocation.length < 5) {
			setError('pickupLocation', {
				message: 'Please enter a valid pickup address',
			});
			isValid = false;
		}

		// Validate destination
		if (!formData.destination) {
			setError('destination', { message: 'Destination is required' });
			isValid = false;
		} else if (formData.destination.length < 5) {
			setError('destination', {
				message: 'Please enter a valid destination address',
			});
			isValid = false;
		}

		// Validate date
		if (!formData.date) {
			setError('date', { message: 'Please select a date' });
			isValid = false;
		} else {
			const selectedDate = new Date(formData.date);
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			if (selectedDate < today) {
				setError('date', { message: 'Please select a future date' });
				isValid = false;
			}
		}

		// Validate time
		if (!formData.time) {
			setError('time', { message: 'Please select a time' });
			isValid = false;
		}

		// Validate customer info
		if (!formData.name || formData.name.trim().length < 2) {
			setError('name', { message: 'Please enter your full name' });
			isValid = false;
		}

		if (!formData.phone) {
			setError('phone', { message: 'Phone number is required' });
			isValid = false;
		}

		if (!formData.email) {
			setError('email', { message: 'Email address is required' });
			isValid = false;
		}

		// Validate passenger count against service capacity
		if (
			selectedService &&
			formData.passengers > selectedService.maxPassengers
		) {
			setError('passengers', {
				message: `Selected service can accommodate up to ${selectedService.maxPassengers} passengers`,
			});
			isValid = false;
		}

		return isValid;
	};

	const handleReviewBooking = async () => {
		const isValid = await validateForm();
		if (isValid) {
			setShowSummary(true);
		}
	};

	const handleSubmitBooking = async () => {
		// In a real app, this would submit to an API
		console.log('Booking submitted:', {
			...formData,
			estimatedFare: calculateEstimatedFare(),
		});
		alert(
			'Booking submitted successfully! You will receive a confirmation email shortly.',
		);
	};

	const handleEditBooking = () => {
		setShowSummary(false);
	};

	if (showSummary) {
		return (
			<div className={styles.bookingForm}>
				<div className={styles.formHeader}>
					<h2 className={styles.formTitle}>Review Your Booking</h2>
					<p className={styles.formDescription}>
						Please review your booking details before confirming
					</p>
				</div>

				<div>
					<div className={styles.summarySection}>
						<h3 className={styles.summaryTitle}>Service Details</h3>
						<div className={styles.summaryRow}>
							<span className={styles.summaryLabel}>
								Service:
							</span>
							<span className={styles.summaryValue}>
								{selectedService?.name}
							</span>
						</div>
						<div className={styles.summaryRow}>
							<span className={styles.summaryLabel}>
								Vehicle:
							</span>
							<span className={styles.summaryValue}>
								{selectedService?.vehicleType}
							</span>
						</div>
						<div className={styles.summaryRow}>
							<span className={styles.summaryLabel}>
								Passengers:
							</span>
							<span className={styles.summaryValue}>
								{formData.passengers}
							</span>
						</div>
					</div>

					<div className={styles.summarySection}>
						<h3 className={styles.summaryTitle}>Trip Details</h3>
						<div className={styles.summaryRow}>
							<span className={styles.summaryLabel}>From:</span>
							<span className={styles.summaryValue}>
								{formData.pickupLocation}
							</span>
						</div>
						<div className={styles.summaryRow}>
							<span className={styles.summaryLabel}>To:</span>
							<span className={styles.summaryValue}>
								{formData.destination}
							</span>
						</div>
						<div className={styles.summaryRow}>
							<span className={styles.summaryLabel}>
								Date & Time:
							</span>
							<span className={styles.summaryValue}>
								{new Date(formData.date).toLocaleDateString()}{' '}
								at{' '}
								{new Date(
									`2000-01-01T${formData.time}`,
								).toLocaleTimeString('en-US', {
									hour: 'numeric',
									minute: '2-digit',
									hour12: true,
								})}
							</span>
						</div>
					</div>

					<div className={styles.summarySection}>
						<h3 className={styles.summaryTitle}>
							Contact Information
						</h3>
						<div className={styles.summaryRow}>
							<span className={styles.summaryLabel}>Name:</span>
							<span className={styles.summaryValue}>
								{formData.name}
							</span>
						</div>
						<div className={styles.summaryRow}>
							<span className={styles.summaryLabel}>Phone:</span>
							<span className={styles.summaryValue}>
								{formData.phone}
							</span>
						</div>
						<div className={styles.summaryRow}>
							<span className={styles.summaryLabel}>Email:</span>
							<span className={styles.summaryValue}>
								{formData.email}
							</span>
						</div>
						{formData.specialRequests && (
							<div className={styles.summaryRow}>
								<span className={styles.summaryLabel}>
									Special Requests:
								</span>
								<span className={styles.summaryValue}>
									{formData.specialRequests}
								</span>
							</div>
						)}
					</div>

					<div className={styles.fareSection}>
						<div className={styles.fareAmount}>
							${calculateEstimatedFare().toFixed(2)}
						</div>
						<div className={styles.fareDisclaimer}>
							*Final fare may vary based on actual distance and
							traffic conditions
						</div>
					</div>
				</div>

				<div className={styles.buttonGroup}>
					<button
						type='button'
						onClick={handleEditBooking}
						className={`${styles.formButton} ${styles.secondaryButton}`}
					>
						Edit Booking
					</button>
					<button
						type='button'
						onClick={handleSubmitBooking}
						className={`${styles.formButton} ${styles.primaryButton}`}
					>
						Confirm Booking
					</button>
				</div>
			</div>
		);
	}

	return (
		<form
			className={styles.bookingForm}
			onSubmit={handleSubmit(handleSubmitBooking)}
		>
			<div className={styles.formHeader}>
				<h1 className={styles.formTitle}>Book Your Ride</h1>
				<p className={styles.formDescription}>
					Fill out the form below to book your taxi ride. All fields
					marked with * are required.
				</p>
			</div>

			<div className={styles.formSection}>
				<h3 className={styles.sectionTitle}>Choose Your Service</h3>
				<ServiceSelection
					selectedService={formData.serviceType}
					onServiceSelect={(serviceId) =>
						setFormData((prev) => ({
							...prev,
							serviceType: serviceId,
						}))
					}
				/>
				{errors.serviceType && (
					<div className={styles.errorMessage} role='alert'>
						<span className={styles.errorIcon}>⚠</span>
						<span>{errors.serviceType.message}</span>
					</div>
				)}
			</div>

			<div className={`${styles.formSection} ${styles.locationSection}`}>
				<h3 className={styles.sectionTitle}>Where are you going?</h3>
				<div className={styles.locationGrid}>
					<LocationInput
						id='pickup-location'
						label='Pickup Location'
						value={formData.pickupLocation}
						onChange={(value) =>
							setFormData((prev) => ({
								...prev,
								pickupLocation: value,
							}))
						}
						placeholder='Enter pickup address'
						error={errors.pickupLocation?.message}
						required
					/>
					<LocationInput
						id='destination'
						label='Destination'
						value={formData.destination}
						onChange={(value) =>
							setFormData((prev) => ({
								...prev,
								destination: value,
							}))
						}
						placeholder='Enter destination address'
						error={errors.destination?.message}
						required
					/>
				</div>
			</div>

			<div className={styles.formSection}>
				<h3 className={styles.sectionTitle}>
					When do you need a ride?
				</h3>
				<DateTimeSelection
					date={formData.date}
					time={formData.time}
					passengers={formData.passengers}
					onDateChange={(date) =>
						setFormData((prev) => ({ ...prev, date }))
					}
					onTimeChange={(time) =>
						setFormData((prev) => ({ ...prev, time }))
					}
					onPassengersChange={(passengers) =>
						setFormData((prev) => ({ ...prev, passengers }))
					}
					dateError={errors.date?.message}
					timeError={errors.time?.message}
					passengersError={errors.passengers?.message}
				/>
			</div>

			<div className={styles.formSection}>
				<h3 className={styles.sectionTitle}>Contact Information</h3>
				<CustomerInfo
					name={formData.name}
					phone={formData.phone}
					email={formData.email}
					specialRequests={formData.specialRequests}
					onNameChange={(name) =>
						setFormData((prev) => ({ ...prev, name }))
					}
					onPhoneChange={(phone) =>
						setFormData((prev) => ({ ...prev, phone }))
					}
					onEmailChange={(email) =>
						setFormData((prev) => ({ ...prev, email }))
					}
					onSpecialRequestsChange={(specialRequests) =>
						setFormData((prev) => ({ ...prev, specialRequests }))
					}
					nameError={errors.name?.message}
					phoneError={errors.phone?.message}
					emailError={errors.email?.message}
					specialRequestsError={errors.specialRequests?.message}
				/>
			</div>

			<div className={styles.buttonGroup}>
				<button
					type='button'
					onClick={handleReviewBooking}
					className={`${styles.formButton} ${styles.primaryButton}`}
				>
					Review Booking
				</button>
			</div>
		</form>
	);
};

export default BookingForm;
