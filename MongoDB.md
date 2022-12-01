# MongoDB

## 在 MongoDB 上的資料模型設計

整理 吳明宗 老師在 2022 MongoDB Day 的演講。 

### 思考要關聯（Link）還是嵌套（Embed）

Do I want the embedded information mostly?
我有很想要嵌套的資訊嗎？。
Do I need to search with the embedded data?
我會需要搜尋嵌套的資料嗎？
How frequently will the embedded data change?
多久需要改變嵌套的資料？
Do I need the latest version or the same version?
我會需要最新版本的資料還是一樣的版本的資料就好？
Is the embedded data shared or private - double check?
嵌套的資料是被 shared 還是 private - double check?

### 心法

> Favor embedding unless there is a compelling reason not to.
> 善用內嵌除非有理由不用它。

> Needing to access an object on its own is a compelling reason not to embed it.
> 有特別的理由需要單獨去讀取某個物件時，不會採用內嵌。

> Avoid `$lookups` if possible, however, use them if they can provide a better schema design. Two queries is also a very acceptable option.
> 儘可能避免使用 `$lookups`，使用兩次查詢也是可行的方法。

> Arrays should not grow without bound. If there are more than a couple of hundred documents on the "many" side, don't embed them; if there are more than a few thousand documents on the "many" side, don't use an array of ObjectID references. High-cardinality arrays are a compelling reason not to embed.
> 如果陣列包含過多的元素，不建議去內嵌它們。原則上建議不要超過數千。

> How you model your data depends entirely on your particular application's data access patterns. You want to structure your data to match the ways that your application queries and updates it.
> 資料模型取決於應用端資料讀取的行為，需依循應用端的查詢去調整。
