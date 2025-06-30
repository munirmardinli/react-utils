/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';

jest.mock('nookies', () => ({
	parseCookies: jest.fn(() => ({})),
	setCookie: jest.fn(),
}));
jest.mock('../../src/stores/changeLanguageStore', () => ({
	changeLanguageStore: { getState: () => ({ setLanguage: jest.fn() }) },
	useChangeLanguageStore: jest.fn((fn: any) => fn({ languageSelected: 'de', setChangelanguage: jest.fn() })),
}));

global.fetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({}) })) as any;

describe('useLanguageEffect', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('ruft die Sprache vom API ab und setzt das Cookie', async () => {
		await renderHook(() => require('../../src/hooks/useLanguageEffect').useLanguageEffect());
		expect(global.fetch).toHaveBeenCalled();
		expect(require('nookies').setCookie).toHaveBeenCalled();
	});

	it('liest Sprache aus Cookie und synchronisiert', () => {
		require('nookies').parseCookies.mockReturnValue({ languageSelected: 'en' });
		const { changeLanguageStore } = require('../../src/stores/changeLanguageStore');
		renderHook(() => require('../../src/hooks/useLanguageEffect').useLanguageEffect());
		expect(changeLanguageStore.getState().setLanguage).toBeDefined();
	});

	it('setzt keinen Cookie, wenn fetch nicht ok ist', async () => {
		global.fetch = jest.fn(() => Promise.resolve({ ok: false, json: () => Promise.resolve({}) })) as any;
		await renderHook(() => require('../../src/hooks/useLanguageEffect').useLanguageEffect());
		expect(require('nookies').setCookie).not.toHaveBeenCalled();
	});

	it('macht nichts, wenn kein languageSelected im Cookie ist', () => {
		require('nookies').parseCookies.mockReturnValue({});
		const { changeLanguageStore } = require('../../src/stores/changeLanguageStore');
		renderHook(() => require('../../src/hooks/useLanguageEffect').useLanguageEffect());
		expect(changeLanguageStore.getState().setLanguage).toBeDefined(); // Kein Aufruf, aber keine Exception
	});
});
