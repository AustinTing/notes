"use strict";
// Error: Cannot find module '../types/declaration-files'
// import { name, getName, Animal, Directions, Options } from '../types/declaration-files';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_declaration_1 = require("types/test-declaration");
console.log(test_declaration_1.name);
let myName = (0, test_declaration_1.getName)();
let cat = new test_declaration_1.Animal('Tom');
let directions = [test_declaration_1.Directions.Up, test_declaration_1.Directions.Down, test_declaration_1.Directions.Left, test_declaration_1.Directions.Right];
let options = {
    data: {
        name: 'foo'
    }
};
// Test declaration file for third-party library
const is_positive_1 = __importDefault(require("is-positive"));
console.log((0, is_positive_1.default)(5)); // Output: true
console.log((0, is_positive_1.default)(-3)); // Output: false
