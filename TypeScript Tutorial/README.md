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
npx tsc --init
```

Add build script to package.json. And then run `yarn build` to compile TypeScript to JavaScript.

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```



