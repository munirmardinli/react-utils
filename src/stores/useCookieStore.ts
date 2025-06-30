'use client';
import { setCookie, parseCookies } from 'nookies';
import { create } from 'zustand';
import { type CookieState } from '../types/index';

const COOKIE_PATH = '/';
const COOKIE_NAME = 'authentication';
/**
 * @module CookieStore
 * @author Munir Mardinli
 *
 * Zustand store for managing authentication token cookies in a Next.js application.
 * Handles both client-side and server-side token persistence with secure cookie settings.
 *
 * @property {string|null} authToken - Current authentication token (null if not authenticated)
 * @property {Function} setAuthToken - Stores a new authentication token
 * @property {Function} removeAuthToken - Clears the current authentication token
 *
 * @example
 * // Access the store in a React component
 * import { useSCookieStore } from './useCookieStore';
 * const token = useSCookieStore(state => state.authToken);
 *
 * @example
 * // Set a new token
 * const setAuthToken = useSCookieStore(state => state.setAuthToken);
 * setAuthToken('my-token');
 *
 * @example
 * // Remove the token
 * const removeAuthToken = useSCookieStore(state => state.removeAuthToken);
 * removeAuthToken();
 */
export const useSCookieStore = create<CookieState>((set) => ({
	/**
	 * Current authentication token
	 * @type {string|null}
	 * @description Automatically initializes from cookies if available
	 */
	authToken:
		typeof window !== 'undefined'
			? parseCookies()?.["authentication"] || null
			: null,
	/**
	 * Stores a new authentication token in both state and cookies
	 * @param {string} token - The JWT or session token to store
	 * @returns {void}
	 *
	 * @description Configures secure cookies in production with:
	 * - Path: {COOKIE_PATH}
	 * - Secure flag (HTTPS only in production)
	 * - SameSite=Lax policy
	 */
	setAuthToken: (token: string) => {
		set({ authToken: token });
		setCookie(null, COOKIE_NAME, token, {
			path: COOKIE_PATH,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'Lax',
		});
	},
	/**
	 * Clears the authentication token from state and expires the cookie
	 * @returns {void}
	 *
	 * @description Effectively logs out the user by:
	 * - Setting authToken to null
	 * - Expiring the cookie (maxAge: -1)
	 */
	removeAuthToken: (): void => {
		set({ authToken: null });
		setCookie(null, COOKIE_NAME, '', { path: COOKIE_PATH, maxAge: -1 });
	},
}));
