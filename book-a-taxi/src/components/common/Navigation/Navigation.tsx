import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();
	const menuRef = useRef<HTMLUListElement>(null);
	const toggleRef = useRef<HTMLButtonElement>(null);

	const navItems = [
		{ path: '/', label: 'Home' },
		{ path: '/about', label: 'About' },
		{ path: '/services', label: 'Services' },
		{ path: '/contact', label: 'Contact' },
		{ path: '/booking', label: 'Book a Ride', isButton: true },
	];

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	const isActivePage = (path: string) => {
		if (path === '/') {
			return location.pathname === '/';
		}
		return location.pathname.startsWith(path);
	};

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isMenuOpen &&
				menuRef.current &&
				toggleRef.current &&
				!menuRef.current.contains(event.target as Node) &&
				!toggleRef.current.contains(event.target as Node)
			) {
				closeMenu();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen]);

	// Close menu on escape key
	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isMenuOpen) {
				closeMenu();
				toggleRef.current?.focus();
			}
		};

		document.addEventListener('keydown', handleEscapeKey);
		return () => {
			document.removeEventListener('keydown', handleEscapeKey);
		};
	}, [isMenuOpen]);

	// Close menu on route change
	useEffect(() => {
		closeMenu();
	}, [location.pathname]);

	return (
		<nav
			className={styles.navigation}
			role='navigation'
			aria-label='Main navigation'
		>
			{/* Mobile menu backdrop */}
			{isMenuOpen && (
				<div
					className={`${styles.menuBackdrop} ${
						isMenuOpen ? styles.open : ''
					}`}
					onClick={closeMenu}
					aria-hidden='true'
				/>
			)}

			{/* Mobile menu toggle button */}
			<button
				ref={toggleRef}
				className={styles.menuToggle}
				onClick={toggleMenu}
				aria-label={
					isMenuOpen
						? 'Close navigation menu'
						: 'Open navigation menu'
				}
				aria-expanded={isMenuOpen}
				aria-controls='navigation-menu'
				aria-haspopup='true'
			>
				<span className={styles.menuLine}></span>
				<span className={styles.menuLine}></span>
				<span className={styles.menuLine}></span>
			</button>

			{/* Desktop menu */}
			<ul className={`${styles.menu} ${styles.desktopMenu}`}>
				{navItems.map((item) => (
					<li key={item.path} className={styles.navItem}>
						<Link
							to={item.path}
							className={`${styles.navLink} ${
								isActivePage(item.path) ? styles.active : ''
							} ${item.isButton ? styles.navButton : ''}`}
							aria-current={
								isActivePage(item.path) ? 'page' : undefined
							}
						>
							{item.label}
						</Link>
					</li>
				))}
			</ul>

			{/* Mobile menu */}
			<ul
				ref={menuRef}
				id='navigation-menu'
				className={`${styles.menu} ${styles.mobileMenu} ${
					isMenuOpen ? styles.open : ''
				}`}
				role='menu'
				aria-labelledby='menu-toggle'
			>
				{navItems.map((item, index) => (
					<li key={item.path} className={styles.navItem} role='none'>
						<Link
							to={item.path}
							className={`${styles.navLink} ${
								isActivePage(item.path) ? styles.active : ''
							} ${item.isButton ? styles.navButton : ''}`}
							onClick={closeMenu}
							aria-current={
								isActivePage(item.path) ? 'page' : undefined
							}
							role='menuitem'
							tabIndex={isMenuOpen ? 0 : -1}
						>
							{item.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default Navigation;
