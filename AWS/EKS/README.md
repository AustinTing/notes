# EKS

主要參考[入門 Amazon EKS：在一天內開啟你的 Kubernetes on AWS 旅程](https://www.udemy.com/course/amazoneks/)

# Introduction

EKS 是 AWS 提供的 Kubernetes 服務，可以讓使用者快速建立 Kubernetes 集群，並且可以透過 AWS 的服務來管理。

## Why EKS

如果獨立架設 Kubernetes，需要自己管理 Master Node，從前期架設與設計到後期維護（主機掛掉、硬碟掛掉）都需要花費大量時間。另外，如果要 scale up 或 scale down，也需要自己來處理。使用 EKS 可以讓使用者專注在應用程式的開發，而降低維護的成本。

而用 AWS 來管理 Kubernetes 的好處在於除了 AWS 幫忙處理 Kubernetes 軟體的升級與相容性外，另外也整合 AWS 其他服務，像是 IAM 和 VPC，讓使用者可以更容易地管理 Kubernetes。

為了確保可用性，在單一 AWS Region 中，EKS 會確保至少在 3 個可用區，有 2 個 Api Server 和 3 個 Etcd Server，提供一定的 SLA 保證。

## EKS Architecture

