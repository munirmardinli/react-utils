'use client';
import { setCookie } from 'nookies';
import { useStore } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

import { useThemeStore } from '../stores/changeModeStore.js';
import { useSnackStore } from '../stores/snackbarStore.js';
import { type ChangeLanguage, type ChangeLanguageState } from '../types/index.js';

const COOKIE_PATH = '/';
const MAX_AGE = 30 * 24 * 60 * 60;
/**
 * Zustand store for managing application language settings and changes.
 *
 * @module ChangeLanguageStore
 * @author Munir Mardinli
 * @date 2025-06-06
 *
 * @property {string} languageSelected - Currently selected language code (default: 'de')
 * @property {boolean} languageChangedManually - Flag if language was changed by user
 * @property {ChangeLanguage|null} changelanguage - Callback for language changes
 *
 * @method setLanguage - Sets the application language and handles related operations
 * @method setChangelanguage - Sets the language change callback
 *
 * @example
 * // In component:
 * const { languageSelected, setLanguage } = useChangeLanguageStore(state => ({
 *   languageSelected: state.languageSelected,
 *   setLanguage: state.setLanguage
 * }));
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
 * @template T
 * @param {(state: ChangeLanguageState) => T} selector - Selector function
 * @returns {T} Selected state slice
 */
export const useChangeLanguageStore = <T>(
	selector: (state: ChangeLanguageState) => T,
): T => useStore(changeLanguageStore, selector);
