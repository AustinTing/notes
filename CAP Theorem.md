# CAP Theorem

CAP Theorem 是一個分散式系統的理論，指出一個分散式系統不可能同時滿足以下三個特性：

- Consistency (一致性)
- Availability (可用性)
- Partition tolerance (分區容錯性)

> 一致性：在分散式系統中，所有節點看到的資料都是一致的。

> 可用性：在分散式系統中，每個請求都會收到一個回應，不管是成功或失敗。

> 分區容錯性：在分散式系統中，即使有節點失敗或是網路分區，系統仍然可以繼續運作。  

CAP Theorem 指出，一個分散式系統只能滿足其中兩個特性，不可能同時滿足三個特性。


## [A plain english introduction to CAP Theorem](http://ksat.me/a-plain-english-introduction-to-cap-theorem)

### Consistency

當系統變成分散式系統時，因為各個節點會收到不同的資料（作者與他老婆各自的筆記因為電話轉接不同人所以造成差異），就會發生各自資料不一致的問題。

### Availability

系統可能會在節點同步資料時或節點異常時，造成無法回應請求的問題。

### Partition tolerance

各節點可能因為網路問題而無法互相溝通（作者老婆生氣不講話），造成分區問題。如果要容忍分區問題，可能要讓系統暫停服務，等到分區問題解決後再繼續運作。或是讓系統繼續運作，但是可能會有資料不一致的問題。

