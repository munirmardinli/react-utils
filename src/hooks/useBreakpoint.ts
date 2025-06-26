import { useState, useEffect } from 'react';

/**
 * Custom hook to track and respond to viewport breakpoint changes.
 * Provides responsive design information based on window width.
 *
 * @author Munir Mardinli
 * @date 2025-06-06
 * @returns {BreakpointResult} An object containing:
 *   - isMobile: boolean (width < 768px)
 *   - isTablet: boolean (768px ≤ width < 1024px)
 *   - isDesktop: boolean (width ≥ 1024px)
 *   - current: Breakpoint type ('mobile' | 'tablet' | 'desktop')
 *
 * @example
 * // Basic usage
 * const { isMobile, current } = useBreakpoint();
 * if (isMobile) {
 *   // Render mobile component
 * }
 *
 * @example
 * // Conditional rendering
 * const { current } = useBreakpoint();
 * return (
 *   <div>
 *     {current === 'mobile' ? <MobileView /> : <DesktopView />}
 *   </div>
 * );
 *
 * @see {@link BreakpointResult} for return type structure
 * @see {@link Breakpoint} for available breakpoint values
 */
export function useBreakpoint(): BreakpointResult {
	// Initialize state with current window width (or 0 for SSR)
	const [width, setWidth] = useState<number>(
		typeof window !== 'undefined' ? window.innerWidth : 0,
	);

	/**
	 * Effect to handle window resize events
	 * - Adds event listener on mount
	 * - Removes event listener on unmount
	 * - Initializes with current width
	 */
	useEffect(() => {
		// Only execute in browser environment
		const handleResize = () => setWidth(window.innerWidth);
		// Set initial width
		window.addEventListener('resize', handleResize);
		// Add resize listener
		handleResize();
		// Cleanup function
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Breakpoint calculations
	const isMobile = width < 768;
	const isTablet = width >= 768 && width < 1024;
	const isDesktop = width >= 1024;

	// Determine current breakpoint
	let current: Breakpoint = 'desktop';
	if (isMobile) {
		current = 'mobile';
	} else if (isTablet) {
		current = 'tablet';
	}

	return {
		isMobile,
		isTablet,
		isDesktop,
		current,
	};
}
