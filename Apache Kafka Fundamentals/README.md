# [Apache Kafka Fundamentals](https://www.youtube.com/playlist?list=PLa7VYi0yPIH2PelhRHoFR5iQgflg-y6JA)

## [動機](https://www.youtube.com/watch?v=BsojaA1XnpM)

如何打造可以處理所有即時 event 及可以將 event 歷史回顧的單一平台。

## [Fundamentals](https://www.youtube.com/watch?v=B5j3uNBH8X4)

Producers 和 Consumers 互相解偶，互不知彼此，所以可以各自添加、更新或是 scale up 。

### Producers

能將 message 傳入 Kafka Cluster，傳入之後可能會收到 ack 。

### Brokers

運行 Kafka 的 process ，有自己獨立的硬碟空間。

一群相連在一起 Broker 的稱 Kafka Cluster。如果用雲服務，不用太在意這一塊，因為底層實作可能是容器或是機器。


### Consumers

將資料從 Kafka Cluster 拉出來處理，處理後也可以再寫入 Kafka Cluster 。

Kafka 紀錄 consumer 上次處理到哪一筆 message （Consumer offset）。Consumer offset 存放在特定的 topic。


### Zookeeper

管理 cluster，協助分散式的 Brokers 在一些事情上達成一致。（有可能未來會從 Kafka 中移除）

### Topics

不同 Message 的分類。由開發者自己定義。理論上沒有上限，但實務上有。

#### Partition

將同個 Topic 切分成多份儲存，讓不同 brokers 有著同一個 topic 但不同的 partition ，這樣就可以一起寫入同一個 topic 的 message 。這也是 Kafka 可以 Scale up 的關鍵因素。

如果一個 partition 只給一個 broker 處理，如果那個 broker 掛了，那個 partition 也會跟著掛掉。所以 Kafka 根據 replication factor (數量) 產生多個 partition 的 replication。其中一個 replica 稱為 Leader ，其他的稱 follower 。Producer 產生 message 時，會連接負責處理 Leader partition 的 broker ，將 message 寫入 Kafka。有著 follower partition 的 broker 則會僅快地向的 Leader partition 的 broker 同步資料。

為了 load balancing 和 semantic partitioning ，在設計 producer 時，要常常思考 Partitioning stragegy。如果沒有 hash key ，預設 Partitioning stragegy 就是 Round-Robin ；有 hash key 就是 hash key % number of partitions，所以只要有相同的 hash key 就會進入一樣的 partition。這樣如果資料需要被有序的處理，就可以用同 partition 一一存入。

#### Segments

Message 真正被紀錄的地方，真正的 file。

一個一個 Segments file 組成整份 log (log of Segments, or stream)。

當創建 Topic 時，Kafka 會自動分配該 Topic 的 partition ，但不會自動追蹤這些 partition 的大小，也不會自動移動檔案。所以，開發者要負責維持 partition 的平衡。

 message 只會一直加在 Segments 的最後，之前寫入的資料不可改變。

Consumer 只會讀 log ，讀 log 不會讓 log 產生變化。

當 consumer 可以很快地消化 log ，就可以做到很即時的系統。當然，也可以寫一個新的 consumer 從頭處理所有資料。

## [How Kafka Works](https://www.youtube.com/watch?v=jY02MB-sz8I)




