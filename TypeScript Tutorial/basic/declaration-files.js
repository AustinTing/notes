"use strict";
// Error: Cannot find module '../types/declaration-files'
// import { name, getName, Animal, Directions, Options } from '../types/declaration-files';
Object.defineProperty(exports, "__esModule", { value: true });
const declaration_files_1 = require("declaration-files");
console.log(declaration_files_1.name);
let myName = (0, declaration_files_1.getName)();
let cat = new declaration_files_1.Animal('Tom');
let directions = [declaration_files_1.Directions.Up, declaration_files_1.Directions.Down, declaration_files_1.Directions.Left, declaration_files_1.Directions.Right];
let options = {
    data: {
        name: 'foo'
    }
};
