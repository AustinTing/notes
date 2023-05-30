function createArray<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
      result[i] = value;
  }
  return result;
}

const arrayFromString = createArray<string>(3, 'x'); 
const arrayFromAutoDetect = createArray(3, 'x');
console.log(arrayFromString); // ['x', 'x', 'x']
console.log(arrayFromAutoDetect); // ['x', 'x', 'x']

// Generic Constraints
function loggingIdentityNoConstraints<T>(arg: T): T {
  // console.log(arg.length); // 類型 'T' 沒有屬性 'length'。ts(2339)
  return arg;
}

interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity("hello"); // 5
// loggingIdentity(3); // 類型 'number' 的引數不可指派給類型 'Lengthwise' 的參數。

// Using Type Parameters in Generic Constraints
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
      target[id] = (<T>source)[id];
  }
  return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

const result = copyFields(x, { b: 10, d: 20 });
console.log('copyFields result:', result); // { a: 1, b: 10, c: 3, d: 20 }

// Using Generics in Interfaces
interface CreateArrayFunc<T> { // 這這邊使用泛型。
  (length: number, value: T): Array<T>;
}
let createArrayWithInterface: CreateArrayFunc<any>; // 宣告時要指定型別。要不然會：泛型類型 'CreateArrayFunc<T>' 需要 1 個型別引數。
createArrayWithInterface = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
      result[i] = value;
  }
  return result;
}


// Generic parameter defaults
// 使用泛型參數預設值
function greet<T = string>(name: T): void {
  // const paramLength = name.length; // 就算預設是 string，還是無法使用 string 的屬性。"類型 'T' 沒有屬性 'length'。
  console.log(`Hello, ${name}!`);
}

// 使用預設值
greet("Alice");  // 輸出: Hello, Alice!
greet<number>(42);  // 輸出: Hello, 42!

// 未指定型別，使用預設值
// greet();  // 輸出: Hello, undefined!