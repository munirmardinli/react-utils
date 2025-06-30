/**
 * @jest-environment jsdom
 */
import { useThemeStore } from '../../src/stores/changeModeStore';

describe('useThemeStore', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.spyOn(require('nookies'), 'setCookie').mockImplementation(() => { });
		document.documentElement.setAttribute = jest.fn();
		document.body.classList.add = jest.fn();
		document.body.classList.remove = jest.fn();
	});

	it('hat initial dark mode', () => {
		const state = useThemeStore.getState();
		expect(state.mode).toBe('dark');
	});

	it('kann den Modus wechseln', () => {
		useThemeStore.getState().toggleMode();
		expect(['dark', 'light']).toContain(useThemeStore.getState().mode);
	});

	it('kann die Sprache setzen', () => {
		useThemeStore.getState().setLanguage('fr');
		expect(useThemeStore.getState().language).toBe('fr');
	});

	it('kann HighContrast toggeln', () => {
		const prev = useThemeStore.getState().highContrast;
		useThemeStore.getState().toggleHighContrast();
		expect(useThemeStore.getState().highContrast).toBe(!prev);
	});

	it('ruft setCookie und setAttribute bei toggleMode auf', () => {
		const spySetCookie = require('nookies').setCookie;
		useThemeStore.getState().toggleMode();
		expect(spySetCookie).toHaveBeenCalled();
		expect(document.documentElement.setAttribute).toHaveBeenCalled();
	});

	it('ruft setCookie und setAttribute bei setMode auf', () => {
		const spySetCookie = require('nookies').setCookie;
		useThemeStore.getState().setMode('light');
		expect(spySetCookie).toHaveBeenCalled();
		expect(document.documentElement.setAttribute).toHaveBeenCalledWith('createTheme', 'light');
	});

	it('ruft setCookie und classList.add/remove bei toggleHighContrast auf', () => {
		const spySetCookie = require('nookies').setCookie;
		useThemeStore.getState().toggleHighContrast();
		expect(spySetCookie).toHaveBeenCalled();
		expect(
			(document.body.classList.add as jest.Mock).mock.calls.length +
			(document.body.classList.remove as jest.Mock).mock.calls.length
		).toBeGreaterThan(0);
	});

	it('ruft setCookie und classList.add bei setHighContrast(true) auf', () => {
		const spySetCookie = require('nookies').setCookie;
		useThemeStore.getState().setHighContrast(true);
		expect(spySetCookie).toHaveBeenCalled();
		expect(document.body.classList.add).toHaveBeenCalledWith('high-contrast');
	});

	it('ruft setCookie und classList.remove bei setHighContrast(false) auf', () => {
		const spySetCookie = require('nookies').setCookie;
		useThemeStore.getState().setHighContrast(false);
		expect(spySetCookie).toHaveBeenCalled();
		expect(document.body.classList.remove).toHaveBeenCalledWith('high-contrast');
	});
});
