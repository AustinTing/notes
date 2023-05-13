// Additionally Properties

interface Person {
  name: string;
  age: number;
  [propName: string]: string | number;
}

let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
};

// All properties of an interface should follow additionally properties' type.

// interface Person {
//   name: string;
//   age: number; // Property 'age' is incompatible with index signature.
//   [propName: string]: string;
// }
// Type '{ name: string; age: number; gender: string; }' is not assignable to type 'Person'.
// Property 'age' is incompatible with index signature.
// Type 'number' is not assignable to type 'string'.

// Readonly properties
interface Person1 {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

let tom1: Person1 = {
  id: 89757,
  name: 'Tom',
  age: 25,
  gender: 'male'
};

// Cannot assign to 'id' because it is a read-only property.
// tom1.id = 1234; 