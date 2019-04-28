Swiss National Identification Number (AHV/AVS) or (SSN) validation and generation
===================================

[![npm version](https://badge.fury.io/js/swiss-ssn.svg)](https://badge.fury.io/js/swiss-ssn) 
<img src="https://img.shields.io/npm/dm/swiss-ssn.svg" height="18px" />
===================================



- A micro Javascript library for validating and generating Swiss National Identification Number.
- Lightweight
- No dependencies

Installation
------------

NPM

```sh
npm install swiss-ssn
```

Bower

```sh
bower install swiss-ssn
```

From unpkg.com

```html
<script src="https://unpkg.com/swiss-ssn/dist/swiss-ssn.min.js"></script>
```


Usage
-----

ES6

``` js
import SwissSSN from "../swiss-ssn"
const isValid = SwissSSN.validate('756.9217.0769.85');
console.log(isValid);
//  result true

```

Using global namespace.

``` html
<script src="https://unpkg.com/swiss-ssn/swiss-ssn.min.js"></script>
<script>
  // This is valid SSN
  var isValid = SwissSSN.validate('756.9217.0769.85');
  console.log(isValid);
  //  result true
</script>

```

Examples
--------

Validate SSN

``` js
//  This is valid Swiss SSN
console.log('valid ssn returns ' + SwissSSN.validate('756.9217.0769.85'));
//  'valid ssn returns true'

//  This is invalid Swiss SSN
console.log('invalid ssn returns ' + SwissSSN.validate('756.9217.0769.88'));
//  'invalid ssn returns false'

```

Generate SSN

``` js
//  generate a random SSN
var fakeSSN =  SwissSSN.generateSSN();
//  now validate it
console.log('Is ssn valid: ' + SwissSSN.validate(fakeSSN));
```

Functions
---------

### #validate(ssn)

- Validates parameter given SSN. Returns true if SSN is valid, otherwise false

### #generate()

- Generates a random SSN. Returns formatted: '756.9217.0769.88'

Building
--------

```sh
# Build a distributable, minified UMD library compatible with browsers and Node
npm run dist

# Run tests
npm run test

```
Test Online
---------
[check from my website](http://teaddict.net/swiss-ssn.html)

Changelog
---------

### 1.0.0
- Initial release


License
-------

[GPL License](LICENSE)
