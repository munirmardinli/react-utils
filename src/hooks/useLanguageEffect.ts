'use client';
import { parseCookies, setCookie } from 'nookies';
import { useEffect } from 'react';

import {
	changeLanguageStore,
	useChangeLanguageStore,
} from '../stores/changeLanguageStore';

const COOKIE_PATH = '/';
const MAX_AGE = 30 * 24 * 60 * 60;
/**
 * Custom hook for managing language selection and synchronization with cookies/API
 *
 * @version 1.0.0
 *
 * @description
 * Handles language selection persistence by:
 * - Fetching translation files from API when language changes
 * - Synchronizing language preference with cookies
 * - Restoring language preference from cookies on initial load
 *
 * @example
 * // Basic usage in component
 * useLanguageEffect();
 *
 * @example
 * // With custom language store
 * const { languageSelected } = useChangeLanguageStore();
 * useLanguageEffect();
 *
 * @see changeLanguageStore For the underlying state management
 * @see COOKIE_PATH For cookie path configuration
 * @see MAX_AGE For cookie expiration setting
 */
export const useLanguageEffect = () => {
	const languageSelected = useChangeLanguageStore((s) => s.languageSelected);
	const setChangelanguage = useChangeLanguageStore((s) => s.setChangelanguage);

	/**
	 * Effect for fetching and applying language translations
	 * - Triggers when languageSelected changes
	 * - Fetches translation file from API
	 * - Updates global state and cookies
	 */
	useEffect(() => {
		const fetchLanguage = async () => {
			try {
				const res = await fetch(
					`${process.env?.["NEXT_PUBLIC_API_URL"]}/language/${languageSelected}.json`,
				);
				if (!res.ok) {
					throw new Error('Sprache konnte nicht geladen werden');
				}

				const data = await res.json();
				setChangelanguage(data);

				// Persist language selection in cookie
				setCookie(null, 'languageSelected', languageSelected, {
					path: COOKIE_PATH,
					maxAge: MAX_AGE,
				});
			} catch (error) {
				// Consider adding error state handling here
				console.error('Language fetch failed:', error);
			}
		};

		fetchLanguage();
	}, [languageSelected, setChangelanguage]);

	/**
	 * Effect for initial language synchronization
	 * - Runs once on mount
	 * - Checks for existing language preference in cookies
	 * - Restores preference if different from current state
	 */
	useEffect(() => {
		const cookies = parseCookies();
		const stored = cookies?.["languageSelected"];

		if (stored && stored !== languageSelected) {
			changeLanguageStore.getState().setLanguage(stored);
		}
	}, [languageSelected]);
};
