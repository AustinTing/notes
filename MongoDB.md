# MongoDB

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