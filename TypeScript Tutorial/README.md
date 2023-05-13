 # [TypeScript 新手指南]https://willh.gitbook.io/typescript-tutorial/

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


interface 可以之後被擴充屬性。


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

## 唯讀屬性

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








