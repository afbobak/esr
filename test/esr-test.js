/*jslint devel: true, node: true */
/*globals */
/*! Copyright (C) 2013 by Andreas F. Bobak, Switzerland. All Rights Reserved. !*/
"use strict";

var buster = require("buster");
var assert = buster.assertions.assert;
var refute = buster.assertions.refute;

var esr = require("../lib/esr");

// ==== Test Case

buster.testCase("esr-calcReference", {
  "should exist": function () {
    assert.isFunction(esr.calcReference);
  },

  "should expand to 15 digits": function () {
    assert.equals(esr.calcReference("140004667"), {
      number     : "000000140004667",
      reference  : "0 00000 14000 46679",
      checkDigit : 9
    });
  },

  "should expand to 26 digits": function () {
    assert.equals(esr.calcReference("1234567890213456"), {
      number     : "00000000001234567890213456",
      reference  : "00 00000 00012 34567 89021 34566",
      checkDigit : 6
    });
  },

  "should space first part correctly to 1+5 digit": function () {
    assert.equals(esr.calcReference("12345678901345"), {
      number     : "012345678901345",
      reference  : "0 12345 67890 13452",
      checkDigit : 2
    });
  },

  "should space first part correctly to 2+5 digit": function () {
    assert.equals(esr.calcReference("1234567890134567890123456"), {
      number     : "01234567890134567890123456",
      reference  : "01 23456 78901 34567 89012 34562",
      checkDigit : 2
    });
  }
});

// ==== Test Case

buster.testCase("esr-calcESR", {
  "should exist": function () {
    assert.isFunction(esr.calcESR);
  },

  "should support ESR in CHF": function () {
    assert.equals(esr.calcESR("01", "3949.75", "12000000000023447894321689", "01-162-8"), {
      reference  : "12 00000 00000 23447 89432 16899",
      esr        : "0100003949753>120000000000234478943216899+ 010001628>"
    });
  },

  "should support ESR+ in CHF": function () {
    assert.equals(esr.calcESR("04", null, "25000000000013567876545554", "01-162-8"), {
      reference  : "25 00000 00000 13567 87654 55541",
      esr        : "042>250000000000135678765455541+ 010001628>"
    });
  }
});
