import { type PaletteMode } from '@mui/material';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';

import { useThemeStore } from '../stores/changeModeStore.js';

/**
 * Custom hook for synchronizing theme preferences between cookies and application state
 *
 * @author Munir Mardinli
 * @date 2025-06-06
 * @description
 * Manages theme synchronization by:
 * - Reading theme preferences from cookies on initial load
 * - Applying theme settings to both state manager and DOM
 * - Supporting both color mode (light/dark) and high contrast mode
 *
 * @example
 * // Basic usage in component
 * useThemeFromCookies();
 *
 * @example
 * // With theme store access
 * const { mode } = useThemeStore();
 * useThemeFromCookies();
 *
 * @see {@link useThemeStore} For the underlying theme state management
 * @see {@link PaletteMode} For available theme modes
 * @see {@link parseCookies} For cookie parsing utility
 */
export const useThemeFromCookies = () => {
	const { setMode, setHighContrast } = useThemeStore();

	/**
	* Effect for initial theme synchronization
	* - Runs once on component mount
	* - Reads theme preferences from cookies
	* - Updates theme store with saved preferences
	* - Falls back to 'dark' mode if no preference exists
	*/
	useEffect(() => {
		const cookies = parseCookies();
		const initialMode = (cookies?.["createTheme"] as PaletteMode) ?? 'dark';
		const initialHighContrast = cookies?.["highContrast"] === 'true';

		setMode(initialMode);
		setHighContrast(initialHighContrast);
	}, [setMode, setHighContrast]);

	/**
	 * Effect for DOM theme synchronization
	 * - Runs once on component mount
	 * - Applies theme to document root for CSS variable usage
	 * - Ensures server-side and client-side rendering match
	 */
	useEffect(() => {
		const cookies = parseCookies();
		document.documentElement.setAttribute(
			'createTheme',
			cookies?.["createTheme"] || 'dark',
		);
	}, []);
};
