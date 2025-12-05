# shared-utils

Shared utility library for microservices architecture.

## Installation

```bash
npm install shared-utils
```

## Quick Start

```typescript
import { formatCurrency, validateOrderTotal, generateOrderId, calculateTax } from 'shared-utils';

// Format currency (v2.0.0 - locale is now required!)
const formatted = formatCurrency(99.99, 'en-US'); // "$99.99"

// Validate order total
const isValid = validateOrderTotal(100); // true

// Generate unique order ID
const orderId = generateOrderId(); // "ORD-LK2J3H-A8B9C2"

// Calculate tax
const tax = calculateTax(100, 0.1); // 10
```

## API Reference

### `formatCurrency(amount: number, locale: string): string`

**⚠️ BREAKING CHANGE in v2.0.0**: The `locale` parameter is now required.

Formats a number as currency based on the provided locale.

### `validateOrderTotal(total: number): boolean`

Validates that an order total is a valid positive number within acceptable range (0 - 1,000,000).

### `generateOrderId(): string`

Generates a unique order ID with format `ORD-{timestamp}-{random}`.

### `calculateTax(amount: number, taxRate?: number): number`

Calculates tax for a given amount. Default tax rate is 10% (0.1).

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test
```

## Version History

- **v2.0.0** - BREAKING: `formatCurrency` now requires `locale` parameter
- **v1.0.0** - Initial release

## License

MIT
