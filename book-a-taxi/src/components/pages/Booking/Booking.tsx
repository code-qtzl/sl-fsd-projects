import React from 'react';
import BookingForm from '../../forms/BookingForm/BookingForm';

const Booking: React.FC = () => {
	return (
		<div className='min-h-screen py-8 bg-white'>
			<div className='max-w-6xl mx-auto px-4'>
				<BookingForm />
			</div>
		</div>
	);
};

export default Booking;
