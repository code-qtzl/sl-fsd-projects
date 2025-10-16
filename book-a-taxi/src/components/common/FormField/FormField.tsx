import React, { forwardRef, useId } from 'react';
import styles from './FormField.module.css';

export interface FormFieldProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
	label?: string;
	type?:
		| 'text'
		| 'email'
		| 'password'
		| 'tel'
		| 'url'
		| 'search'
		| 'number'
		| 'date'
		| 'time'
		| 'datetime-local';
	size?: 'small' | 'medium' | 'large';
	error?: string;
	success?: string;
	helpText?: string;
	icon?: React.ReactNode;
	required?: boolean;
	fullWidth?: boolean;
}

export interface TextareaFieldProps
	extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
	label?: string;
	size?: 'small' | 'medium' | 'large';
	error?: string;
	success?: string;
	helpText?: string;
	required?: boolean;
	fullWidth?: boolean;
	rows?: number;
}

export interface SelectFieldProps
	extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
	label?: string;
	size?: 'small' | 'medium' | 'large';
	error?: string;
	success?: string;
	helpText?: string;
	required?: boolean;
	fullWidth?: boolean;
	options: Array<{ value: string; label: string; disabled?: boolean }>;
	placeholder?: string;
}

export interface CheckboxFieldProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label: string;
	error?: string;
	helpText?: string;
}

export interface RadioFieldProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label: string;
	error?: string;
	helpText?: string;
	name: string;
	value: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
	(
		{
			label,
			type = 'text',
			size = 'medium',
			error,
			success,
			helpText,
			icon,
			required = false,
			fullWidth = true,
			className = '',
			id,
			'aria-describedby': ariaDescribedBy,
			...props
		},
		ref,
	) => {
		const generatedId = useId();
		const fieldId = id || generatedId;
		const helpTextId = `${fieldId}-help`;
		const errorId = `${fieldId}-error`;
		const successId = `${fieldId}-success`;

		const fieldClasses = [
			styles.formField,
			styles[size],
			fullWidth && styles.fullWidth,
			className,
		]
			.filter(Boolean)
			.join(' ');

		const inputClasses = [
			styles.input,
			icon && styles.inputWithIcon,
			error && styles.error,
			success && !error && styles.success,
		]
			.filter(Boolean)
			.join(' ');

		const describedByIds = [
			helpText && helpTextId,
			error && errorId,
			success && !error && successId,
			ariaDescribedBy,
		]
			.filter(Boolean)
			.join(' ');

		return (
			<div className={fieldClasses}>
				{label && (
					<label htmlFor={fieldId} className={styles.label}>
						{label}
						{required && (
							<span
								className={styles.required}
								aria-label='required'
							>
								*
							</span>
						)}
					</label>
				)}

				<div className={styles.inputWrapper}>
					<input
						ref={ref}
						id={fieldId}
						type={type}
						className={inputClasses}
						required={required}
						aria-invalid={error ? 'true' : 'false'}
						aria-describedby={describedByIds || undefined}
						{...props}
					/>
					{icon && (
						<span className={styles.inputIcon} aria-hidden='true'>
							{icon}
						</span>
					)}
				</div>

				{helpText && (
					<div id={helpTextId} className={styles.helpText}>
						{helpText}
					</div>
				)}

				{error && (
					<div
						id={errorId}
						className={styles.errorMessage}
						role='alert'
					>
						<span className={styles.errorIcon} aria-hidden='true'>
							⚠
						</span>
						<span>{error}</span>
					</div>
				)}

				{success && !error && (
					<div
						id={successId}
						className={styles.successMessage}
						role='status'
					>
						<span className={styles.successIcon} aria-hidden='true'>
							✓
						</span>
						<span>{success}</span>
					</div>
				)}
			</div>
		);
	},
);

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
	(
		{
			label,
			size = 'medium',
			error,
			success,
			helpText,
			required = false,
			fullWidth = true,
			rows = 4,
			className = '',
			id,
			'aria-describedby': ariaDescribedBy,
			...props
		},
		ref,
	) => {
		const generatedId = useId();
		const fieldId = id || generatedId;
		const helpTextId = `${fieldId}-help`;
		const errorId = `${fieldId}-error`;
		const successId = `${fieldId}-success`;

		const fieldClasses = [
			styles.formField,
			styles[size],
			fullWidth && styles.fullWidth,
			className,
		]
			.filter(Boolean)
			.join(' ');

		const textareaClasses = [
			styles.input,
			styles.textarea,
			error && styles.error,
			success && !error && styles.success,
		]
			.filter(Boolean)
			.join(' ');

		const describedByIds = [
			helpText && helpTextId,
			error && errorId,
			success && !error && successId,
			ariaDescribedBy,
		]
			.filter(Boolean)
			.join(' ');

		return (
			<div className={fieldClasses}>
				{label && (
					<label htmlFor={fieldId} className={styles.label}>
						{label}
						{required && (
							<span
								className={styles.required}
								aria-label='required'
							>
								*
							</span>
						)}
					</label>
				)}

				<textarea
					ref={ref}
					id={fieldId}
					className={textareaClasses}
					rows={rows}
					required={required}
					aria-invalid={error ? 'true' : 'false'}
					aria-describedby={describedByIds || undefined}
					{...props}
				/>

				{helpText && (
					<div id={helpTextId} className={styles.helpText}>
						{helpText}
					</div>
				)}

				{error && (
					<div
						id={errorId}
						className={styles.errorMessage}
						role='alert'
					>
						<span className={styles.errorIcon} aria-hidden='true'>
							⚠
						</span>
						<span>{error}</span>
					</div>
				)}

				{success && !error && (
					<div
						id={successId}
						className={styles.successMessage}
						role='status'
					>
						<span className={styles.successIcon} aria-hidden='true'>
							✓
						</span>
						<span>{success}</span>
					</div>
				)}
			</div>
		);
	},
);

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
	(
		{
			label,
			size = 'medium',
			error,
			success,
			helpText,
			required = false,
			fullWidth = true,
			options,
			placeholder,
			className = '',
			id,
			'aria-describedby': ariaDescribedBy,
			...props
		},
		ref,
	) => {
		const generatedId = useId();
		const fieldId = id || generatedId;
		const helpTextId = `${fieldId}-help`;
		const errorId = `${fieldId}-error`;
		const successId = `${fieldId}-success`;

		const fieldClasses = [
			styles.formField,
			styles[size],
			fullWidth && styles.fullWidth,
			className,
		]
			.filter(Boolean)
			.join(' ');

		const selectClasses = [
			styles.input,
			styles.select,
			error && styles.error,
			success && !error && styles.success,
		]
			.filter(Boolean)
			.join(' ');

		const describedByIds = [
			helpText && helpTextId,
			error && errorId,
			success && !error && successId,
			ariaDescribedBy,
		]
			.filter(Boolean)
			.join(' ');

		return (
			<div className={fieldClasses}>
				{label && (
					<label htmlFor={fieldId} className={styles.label}>
						{label}
						{required && (
							<span
								className={styles.required}
								aria-label='required'
							>
								*
							</span>
						)}
					</label>
				)}

				<select
					ref={ref}
					id={fieldId}
					className={selectClasses}
					required={required}
					aria-invalid={error ? 'true' : 'false'}
					aria-describedby={describedByIds || undefined}
					{...props}
				>
					{placeholder && (
						<option value='' disabled>
							{placeholder}
						</option>
					)}
					{options.map((option) => (
						<option
							key={option.value}
							value={option.value}
							disabled={option.disabled}
						>
							{option.label}
						</option>
					))}
				</select>

				{helpText && (
					<div id={helpTextId} className={styles.helpText}>
						{helpText}
					</div>
				)}

				{error && (
					<div
						id={errorId}
						className={styles.errorMessage}
						role='alert'
					>
						<span className={styles.errorIcon} aria-hidden='true'>
							⚠
						</span>
						<span>{error}</span>
					</div>
				)}

				{success && !error && (
					<div
						id={successId}
						className={styles.successMessage}
						role='status'
					>
						<span className={styles.successIcon} aria-hidden='true'>
							✓
						</span>
						<span>{success}</span>
					</div>
				)}
			</div>
		);
	},
);

const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
	(
		{
			label,
			error,
			helpText,
			className = '',
			id,
			'aria-describedby': ariaDescribedBy,
			...props
		},
		ref,
	) => {
		const generatedId = useId();
		const fieldId = id || generatedId;
		const helpTextId = `${fieldId}-help`;
		const errorId = `${fieldId}-error`;

		const fieldClasses = [styles.formField, className]
			.filter(Boolean)
			.join(' ');

		const describedByIds = [
			helpText && helpTextId,
			error && errorId,
			ariaDescribedBy,
		]
			.filter(Boolean)
			.join(' ');

		return (
			<div className={fieldClasses}>
				<div className={styles.checkboxWrapper}>
					<input
						ref={ref}
						id={fieldId}
						type='checkbox'
						className={styles.checkbox}
						aria-invalid={error ? 'true' : 'false'}
						aria-describedby={describedByIds || undefined}
						{...props}
					/>
					<label htmlFor={fieldId} className={styles.checkboxLabel}>
						{label}
					</label>
				</div>

				{helpText && (
					<div id={helpTextId} className={styles.helpText}>
						{helpText}
					</div>
				)}

				{error && (
					<div
						id={errorId}
						className={styles.errorMessage}
						role='alert'
					>
						<span className={styles.errorIcon} aria-hidden='true'>
							⚠
						</span>
						<span>{error}</span>
					</div>
				)}
			</div>
		);
	},
);

const RadioField = forwardRef<HTMLInputElement, RadioFieldProps>(
	(
		{
			label,
			error,
			helpText,
			name,
			value,
			className = '',
			id,
			'aria-describedby': ariaDescribedBy,
			...props
		},
		ref,
	) => {
		const generatedId = useId();
		const fieldId = id || generatedId;
		const helpTextId = `${fieldId}-help`;
		const errorId = `${fieldId}-error`;

		const fieldClasses = [styles.formField, className]
			.filter(Boolean)
			.join(' ');

		const describedByIds = [
			helpText && helpTextId,
			error && errorId,
			ariaDescribedBy,
		]
			.filter(Boolean)
			.join(' ');

		return (
			<div className={fieldClasses}>
				<div className={styles.radioWrapper}>
					<input
						ref={ref}
						id={fieldId}
						type='radio'
						name={name}
						value={value}
						className={styles.radio}
						aria-invalid={error ? 'true' : 'false'}
						aria-describedby={describedByIds || undefined}
						{...props}
					/>
					<label htmlFor={fieldId} className={styles.radioLabel}>
						{label}
					</label>
				</div>

				{helpText && (
					<div id={helpTextId} className={styles.helpText}>
						{helpText}
					</div>
				)}

				{error && (
					<div
						id={errorId}
						className={styles.errorMessage}
						role='alert'
					>
						<span className={styles.errorIcon} aria-hidden='true'>
							⚠
						</span>
						<span>{error}</span>
					</div>
				)}
			</div>
		);
	},
);

FormField.displayName = 'FormField';
TextareaField.displayName = 'TextareaField';
SelectField.displayName = 'SelectField';
CheckboxField.displayName = 'CheckboxField';
RadioField.displayName = 'RadioField';

export { FormField, TextareaField, SelectField, CheckboxField, RadioField };
