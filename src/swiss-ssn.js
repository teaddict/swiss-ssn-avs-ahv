"use strict"
/**
 * Project: swiss-ssn
 * Purpose: Validate and generate Swiss SSN's according to http://www.sozialversicherungsnummer.ch/aufbau-neu.htm
 * Author:  teaddict
 */

//! https://github.com/teaddict/swiss-ssn | Version: 1.0.0
export default class SwissSSN {

  /**
   * Validates parameter given SSN. Returns true if SSN is valid, otherwise false.
   * @param ssn - {String} For example '756.9217.0769.85' or '7569217076985'
   * @returns {boolean}
   */
  static validateSSN(ssn) {
    
    if (ssn === undefined || ssn === null) {
      return false;
    }

    var parsedSSN = parse(ssn);
    if(parsedSSN.length < 13) {
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

  /**
   * Creates a valid SSN using random numbers.
   * @returns {String} - valid ssn.
   */
  static generateSSN() {
    var countryCode = [7,5,6];
    var randomNumbers = Array.from({length: 9}, () => getRandomInt());
    var ssnWithoutCheckDigit = countryCode.concat(randomNumbers);
    var checkDigit = getCheckDigit(ssnWithoutCheckDigit);
    var unformattedSSN = ssnWithoutCheckDigit.concat(checkDigit);
    var ssn = ssnFormatter(unformattedSSN);
    return ssn;
  }
}

const maxValue = 10;

/**
*returns a random digit
*/
function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(maxValue));
}

function getCheckDigit(ssn) {
  function isEven(x) { 
    return (x%2)==0; 
  }
  
  var total = 0;
  
  for(var i = 0 ; i < 12 ; i+=1) {
      if(isEven(i)) total += parseInt(ssn[i]);
      else total += parseInt(ssn[i]) * 3;
  }
  
  var expectedCheckDigit = 0;
  if (total % 10 != 0) {
      var roundTen = Math.floor(total/10) * 10 + 10;
      expectedCheckDigit = roundTen - total;
  }

  return expectedCheckDigit;
}

/**
* returns a formatted SSN '756.9217.0769.85'
*/
function ssnFormatter(ssn) {
  var ssnString = ssn.map(String)
  var formattedSSN = "756." + ssnString.slice(3,7).join('') + '.' + ssnString.slice(7,11).join('') + '.' + ssnString.slice(11,13).join('');
  return formattedSSN;
}

/**
 * Parse parameter given SSN string. Remove all characters except digits.
 * @param ssn - {String} SSN to parse
 * @returns {String}
 */
function parse(ssn) {
  return ssn.replace(/\./g,'')
}
