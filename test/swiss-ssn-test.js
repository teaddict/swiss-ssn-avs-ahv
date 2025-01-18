"use strict"
import SwissSSN from "../src/swiss-ssn.js"

describe("SwissSSN", () => {
  describe("#validateSSN", () => {
    it("should fail when given empty String", () => {
      expect(SwissSSN.validateSSN("")).toBe(false)
    })

    it("should fail when given undefined", () => {
      expect(SwissSSN.validateSSN(undefined)).toBe(false)
    })

    it("should fail when given null", () => {
      expect(SwissSSN.validateSSN(null)).toBe(false)
    })
   
    it("should pass when given valid swiss ssn", () => {
      expect(SwissSSN.validateSSN("756.9217.0769.85")).toBe(true)
    })

    it("should fail when given invalid check digit", () => {
      expect(SwissSSN.validateSSN("756.9217.0769.84")).toBe(false)
    })

    it("should fail when given SSN with incorrect length", () => {
      expect(SwissSSN.validateSSN("756.9217.076")).toBe(false)
    })

    it("should handle SSN with no dots", () => {
      expect(SwissSSN.validateSSN("7569217076985")).toBe(true)
    })

  })

  describe("#generateSSN", () => {
    it("should generate valid Swiss SSN", () => {
      const generatedSSN = SwissSSN.generateSSN()
      expect(SwissSSN.validateSSN(generatedSSN)).toBe(true)
    })

    it("should generate SSN with correct format", () => {
      const generatedSSN = SwissSSN.generateSSN()
      expect(generatedSSN).toMatch(/^756\.\d{4}\.\d{4}\.\d{2}$/)
    })

    it("should always start with 756", () => {
      const generatedSSN = SwissSSN.generateSSN()
      expect(generatedSSN.startsWith("756")).toBe(true)
    })

    it("should generate multiple unique SSNs", () => {
      const ssn1 = SwissSSN.generateSSN()
      const ssn2 = SwissSSN.generateSSN()
      expect(ssn1).not.toBe(ssn2)
    })
  })
})
