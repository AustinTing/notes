// Numbers

let decimal: number = 6;
let binary: number = 0b1010;
let octal: number = 0o744;
let hex: number = 0xf00d;

console.log('decimal: ', decimal);
console.log('binary: ', binary);
console.log('octal: ', octal);
console.log('hex: ', hex);

// Void
function warnUser(): void {
  console.log("This is my warning message");
}

warnUser();

let u: undefined = undefined;
let n: null = null;
// let num: number = undefined; // Type 'undefined' is not assignable to type 'number'.

// void cannot be assigned to any other type
let v: void;
// let num: number = v; // Type 'void' is not assignable to type 'number'.
// let undef: undefined = v; // Type 'void' is not assignable to type 'undefined'.
