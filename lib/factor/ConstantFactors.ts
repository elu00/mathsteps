// This module deals with getting constant factors, including prime factors
// and factor pairs of a number

class ConstantFactors {

// Given a number, will return all the prime factors of that number as a list
// sorted from smallest to largest
    static getPrimeFactors(number:number) {
        let factors = [];
        if (number < 0) {
            factors = [-1];
            factors = factors.concat(this.getPrimeFactors(-1 * number));
            return factors;
        }

        const root = Math.sqrt(number);
        let candidate = 2;
        if (number % 2) {
            candidate = 3; // assign first odd
            while (number % candidate && candidate <= root) {
                candidate = candidate + 2;
            }
        }

        // if no factor found then the number is prime
        if (candidate > root) {
            factors.push(number);
        }
        // if we find a factor, make a recursive call on the quotient of the number and
        // our newly found prime factor in order to find more factors
        else {
            factors.push(candidate);
            factors = factors.concat(this.getPrimeFactors(number / candidate));
        }

        return factors;
    };

// Given a number, will return all the factor pairs for that number as a list
// of 2-item lists
    static getFactorPairs(number:number) {
        const factors = [];

        const bound = Math.floor(Math.sqrt(Math.abs(number)));
        for (var divisor = -bound; divisor <= bound; divisor++) {
            if (divisor === 0) {
                continue;
            }
            if (number % divisor === 0) {
                const quotient = number / divisor;
                factors.push([divisor, quotient]);
            }
        }

        return factors;
    };
}

export = ConstantFactors;
