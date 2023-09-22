# MongoDB

## 本機 Docker 快速啟動

```bash
docker container run --name mongodb \
-e MONGO_INITDB_ROOT_USERNAME=userName \
-e MONGO_INITDB_ROOT_PASSWORD=password \
-v mongodb:/data/db \
-p 27017:27017 \
-d mongo:latest
```

# Transaction

transaction 是一種保證資料一致性的機制，可以確保資料庫的 ACID 特性。如果 transaction 中間發生錯誤，會自動 rollback，保證資料庫的一致性。

在一次 transaction 過程中，操作有沒有帶入 session 會影響到操作的結果。例如：

```ts
XXModel.create([data], { session });
XXModel.findOne({key: data.key}); // 無法找到 data
XXXModel.findOne({key: data.key}).session(session); // 可以找到 data
```



## 用遞回方式處理 DB concurrency 操作 Error 的問題

以 TypeScript 為例，當錯誤發生時，會進入 catch 區塊，這時可以在 catch 區塊中再次呼叫自己，達到重新處理的效果。

```ts
// ... In some class
private async operateData(
    data: Data,
    retryTime = 0,
  ) {
    try {
      const session = await this.connection.startSession();
      if (session) session.startTransaction();
      try {
         // ... do some transaction
        if (session) await session.commitTransaction();
      } catch (error) {
        if (session) await session.abortTransaction();
        throw error;
      } finally {
        if (session) await session.endSession();
      }
    } catch (error) {
      if (retryTime < 3) {
        retryTime++;
        await this.operateData(
          data,
          retryTime,
        );
      } else {
        console.error("Transaction failed and retry 3 times. Error: ", error);
        throw error;
      }
    }
  }
```

## 在 MongoDB 上的資料模型設計

整理 吳明宗 老師在 2022 MongoDB Day 的演講。 

### 思考要關聯（Link）還是嵌套（Embed）

Do I want the embedded information mostly?<br>
我有很想要嵌套的資訊嗎？

Do I need to search with the embedded data?<br>
我會需要搜尋嵌套的資料嗎？

How frequently will the embedded data change?<br>
多久需要改變嵌套的資料？

Do I need the latest version or the same version?<br>
我會需要最新版本的資料還是一樣的版本的資料就好？

Is the embedded data shared or private - double check?<br>
嵌套的資料是被 shared 還是 private - double check?

### 心法

> Favor embedding unless there is a compelling reason not to.<br>
> 善用內嵌除非有理由不用它。

> Needing to access an object on its own is a compelling reason not to embed it.<br>
> 有特別的理由需要單獨去讀取某個物件時，不會採用內嵌。

> Avoid `$lookups` if possible, however, use them if they can provide a better schema design. Two queries is also a very acceptable option.<br>
> 儘可能避免使用 `$lookups`，使用兩次查詢也是可行的方法。

> Arrays should not grow without bound. If there are more than a couple of hundred documents on the "many" side, don't embed them; if there are more than a few thousand documents on the "many" side, don't use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed.<br>
> 如果陣列包含過多的元素，不建議去內嵌它們。原則上建議不要超過數千。

> How you model your data depends entirely on your particular application's data access patterns. You want to structure your data to match the ways that your application queries and updates it.<br>
> 資料模型取決於應用端資料讀取的行為，需依循應用端的查詢去調整。

### Linking or Embed 比較

|      | Linking    | Embed |
| ---- | ---------- | ----- |
| 優點 | 1. Document 比較小(通常)。<br>2. 比較不會達到單一 Document 16 MB 上限的限制。<br>3. 每次 query 不用給那些偶爾才用到的資料。<br>4. 減少資料的重複。BUT 當你覺得符合使用情境時，可以不用考慮慮資料的重複。 | 1. 一次 query 就可以取得所有資料。 |
| 缺點 | 1. 要拿取所有資料，至少要用兩次 `$lookup` 。<br>2. 更新某個資料，有可能就要更新多個 Document。 |   1. 單一 Document 可能會因為 Size 大，導致額外開銷。但可以藉由限制檔案大小或是透過 wire compression 解決。<br>2. 單一 Document 不能超過 16 MB 。 |

### 各種模式總覽

![](/assets/mongodb-patterns-overview.jpg)

## Aggregation

### $match

過濾條件

** 如果 Document 裡面有兩個 key ， typeA 和 typeB 。找出這兩個 Key 相等的 Document。**

```js
db.collection.aggregate([
   {
      $match: {
         $expr: { $eq: ['$typeA', '$typeB'] }
      }
   }
])
```

### $group

分組。可以再定義分完組後的新 key 。

**按照書本 category 分類，並算出此分類的平均價格。**

```js
db.collection.aggregate([
   {
      $group: {
         _id: "$category",
         avgPrice: { $avg: "$price" }
      }
   }
])
```

output:

```js
[
   {
      _id: "electronics",
      avgPrice: 75
   },
   {
      _id: "books",
      avgPrice: 25
   }
]
```


**根據書本 category 分類，並把有這個分類的書籍 name ， push 到新的 names 這個 key。**

```js
db.collection.aggregate([
   {
      $group: {
         _id: "$category",
         names: { $push: "$name" }
      }
   }
])
```

output:

```js
[
   {
      _id: "electronics",
      names: ["Product A", "Product C"]
   },
   {
      _id: "books",
      names: ["Product B", "Product D"]
   }
]
```

### $set

更改某個 key 的值

**將 _id 轉成字串**

```js
db.collection.aggregate([
   {
      $set: {
         _id: {
         $toString: '$_id'
         }
      }
   }
])
```

## 疑難雜症

DB connect 時如果沒加 `srv` 有可能會出現 timeout 問題。

使用 Mongoose 的 Model.create 時，如果要加 session，記得第一個參數要轉成 array。參考：[Model.create() not allowing me to pass SaveOptions as the second argument](https://github.com/Automattic/mongoose/issues/12877)

```ts
await Model.create([data], { session });
```

建議寫完程式後，檢查每個 MongoDB 的操作，評估是否要在 Model 建立相對應的 index 。

注意 bulkWrite 的 BulkWriteOptions 的結構，尤其是那個 key document 。

```ts
insertOne: {
   document: { ...data },
```