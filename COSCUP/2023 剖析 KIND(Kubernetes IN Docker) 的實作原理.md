# 剖析 KIND(Kubernetes IN Docker) 的實作原理

Speaker: HungWei Chiu

## KIND 是什麼

KIND 是 Kubernetes IN Docker 的縮寫，是一個用來在本機建立 Kubernetes Cluster 的工具。

透過 Docker 的技術，可以在本機快速建立一個 Kubernetes Cluster，並且可以在上面測試自己的應用程式。

## Container

內部 IP 是會變的。

## Kubernetes

每個 node 藉由 Kubelet 來透過 API server 與 Master 溝通。

## KIND 的架構

以 Container 當節點，往下可以建立多個 Container，往上可以建立多個 Kubernetes Cluster。

(sigs: Special Interest Groups)

設定檔利用 muti stage 分別 build 好再進行下一步。

## KIND 的問題

1. MachineID: 每個 Container 的 MachineID 都是一樣的，會導致 Kubernetes Cluster 無法正常運作。所以在啟動時，會隨機的設定 MachineID 。
2. Product_UUID: 每個 Container 的 Product_UUID 都是一樣的，會導致 Kubernetes Cluster 無法正常運作。所以在啟動時，會隨機的設定 Product_UUID 。
3. Certificate Issue: 因為重啟後，內部 IP 會變，所以會導致 Certificate 無法正常運作。目前解法就是在 container 起來後，比對舊資料，如果有不同舊重新修正 IP 和重新發行 Certificate 。
4. DNS Issue: Docker 有自己的 DNS Server，如果內部找個到相同名字的 Container ，就會回傳這個 IP ，沒有才會往外找。Docker 的 DNS server 是運行在容器外面，process 是跑在外面，但監聽 Container 所有的 port ，改 IP Table。Kubernetes 的 DNS server 是 coreDNS 繼承 etc resolved，也是改 IP Table 改 etc resolved。
