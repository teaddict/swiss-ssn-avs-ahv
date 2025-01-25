(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.swissSsn = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  /**
   * Project: swiss-ssn
   * Purpose: Validate and generate Swiss SSN's according to http://www.sozialversicherungsnummer.ch/aufbau-neu.htm
   * Author:  teaddict
   * @version 1.0.2
   */
  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  class SwissSSN {
    static #COUNTRY_CODE = [7, 5, 6];
    static #MAX_VALUE = 10;
    static #SSN_LENGTH = 13;

    /**
     * Validates parameter given SSN. Returns true if SSN is valid, otherwise false.
     * @param {string} ssn - For example '756.9217.0769.85' or '7569217076985'
     * @returns {boolean}
     */
    static validateSSN(ssn) {
      if (!ssn) {
        return false;
      }
      const parsedSSN = this.#parse(ssn);
      if (parsedSSN.length !== this.#SSN_LENGTH) {
        return false;
      }
      const checkDigit = this.#getCheckDigit(parsedSSN);
      return parseInt(parsedSSN[12], 10) === checkDigit;
    }

    /**
     * Creates a valid SSN using random numbers.
     * @returns {string} - valid ssn.
     */
    static generateSSN() {
      const randomNumbers = Array.from({
        length: 9
      }, () => Math.floor(Math.random() * this.#MAX_VALUE));
      const ssnWithoutCheckDigit = [...this.#COUNTRY_CODE, ...randomNumbers];
      const checkDigit = this.#getCheckDigit(ssnWithoutCheckDigit);
      const unformattedSSN = [...ssnWithoutCheckDigit, checkDigit];
      return this.#ssnFormatter(unformattedSSN);
    }

    /**
     * Calculate check digit for SSN
     * @private
     */
    static #getCheckDigit(ssn) {
      const total = [...ssn].slice(0, 12).reduce((sum, digit, index) => {
        const multiplier = index % 2 === 0 ? 1 : 3;
        return sum + parseInt(digit, 10) * multiplier;
      }, 0);
      return total % 10 === 0 ? 0 : Math.ceil(total / 10) * 10 - total;
    }

    /**
     * Format SSN with dots
     * @private
     */
    static #ssnFormatter(ssn) {
      const ssnString = ssn.map(String);
      return `756.${ssnString.slice(3, 7).join("")}.${ssnString.slice(7, 11).join("")}.${ssnString.slice(11, 13).join("")}`;
    }

    /**
     * Parse SSN string by removing all non-digit characters
     * @private
     */
    static #parse(ssn) {
      return ssn.replace(/\D/g, "");
    }
  }

  // Export for different environments
  if (typeof window !== "undefined") {
    window.SwissSSN = SwissSSN; // Browser global
  }
  var _default = _exports.default = SwissSSN;
});