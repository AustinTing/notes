"use strict";
// function with optional parameter
// error TS1016: A required parameter cannot follow an optional parameter.
// function buildName(firstName?: string, lastName: string) {
//   if (lastName) {
//     return firstName + " " + lastName;
//   } else {
//     return firstName;
//   }
// }
// function with default parameter
function buildName(firstName = 'Austin', lastName) {
    if (lastName) {
        return firstName + " " + lastName;
    }
    else {
        return firstName;
    }
}
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
// Cannot declare function as below:
// function reverse1(n: number): number {
//   return Number(n.toString().split('').reverse().join(''));
// }
// function reverse1(s: string): string {
//   return x.split('').reverse().join('');
// }
