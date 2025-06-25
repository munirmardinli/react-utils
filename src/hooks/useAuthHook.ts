/**
 * @author Munir Mardinli <munir@mardinli.de>
 * @date 2025-06-06
*/
'use client';
import { jwtDecode } from 'jwt-decode';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';

import { useSCookieStore } from '../stores/useCookieStore';

/**
 * Custom hook for handling authentication state and token validation.
 *
 * @returns {AuthHookResult} An object containing:
 *   - user: The authenticated user object or null
 *   - isLoading: Boolean indicating if auth check is in progress
 *   - error: Error object if authentication failed
 *
 * @example
 * // Basic usage
 * const { user, isLoading, error } = useAuthHook();
 *
 * @example
 * // With TypeScript generics for custom user type
 * interface CustomUser extends User<{ email: string }> {}
 * const { user } = useAuthHook<CustomUser>();
 *
 * @see {@link AuthHookResult} for return type structure
 * @see {@link User} for base user type that can be extended
 */
export const useAuthHook = (): AuthHookResult => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);
	const { setAuthToken } = useSCookieStore((state) => state);

	useEffect(() => {
		// Skip execution during server-side rendering
		if (typeof window === 'undefined') {
			setIsLoading(false);
			return;
		}

		try {
			const cookies = parseCookies();
			const tokenWithBearer = cookies.authentication;
			// Validate token presence and format
			if (!tokenWithBearer?.startsWith('Bearer ')) {
				setIsLoading(false);
				return;
			}

			const token = tokenWithBearer.replace('Bearer ', '');
			const decoded = jwtDecode<DecodedToken>(token);
			// Check token expiration
			if (decoded.exp * 1000 < Date.now()) {
				setAuthToken(''); // Clear expired token
			} else {
				setUser(decoded.user); // Set authenticated user
			}
		} catch (err) {
			// Handle errors consistently
			setError(err instanceof Error ? err : new Error('Unknown auth error'));
		} finally {
			setIsLoading(false); // Ensure loading state is always resolved
		}
	}, [setAuthToken]);

	return { user, isLoading, error };
};
