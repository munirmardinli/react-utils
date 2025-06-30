/**
 * @jest-environment jsdom
 */
import { changeLanguageStore, useChangeLanguageStore } from '../../src/stores/changeLanguageStore';
import { renderHook } from '@testing-library/react';

describe('changeLanguageStore', () => {
	it('hat initial Deutsch als Sprache', () => {
		const state = changeLanguageStore.getState();
		expect(state.languageSelected).toBe('de');
		expect(state.languageChangedManually).toBe(false);
	});

	it('ändert die Sprache und setzt manuell-Flag', () => {
		changeLanguageStore.getState().setLanguage('en', true);
		const state = changeLanguageStore.getState();
		expect(state.languageSelected).toBe('en');
		expect(state.languageChangedManually).toBe(true);
	});

	it('setzt die Callback-Funktion', () => {
		const obj = { irgendwas: jest.fn() };
		changeLanguageStore.getState().setChangelanguage(obj);
		expect(changeLanguageStore.getState().changelanguage).toBe(obj);
	});

	it('ändert die Sprache ohne manuell-Flag (Standard false)', () => {
		changeLanguageStore.getState().setLanguage('fr');
		const state = changeLanguageStore.getState();
		expect(state.languageSelected).toBe('fr');
		expect(state.languageChangedManually).toBe(false);
	});

	it('zeigt Fallback-Message, wenn Sprache nicht definiert ist', () => {
		jest.resetModules();
		const setSnack = jest.fn();
		jest.doMock('../../src/stores/snackbarStore', () => ({
			useSnackStore: {
				getState: () => ({ setSnack })
			}
		}));
		const { changeLanguageStore } = require('../../src/stores/changeLanguageStore');
		changeLanguageStore.getState().setLanguage('it', true);
		expect(setSnack).toHaveBeenCalledWith('Language changed!', 'success');
		jest.dontMock('../../src/stores/snackbarStore');
	});

	it('zeigt französische Message', () => {
		const setSnack = jest.fn();
		jest.spyOn(require('../../src/stores/snackbarStore'), 'useSnackStore').mockReturnValue({ setSnack });
		changeLanguageStore.getState().setLanguage('fr', true);
		expect(setSnack).toHaveBeenCalledWith('Langue changée en français!', 'success');
	});

	it('zeigt arabische Message', () => {
		const setSnack = jest.fn();
		jest.spyOn(require('../../src/stores/snackbarStore'), 'useSnackStore').mockReturnValue({ setSnack });
		changeLanguageStore.getState().setLanguage('ar', true);
		expect(setSnack).toHaveBeenCalledWith('تم تغيير اللغة إلى العربية!', 'success');
	});

	it('ruft KEIN setSnack auf, wenn manuell-Flag false ist', () => {
		const setSnack = jest.fn();
		jest.spyOn(require('../../src/stores/snackbarStore'), 'useSnackStore').mockReturnValue({
			getState: () => ({ setSnack })
		});
		changeLanguageStore.getState().setLanguage('en', false);
		expect(setSnack).not.toHaveBeenCalled();
	});

	it('gibt den aktuellen State mit useChangeLanguageStore zurück', () => {
		const { result } = renderHook(() =>
			useChangeLanguageStore(state => ({
				languageSelected: state.languageSelected,
				languageChangedManually: state.languageChangedManually,
			}))
		);
		expect(result.current.languageSelected).toBeDefined();
		expect(result.current.languageChangedManually).toBeDefined();
	});
});
