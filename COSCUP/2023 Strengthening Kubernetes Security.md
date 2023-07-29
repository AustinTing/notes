# Strengthening Kubernetes Security

Speaker: Koteswara Rao Vellanki

## Security

1. 將近 60% 的 Kubernetes 的安全性問題來自錯誤的設定。
2. 將近 70% 的 Container Image 至少包含一個已知的安全性問題。

## Popular tool for Kubernetes security

**Gatekeeper(Open Policy Agent)[OPA]）- Compliance**

Gatekeeper 是一個 Kubernetes 的 Admission Controller。利用 OPA 限制 Kubernetes 的資源。

**KubeSec - secure deployment**

KubeSec 是一個 Kubernetes 的安全性掃描工具，可以掃描 Kubernetes 的資源，並且提供修正的方法。

**Kube-Hunter**

kub-hunter 會去嘗試攻擊 Kubernetes Cluster，並且列出弱點。

**Kube-Bench**

Kube-Bench 會去檢查 Kubernetes Cluster 是否符合 CIS Benchmark。

**Project Falco**

Project Falco 是一個 Kubernetes 的 Runtime Security 工具，可以監控 Kubernetes 的資源，並且提供警告。

**Trivy**

Trivy 可以掃描潛有潛在風險在 Container 內的 package and dependencies。

## m9sweeper

[m9sweeper](https://github.com/m9sweeper/m9sweeper) 是一個 Kubernetes 的安全性掃描工具，可以辦到之前所有工具的事情。

m9sweeper 有一個介面，可以讓使用者設定要掃描的資源，並且可以設定要掃描的項目。





