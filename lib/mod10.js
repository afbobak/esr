/*jslint devel: false, node: true */
/*global */
/*! Copyright (C) 2013 by Andreas F. Bobak, Switzerland. All Rights Reserved. !*/
"use strict";

var MODULO10 = [0, 9, 4, 6, 8, 2, 7, 1, 3, 5];

module.exports = function mod10(str) {
	var sum = 0;
	var i, l = str.length;
	for (i = 0; i < l; i++) {
		sum = MODULO10[(sum + parseInt(str.substr(i, 1), 10)) % 10];
	}
	return (10 - sum) % 10;
};
