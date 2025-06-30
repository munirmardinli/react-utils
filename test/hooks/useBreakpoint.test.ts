/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { useBreakpoint, getInitialWidth } from '../../src/hooks/useBreakpoint';

describe('useBreakpoint', () => {
	beforeEach(() => {
		Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
	});

	it('erkennt Desktop', () => {
		Object.defineProperty(window, 'innerWidth', { value: 1200 });
		const { result } = renderHook(() => useBreakpoint());
		expect(result.current.isDesktop).toBe(true);
		expect(result.current.current).toBe('desktop');
	});

	it('erkennt Tablet', () => {
		Object.defineProperty(window, 'innerWidth', { value: 800 });
		const { result } = renderHook(() => useBreakpoint());
		expect(result.current.isTablet).toBe(true);
		expect(result.current.current).toBe('tablet');
	});

	it('erkennt Mobile', () => {
		Object.defineProperty(window, 'innerWidth', { value: 500 });
		const { result } = renderHook(() => useBreakpoint());
		expect(result.current.isMobile).toBe(true);
		expect(result.current.current).toBe('mobile');
	});

	it('setzt width auf 0, wenn window nicht definiert ist (SSR)', () => {
		const originalWindow = global.window;
		// @ts-ignore
		delete global.window;
		const { result } = renderHook(() => useBreakpoint());
		expect(result.current.isMobile).toBe(true);
		expect(result.current.current).toBe('mobile');
		global.window = originalWindow;
	});
});

describe('getInitialWidth', () => {
	it('liefert window.innerWidth, wenn window definiert ist', () => {
		expect(getInitialWidth()).toBe(window.innerWidth);
	});
	it('liefert 0, wenn window nicht definiert ist', () => {
		const originalWindow = global.window;
		// @ts-ignore
		delete global.window;
		expect(getInitialWidth()).toBe(0);
		global.window = originalWindow;
	});
});
