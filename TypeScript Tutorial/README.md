 # [TypeScript 新手指南](https://willh.gitbook.io/typescript-tutorial/)

# 簡介

TypeScript 是 JavaScript 的超集，.js 檔案可以直接重新命名為 .ts 即可。

利用型別檢查，可以在開發階段就發現錯誤，並且可以在編譯階段就發現錯誤。以此增加程式碼的可讀性、可維護性。

另外，就算編譯時發現錯誤，也可以編譯成 JavaScript，並且執行。也方便先求快速開發，再求穩定的開發模式。



＃ Init TypeScript Project

Init Project

```sh
yarn init -y
```

Install TypeScript

```sh
yarn add --dev typescript
```


Create tsconfig.json

```sh
yarn tsc --init
```

Add build script to package.json. And then run `yarn build` to compile TypeScript to JavaScript.

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```

# 基礎

## 原始資料型別

### 數值

~~ES6 中的二進位制和八進位制寫法，TypeScript 編譯後會轉為十進位制。~~十六進位制則不會轉換。

```ts
let decimal: number = 6;
let binary: number = 0b1010;
let octal: number = 0o744;
let hex: number = 0xf00d;
```

編譯後的結果

```js
"use strict";
let decimal = 6;
let binary = 0b1010;
let octal = 0o744;
let hex = 0xf00d;
```

### void, null, undefined

`null` 和 `undefined` 是所有型別的子型別，~~可以指派給任何型別~~，包含自己。

```ts
let u: undefined = undefined;
let n: null = null;
let num: number = undefined; // Type 'undefined' is not assignable to type 'number'.
```

`void` 是一種空值的概念，可用於宣告沒有回傳值的函式。

```ts
function warnUser(): void {
  console.log("This is my warning message");
}
```

直接宣告 `void` 變數時，只能指派 `undefined` 或 `null`。

```ts
let unusable: void = undefined;
```

`void` 不能指派給其他型別。

```ts
let u: void;
let num: number = u; // Type 'void' is not assignable to type 'number'.
let undef: undefined = u; // Type 'void' is not assignable to type 'undefined'.
```

## Any 與 類型推斷

變數被宣告成 `any` 型別，就可以指派任何型別的值且可以任意此用變數方法，其返回值也是 `any` 型別。

變數如果宣告時沒有指定型別，則會被推斷為 `any` 型別。

宣告變數時賦值，則會被推斷為賦值的型別，不是 `any` 型別。

## Union Types

Union Types (聯合型別)，可以指派多種型別。
  
```ts
let num: number | string;
num = 1;
num = "1";
```

當尚未確認變數的型別時，如果要存取 `num` 的屬性或方法，只能存取兩種型別共有的屬性或方法。要不然編譯時會報錯。

```ts
function getLength(num: string | number): number {
  return num.length; // Property 'length' does not exist on type 'string | number'. Property 'length' does not exist on type 'number'.
}
```

## Interface

### 擴充

interface 被擴充屬性。


```ts
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
```

要注意一旦有擴充屬性，所有 interface 的屬性都必須符合擴充屬性的型別。

```ts
interface Person {
  name: string;
  age: number; // 不符合 string ，會報錯。
  [propName: string]: string;
}
```

### 唯讀屬性

可以利用 `readonly` 關鍵字將屬性設為唯讀，只能在創建時賦值。

```ts
interface Person {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}

tom1.id = 1234; // Cannot assign to 'id' because it is a read-only property.
```


## Array

有些型別是 Array-like Object，但不是 Array。例如 `arguments`。無法直接指派給 Array。

```ts
function sum() {
  let args: number[] = arguments; // error TS2740: Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
}
```

## Function

### 可選引數的函式

可選引數一定接在必需引數後面。

```ts
// error TS1016: A required parameter cannot follow an optional parameter.
function buildName(firstName?: string, lastName: string) {
  if (firstName) {
    return firstName + " " + lastName;
  } else {
    return lastName;
  }
}
```

但如果有預設值，則可以接在必需引數前面。

```ts
function buildName(firstName: string = 'Austin', lastName: string) {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}
```

### 過載

函式可以有多個型別的定義，這稱為函式的重載。

如果需要函式接受不同型別的引數，並根據引數的**型別**返回不同的結果（不同的型別），就可以使用這個特性。

比如一個函式想要傳入數字就返回數字，傳入字串就返回字串，這時就可以使用函式的重載。

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | undefined {
  if (typeof x === 'number') {
      return Number(x.toString().split('').reverse().join(''));
  } 
  if (typeof x === 'string') {
      return x.split('').reverse().join('');
  }
}
```

## 型別斷言（Type Assertion）

可以使用 `<型別>值` 或是 `值 as 型別` 手動指定一個值的型別。

像是使用 Union Types 時，要確定變數的型別，才能存取該型別的屬性或方法，這時就可以使用型別斷言。

```ts
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
```

(意外發現整個專案不允許重複的函式名稱，所以 `type-assertion` 的 `getLength` 會與 `union-types` 的 `getLength` 衝突。)

## 宣告檔案（Declaration Files）

### 幫套件建立宣告檔案

1. 先確認是否以有宣告檔案，可以檢查套件的 `package.json` 是否有 `types` 屬性或是 `index.d.ts` 檔案。
2. 是否有在 `@types` 資料夾中找到宣告檔案或是有[現成](https://www.npmjs.com/~types)的宣告檔案。
    - 如果用像是 `yarn add @types/jquery --save-dev` 安裝，則 `@types` 資料夾會建立在 `node_modules` 資料夾中。
3. 如果都沒有，就要自己建立宣告檔案。建議建立一個 `types` or `@types` 資料夾，並在 `tsconfig.json` 中設定 `typeRoots` 或是 `paths` 和 `baseUrl` 。

> ChatGPT
> Use the @types organization for most third-party packages, as it ensures compatibility with the TypeScript ecosystem and provides a centralized repository for type declaration files. 
> Use the types directory for custom type declaration files specific to your codebase or packages that don't have official @types packages available.

## 內建物件（Built-in Objects）

NodeJS 不是內建物件，用 NodeJS 寫 TypeScript 要引入 `@types/node` 套件。

```sh
npm install @types/node --save-dev
```

# Advanced

## Enum

Enum 會自動幫未手動賦值的每個列舉成員依序賦值 0, 1, 2, 3, ...，讀取時可以用成員讀取賦值的數字，也可以用數字讀取成員。

```ts
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 0); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[6] === "Sat"); // true
```

手動賦值的話，後面的成員會依序加 1。
```ts
enum Days {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1.5); // true
console.log(Days["Tue"] === 2.5); // true
console.log(Days["Sat"] === 6.5); // true
```


手動賦值的話，後面的成員會依序加 1。要注意如果手動賦值與自動賦值的值重複，TypeScript 不會檢查，但會以後面的成員為主。


```ts
enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days["Sun"] === Days["Wed"]); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true
```

如果自動賦值在手動賦值之後，前面的成員賦值是 computed member，那後面的成員會因為無法知道確切的初始值而報錯。

```ts
enum Color {Red = "red".length, Green, Blue}; // 列舉成員必須有初始設定式。ts(1061)
```

## Class

要注意有些 TS 的語法雖然會在編譯時報錯提醒使用者，但編譯後的 JS 仍然可以執行。

像是 private 和 protected 修飾符，編譯後的 JS 並不會真的將屬性設為 private 或 protected，只是在編譯時會檢查是否有違反 private 或 protected 的規則。

```ts
class Animal {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
}

let a = new Animal('Jack');
console.log(a.name); //  error TS2341: Property 'name' is private and only accessible within class 'Animal'.
a.name = 'Tom';
console.log(a.name); //  error TS2341: Property 'name' is private and only accessible within class 'Animal'.
```

上面 build 完的 JS 還是可以執行。

```
Jack
Tom
```

## Classes and Interfaces

TS 的 interface 可以繼承 class。

```ts
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
``` 

PS 如果 tsconfig.json 中的 `strictPropertyInitialization` 設為 true，則會報錯。

```
error TS2564: Property 'y' has no initializer and is not definitely assigned in the constructor.
```

## Generic 泛型

在定義函式、介面或類別時，不預先指定具體的型別，而在使用時再指定型別的一種特性。

再呼叫時如果沒有指定型別，則會根據傳入的參數自動推斷出型別。


```ts
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray<string>(3, 'x'); // ['x', 'x', 'x']
createArray(3, 'x'); // ['x', 'x', 'x']
```

### Generic Constraints 泛型約束

函式使用泛型時，因為不知道傳入的參數的型別，所以不能隨意操作傳入的參數。

這時，可以利用 `extends` 關鍵字來來約束泛型，只允許傳入擁有特殊形狀的型別。

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity("hello"); // 5
// loggingIdentity(3); // 類型 'number' 的引數不可指派給類型 'Lengthwise' 的參數。
```

多個泛型參數之間也可以相互約束。

```ts
function copyFields<T extends U, U>(target: T, source: U): T {
  for (let id in source) {
      target[id] = (<T>source)[id];
  }
  return target;
}

let x = { a: 1, b: 2, c: 3, d: 4 };

const result = copyFields(x, { b: 10, d: 20 });
console.log('copyFields result:', result); // { a: 1, b: 10, c: 3, d: 20 }
```

### 泛型介面

使用含有泛型的介面來定義函式的形狀時，要注意泛型的位置會影響使用時需不需要指定型別。

```ts

interface CreateArrayFunc {
    <T>(length: number, value: T): Array<T>; // 這這邊使用泛型。
}

let createArray: CreateArrayFunc; // 宣告時不用指定型別。
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```

```ts
interface CreateArrayFunc<T> { // 這這邊使用泛型。
    (length: number, value: T): Array<T>;
}

let createArray: CreateArrayFunc<any>; // 宣告時要指定型別。
createArray = function<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```


### 泛型參數預設值

泛型參數可以指定預設值。當調用時沒有傳入參數，會使用預設值。

```ts
function createArray<T = string>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']
```


> ChatGPT
> 為什麼在泛型中常用 T 或 U 作為泛型型別參數，並沒有明確的典故或歷史背景。這些字母的使用主要是基於以下原因：
> 1. 慣例與可讀性：在程式設計社群中，T 被廣泛接受作為泛型型別的慣例。它是 "Type" 的縮寫，代表型別。同樣地，U 可以被解釋為 "Unknown" 或 "Unspecified"，表示未知的型別。這些字母在程式碼中的使用是一種約定俗成，有助於提高程式碼的可讀性和一致性。
> 2. 簡潔性與普遍性：T 和 U 是短小且易於輸入的字母，並且是通用的字母符號。它們的選擇不受特定語言或領域的限制，因此在不同的程式語言和環境中都可以使用。這種簡潔性和普遍性使得 T 和 U 成為泛型型別的常見表示方式。
> 
> 雖然沒有明確的典故與這些字母的使用相關，但它們已經成為程式設計社群中廣泛接受的慣例。它們的使用有助於促進程式碼的一致性，並讓開發者能夠快速理解泛型型別的意義和目的。
