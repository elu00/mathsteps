/*
 * Performs simpifications that are more basic and overaching like (...)^0 => 1
 * These are always the first simplifications that are attempted.
 */

import mathNode = require("../../mathnode");
import TreeSearch = require("../../TreeSearch");
import rearrangeCoefficient = require("./rearrangeCoefficient");
import reduceExponentByZero = require("./reduceExponentByZero");
import reduceMultiplicationByZero = require("./reduceMultiplicationByZero");
import reduceZeroDividedByAnything = require("./reduceZeroDividedByAnything");
import removeAdditionOfZero = require("./removeAdditionOfZero");
import removeDivisionByOne = require("./removeDivisionByOne");
import removeExponentBaseOne = require("./removeExponentBaseOne");
import removeExponentByOne = require("./removeExponentByOne");
import removeMultiplicationByNegativeOne = require("./removeMultiplicationByNegativeOne");
import removeMultiplicationByOne = require("./removeMultiplicationByOne");
import simplifyDoubleUnaryMinus = require("./simplifyDoubleUnaryMinus");
const simplificationFunctions = [
  // multiplication by 0 yields 0
  reduceMultiplicationByZero,
  // division of 0 by something yields 0
  reduceZeroDividedByAnything,
  // ____^0 --> 1
  reduceExponentByZero,
  // Check for x^1 which should be reduced to x
  removeExponentByOne,
  // Check for 1^x which should be reduced to 1
  // if x can be simplified to a constant
  removeExponentBaseOne,
  // - - becomes +
  simplifyDoubleUnaryMinus,
  // If this is a + node and one of the operands is 0, get rid of the 0
  removeAdditionOfZero,
  // If this is a * node and one of the operands is 1, get rid of the 1
  removeMultiplicationByOne,
  // In some cases, remove multiplying by -1
  removeMultiplicationByNegativeOne,
  // If this is a / node and the denominator is 1 or -1, get rid of it
  removeDivisionByOne,
  // e.g. x*5 -> 5x
  rearrangeCoefficient,
];

const search = TreeSearch.preOrder(basics);

// Look for basic step(s) to perform on a node. Returns a mathNode.Status object.
function basics(node: mathjs.MathNode) {
  for (let i = 0; i < simplificationFunctions.length; i++) {
    const nodeStatus = simplificationFunctions[i](node);
    if (nodeStatus.hasChanged()) {
      return nodeStatus;
    }
    else {
      node = nodeStatus.newNode;
    }
  }
  return mathNode.Status.noChange(node);
}

export = search;
