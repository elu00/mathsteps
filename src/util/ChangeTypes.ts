// The text to identify rules for each possible step that can be taken

enum ChangeTypes{
  NO_CHANGE,

  // ARITHMETIC

  // e.g. 2 + 2 -> 4 or 2 * 2 -> 4
  SIMPLIFY_ARITHMETIC,

  // BASICS

  // e.g. 2/-1 -> -2
  DIVISION_BY_NEGATIVE_ONE,
  // e.g. 2/1 -> 2
  DIVISION_BY_ONE,
  // e.g. x * 0 -> 0
  MULTIPLY_BY_ZERO,
  // e.g. x * 2 -> 2x
  REARRANGE_COEFF,
  // e.g. x ^ 0 -> 1
  REDUCE_EXPONENT_BY_ZERO,
  // e.g. 0/1 -> 0
  REDUCE_ZERO_NUMERATOR,
  // e.g. 2 + 0 -> 2
  REMOVE_ADDING_ZERO,
  // e.g. x ^ 1 -> x
  REMOVE_EXPONENT_BY_ONE,
  // e.g. 1 ^ x -> 1
  REMOVE_EXPONENT_BASE_ONE,
  // e.g. x * -1 -> -x
  REMOVE_MULTIPLYING_BY_NEGATIVE_ONE,
  // e.g. x * 1 -> x
  REMOVE_MULTIPLYING_BY_ONE,
  // e.g. 2 - - 3 -> 2 + 3
  RESOLVE_DOUBLE_MINUS,

  // COLLECT AND COMBINE

  // e.g. 2 + x + 3 + x -> 5 + 2x
  COLLECT_AND_COMBINE_LIKE_TERMS,
  // e.g. x + 2 + x^2 + x + 4 -> x^2 + (x + x) + (4 + 2)
  COLLECT_LIKE_TERMS,

  // ADDING POLYNOMIALS

  // e.g. 2x + x -> 2x + 1x
  ADD_COEFFICIENT_OF_ONE,
  // e.g. x^2 + x^2 -> 2x^2
  ADD_POLYNOMIAL_TERMS,
  // e.g. 2x^2 + 3x^2 + 5x^2 -> (2+3+5)x^2
  GROUP_COEFFICIENTS,
  // e.g. -x + 2x => -1*x + 2x
  UNARY_MINUS_TO_NEGATIVE_ONE,

  // MULTIPLYING POLYNOMIALS

  // e.g. x^2 * x -> x^2 * x^1
  ADD_EXPONENT_OF_ONE,
  // e.g. x^2 * x^3 * x^1 -> x^(2 + 3 + 1)
  COLLECT_EXPONENTS,
  // e.g. 2x * 3x -> (2 * 3)(x * x)
  MULTIPLY_COEFFICIENTS,
  // e.g. 2x * x -> 2x ^ 2
  MULTIPLY_POLYNOMIAL_TERMS,

  // FRACTIONS

  // e.g. (x + 2)/2 -> x/2 + 2/2
  BREAK_UP_FRACTION,
  // e.g. -2/-3 => 2/3
  CANCEL_MINUSES,
  // e.g. 2x/2 -> x
  CANCEL_TERMS,
  // e.g. 2/6 -> 1/3
  SIMPLIFY_FRACTION,
  // e.g. 2/-3 -> -2/3
  SIMPLIFY_SIGNS,

  // ADDING FRACTIONS

  // e.g. 1/2 + 1/3 -> 5/6
  ADD_FRACTIONS,
  // e.g. (1 + 2)/3 -> 3/3
  ADD_NUMERATORS,
  // e.g. (2+1)/5
  COMBINE_NUMERATORS,
  // e.g. 2/6 + 1/4 -> (2*2)/(6*2) + (1*3)/(4*3)
  COMMON_DENOMINATOR,
  // e.g. 3 + 1/2 -> 6/2 + 1/2 (for addition)
  CONVERT_INTEGER_TO_FRACTION,
  // e.g. 1.2 + 1/2 -> 1.2 + 0.5
  DIVIDE_FRACTION_FOR_ADDITION,
  // e.g. (2*2)/(6*2) + (1*3)/(4*3) -> (2*2)/12 + (1*3)/12
  MULTIPLY_DENOMINATORS,
  // e.g. (2*2)/12 + (1*3)/12 -> 4/12 + 3/12
  MULTIPLY_NUMERATORS,

  // MULTIPLYING FRACTIONS

  // e.g. 1/2 * 2/3 -> 2/6
  MULTIPLY_FRACTIONS,

  // DIVISION

  // e.g. 2/3/4 -> 2/(3*4)
  SIMPLIFY_DIVISION,
  // e.g. x/(2/3) -> x * 3/2
  MULTIPLY_BY_INVERSE,

  // DISTRIBUTION

  // e.g. 2(x + y) -> 2x + 2y
  DISTRIBUTE,
  // e.g. -(2 + x) -> -2 - x
  DISTRIBUTE_NEGATIVE_ONE,
  // e.g. 2 * 4x + 2*5 --> 8x + 10 (as part of distribution)
  SIMPLIFY_TERMS,

  // ABSOLUTE
  // e.g. |-3| -> 3
  ABSOLUTE_VALUE,

  // ROOTS
  // e.g. nthRoot(x ^ 2, 4) -> nthRoot(x, 2)
  CANCEL_EXPONENT,
  // e.g. nthRoot(x ^ 2, 2) -> x
  CANCEL_EXPONENT_AND_ROOT,
  // e.g. nthRoot(x ^ 4, 2) -> x ^ 2
  CANCEL_ROOT,
  // e.g. nthRoot(2, 2) * nthRoot(3, 2) -> nthRoot(2 * 3, 2)
  COMBINE_UNDER_ROOT,
  // e.g. 2 * 2 * 2 -> 2 ^ 3
  CONVERT_MULTIPLICATION_TO_EXPONENT,
  // e.g. nthRoot(2 * x) -> nthRoot(2) * nthRoot(x)
  DISTRIBUTE_NTH_ROOT,
  // e.g. nthRoot(4) * nthRoot(x^2) -> 2 * x
  EVALUATE_DISTRIBUTED_NTH_ROOT,
  // e.g. 12 -> 2 * 2 * 3
  FACTOR_INTO_PRIMES,
  // e.g. nthRoot(2 * 2 * 2, 2) -> nthRoot((2 * 2) * 2)
  GROUP_TERMS_BY_ROOT,
  // e.g. nthRoot(4) -> 2
  NTH_ROOT_VALUE,

  // SOLVING FOR A VARIABLE

  // e.g. x - 3 = 2 -> x - 3 + 3 = 2 + 3
  ADD_TO_BOTH_SIDES,
  // e.g. 2x = 1 -> (2x)/2 = 1/2
  DIVIDE_FROM_BOTH_SIDES,
  // e.g. (2/3)x = 1 -> (2/3)x * (3/2) = 1 * (3/2)
  MULTIPLY_BOTH_SIDES_BY_INVERSE_FRACTION,
  // e.g. -x = 2 -> -1 * -x = -1 * 2
  MULTIPLY_BOTH_SIDES_BY_NEGATIVE_ONE,
  // e.g. x/2 = 1 -> (x/2) * 2 = 1 * 2
  MULTIPLY_TO_BOTH_SIDES,
  // e.g. x + 2 - 1 = 3 -> x + 1 = 3
  SIMPLIFY_LEFT_SIDE,
  // e.g. x = 3 - 1 -> x = 2
  SIMPLIFY_RIGHT_SIDE,
  // e.g. x + 3 = 2 -> x + 3 - 3 = 2 - 3
  SUBTRACT_FROM_BOTH_SIDES,
  // e.g. 2 = x -> x = 2
  SWAP_SIDES,

  // CONSTANT EQUATION

  // e.g. 2 = 2
  STATEMENT_IS_TRUE,
  // e.g. 2 = 3
  STATEMENT_IS_FALSE,

  // FACTORING

  // e.g. x^2 - 4x -> x(x - 4)
  FACTOR_SYMBOL,
  // e.g. x^2 - 4 -> (x - 2)(x + 2)
  FACTOR_DIFFERENCE_OF_SQUARES,
  // e.g. x^2 + 2x + 1 -> (x + 1)^2
  FACTOR_PERFECT_SQUARE,
  // e.g. x^2 + 3x + 2 -> (x + 1)(x + 2)
  FACTOR_SUM_PRODUCT_RULE,
};