'use client';
import { setCookie } from 'nookies';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const COOKIE_PATH = '/';
const MAX_AGE = 30 * 24 * 60 * 60;
/**
 * Zustand store for managing application theme settings including:
 * - Color mode (light/dark)
 * - Language preference
 * - High contrast mode
 *
 * @module ThemeStore
 * @author Munir Mardinli
 * @date 2025-06-06
 * @property {PaletteMode} mode - Current color mode ('light' or 'dark')
 * @property {string} language - Current language preference
 * @property {boolean} highContrast - High contrast mode status
 *
 * @method toggleMode - Toggles between light and dark mode
 * @method setMode - Explicitly sets the color mode
 * @method setLanguage - Sets the language preference
 * @method toggleHighContrast - Toggles high contrast mode
 * @method setHighContrast - Explicitly sets high contrast mode
 *
 * @example
 * // In component:
 * const { mode, toggleMode } = useThemeStore();
 *
 * // Toggle mode:
 * <button onClick={toggleMode}>Toggle Theme</button>
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
					setCookie(null, 'createTheme', newMode, {
						maxAge: MAX_AGE,
						path: COOKIE_PATH,
					});
					document.documentElement.setAttribute('createTheme', newMode);
					return { mode: newMode };
				}),
			/**
			 * Explicitly sets the color mode
			 * @param {PaletteMode} mode - The mode to set ('light' or 'dark')
			 * @returns {void}
			 */
			setMode: (mode): void => {
				setCookie(null, 'createTheme', mode, {
					maxAge: MAX_AGE,
					path: COOKIE_PATH,
				});
				document.documentElement.setAttribute('createTheme', mode);
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
					setCookie(null, 'highContrast', String(newHighContrast), {
						maxAge: MAX_AGE,
						path: COOKIE_PATH,
					});
					if (newHighContrast) {
						document.body.classList.add('high-contrast');
					} else {
						document.body.classList.remove('high-contrast');
					}
					return { highContrast: newHighContrast };
				}),
			/**
			 * Explicitly sets high contrast mode
			 * @param {boolean} highContrast - Whether to enable high contrast
			 * @returns {void}
			 */
			setHighContrast: (highContrast): void => {
				setCookie(null, 'highContrast', String(highContrast), {
					maxAge: MAX_AGE,
					path: COOKIE_PATH,
				});
				if (highContrast) {
					document.body.classList.add('high-contrast');
				} else {
					document.body.classList.remove('high-contrast');
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
