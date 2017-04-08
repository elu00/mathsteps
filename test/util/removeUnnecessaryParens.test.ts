import math = require('mathjs');
import print = require('../../lib/util/print');
import removeUnnecessaryParens = require('../../lib/util/removeUnnecessaryParens');
import TestUtil = require('../TestUtil');

function testRemoveUnnecessaryParens(exprStr: any, outputStr: any);
function testRemoveUnnecessaryParens(exprStr, outputStr) {
  const input = removeUnnecessaryParens(math.parse(exprStr));
  TestUtil.testFunctionOutput(print, input, outputStr);
}

describe('removeUnnecessaryParens', () => {
    const tests = [
        ['(x+4) + 12', 'x + 4 + 12'],
        ['-(x+4x) + 12', '-(x + 4x) + 12'],
        ['x + (12)', 'x + 12'],
        ['x + (y)', 'x + y'],
        ['x + -(y)', 'x - y'],
        ['((3 - 5)) * x', '(3 - 5) * x'],
        ['((3 - 5)) * x', '(3 - 5) * x'],
        ['(((-5)))', '-5'],
        ['((4+5)) + ((2^3))', '(4 + 5) + 2^3'],
        ['(2x^6 + -50 x^2) - (x^4)', '2x^6 - 50x^2 - x^4'],
        ['(x+4) - (12 + x)', 'x + 4 - (12 + x)'],
        ['(2x)^2', '(2x)^2'],
        ['((4+x)-5)^(2)', '(4 + x - 5)^2'],
    ];
    tests.forEach(t => testRemoveUnnecessaryParens(t[0], t[1]));
});
