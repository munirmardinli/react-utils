'use client';
import { create } from 'zustand';
import { type SnackbarState } from '../types/index.js';

/**
 * Zustand store for managing snackbar/notification state throughout the application.
 * Provides simple controls for showing and hiding temporary user messages.
 *
 * @module SnackbarStore
 * @author Munir Mardinli
 * @date 2025-06-06
 * @property {Object} snack - Current snackbar state
 * @property {string} snack.message - Notification message content
 * @property {string} snack.severity - Visual style/color ('error', 'warning', 'info', 'success')
 * @property {boolean} snack.open - Visibility state
 * @method setSnack - Displays a new snackbar notification
 * @method closeSnack - Hides the current notification
 *
 * @example
 * // Basic usage in component:
 * const { setSnack } = useSnackStore();
 *
 * // Show success message:
 * setSnack('Operation completed!', 'success');
 *
 * // Show error:
 * setSnack('Failed to save data', 'error');
 */
export const useSnackStore = create<SnackbarState>()((set) => ({
	/**
 * Current snackbar notification state
 * @type {Object}
 * @property {string} message - Display message content
 * @property {string} severity - Visual severity type
 * @property {boolean} open - Visibility flag
 */
	snack: { message: '', severity: '', open: false },
	/**
	 * Displays a new snackbar notification
	 * @param {string} message - The text message to display
	 * @param {string} severity - Visual style ('error'|'warning'|'info'|'success')
	 * @returns {void}
	 */
	setSnack: (message, severity): void =>
		set(() => ({
			snack: { message: message, severity: severity, open: true },
		})),
	/**
	 * Hides the currently displayed snackbar
	 * @returns {void}
	 * @description Maintains the current message/severity while hiding
	 */
	closeSnack: (): void =>
		set((state) => ({
			snack: {
				message: state.snack.message,
				severity: state.snack.severity,
				open: false,
			},
		})),
}));
