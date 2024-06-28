# Certified Kubernetes Administrator (CKA)

# Core Concepts

Kubernetes 是一個 container orchestration system，它可以幫助我們管理一個 cluster 內 container 的生命週期，並且提供了一個平台來管理 container 的部署、擴展、縮減、以及運行。

Cluster 是指一組由 kubernetes 管理的計算、儲存、網路資源，這些資源可以是物理機器、虛擬機器、或是雲端資源。

一個 cluster 會包含多個節點，每個節點可以是實體機器或虛擬機器。節點又分成兩種，一種是 Master Node，另一種是 Worker Node。

**Master Node**

負責管理整個 cluster 的運作。

包含：

- API Server：提供 RESTful API 來管理 cluster。
- Scheduler：負責將 Pod 分配到 Node 上。
- Controller Manager：負責監控 cluster 狀態，並且做出相對應的動作。
- etcd：儲存 cluster 的狀態。

**Worker Node**

負責執行 container，包含：

- Kubelet：負責管理 Pod。
- Kube-proxy：負責網路代理。
- Container Runtime Engine：執行 container。
