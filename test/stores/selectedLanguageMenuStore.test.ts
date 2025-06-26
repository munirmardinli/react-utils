import { act } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import { useSelectedLanguageMenuStore } from '../../src/stores/selectedLanguageMenuStore'; // Importiere deinen Zustand

describe('useSelectedLanguageMenuStore', () => {
	beforeEach(() => {
		destroyCookie(null, 'languageMenu', { path: '/' });
		useSelectedLanguageMenuStore.setState({
			selectedLanguage: 'de',
		});
	});

	describe('initial state', () => {
		it('should initialize with "de" language if no cookie exists', () => {
			const initialState = useSelectedLanguageMenuStore.getState();
			expect(initialState.selectedLanguage).toBe('de');
		});

		it('should initialize with cookie value when cookie exists', async () => {
			setCookie(null, 'languageMenu', 'en', { path: '/' });
			await new Promise(resolve => setTimeout(resolve, 10));
			const initialState = useSelectedLanguageMenuStore.getState();
			expect(initialState.selectedLanguage).toBe('de');
		});
	});

	describe('setSelectedLanguage', () => {
		it('should update the language and set the cookie', async () => {
			const testLanguage = 'fr';
			await act(async () => {
				useSelectedLanguageMenuStore.getState().setSelectedLanguage(testLanguage);
			});
			expect(useSelectedLanguageMenuStore.getState().selectedLanguage).toBe(testLanguage);
			const cookies = parseCookies();
			expect(cookies.languageMenu).toBe(testLanguage);
		});
	});

	describe('remove language cookie', () => {
		it('should clear selected language and remove cookie', async () => {
			const testLanguage = 'de';
			await act(async () => {
				useSelectedLanguageMenuStore.getState().setSelectedLanguage(testLanguage);
			});
			expect(useSelectedLanguageMenuStore.getState().selectedLanguage).toBe(testLanguage);
			await act(async () => {
				destroyCookie(null, 'languageMenu', { path: '/' });
			});
			expect(useSelectedLanguageMenuStore.getState().selectedLanguage).toBe('de');
			const cookies = parseCookies();
			expect(cookies.languageMenu).toBeUndefined();
		});
	});
});
