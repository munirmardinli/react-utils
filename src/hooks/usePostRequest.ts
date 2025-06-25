/**
 * @author Munir Mardinli <munir@mardinli.de>
 * @date 2025-06-06
*/
'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for making POST requests with type safety and state management
 *
 * @template T - The expected response type (defaults to User)
 * @param {UsePostParams} params - Configuration object for the request
 * @param {string} params.path - API endpoint path (appended to base URL)
 * @param {object} [params.body] - Optional request body to be JSON stringified
 *
 * @returns {UsePostResult<T>} An object containing:
 *   - data: The response data (type T) or null
 *   - error: Error message string or null
 *   - loading: Boolean indicating request status
 *   - sendPostRequest: Function to manually trigger the request
 *
 * @example
 * // Basic usage with automatic execution
 * const { data, loading } = usePost({
 *   path: 'users',
 *   body: { name: 'John' }
 * });
 *
 * @example
 * // Manual execution with custom type
 * interface ApiResponse { id: string; status: string; }
 * const { sendPostRequest } = usePost<ApiResponse>({
 *   path: 'orders'
 * });
 *
 * @example
 * // Error handling
 * const { error } = usePost({
 *   path: 'login',
 *   body: credentials
 * });
 * useEffect(() => {
 *   if (error) showToast(error);
 * }, [error]);
 *
 * @see {@link UsePostParams} for parameter structure
 * @see {@link UsePostResult} for return type structure
 */
export const usePost = <T = User>({
	path,
	body,
}: UsePostParams): UsePostResult<T> => {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	/**
 * Executes the POST request
 * - Manages loading state
 * - Handles success/error cases
 * - Returns void (results are handled via state updates)
 */
	const sendPostRequest = async () => {
		setLoading(true);
		setError(null);

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});

			if (!res.ok) {
				throw new Error(`Fehler: ${res.status}`);
			}

			const responseData = await res.json();
			setData(responseData);
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('Unbekannter Fehler');
			}
		} finally {
			setLoading(false);
		}
	};
	// Automatically execute request when body is provided
	useEffect(() => {
		if (body) {
			sendPostRequest();
		}
	}, [body]);

	return { data, error, loading, sendPostRequest };
};
