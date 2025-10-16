import React, { forwardRef } from 'react';
import styles from './Button.module.css';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
	size?: 'small' | 'medium' | 'large';
	shape?: 'rounded' | 'pill' | 'square';
	fullWidth?: boolean;
	loading?: boolean;
	loadingText?: string;
	icon?: React.ReactNode;
	iconPosition?: 'left' | 'right';
	children?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'primary',
			size = 'medium',
			shape = 'rounded',
			fullWidth = false,
			loading = false,
			loadingText,
			icon,
			iconPosition = 'left',
			children,
			className = '',
			disabled,
			'aria-label': ariaLabel,
			...props
		},
		ref,
	) => {
		const isIconOnly = icon && !children;
		const isDisabled = disabled || loading;

		const buttonClasses = [
			styles.button,
			styles[variant],
			styles[size],
			styles[shape],
			fullWidth && styles.fullWidth,
			loading && styles.loading,
			isIconOnly && styles.iconOnly,
			className,
		]
			.filter(Boolean)
			.join(' ');

		const renderContent = () => {
			if (loading) {
				return (
					<>
						<span className={styles.buttonContent}>
							{loadingText || children}
						</span>
						<span
							className={styles.loadingSpinner}
							aria-hidden='true'
						/>
					</>
				);
			}

			if (isIconOnly) {
				return <span className={styles.icon}>{icon}</span>;
			}

			return (
				<span className={styles.buttonContent}>
					{icon && iconPosition === 'left' && (
						<span className={styles.icon}>{icon}</span>
					)}
					{children}
					{icon && iconPosition === 'right' && (
						<span className={styles.icon}>{icon}</span>
					)}
				</span>
			);
		};

		// Determine appropriate aria-label
		const computedAriaLabel = (() => {
			if (ariaLabel) return ariaLabel;
			if (isIconOnly && typeof children === 'string') return children;
			if (loading && loadingText) return loadingText;
			return undefined;
		})();

		return (
			<button
				ref={ref}
				className={buttonClasses}
				disabled={isDisabled}
				aria-label={computedAriaLabel}
				aria-busy={loading}
				{...props}
			>
				{renderContent()}
			</button>
		);
	},
);

Button.displayName = 'Button';

export default Button;
