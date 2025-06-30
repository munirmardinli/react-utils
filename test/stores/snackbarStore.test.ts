/**
 * @jest-environment jsdom
 */
import { useSnackStore } from '../../src/stores/snackbarStore';

describe('useSnackStore', () => {
	it('zeigt eine Nachricht an', () => {
		useSnackStore.getState().setSnack('Hallo', 'success');
		const state = useSnackStore.getState();
		expect(state.snack.open).toBe(true);
		expect(state.snack.message).toBe('Hallo');
		expect(state.snack.severity).toBe('success');
	});

	it('schließt die Snackbar', () => {
		useSnackStore.getState().setSnack('Test', 'info');
		useSnackStore.getState().closeSnack();
		expect(useSnackStore.getState().snack.open).toBe(false);
	});
});
