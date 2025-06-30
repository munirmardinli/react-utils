/**
 * @jest-environment jsdom
 */
import { useSelectedLanguageMenuStore } from '../../src/stores/selectedLanguageMenuStore';

describe('useSelectedLanguageMenuStore', () => {
	it('hat initial Deutsch als Sprache', () => {
		const state = useSelectedLanguageMenuStore.getState();
		expect(state.selectedLanguage).toBe('de');
	});

	it('kann die Sprache ändern', () => {
		useSelectedLanguageMenuStore.getState().setSelectedLanguage('en');
		expect(useSelectedLanguageMenuStore.getState().selectedLanguage).toBe('en');
	});

	it('liefert "de" als Fallback, wenn window nicht definiert ist (SSR)', () => {
		const originalWindow = global.window;
		// @ts-ignore
		delete global.window;
		jest.resetModules();
		const { useSelectedLanguageMenuStore } = require('../../src/stores/selectedLanguageMenuStore');
		expect(useSelectedLanguageMenuStore.getState().selectedLanguage).toBe('de');
		global.window = originalWindow;
	});
});
