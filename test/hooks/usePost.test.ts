/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react';
import { usePost } from '../../src/hooks/usePostRequest';

beforeAll(() => {
	jest.useFakeTimers();
});
afterAll(() => {
	jest.useRealTimers();
});

global.fetch = jest.fn();

describe('usePost', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('führt einen erfolgreichen POST-Request aus', async () => {
		(global.fetch as jest.Mock).mockResolvedValue({ ok: true, json: async () => ({ id: 1 }) });
		const { result } = renderHook(() => usePost({ path: 'test', body: { foo: 'bar' } }));
		expect(result.current.loading).toBe(true);
		await act(async () => { jest.runAllTimers(); });
		expect(result.current.data).toEqual({ id: 1 });
		expect(result.current.error).toBeNull();
	});

	it('setzt einen Fehler, wenn der Request fehlschlägt', async () => {
		(global.fetch as jest.Mock).mockResolvedValue({ ok: false, status: 500 });
		const { result } = renderHook(() => usePost({ path: 'fail', body: { foo: 'bar' } }));
		await act(async () => { jest.runAllTimers(); });
		expect(result.current.error).toContain('Fehler');
	});

	it('führt keinen Request aus, wenn kein body übergeben wird', async () => {
		(global.fetch as jest.Mock).mockClear();
		const { result } = renderHook(() => usePost({ path: 'test' }));
		await act(async () => { jest.runAllTimers(); });
		expect(global.fetch).not.toHaveBeenCalled();
		expect(result.current.data).toBeNull();
		expect(result.current.error).toBeNull();
		expect(result.current.loading).toBe(false);
	});

	it('setzt einen Fehler, wenn fetch eine Exception wirft', async () => {
		(global.fetch as jest.Mock).mockImplementation(() => { throw new Error('Netzwerkfehler'); });
		const { result } = renderHook(() => usePost({ path: 'test', body: { foo: 'bar' } }));
		await act(async () => { jest.runAllTimers(); });
		expect(result.current.error).toBe('Netzwerkfehler');
	});

	it('setzt einen generischen Fehler, wenn error kein Error-Objekt ist', async () => {
		(global.fetch as jest.Mock).mockImplementation(() => { throw 'irgendwas'; });
		const { result } = renderHook(() => usePost({ path: 'test', body: { foo: 'bar' } }));
		await act(async () => { jest.runAllTimers(); });
		expect(result.current.error).toBe('Unbekannter Fehler');
	});
});
