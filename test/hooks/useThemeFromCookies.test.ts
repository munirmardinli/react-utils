/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { useThemeFromCookies } from '../../src/hooks/useThemeFromCookies';

jest.mock('nookies', () => ({
	parseCookies: jest.fn(),
}));
jest.mock('../../src/stores/changeModeStore', () => ({
	useThemeStore: () => ({ setMode: jest.fn(), setHighContrast: jest.fn() }),
}));

describe('useThemeFromCookies', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		document.documentElement.setAttribute('createTheme', '');
	});

	it('liest Theme aus Cookies und setzt es', () => {
		require('nookies').parseCookies.mockReturnValue({ createTheme: 'light', highContrast: 'true' });
		renderHook(() => useThemeFromCookies());
		expect(document.documentElement.getAttribute('createTheme')).toBe('light');
	});

	it('fällt auf dark zurück, wenn kein Cookie gesetzt ist', () => {
		require('nookies').parseCookies.mockReturnValue({});
		renderHook(() => useThemeFromCookies());
		expect(document.documentElement.getAttribute('createTheme')).toBe('dark');
	});
});
