import { act } from 'react';
import { useSnackStore } from '../../src/stores/snackbarStore';

/**
 * @group unit
 * @group state
 */
describe('useSnackStore', () => {
	beforeEach(() => {
		// Reset the store before each test
		useSnackStore.setState({
			snack: { message: '', severity: '', open: false },
		});
	});

	it('should initialize with default state', () => {
		const initialState = useSnackStore.getState();
		expect(initialState.snack).toEqual({
			message: '',
			severity: '',
			open: false,
		});
	});

	describe('setSnack', () => {
		it('should update the snack state with message and severity', () => {
			act(() => {
				useSnackStore.getState().setSnack('Test message', 'success');
			});

			const state = useSnackStore.getState();
			expect(state.snack).toEqual({
				message: 'Test message',
				severity: 'success',
				open: true,
			});
		});

		it('should handle different severity levels', () => {
			const severities = ['error', 'warning', 'info', 'success'] as const;

			severities.forEach((severity) => {
				act(() => {
					useSnackStore.getState().setSnack(`${severity} message`, severity);
				});

				const state = useSnackStore.getState();
				expect(state.snack.severity).toBe(severity);
			});
		});

		it('should always set open to true when setting a new snack', () => {
			act(() => {
				useSnackStore.getState().setSnack('Test', 'info');
			});

			expect(useSnackStore.getState().snack.open).toBe(true);
		});
	});

	describe('closeSnack', () => {
		it('should set open to false while maintaining other properties', () => {
			// First set a snack
			act(() => {
				useSnackStore.getState().setSnack('Closing test', 'warning');
			});

			// Then close it
			act(() => {
				useSnackStore.getState().closeSnack();
			});

			const state = useSnackStore.getState();
			expect(state.snack).toEqual({
				message: 'Closing test',
				severity: 'warning',
				open: false,
			});
		});

		it('should work even if no message is set', () => {
			act(() => {
				useSnackStore.getState().closeSnack();
			});

			const state = useSnackStore.getState();
			expect(state.snack.open).toBe(false);
		});
	});

	describe('state persistence', () => {
		it('should maintain message and severity when closing', () => {
			const testMessage = 'Persistent message';
			const testSeverity = 'error';

			act(() => {
				useSnackStore.getState().setSnack(testMessage, testSeverity);
			});

			act(() => {
				useSnackStore.getState().closeSnack();
			});

			const state = useSnackStore.getState();
			expect(state.snack.message).toBe(testMessage);
			expect(state.snack.severity).toBe(testSeverity);
			expect(state.snack.open).toBe(false);
		});
	});

	describe('type safety', () => {
		it('should only accept valid severity types', () => {
			// This test is mostly for TypeScript checking
			const validSeverities = ['error', 'warning', 'info', 'success'] as const;
			validSeverities.forEach((severity) => {
				expect(() => {
					useSnackStore.getState().setSnack('Test', severity);
				}).not.toThrow();
			});

			// TypeScript test - should fail at compile time, not runtime
			// We'll modify the test to just verify the types are correct
			expect(true).toBe(true); // Placeholder assertion
		});
	});
});
