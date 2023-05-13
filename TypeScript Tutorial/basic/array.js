"use strict";
function sum() {
    // let args: number[] = arguments; // error TS2740: Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
}
function sum1() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
// const result = sum(1, 2, 3, 4, 5); //error TS2554: Expected 0 arguments, but got 5.
