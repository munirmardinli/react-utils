import { act } from 'react';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
import { useSCookieStore } from '../../src/stores/useCookieStore';

describe('useSCookieStore', () => {
	beforeEach(() => {
		destroyCookie(null, 'authentication', { path: '/' });
		useSCookieStore.setState({
			authToken: null,
		});
	});

	describe('initial state', () => {
		it('should initialize with null authToken if no cookie exists', () => {
			const initialState = useSCookieStore.getState();
			expect(initialState.authToken).toBeNull();
		});
		it('should initialize with authToken from cookie if cookie exists', async () => {
			setCookie(null, 'authentication', 'token-123', { path: '/' });
			await new Promise(resolve => setTimeout(resolve, 10));
			const initialState = useSCookieStore.getState();
			expect(initialState.authToken).toBe('token-123');
		});
	});

	describe('setAuthToken', () => {
		it('should set authToken in state and cookie', async () => {
			const testToken = 'newToken123';
			await act(async () => {
				useSCookieStore.getState().setAuthToken(testToken);
			});

			expect(useSCookieStore.getState().authToken).toBe(testToken);
			const cookies = parseCookies();
			expect(cookies.authentication).toBe(testToken);
		});
	});

	describe('removeAuthToken', () => {
		it('should remove authToken from state and clear cookie', async () => {
			await act(async () => {
				useSCookieStore.getState().setAuthToken('tokenToBeRemoved');
			});
			expect(useSCookieStore.getState().authToken).toBe('tokenToBeRemoved');
			await act(async () => {
				useSCookieStore.getState().removeAuthToken();
			});
			expect(useSCookieStore.getState().authToken).toBeNull();
			const cookies = parseCookies();
			expect(cookies.authentication).toBeUndefined();
		});
	});
});
