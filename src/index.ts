/**
 * Shared utilities for microservices
 * @module shared-utils
 */

/**
 * Format a currency amount with locale support
 * 
 * BREAKING CHANGE in v2.0.0: Now requires locale parameter
 * Previous signature: formatCurrency(amount: number): string
 * New signature: formatCurrency(amount: number, locale: string): string
 * 
 * @param amount - The amount to format
 * @param locale - The locale to use for formatting (e.g., 'en-US', 'de-DE')
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, locale: string): string {
  if (typeof locale !== 'string' || locale.length === 0) {
    throw new Error('locale parameter is required in v2.0.0');
  }
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale.startsWith('en') ? 'USD' : 'EUR',
  }).format(amount);
}

/**
 * Validate an order total
 * @param total - The order total to validate
 * @returns true if valid, false otherwise
 */
export function validateOrderTotal(total: number): boolean {
  if (typeof total !== 'number') {
    return false;
  }
  if (isNaN(total)) {
    return false;
  }
  if (total < 0) {
    return false;
  }
  if (total > 1000000) {
    return false;
  }
  return true;
}

/**
 * Generate a unique order ID
 * @returns A unique order ID string
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `ORD-${timestamp}-${randomPart}`.toUpperCase();
}

/**
 * Calculate tax for an amount
 * @param amount - The amount to calculate tax for
 * @param taxRate - The tax rate (default 0.1 for 10%)
 * @returns The tax amount
 */
export function calculateTax(amount: number, taxRate: number = 0.1): number {
  return Math.round(amount * taxRate * 100) / 100;
}

export default {
  formatCurrency,
  validateOrderTotal,
  generateOrderId,
  calculateTax,
};
