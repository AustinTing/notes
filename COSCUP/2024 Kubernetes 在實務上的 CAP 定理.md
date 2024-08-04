# Kubernetes 在實務上的 CAP 定理

Speaker: Mike Hsu

[共筆](https://hackmd.io/IbirWKOpSt6L2nntcYyY3Q)

300-500 Node 在擴展上會有問題。

Avaialbility is trust.

為了高 HA ，勢必會造成冗餘。我們要找到重要的功能，將其冗餘，才能降低成本。

PodDisruptionBudget: 限制在一個時間內，最多可以有幾個 Pod 被關閉。比如 DB 一次只能關一個。


### CFS 問題

- 因為 CPU 是 shared 的，所以定義中的 CPU 是有可能不準確的。因為 kubernetes 在運行時，會強制調整 CPU 的使用量。可以強制定義 static CPU。
- K8S 核心開發者建議：Never setting CPU Limit

- [同樣 2vCPU 的 Kubernetes Container 為什麼會比 VM 效能差](https://www.hwchiu.com/docs/2023/container-vm)


### KEDA 專案

根據內部及外部事件，來靈活調整 Pod 的數量。比如直接根據 kafka 累積 message 數量來調整 Pod 數量。

### 雲端成本優化

減少閒置資源：在不需要的時候把 replica 降成 0?

Cloud Cost Estimation： Github 插件，推設定檔可以幫忙分析成本。

Kubecost: 可以看到每個 Pod 的成本。

從異世界歸來發現只剩 kubernetes 

