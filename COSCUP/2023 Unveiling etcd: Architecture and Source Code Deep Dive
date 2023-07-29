# Unveiling etcd: Architecture and Source Code Deep Dive

Speaker: Jack Yu

## 什麼是 etcd

etcd 是一個分散式的 key-value 儲存系統，主要用來儲存分散式系統的配置資訊，例如 Kubernetes 的配置資訊。具有強一致性，高可靠性。

## etcd 的重要特性

1. 簡單的 interface: HTTP API, gRPC。
2. Fast: 一個節點每秒可以處理 10,000 次的寫入操作。
3. 可靠: 使用 Raft 協議，可以保證一致性。

## etcd 的架構

主要利用 Raft 協議來實現一致性，只有 Leader 才能處理寫入操作，Follower 只能處理讀取操作。

### Read Flow

Client 收到 Read request 後，會去問 Raft component 誰是 Leader，以及自己的資料是不是最新的：

- 如果是最新的，就直接回傳資料。
- 如果不是最新的，就會等 Leader 更新。

### Write Flow

Client 收到 Write request 後，會去請 Raft component 請大家把資料更新到最新的，等到大家（50%以上）都更新完後，才會真的寫入。

## Raft 演算法

Raft 是一個分散式的一致性演算法，主要用來解決分散式系統的一致性問題。他的前身是 Paxos 演算法，但是 Paxos 演算法太難理解，所以 Raft 演算法就是為了解決 Paxos 演算法難理解的問題而生。

不能容忍拜占庭將軍問題（不能容忍有節點說謊）。

### Raft 的機制

1. Leader election
2. Log replication
3. Safety

#### Leader election

參考 raft.github.io 。

Election term: 每次選舉都會有一個 term，每個 term 都只會有一個 Leader。

#### Log replication

1. Leader 收到寫入請求後，會將資料寫入自己的 log。
2. Leader 會將資料寫入 Follower 的 log。
3. Follower 收到資料後，會回傳成功訊息給 Leader。
4. Leader 收到成功訊息後，會將資料返回給 Client。

如果發生資料不一致的情況（某個成為 Leader 的 node 被網路隔離，導致其他 node 也成為 Leader），一律以現在的 Leader 為主。 Leader 會將自己的資料同步給其他 node。每次資料都會包含 term，如果 term 及其資料與 follower 不一致，Leader 會再將前一個 term 的資料同步給 follower。










