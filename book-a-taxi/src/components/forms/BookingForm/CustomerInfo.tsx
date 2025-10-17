import React from 'react';
import styles from './CustomerInfo.module.css';

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
		<div className={styles.customerInfoContainer}>
			{/* Name Input */}
			<div className={styles.formGroup}>
				<label className={styles.formLabel} htmlFor='customer-name'>
					Full Name *
				</label>
				<input
					type='text'
					id='customer-name'
					value={name}
					onChange={(e) => onNameChange(e.target.value)}
					placeholder='Enter your full name'
					className={`${styles.formInput} ${
						nameError ? styles.error : ''
					}`}
					autoComplete='name'
					required
				/>
				{nameError && (
					<div className={styles.errorMessage}>
						<span className={styles.errorIcon}>⚠</span>
						{nameError}
					</div>
				)}
			</div>

			{/* Email Input */}
			<div className={styles.formGroup}>
				<label className={styles.formLabel} htmlFor='customer-email'>
					Email Address *
				</label>
				<input
					type='email'
					id='customer-email'
					value={email}
					onChange={(e) => onEmailChange(e.target.value)}
					placeholder='your.email@example.com'
					className={`${styles.formInput} ${
						emailError || (email && !isValidEmail(email))
							? styles.error
							: ''
					}`}
					autoComplete='email'
					required
				/>
				{(emailError || (email && !isValidEmail(email))) && (
					<div className={styles.errorMessage}>
						<span className={styles.errorIcon}>⚠</span>
						{emailError || 'Please enter a valid email address'}
					</div>
				)}
			</div>

			{/* Phone Input */}
			<div className={styles.formGroup}>
				<label className={styles.formLabel} htmlFor='customer-phone'>
					Phone Number *
				</label>
				<div className={styles.phoneInputGroup}>
					<div className={styles.phoneCountryCode}></div>
					<input
						type='tel'
						id='customer-phone'
						value={phone}
						onChange={handlePhoneChange}
						placeholder='(555) 123-4567'
						className={`${styles.formInput} ${styles.phoneInput} ${
							phoneError || (phone && !isValidPhone(phone))
								? styles.error
								: ''
						}`}
						autoComplete='tel'
						maxLength={14}
						required
					/>
				</div>
				{(phoneError || (phone && !isValidPhone(phone))) && (
					<div className={styles.errorMessage}>
						<span className={styles.errorIcon}>⚠</span>
						{phoneError || 'Please enter a valid phone number'}
					</div>
				)}
			</div>

			{/* Special Requests / Additional Information */}
			<div className={`${styles.formGroup} ${styles.fullWidth}`}>
				<label className={styles.formLabel} htmlFor='special-requests'>
					Special Requests or Additional Information
				</label>
				<textarea
					id='special-requests'
					value={specialRequests}
					onChange={(e) => onSpecialRequestsChange(e.target.value)}
					placeholder='Any special requests, accessibility needs, or additional information...'
					className={`${styles.formInput} ${styles.formTextarea} ${
						specialRequestsError ? styles.error : ''
					}`}
					maxLength={500}
					rows={4}
				/>
				<div className={styles.characterCounter}>
					{specialRequests.length}/500 characters
				</div>
				{specialRequestsError && (
					<div className={styles.errorMessage}>
						<span className={styles.errorIcon}>⚠</span>
						{specialRequestsError}
					</div>
				)}
			</div>
		</div>
	);
};

export default CustomerInfo;
