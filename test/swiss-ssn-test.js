"use strict"
import swissSSN from "../src/swiss-ssn"
import {expect} from "chai"


describe("swissSSN", () => {

  describe("#validate", () => {

    it("Should fail when given empty String", () => {
      expect(swissSSN.validateSSN("")).to.equal(false)
    })

    it("Should fail when given undefined", () => {
      expect(swissSSN.validateSSN(undefined)).to.equal(false)
    })

    it("Should fail when given null", () => {
      expect(swissSSN.validateSSN(null)).to.equal(false)
    })
   
    it("Should pass when given valid swiss ssn", () => {
      expect(swissSSN.validateSSN("756.9217.0769.85")).to.equal(true)
    })
  })

  describe("#generateSSN", () => {

    it("Should generate valid Swiss SSN", () => {
      let fakeSSN = swissSSN.generateSSN()
      expect(swissSSN.validateSSN(fakeSSN)).to.equal(true)
    })
  })
})
