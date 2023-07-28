# [System Design Interview – An insider's guide](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

# CHAPTER 4: DESIGN A RATE LIMITER

## What is a rate limiter?

Rate limiter 是一個用來限制請求速率的工具。它可以防止用戶發送太多請求（有意 or 無意）。

HTTP 429 response status code 是指用戶發送了太多請求。

## 好處

1. 防止資源被 Denail of Service(DoS) 攻擊而耗盡。
2. 節省成本。讓公司資源專注在高優先的請求上。如果公司有使用付費 API， 也可以防止用戶發送太多請求而導致公司付出更多的成本。
3. 防止伺服器過載。

## Where

通常會放在 Client 和 Server 之間，越靠近 Client 越好。

雖然也可以直接做在 Client 端，但是有可能會被繞過。

## 幾種 Rate Limiter 的演算法比較

### Bucket



|     | Token Bucket | Leaking Bucket |
| --- | ------------ | -------------- |
|  流程   |     一個固定容量 bucket ，系統定期加入 token ，滿了就不加。<br>Request 進來就從 Bucket 拿 token Bucket 沒 token 就 Drop Request      |                |
|  參數   |     Bucket Size<br>Refill Rate      |                |
|  優點   |     易於實作<br>Memory efficient<br>可以應付短時間大量的流量      |                |




|     | Fixed Window Counter | Sliding Window log | Sliding Window Counter |
| --- | -------------------- | ------------------ | ---------------------- |
|     |                      |                    |                        |


## Rate limiter in a distributed environment


分散式的 rate limiter 有兩個挑戰：

1. Race condition
2. Synchronization issue


### Race condition

Locks 是最直接的解決方案，但是會大幅降低系統效能。有兩種常見的解決方案：

1. Lua script
    - > ChatGPT: 
    對於 rate limiter，可以使用 Lua 腳本來實現原子操作，確保在多個客戶端同時訪問時，限制請求的邏輯是正確的。
2. Redis 的 sorted sets data structure
    - > ChatGPT:
    對於 rate limiter，可以使用排序集合來記錄每個請求的時間戳和相應的分數。通過使用排序集合的特性，例如根據分數範圍查詢成員，可以實現限制請求速率的邏輯。每當有新的請求到達時，可以將其添加到排序集合中，同時根據設定的規則進行清理，以確保只保留在指定時間窗口內的請求。

# CHAPTER 8: DESIGN A URL SHORTENER

## 問題與推估

**能否舉一個短網址服務的例子？** 

比如原本網址是 `https://original.url/need?to=beShort`，縮短後的網址是 `https://sys.ly/3j1Q8Zy`。

**流量大概多大？**

每天 10 億次的短網址產生。

可以開始推算讀寫次數，先抓讀寫比例 10:1 來算。
