"use strict";
// Numbers
let decimal = 6;
let binary = 0b1010;
let octal = 0o744;
let hex = 0xf00d;
console.log('decimal: ', decimal);
console.log('binary: ', binary);
console.log('octal: ', octal);
console.log('hex: ', hex);
// Void
function warnUser() {
    console.log("This is my warning message");
}
warnUser();
let u = undefined;
let n = null;
// let num: number = undefined; // Type 'undefined' is not assignable to type 'number'.
// void cannot be assigned to any other type
// let v: void = null;
// let num: number = v; // Type 'void' is not assignable to type 'number'.
// let undef: undefined = v; // Type 'void' is not assignable to type 'undefined'.
