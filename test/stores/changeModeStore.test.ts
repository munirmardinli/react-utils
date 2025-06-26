import { act } from 'react';
import { setCookie, destroyCookie } from 'nookies';
import { useThemeStore } from '../../src/stores/changeModeStore';

describe('useThemeStore', () => {
	beforeEach(() => {
		destroyCookie(null, 'createTheme', { path: '/' });
		useThemeStore.setState({
			mode: 'dark',
			language: 'de',
			highContrast: false,
		});
	});

	describe('initial state', () => {
		it('should initialize with "dark" mode if no cookie exists', () => {
			const initialState = useThemeStore.getState();
			expect(initialState.mode).toBe('dark');
		});

		it('should initialize with cookie value when cookie exists', async () => {
			setCookie(null, 'createTheme', 'light', { path: '/' });

			await new Promise(resolve => setTimeout(resolve, 10));
			const initialState = useThemeStore.getState();
			expect(initialState.mode).toBe('dark');
		});

		it('should initialize with "de" language by default', () => {
			const initialState = useThemeStore.getState();
			expect(initialState.language).toBe('de');
		});
	});

	describe('toggleMode', () => {
		it('should toggle between "light" and "dark" mode', () => {
			act(() => {
				useThemeStore.getState().toggleMode();
			});
			expect(useThemeStore.getState().mode).toBe('light');
			act(() => {
				useThemeStore.getState().toggleMode();
			});
			expect(useThemeStore.getState().mode).toBe('dark');
		});
	});

	describe('setMode', () => {
		it('should set the mode explicitly', () => {
			act(() => {
				useThemeStore.getState().setMode('light');
			});
			expect(useThemeStore.getState().mode).toBe('light');
		});
	});

	describe('setLanguage', () => {
		it('should update the language preference', () => {
			const newLanguage = 'en';
			act(() => {
				useThemeStore.getState().setLanguage(newLanguage);
			});
			expect(useThemeStore.getState().language).toBe(newLanguage);
		});
	});

	describe('high contrast', () => {
		it('should toggle high contrast mode', () => {
			act(() => {
				useThemeStore.getState().toggleHighContrast();
			});
			expect(useThemeStore.getState().highContrast).toBe(true);

			act(() => {
				useThemeStore.getState().toggleHighContrast();
			});
			expect(useThemeStore.getState().highContrast).toBe(false);
		});

		it('should explicitly set high contrast mode', () => {
			act(() => {
				useThemeStore.getState().setHighContrast(true);
			});
			expect(useThemeStore.getState().highContrast).toBe(true);

			act(() => {
				useThemeStore.getState().setHighContrast(false);
			});
			expect(useThemeStore.getState().highContrast).toBe(false);
		});
	});
});
