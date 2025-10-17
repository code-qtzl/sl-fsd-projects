import React from 'react';
import styles from './DateTimeSelection.module.css';

interface DateTimeSelectionProps {
	date: string;
	time: string;
	passengers: number;
	onDateChange: (date: string) => void;
	onTimeChange: (time: string) => void;
	onPassengersChange: (passengers: number) => void;
	dateError?: string;
	timeError?: string;
	passengersError?: string;
}

const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
	date,
	time,
	passengers,
	onDateChange,
	onTimeChange,
	onPassengersChange,
	dateError,
	timeError,
	passengersError,
}) => {
	// Get today's date in YYYY-MM-DD format for min date validation
	const today = new Date().toISOString().split('T')[0];

	// Get current time for validation if date is today
	const now = new Date();
	const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now
		.getMinutes()
		.toString()
		.padStart(2, '0')}`;

	// Generate time slots (every 15 minutes from 6:00 AM to 11:45 PM)
	const generateTimeSlots = (): string[] => {
		const slots: string[] = [];
		for (let hour = 6; hour < 24; hour++) {
			for (let minute = 0; minute < 60; minute += 15) {
				const timeString = `${hour.toString().padStart(2, '0')}:${minute
					.toString()
					.padStart(2, '0')}`;
				slots.push(timeString);
			}
		}
		return slots;
	};

	const timeSlots = generateTimeSlots();

	// Filter available time slots based on selected date
	const getAvailableTimeSlots = (): string[] => {
		if (date === today) {
			// If booking for today, only show future time slots (at least 1 hour from now)
			const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
			const minTime = `${oneHourFromNow
				.getHours()
				.toString()
				.padStart(2, '0')}:${
				Math.ceil(oneHourFromNow.getMinutes() / 15) * 15
			}`.padStart(5, '0');
			return timeSlots.filter((slot) => slot >= minTime);
		}
		return timeSlots;
	};

	const availableTimeSlots = getAvailableTimeSlots();

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newDate = e.target.value;
		onDateChange(newDate);

		// Reset time if the selected time is no longer available for the new date
		if (newDate === today && time && time < currentTime) {
			onTimeChange('');
		}
	};

	const handlePassengersChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		onPassengersChange(parseInt(e.target.value));
	};

	return (
		<div className={styles.dateTimeContainer}>
			{/* Date Selection */}
			<div className={styles.formGroup}>
				<label className={styles.formLabel} htmlFor='booking-date'>
					📅 Date *
				</label>
				<input
					type='date'
					id='booking-date'
					value={date}
					onChange={handleDateChange}
					min={today}
					className={`${styles.formInput} ${styles.dateInput} ${
						dateError ? styles.error : ''
					}`}
					aria-describedby={dateError ? 'date-error' : undefined}
					required
				/>
				{dateError && (
					<div
						id='date-error'
						className={styles.errorMessage}
						role='alert'
					>
						<span className={styles.errorIcon}>⚠</span>
						{dateError}
					</div>
				)}
			</div>

			{/* Time Selection */}
			<div className={styles.formGroup}>
				<label className={styles.formLabel} htmlFor='booking-time'>
					🕒 Time *
				</label>
				<select
					id='booking-time'
					value={time}
					onChange={(e) => onTimeChange(e.target.value)}
					className={`${styles.formInput} ${styles.formSelect} ${
						timeError ? styles.error : ''
					}`}
					aria-describedby={timeError ? 'time-error' : undefined}
					disabled={!date}
					required
				>
					<option value=''>Select time</option>
					{availableTimeSlots.map((slot) => (
						<option key={slot} value={slot}>
							{new Date(`2000-01-01T${slot}`).toLocaleTimeString(
								'en-US',
								{
									hour: 'numeric',
									minute: '2-digit',
									hour12: true,
								},
							)}
						</option>
					))}
				</select>
				{timeError && (
					<div
						id='time-error'
						className={styles.errorMessage}
						role='alert'
					>
						<span className={styles.errorIcon}>⚠</span>
						{timeError}
					</div>
				)}
				{date && availableTimeSlots.length === 0 && (
					<div className={styles.warningMessage}>
						<span className={styles.errorIcon}>ℹ️</span>
						No available time slots for today. Please select a
						future date.
					</div>
				)}
			</div>

			{/* Passenger Count Selection */}
			<div className={styles.formGroup}>
				<label className={styles.formLabel} htmlFor='passenger-count'>
					👥 Passengers *
				</label>
				<select
					id='passenger-count'
					value={passengers}
					onChange={handlePassengersChange}
					className={`${styles.formInput} ${styles.formSelect} ${
						passengersError ? styles.error : ''
					}`}
					aria-describedby={
						passengersError ? 'passengers-error' : undefined
					}
					required
				>
					{[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
						<option key={count} value={count}>
							{count} {count === 1 ? 'passenger' : 'passengers'}
						</option>
					))}
				</select>
				{passengersError && (
					<div
						id='passengers-error'
						className={styles.errorMessage}
						role='alert'
					>
						<span className={styles.errorIcon}>⚠</span>
						{passengersError}
					</div>
				)}
			</div>

			{/* Booking Info */}
			<div className={styles.infoBox}>
				<div className={styles.infoItem}>
					<span className={styles.infoIcon}>ℹ️</span>
					<span className={styles.infoText}>
						Bookings must be made at least 1 hour in advance
					</span>
				</div>
				<div className={styles.infoItem}>
					<span className={styles.infoIcon}>🕒</span>
					<span className={styles.infoText}>
						Service available daily from 6:00 AM to 11:45 PM
					</span>
				</div>
			</div>
		</div>
	);
};

export default DateTimeSelection;
