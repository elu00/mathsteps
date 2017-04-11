"use strict";
var math = require("mathjs");
var ChangeTypes = require("../../ChangeTypes");
var evaluate = require("../../util/evaluate");
var mathNode = require("../../mathnode");
// Simplifies a fraction (with constant numerator and denominator) by dividing
// the top and bottom by the GCD, if possible.
// e.g. 2/4 --> 1/2    10/5 --> 2x
// Also simplified negative signs
// e.g. -1/-3 --> 1/3   4/-5 --> -4/5
// Note that -4/5 doesn't need to be simplified.
// Note that our goal is for the denominator to always be positive. If it
// isn't, we can simplify signs.
// Returns a mathNode.Status object
function divideByGcd(fraction) {
    if (!mathNode.Type.isOperator(fraction) || fraction.op !== "/") {
        return mathNode.Status.noChange(fraction);
    }
    // If it's not an integer fraction, all we can do is simplify signs
    if (!mathNode.Type.isIntegerFraction(fraction, true)) {
        return mathNode.Status.noChange(fraction);
    }
    var numeratorValue = parseInt(evaluate(fraction.args[0]));
    var denominatorValue = parseInt(evaluate(fraction.args[1]));
    // The gcd is what we're dividing the numerator and denominator by.
    var gcd = math.gcd(numeratorValue, denominatorValue);
    // A greatest common denominator is technically defined as always positive,
    // but since our goal is to reduce negative signs or move them to the
    // numerator, a negative denominator always means we want to flip signs
    // of both numerator and denominator.
    // e.g. -1/-3 --> 1/3   4/-5 --> -4/5
    if (denominatorValue < 0) {
        gcd *= -1;
    }
    if (gcd === 1) {
        return mathNode.Status.noChange(fraction);
    }
    var newNumeratorNode = mathNode.Creator.constant(numeratorValue / gcd);
    var newDenominatorNode = mathNode.Creator.constant(denominatorValue / gcd);
    var newFraction;
    if (parseFloat(newDenominatorNode.value) === 1) {
        newFraction = newNumeratorNode;
    }
    else {
        newFraction = mathNode.Creator.operator("/", [newNumeratorNode, newDenominatorNode]);
    }
    return mathNode.Status.nodeChanged(ChangeTypes.SIMPLIFY_FRACTION, fraction, newFraction);
}
module.exports = divideByGcd;
//# sourceMappingURL=divideByGCD.js.map