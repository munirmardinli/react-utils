'use client';
import { parseCookies, setCookie } from 'nookies';
import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { type SelectedLanguageMenuState } from '../types/index.js';

const COOKIE_PATH = '/';
/**
 * Zustand store for managing the selected language in the application menu.
 * Persists the selection between sessions using cookies and localStorage.
 *
 * @module SelectedLanguageMenuStore
 * @author Munir Mardinli
 * @date 2025-06-06
 * @property {string} selectedLanguage - Currently selected language code
 * @method setSelectedLanguage - Updates the selected language
 *
 * @example
 * // In component:
 * const { selectedLanguage, setSelectedLanguage } = useSelectedLanguageMenuStore();
 *
 * // Set language:
 * <button onClick={() => setSelectedLanguage('en')}>English</button>
 */
export const useSelectedLanguageMenuStore = create<SelectedLanguageMenuState>()(
	devtools(
		persist(
			(set) => ({
				/**
				 * Currently selected language code
				 * @type {string}
				 * @default 'de'
				 */
				selectedLanguage: (() => {
					// Server-side rendering fallback
					if (typeof window !== 'undefined') {
						const cookies = parseCookies();
						return cookies?.["languageMenu"] || 'de';
					}
					return 'de';
				})(),

				/**
				 * Updates the selected language and persists it
				 * @param {string} language - Language code to set (e.g. 'en', 'de')
				 * @returns {void}
				 */
				setSelectedLanguage: (language: string) => {
					// Set cookie for server-side access
					setCookie(null, 'languageMenu', language, {
						path: COOKIE_PATH, // Typically '/'
					});
					// Update local state
					set({ selectedLanguage: language });
				},
			}),
			{
				name: 'selected-language', // localStorage key
			},
		),
		{ name: 'selectedLanguageStore' }, // DevTools name
	),
);
