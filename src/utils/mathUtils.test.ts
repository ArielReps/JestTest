import { sum, multiply } from './marthUtils';

describe('mathUtils', () => {
  describe('sum function', () => {
    it('should return the sum of two positive numbers', () => {
      expect(sum(1, 2)).toBe(3);
    });

    it('should return the sum of negative numbers', () => {
      expect(sum(-1, -2)).toBe(-3);
    });
  });

  describe('multiply function', () => {
    it('should return the product of two positive numbers', () => {
      expect(multiply(2, 3)).toBe(6);
    });

    it('should return zero when multiplying by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });
});
