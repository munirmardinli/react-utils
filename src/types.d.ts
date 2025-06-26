/**
 * @author Munir Mardinli <munir@mardinli.de>
 * @date 2025-06-06
*/
import type { PaletteMode } from '@mui/material';

/**
* Global type declarations for the application.
* Contains interfaces and types used across the entire codebase.
*
* @module GlobalTypes
*/
declare global {

	/**
	* Generic language change handler interface
	* @template T - Optional generic type for additional properties
	*/
	interface ChangeLanguage<T = Record<string, unknown>> {
		[key: string]: unknown
	}

	/**
	* User profile interface with generic type support
	* @template T - Optional generic type for user properties
	*/
	interface User<T = Record<string | null, unknown>> {
		[key: string | null]: unknown;
	}

	/**
	* Responsive breakpoint detection results
	*/
	interface BreakpointResult {
		/** Mobile device detection flag */
		isMobile: boolean;
		/** Tablet device detection flag */
		isTablet: boolean;
		/** Desktop device detection flag */
		isDesktop: boolean;
		/** Current active breakpoint */
		current: Breakpoint;
	}

	/**
	* Authentication hook return type
	* @template T - User type extending base User interface
	*/
	interface AuthHookResult<T extends User = User> {
		/** Current authenticated user */
		user: T | null;
		/** Loading state */
		isLoading: boolean;
		/** Error object */
		error: Error | null;
	}

	/**
	* POST request parameters
	*/
	interface UsePostParams {
		/** API endpoint path */
		path: string;
		/** Optional request body */
		body?: object;
	}

	/**
	* POST request results
	* @template T - Response data type
	*/
	interface UsePostResult<T = unknown> {
		/** Response data */
		data: T | null;
		/** Error message */
		error: string | null;
		/** Loading state */
		loading: boolean;
		/** Function to trigger POST request */
		sendPostRequest?: () => Promise<void>;
	}


	/**
	* Decoded JWT token structure
	* @template T - User type extending base User interface
	*/
	interface DecodedToken<T extends User = User> {
		/** User information */
		user: T;
		/** Expiration timestamp */
		exp: number;
		/** Issued at timestamp */
		iat: number;
	}

	/**
	* Language change state and methods
	*/
	type ChangeLanguageState = {
		/** Currently selected language */
		languageSelected: string;
		/** Manual change flag */
		languageChangedManually: boolean;
		/** Language change callback */
		changelanguage: ChangeLanguage | null;
		/** Set application language */
		setLanguage: (lang: string, manually?: boolean) => void;
		/** Set language change callback */
		setChangelanguage: (data: ChangeLanguage) => void;
	};

	/**
	* Theme management store type
	*/
	type ThemeStore = {
		/** Current color mode */
		mode: PaletteMode;
		/** Current language */
		language: string;
		/** High contrast mode flag */
		highContrast: boolean;
		/** Toggle color mode */
		toggleMode: () => void;
		/** Set specific color mode */
		setMode: (mode: PaletteMode) => void;
		/** Set language */
		setLanguage: (language: string) => void;
		/** Toggle high contrast mode */
		toggleHighContrast: () => void;
		/** Set high contrast mode */
		setHighContrast: (highContrast: boolean) => void;
	};

	/**
	* Snackbar notification state
	*/
	type SnackbarState = {
		/** Current snackbar state */
		snack: {
			/** Display message */
			message: string;
			/** Severity level */
			severity: string;
			/** Visibility state */
			open: boolean;
		};
		/** Show snackbar */
		setSnack: (message: string, severity: string) => void;
		/** Hide snackbar */
		closeSnack: () => void;
	};

	/**
	* Language menu selection state
	*/
	type SelectedLanguageMenuState = {
		/** Currently selected language */
		selectedLanguage: string;
		/** Set selected language */
		setSelectedLanguage: (language: string) => void;
	};

	/**
	* Authentication cookie state
	*/
	type CookieState = {
		/** Current auth token */
		authToken: string | null;
		/** Set auth token */
		setAuthToken: (token: string) => void;
		/** Remove auth token */
		removeAuthToken: () => void;
	};

	/**
	* Responsive breakpoint types
	*/
	type Breakpoint = 'mobile' | 'tablet' | 'desktop';

	/**
	* Window type extensions
	*/
	interface Window {
		/** Cookie max age in seconds */
		MAX_AGE: number;
		/** Cookie path */
		COOKIE_PATH: string;
	}

	/** Cookie max age in seconds (30 days) */
	var MAX_AGE: number;
	/** Cookie path ('/') */
	var COOKIE_PATH: string;
}
export { };
