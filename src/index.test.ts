import { formatCurrency, validateOrderTotal, generateOrderId, calculateTax } from './index';

describe('formatCurrency', () => {
  it('should format USD currency correctly', () => {
    expect(formatCurrency(100, 'en-US')).toBe('$100.00');
  });

  it('should format EUR currency correctly', () => {
    expect(formatCurrency(100, 'de-DE')).toBe('100,00 €');
  });

  it('should throw error when locale is missing', () => {
    // @ts-ignore - Testing runtime behavior with missing parameter
    expect(() => formatCurrency(100)).toThrow('locale parameter is required');
  });

  it('should throw error when locale is empty string', () => {
    expect(() => formatCurrency(100, '')).toThrow('locale parameter is required');
  });
});

describe('validateOrderTotal', () => {
  it('should return true for valid positive numbers', () => {
    expect(validateOrderTotal(100)).toBe(true);
    expect(validateOrderTotal(0)).toBe(true);
    expect(validateOrderTotal(999999)).toBe(true);
  });

  it('should return false for negative numbers', () => {
    expect(validateOrderTotal(-1)).toBe(false);
    expect(validateOrderTotal(-100)).toBe(false);
  });

  it('should return false for numbers exceeding max', () => {
    expect(validateOrderTotal(1000001)).toBe(false);
  });

  it('should return false for NaN', () => {
    expect(validateOrderTotal(NaN)).toBe(false);
  });

  it('should return false for non-numbers', () => {
    // @ts-ignore - Testing runtime behavior
    expect(validateOrderTotal('100')).toBe(false);
    // @ts-ignore - Testing runtime behavior
    expect(validateOrderTotal(null)).toBe(false);
  });
});

describe('generateOrderId', () => {
  it('should generate unique IDs', () => {
    const id1 = generateOrderId();
    const id2 = generateOrderId();
    expect(id1).not.toBe(id2);
  });

  it('should start with ORD-', () => {
    const id = generateOrderId();
    expect(id.startsWith('ORD-')).toBe(true);
  });
});

describe('calculateTax', () => {
  it('should calculate 10% tax by default', () => {
    expect(calculateTax(100)).toBe(10);
  });

  it('should calculate custom tax rate', () => {
    expect(calculateTax(100, 0.2)).toBe(20);
  });

  it('should round to 2 decimal places', () => {
    expect(calculateTax(33.33, 0.1)).toBe(3.33);
  });
});
