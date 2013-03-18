/*jslint devel: false, node: true */
/*global */
/*! Copyright (C) 2013 by Andreas F. Bobak, Switzerland. All Rights Reserved. !*/
"use strict";

var mod10 = require("./mod10");

exports.calcReference = function (reference) {
	// remove spaces
	reference = reference.split(" ").join("");

	// space up to 15 or 26 digits
	var l;
	if (reference.length <= 15) {
		l = 15;
	} else {
		l = 26;
	}
	reference = "00000000000000000000000000" + reference;
	reference = reference.substr(reference.length - l);

	var checkDigit = mod10(reference);
	var forOutput;
	if (l === 15) {
		forOutput = [reference.substr(0, 1),
							reference.substr(1, 5),
							reference.substr(6, 5),
							reference.substr(11, 5)].join(" ");
	} else {
		forOutput = [reference.substr(0, 2),
							reference.substr(2, 5),
							reference.substr(7, 5),
							reference.substr(12, 5),
							reference.substr(17, 5),
							reference.substr(22, 5)].join(" ");
	}
	forOutput += checkDigit;

	return {
		number     : reference,
		reference  : forOutput,
		checkDigit : checkDigit
	};
};

// type:
// 01 = ESR in CHF
// 03 = N-ESR in CHF
// 04 = ESR+ in CHF
// 11 = ESR in CHF zur Gutschrift auf das eigene Konto (Ziffer 3.3.4)
// 14 = ESR+ in CHF zur Gutschrift auf das eigene Konto (Ziffer 3.3.4)
// 21 = ESR in EUR
// 23 = ESR in EUR zur Gutschrift auf das eigene Konto (Ziffer 3.3.4)
// 31 = ESR+ in EUR
// 33 = ESR+ in EUR zur Gutschrift auf das eigene Konto (Ziffer 3.3.4)
//
// if type === 04, 31 or 33, then amount is ignored
//
// amount in CHF or EUR, e.g. "123.45", NOT "12345"
exports.calcESR = function (type, amount, reference, account) {
	var part1;

	if (type !== "04" && type !== "31" && type !== "33") {
		// In Rappen/Cents
		amount = amount * 100;
		// Fill amount to 10 digits
		amount = "000000000000000" + Math.round(amount);
		amount = amount.substr(amount.length - 10);
		part1 = type + amount;

	} else {
		part1 = type;
	}
	var p1 = mod10(part1);

	reference = exports.calcReference(reference);

	// Remove dashes and fill center account number to 6 digits
	account = account.split("-");
	account[0] = "0" + account[0];
	account[0] = account[0].substr(account[0].length - 2);
	account[1] = "000000" + account[1];
	account[1] = account[1].substr(account[1].length - 6);
	account = account.join("");

	return {
		reference : reference.reference,
		esr       : part1 + p1 + ">" +
								reference.number + reference.checkDigit + "+ " +
								account + ">"
	};
};
