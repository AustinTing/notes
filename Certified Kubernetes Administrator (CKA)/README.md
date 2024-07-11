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

## Docker vs Containerd

早期 Kubernetes 使用 Docker 作為 container runtime engine，之後 Kubernetes 為了支援其他 conttainer runtime，開發了 CRI（Container Runtime Interface）。只要 container runtime 符合 OCI（Open Container Initiative）標準，就可以使用。

但是 Docker 的 runtime 沒有遵守 OCI 標準，所以 Kubernetes 為了 Docker 開發了一個中間層 dockershim，這個中間層將 Docker 的 API 轉換成 CRI 的 API。

Kubernetes 1.24 版本之後，移除了 dockershim 的支援。因為 Docker 的 image 符合 OCI 標準，所以依舊可以可以使用 Docker 的 image。

Kubernetes 目前是使用 containerd 作為 container runtime engine。 Containerd 是 Docker 的一部分，是一個高度可擴展的 container runtime engine。

## Kube Scheduler

Kube Scheduler 是一個 Kubernetes 的 component，它負責將考慮資源的使用情況及 Pod 的需求，將 Pod **規劃** 至 Node 上，本身不會執行任何 Pod。

# Pod

Pod 是 Kubernetes 的最小單位，它是一個或多個 container 的集合，這些 container 共享相同的 network namespace、IPC namespace、PID namespace、以及 volumes。