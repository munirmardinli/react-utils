/**
 * @jest-environment jsdom
 */
import { useSCookieStore } from '../../src/stores/useCookieStore';

describe('useSCookieStore', () => {
	it('setzt und entfernt das Auth-Token', () => {
		useSCookieStore.getState().setAuthToken('token123');
		expect(useSCookieStore.getState().authToken).toBe('token123');
		useSCookieStore.getState().removeAuthToken();
		expect(useSCookieStore.getState().authToken).toBeNull();
	});

	it('setzt authToken auf null, wenn window nicht definiert ist (SSR)', () => {
		const originalWindow = global.window;
		// @ts-ignore
		delete global.window;
		jest.resetModules();
		const { useSCookieStore } = require('../../src/stores/useCookieStore');
		expect(useSCookieStore.getState().authToken).toBeNull();
		global.window = originalWindow;
	});
});
