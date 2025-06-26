/**
 * @author Munir Mardinli <munir@mardinli.de>
 * @date 2025-06-06
*/

/**
 * Global cookie configuration constants for the application.
 * Defines standard cookie expiration and path settings used across all stores.
 *
 * @author Munir Mardinli
 * @date 2025-06-06
 * @module CookieConstants
 * @property {number} MAX_AGE - Default cookie lifetime in seconds (30 days)
 * @property {string} COOKIE_PATH - Default cookie path ('/')
 *
 * @example
 * // Using in cookie configuration:
 * setCookie(null, 'auth', 'token123', {
 *   maxAge: MAX_AGE,
 *   path: COOKIE_PATH
 * });
 */

// 30 days in seconds (30d × 24h × 60m × 60s)
globalThis.MAX_AGE = 30 * 24 * 60 * 60;

// Root path for cookie accessibility
globalThis.COOKIE_PATH = '/';

/**
 * Default cookie expiration time in seconds
 * @constant {number}
 * @default 2592000 (30 days)
 */
export const MAX_AGE = globalThis.MAX_AGE;

/**
 * Default cookie path
 * @constant {string}
 * @default '/'
 */
export const COOKIE_PATH = globalThis.COOKIE_PATH;
