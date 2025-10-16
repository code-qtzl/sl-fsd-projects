import React from 'react';

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
		<div className='mb-8'>
			<div className='space-y-4 mb-6'>
				{/* Date Selection */}
				<div>
					<input
						type='date'
						id='booking-date'
						value={date}
						onChange={handleDateChange}
						min={today}
						className={`w-full px-4 py-4 border rounded-full text-base bg-gray-50 text-content-primary transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 ${
							dateError
								? 'border-error focus:border-error focus:ring-red-100'
								: 'border-gray-200 focus:border-primary focus:ring-yellow-100'
						}`}
						aria-describedby={dateError ? 'date-error' : undefined}
					/>
					{dateError && (
						<div
							id='date-error'
							className='mt-2 text-sm text-error flex items-center px-4'
							role='alert'
						>
							<span className='mr-2'>⚠</span>
							{dateError}
						</div>
					)}
				</div>

				{/* Time Selection */}
				<div>
					<select
						id='booking-time'
						value={time}
						onChange={(e) => onTimeChange(e.target.value)}
						className={`w-full px-4 py-4 border rounded-full text-base bg-gray-50 text-content-primary transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 appearance-none ${
							timeError
								? 'border-error focus:border-error focus:ring-red-100'
								: 'border-gray-200 focus:border-primary focus:ring-yellow-100'
						}`}
						style={{
							backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
							backgroundPosition: 'right 1rem center',
							backgroundRepeat: 'no-repeat',
							backgroundSize: '1.5em 1.5em',
						}}
						aria-describedby={timeError ? 'time-error' : undefined}
						disabled={!date}
					>
						<option value=''>Select time</option>
						{availableTimeSlots.map((slot) => (
							<option key={slot} value={slot}>
								{new Date(
									`2000-01-01T${slot}`,
								).toLocaleTimeString('en-US', {
									hour: 'numeric',
									minute: '2-digit',
									hour12: true,
								})}
							</option>
						))}
					</select>
					{timeError && (
						<div
							id='time-error'
							className='mt-2 text-sm text-error flex items-center px-4'
							role='alert'
						>
							<span className='mr-2'>⚠</span>
							{timeError}
						</div>
					)}
					{date && availableTimeSlots.length === 0 && (
						<div className='mt-2 text-sm text-warning flex items-center px-4'>
							<span className='mr-2'>ℹ️</span>
							No available time slots for today. Please select a
							future date.
						</div>
					)}
				</div>

				{/* Passenger Count Selection */}
				<div>
					<select
						id='passenger-count'
						value={passengers}
						onChange={handlePassengersChange}
						className={`w-full px-4 py-4 border rounded-full text-base bg-gray-50 text-content-primary transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 appearance-none ${
							passengersError
								? 'border-error focus:border-error focus:ring-red-100'
								: 'border-gray-200 focus:border-primary focus:ring-yellow-100'
						}`}
						style={{
							backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
							backgroundPosition: 'right 1rem center',
							backgroundRepeat: 'no-repeat',
							backgroundSize: '1.5em 1.5em',
						}}
						aria-describedby={
							passengersError ? 'passengers-error' : undefined
						}
					>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
							<option key={count} value={count}>
								{count}{' '}
								{count === 1 ? 'passenger' : 'passengers'}
							</option>
						))}
					</select>
					{passengersError && (
						<div
							id='passengers-error'
							className='mt-2 text-sm text-error flex items-center px-4'
							role='alert'
						>
							<span className='mr-2'>⚠</span>
							{passengersError}
						</div>
					)}
				</div>
			</div>

			{/* Booking Info */}
			<div className='bg-yellow-50 border border-yellow-200 rounded-2xl p-4'>
				<div className='flex items-center mb-2'>
					<span className='mr-2 text-base'>ℹ️</span>
					<span className='text-sm text-content-secondary'>
						Bookings must be made at least 1 hour in advance
					</span>
				</div>
				<div className='flex items-center'>
					<span className='mr-2 text-base'>🕒</span>
					<span className='text-sm text-content-secondary'>
						Service available daily from 6:00 AM to 11:45 PM
					</span>
				</div>
			</div>
		</div>
	);
};

export default DateTimeSelection;
