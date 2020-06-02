'use strict'

const fibonacci = () => {
    let fib = [0, 1];
    let n = 2;

    do {
        fib.push(fib[n-1] + fib[n-2]);
        n++;
    } while (fib[n-1] <= 350);

    return fib;
}

const isFibonnaci = (num) => fibonacci().includes(num)

module.exports = {
    fibonacci,
    isFibonnaci
}
