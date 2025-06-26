import { MAX_AGE, COOKIE_PATH } from './globals';

/**
 * @group unit
 * @group constants
 */

describe('CookieConstants', () => {
  describe('globalThis values', () => {
    it('should set MAX_AGE on globalThis', () => {
      expect(globalThis.MAX_AGE).toBeDefined();
      expect(globalThis.MAX_AGE).toBe(30 * 24 * 60 * 60); // 30 Tage in Sekunden
    });

    it('should set COOKIE_PATH on globalThis', () => {
      expect(globalThis.COOKIE_PATH).toBeDefined();
      expect(globalThis.COOKIE_PATH).toBe('/');
    });
  });

  describe('exported constants', () => {
    it('should export correct MAX_AGE value', () => {
      expect(MAX_AGE).toBe(30 * 24 * 60 * 60);
      expect(MAX_AGE).toBe(globalThis.MAX_AGE);
    });

    it('should export correct COOKIE_PATH value', () => {
      expect(COOKIE_PATH).toBe('/');
      expect(COOKIE_PATH).toBe(globalThis.COOKIE_PATH);
    });
  });

  describe('value consistency', () => {
    it('should have MAX_AGE equal to 30 days in seconds', () => {
      const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
      expect(MAX_AGE).toBe(thirtyDaysInSeconds);
    });

    it('should have COOKIE_PATH as root path', () => {
      expect(COOKIE_PATH).toBe('/');
    });
  });

  describe('JSDoc documentation', () => {
    it('should have MAX_AGE documented with correct default value', () => {
      const MAX_AGE_DOC = '2592000 (30 days)';
      expect(MAX_AGE.toString()).toBe(MAX_AGE_DOC.split(' ')[0]);
    });

    it('should have COOKIE_PATH documented with correct default value', () => {
      const COOKIE_PATH_DOC = "'/'";
      expect(COOKIE_PATH).toBe(eval(COOKIE_PATH_DOC));
    });
  });
});
