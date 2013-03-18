/*jslint devel: true, node: true */
/*globals */
/*! Copyright (C) 2013 by Andreas F. Bobak, Switzerland. All Rights Reserved. !*/
"use strict";

var buster = require("buster");
var assert = buster.assertions.assert;
var refute = buster.assertions.refute;

var mod10 = require("../lib/mod10");

// ==== Test Case

buster.testCase("mod10", {
  "should exist": function () {
    assert.isFunction(mod10);
  },

  "should return 0": function () {
    assert.equals(mod10("14000466"), 0);
  },

  "should return 8": function () {
    assert.equals(mod10("010000012345"), 8);
  },

  "should return NaN": function () {
    assert.equals(mod10("123.45"), NaN);
  }
});
