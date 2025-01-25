Swiss National Identification Number (AHV/AVS) or (SSN) validation and generation
===================================

[![npm version](https://badge.fury.io/js/swiss-ssn.svg)](https://badge.fury.io/js/swiss-ssn) 
![Downloads](https://img.shields.io/npm/dm/swiss-ssn.svg)

A lightweight JavaScript library for validating and generating Swiss National Identification Numbers with:
- Zero dependencies
- Modern ES Module support
- Full test coverage
- TypeScript-friendly JSDoc annotations
- Browser-ready UMD bundle

## Installation

```bash
# NPM
npm install swiss-ssn

# Yarn
yarn add swiss-ssn

# pnpm
pnpm add swiss-ssn
```

## Usage

### ES Modules (Node.js)
```js
import SwissSSN from 'swiss-ssn';

// Validate a SSN
const isValid = SwissSSN.validateSSN('756.9217.0769.85');
console.log(isValid); // true

// Generate a random valid SSN
const newSSN = SwissSSN.generateSSN();
console.log(newSSN); // e.g., '756.1234.5678.90'
```

### Browser
```html
<!-- Use the minified UMD bundle -->
<script src="https://unpkg.com/swiss-ssn/dist/swiss-ssn.min.js"></script>
<script>
  // The SwissSSN class is available globally
  const isValid = SwissSSN.validateSSN('756.9217.0769.85');
  console.log(isValid); // true

  // Generate a random SSN
  const newSSN = SwissSSN.generateSSN();
  console.log(newSSN);
</script>
```

### Browser (ES Modules)
```html
<!-- Use as ES Module in modern browsers -->
<script type="module">
  import SwissSSN from 'https://unpkg.com/swiss-ssn/dist/swiss-ssn.js';
  
  const isValid = SwissSSN.validateSSN('756.9217.0769.85');
  console.log(isValid);
</script>
```

## API Reference

### `validateSSN(ssn: string): boolean`
Validates a Swiss SSN number.

```js
// Valid SSN examples
SwissSSN.validateSSN('756.9217.0769.85'); // true
SwissSSN.validateSSN('7569217076985');    // true (without dots)

// Invalid SSN examples
SwissSSN.validateSSN('756.9217.0769.84'); // false (wrong check digit)
SwissSSN.validateSSN('756.9217.076');     // false (incomplete)
SwissSSN.validateSSN('');                 // false
```

### `generateSSN(): string`
Generates a random valid Swiss SSN.

```js
const ssn = SwissSSN.generateSSN();
// Returns a formatted SSN like '756.9217.0769.85'
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build distribution files
npm run dist

# Lint code
npm run lint
```

Test Online
---------
[check from my website](http://teaddict.net/swiss-ssn.html)

## Changelog

### 1.0.3
- Fixed browser compatibility issues with UMD bundle
- Added proper global exports for browser environments
- Improved documentation for browser usage
- Added ES Module example for modern browsers
- Updated build configuration for better browser support

### 1.0.2
- Modernized codebase with ES Modules
- Added Jest for testing
- Improved test coverage
- Added ESLint with modern config
- Updated all dependencies
- Added TypeScript-friendly JSDoc annotations

### 1.0.1
- Dependencies upgraded for security fixes

### 1.0.0
- Initial release

## License

[GPL License](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
