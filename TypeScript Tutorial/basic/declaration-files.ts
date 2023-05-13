// Error: Cannot find module '../types/declaration-files'
// import { name, getName, Animal, Directions, Options } from '../types/declaration-files';

import { name, getName, Animal, Directions, Options } from 'declaration-files';


console.log(name);
let myName = getName();
let cat = new Animal('Tom');
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
let options: Options = {
    data: {
        name: 'foo'
    }
};