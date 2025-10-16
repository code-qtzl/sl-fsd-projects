import React from 'react';

interface CustomerInfoProps {
	name: string;
	phone: string;
	email: string;
	specialRequests: string;
	onNameChange: (name: string) => void;
	onPhoneChange: (phone: string) => void;
	onEmailChange: (email: string) => void;
	onSpecialRequestsChange: (requests: string) => void;
	nameError?: string;
	phoneError?: string;
	emailError?: string;
	specialRequestsError?: string;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
	name,
	phone,
	email,
	specialRequests,
	onNameChange,
	onPhoneChange,
	onEmailChange,
	onSpecialRequestsChange,
	nameError,
	phoneError,
	emailError,
	specialRequestsError,
}) => {
	// Format phone number as user types
	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value.replace(/\D/g, ''); // Remove non-digits

		// Format as (XXX) XXX-XXXX
		if (value.length >= 6) {
			value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
				6,
				10,
			)}`;
		} else if (value.length >= 3) {
			value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
		}

		onPhoneChange(value);
	};

	// Validate email format
	const isValidEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	// Validate phone format
	const isValidPhone = (phone: string): boolean => {
		const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
		return phoneRegex.test(phone);
	};

	return (
		<div className='mb-8'>
			<div className='space-y-4 mb-6'>
				{/* Name Input */}
				<div>
					<input
						type='text'
						id='customer-name'
						value={name}
						onChange={(e) => onNameChange(e.target.value)}
						placeholder='Full Name'
						className={`w-full px-4 py-4 border rounded-full text-base bg-gray-50 text-content-primary transition-all duration-200 placeholder-content-disabled focus:outline-none focus:bg-white focus:ring-2 ${
							nameError
								? 'border-error focus:border-error focus:ring-red-100'
								: 'border-gray-200 focus:border-primary focus:ring-yellow-100'
						}`}
						autoComplete='name'
					/>
					{nameError && (
						<div className='mt-2 text-sm text-error flex items-center px-4'>
							<span className='mr-2'>⚠</span>
							{nameError}
						</div>
					)}
				</div>

				{/* Email Input */}
				<div>
					<input
						type='email'
						id='customer-email'
						value={email}
						onChange={(e) => onEmailChange(e.target.value)}
						placeholder='Email Address'
						className={`w-full px-4 py-4 border rounded-full text-base bg-gray-50 text-content-primary transition-all duration-200 placeholder-content-disabled focus:outline-none focus:bg-white focus:ring-2 ${
							emailError || (email && !isValidEmail(email))
								? 'border-error focus:border-error focus:ring-red-100'
								: 'border-gray-200 focus:border-primary focus:ring-yellow-100'
						}`}
						autoComplete='email'
					/>
					{(emailError || (email && !isValidEmail(email))) && (
						<div className='mt-2 text-sm text-error flex items-center px-4'>
							<span className='mr-2'>⚠</span>
							{emailError || 'Please enter a valid email address'}
						</div>
					)}
				</div>

				{/* Phone Input */}
				<div className='relative'>
					<div className='flex'>
						<div className='flex items-center bg-gray-50 border border-r-0 border-gray-200 rounded-l-full px-4 py-4'>
							<div className='w-6 h-4 bg-green-500 rounded-sm mr-2 flex items-center justify-center'>
								<span className='text-white text-xs'>🇧🇩</span>
							</div>
							<span className='text-content-secondary text-base'>
								+880
							</span>
						</div>
						<input
							type='tel'
							id='customer-phone'
							value={phone}
							onChange={handlePhoneChange}
							placeholder='Your mobile number'
							className={`flex-1 px-4 py-4 border rounded-r-full text-base bg-gray-50 text-content-primary transition-all duration-200 placeholder-content-disabled focus:outline-none focus:bg-white focus:ring-2 ${
								phoneError || (phone && !isValidPhone(phone))
									? 'border-error focus:border-error focus:ring-red-100'
									: 'border-gray-200 focus:border-primary focus:ring-yellow-100'
							}`}
							autoComplete='tel'
							maxLength={14}
						/>
					</div>
					{(phoneError || (phone && !isValidPhone(phone))) && (
						<div className='mt-2 text-sm text-error flex items-center px-4'>
							<span className='mr-2'>⚠</span>
							{phoneError || 'Please enter a valid phone number'}
						</div>
					)}
				</div>

				{/* Gender Selection */}
				<div>
					<select
						className='w-full px-4 py-4 border rounded-full text-base bg-gray-50 text-content-primary transition-all duration-200 focus:outline-none focus:bg-white focus:ring-2 border-gray-200 focus:border-primary focus:ring-yellow-100 appearance-none'
						style={{
							backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
							backgroundPosition: 'right 1rem center',
							backgroundRepeat: 'no-repeat',
							backgroundSize: '1.5em 1.5em',
						}}
					>
						<option value=''>Gender</option>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
						<option value='other'>Other</option>
					</select>
				</div>

				{/* Address Input */}
				<div>
					<textarea
						id='special-requests'
						value={specialRequests}
						onChange={(e) =>
							onSpecialRequestsChange(e.target.value)
						}
						placeholder='Address'
						className={`w-full px-4 py-4 border rounded-2xl text-base bg-gray-50 text-content-primary transition-all duration-200 placeholder-content-disabled focus:outline-none focus:bg-white focus:ring-2 resize-none h-24 ${
							specialRequestsError
								? 'border-error focus:border-error focus:ring-red-100'
								: 'border-gray-200 focus:border-primary focus:ring-yellow-100'
						}`}
						maxLength={500}
						rows={3}
					/>
					{specialRequestsError && (
						<div className='mt-2 text-sm text-error flex items-center px-4'>
							<span className='mr-2'>⚠</span>
							{specialRequestsError}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default CustomerInfo;
