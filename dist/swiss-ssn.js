(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("SwissSSN", ["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.SwissSSN = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";
  /**
   * Project: swiss-ssn
   * Purpose: Validate and generate Swiss SSN's according to http://www.sozialversicherungsnummer.ch/aufbau-neu.htm
   * Author:  teaddict
   */

  //! https://github.com/teaddict/swiss-ssn | Version: 1.0.0

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var SwissSSN = function () {
    function SwissSSN() {
      _classCallCheck(this, SwissSSN);
    }

    _createClass(SwissSSN, null, [{
      key: "validateSSN",
      value: function validateSSN(ssn) {

        if (ssn === undefined || ssn === null) {
          return false;
        }

        var parsedSSN = parse(ssn);
        if (parsedSSN.length < 13) {
          return false;
        } else {
          var checkDigit = getCheckDigit(parsedSSN);
          if (parsedSSN[12] == checkDigit) {
            return true;
          } else {
            return false;
          }
        }
      }
    }, {
      key: "generateSSN",
      value: function generateSSN() {
        var countryCode = [7, 5, 6];
        var randomNumbers = Array.from({ length: 9 }, function () {
          return getRandomInt();
        });
        var ssnWithoutCheckDigit = countryCode.concat(randomNumbers);
        var checkDigit = getCheckDigit(ssnWithoutCheckDigit);
        var unformattedSSN = ssnWithoutCheckDigit.concat(checkDigit);
        var ssn = ssnFormatter(unformattedSSN);
        return ssn;
      }
    }]);

    return SwissSSN;
  }();

  exports.default = SwissSSN;


  var maxValue = 10;

  /**
  *returns a random digit
  */
  function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(maxValue));
  }

  function getCheckDigit(ssn) {
    function isEven(x) {
      return x % 2 == 0;
    }

    var total = 0;

    for (var i = 0; i < 12; i += 1) {
      if (isEven(i)) total += parseInt(ssn[i]);else total += parseInt(ssn[i]) * 3;
    }

    var expectedCheckDigit = 0;
    if (total % 10 != 0) {
      var roundTen = Math.floor(total / 10) * 10 + 10;
      expectedCheckDigit = roundTen - total;
    }

    return expectedCheckDigit;
  }

  /**
  * returns a formatted SSN '756.9217.0769.85'
  */
  function ssnFormatter(ssn) {
    var ssnString = ssn.map(String);
    var formattedSSN = "756." + ssnString.slice(3, 7).join('') + '.' + ssnString.slice(7, 11).join('') + '.' + ssnString.slice(11, 13).join('');
    return formattedSSN;
  }

  /**
   * Parse parameter given SSN string. Remove all characters except digits.
   * @param ssn - {String} SSN to parse
   * @returns {String}
   */
  function parse(ssn) {
    return ssn.replace(/\./g, '');
  }
  module.exports = exports["default"];
});

