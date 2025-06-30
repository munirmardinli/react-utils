'use client';
import { setCookie } from 'nookies';
import { useStore } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import { useThemeStore } from '../stores/changeModeStore';
import { useSnackStore } from '../stores/snackbarStore';
import { type ChangeLanguage, type ChangeLanguageState } from '../types/index';

const COOKIE_PATH = '/';
const MAX_AGE = 30 * 24 * 60 * 60;
/**
 * @module ChangeLanguageStore
 * @author Munir Mardinli
 *
 * Zustand store for managing the application's language selection and related state.
 *
 * @property {string} languageSelected - Currently selected language code (default: 'de')
 * @property {boolean} languageChangedManually - Indicates if the language was changed by the user
 * @property {Function} setLanguage - Sets the application language and handles related operations
 * @property {Function} setChangelanguage - Sets the language change callback
 *
 * @example
 * // Access the store in a React component
 ```ts
  import { useChangeLanguageStore } from './changeLanguageStore';
  const language = useChangeLanguageStore(state => state.languageSelected);
 ```
 *
 * @example
 * // Change the language
 * const setLanguage = useChangeLanguageStore(state => state.setLanguage);
 * setLanguage('en', true);
 */
export const changeLanguageStore = createStore<ChangeLanguageState>()(
	devtools(
		persist(
			(set, get) => ({
				languageSelected: 'de',
				languageChangedManually: false,
				changelanguage: null,
				/**
				 * Sets the application language and handles related side effects
				 *
				 * @param {string} lang - Language code to set ('en', 'fr', 'de', 'ar', etc.)
				 * @param {boolean} [manually=false] - Whether change was user-initiated
				 *
				 * @example
				 * setLanguage('en', true); // Manual change to English
				 */
				setLanguage: (lang, manually = false) => {
					setCookie(null, 'languageSelected', lang, {
						maxAge: MAX_AGE,
						path: COOKIE_PATH,
					});

					set(
						{
							languageSelected: lang,
							languageChangedManually: manually,
						},
						false,
						'language/setLanguage',
					);

					const setThemeLanguage = useThemeStore.getState().setLanguage;
					setThemeLanguage(lang);

					if (manually) {
						const setSnack = useSnackStore.getState().setSnack;
						const messages: Record<string, string> = {
							en: 'Language changed to English!',
							fr: 'Langue changée en français!',
							de: 'Die Sprache wurde zu Deutsch geändert!',
							ar: 'تم تغيير اللغة إلى العربية!',
						};
						setSnack(messages[lang] || 'Language changed!', 'success');
					}
				},
				/**
				 * Sets the callback function for language changes
				 *
				 * @param {ChangeLanguage} data - The callback function
				 */
				setChangelanguage: (data: ChangeLanguage) => {
					set({ changelanguage: data }, false, 'language/setChangelanguage');
				},
			}),
			{
				name: 'changeLanguage-store',
			},
		),
		{ name: 'Devtools: LanguageStore' },
	),
);

/**
 * Hook to access the ChangeLanguageStore in React components
 *
 * @param {(state: ChangeLanguageState) => T} selector - Selector function
 * @returns {T} Selected state slice
 */
export const useChangeLanguageStore = <T>(
	selector: (state: ChangeLanguageState) => T,
): T => useStore(changeLanguageStore, selector);
