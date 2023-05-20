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
