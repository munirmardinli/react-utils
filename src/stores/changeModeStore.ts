'use client';
import { setCookie } from 'nookies';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { type ThemeStore } from '../types/index';

const COOKIE_PATH = '/';
const MAX_AGE = 30 * 24 * 60 * 60;
const CREATE_THEME = 'createTheme';
const HIGH_CONTRAST = 'highContrast'
const HIGH_CONTRAST_OBSERVE = 'high-contrast'

/**
 * @module ChangeModeStore
 * @author Munir Mardinli
 *
 * Zustand store for managing theme (light/dark), language, and high contrast mode.
 *
 * @property {PaletteMode} mode - Current color mode ('light' or 'dark')
 * @property {string} language - Current language preference
 * @property {boolean} highContrast - High contrast mode enabled
 * @property {Function} toggleMode - Toggles between light and dark mode
 * @property {Function} setMode - Explicitly sets the color mode
 * @property {Function} setLanguage - Sets the language preference
 * @property {Function} toggleHighContrast - Toggles high contrast mode
 * @property {Function} setHighContrast - Explicitly sets high contrast mode
 *
 * @example
 * // Access the store in a React component
 * import { useThemeStore } from './changeModeStore';
 * const mode = useThemeStore(state => state.mode);
 *
 * @example
 * // Toggle dark/light mode
 * const toggleMode = useThemeStore(state => state.toggleMode);
 * toggleMode();
 */
export const useThemeStore = create<ThemeStore>()(
	persist(
		(set) => ({
			mode: 'dark',
			language: 'de',
			highContrast: false,
			/**
			 * Toggles between light and dark color modes
			 * @returns {void}
			 */
			toggleMode: (): void =>
				set((state) => {
					const newMode = state.mode === 'dark' ? 'light' : 'dark';
					setCookie(null, CREATE_THEME, newMode, {
						maxAge: MAX_AGE,
						path: COOKIE_PATH,
					});
					document.documentElement.setAttribute(CREATE_THEME, newMode);
					return { mode: newMode };
				}),
			/**
			 * Explicitly sets the color mode
			 * @param {PaletteMode} mode - The mode to set ('light' or 'dark')
			 * @returns {void}
			 */
			setMode: (mode): void => {
				setCookie(null, CREATE_THEME, mode, {
					maxAge: MAX_AGE,
					path: COOKIE_PATH,
				});
				document.documentElement.setAttribute(CREATE_THEME, mode);
				set({ mode });
			},
			/**
			 * Sets the language preference
			 * @param {string} language - Language code to set
			 * @returns {void}
			 */
			setLanguage: (language): void => set({ language }),

			/**
			 * Toggles high contrast mode
			 * @returns {void}
			 */
			toggleHighContrast: (): void =>
				set((state) => {
					const newHighContrast = !state.highContrast;
					setCookie(null, HIGH_CONTRAST, String(newHighContrast), {
						maxAge: MAX_AGE,
						path: COOKIE_PATH,
					});
					if (newHighContrast) {
						document.body.classList.add(HIGH_CONTRAST_OBSERVE);
					} else {
						document.body.classList.remove(HIGH_CONTRAST_OBSERVE);
					}
					return { highContrast: newHighContrast };
				}),
			/**
			 * Explicitly sets high contrast mode
			 * @param {boolean} highContrast - Whether to enable high contrast
			 * @returns {void}
			 */
			setHighContrast: (highContrast): void => {
				setCookie(null, HIGH_CONTRAST, String(highContrast), {
					maxAge: MAX_AGE,
					path: COOKIE_PATH,
				});
				if (highContrast) {
					document.body.classList.add(HIGH_CONTRAST_OBSERVE);
				} else {
					document.body.classList.remove(HIGH_CONTRAST_OBSERVE);
				}
				set({ highContrast });
			},
		}),
		{
			name: 'theme-store',
			storage: createJSONStorage(() => localStorage),
		},
	),
);
