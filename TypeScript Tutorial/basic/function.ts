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
function buildName(firstName: string = 'Austin', lastName: string) {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}

// overload function

function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | undefined{
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } 
    if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
