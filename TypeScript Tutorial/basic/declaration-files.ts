// Test declaration file for third-party library
import isPositive from 'is-positive';
console.log(isPositive(5)); // Output: true
console.log(isPositive(-3)); // Output: false

// Test declaration file for custom library
import { name, getName, Animal, Directions, Options } from 'test-declaration';
console.log(name);
let myName = getName();
let cat = new Animal('Tom');
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
let options: Options = {
    data: {
        name: 'foo'
    }
};
