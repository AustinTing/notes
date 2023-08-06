# Docker

- [Orbstack](https://orbstack.dev/)
    - Mac 上 Docker Desktop 的替代品。

# [Docker容器技術從入門到精通](https://www.udemy.com/course/docker-china/)

[課程 Document](https://www.docker.tips)

# 容器技術的介紹與安裝

## 容器技術的介紹

Container 是一種虛擬化技術，而 Docker 是一種 Container 的實作。

### Container 的標準化

Container 的標準化是由 Open Container Initiative (OCI) 負責。主要有兩個標準：

- Runtime Specification
- Image Specification
    - 不同 Container 的實作（Docker, Podman）的 Image 可以互相使用。

### 與 VM 的比較

![](https://images.contentstack.io/v3/assets/blt300387d93dabf50e/bltb6200bc085503718/5e1f209a63d1b6503160c6d5/containers-vs-virtual-machines.jpg)

VM 虛擬化完整 OS，運行在 Hypervisor 上。而 Container 不需要虛擬化完整 OS，運行在 container engine 上，container engine 運行在 Host OS 上。

Container 不是迷你的 VM，而是一個一個獨立的 process。這些 process 被隔離及限制資源使用（訪問）。如果 process 被刪除，則 container 也會被停止。

# Container Quick Start

## Basic Command

`docker version`: 查看 Docker 版本。

`docker info`: 查看目前 Docker 的狀態資訊。

`docker container ps -a`: 查看目前所有的 Container。

`docker image ls`: 查看目前所有的 Image。

## Image and Container

Image 是一份 `read-only` 的文件，包含了運行應用程式所需的所有文件、程式碼和依賴。一旦建立，就不會被修改。

Container 是 Image 的執行實例，且在多層 image 之上有 `read-write` 的權限。

## `docker container` 相關指令

執行 `docker container run...` 後，Docker 會做以下事情：

1. 檢查本地是否有指定的 Image，如果沒有，則從 Docker Hub 下載。
2. 使用 Image 建立一個 Container，並執行。



`docker container run [Image Name]`: 建立一個 Container。

`docker container ps`: 查看目前正在執行的 Container。加 `-a` 可以查看所有的 Container。

`docker container stop [Container ID]`: 停止 Container。

`docker container rm [Container ID]`: 刪除 Container。
- 無法刪除正在執行的 Container，必須先停止 Container。除非加上 `-f` 選項。

`docker container rm $(docker container ps -aq)`: 刪除所有 Container。
- `-q` 或 `--quiet` 選項表示只顯示容器的短ID（Container ID），而不顯示其他詳細資訊。這將讓輸出更為簡潔。


## Attach and Detach Container

Attach 是指連接到 Container 的標準輸入、輸出和錯誤輸出的模式。

- 直接執行 `docker container run [Image Name]`時，就是 Attach 的模式。
- 也可以透過 `docker container attach [Container ID]` 來連接到 Container。

Detach 是指將本地的標準輸入、輸出和錯誤輸出從容器中分離出來的模式。這樣你可以在容器後台運行。

- 使用 -d 或 --detach 選項 `docker container run -d [Image Name]` 運行容器，就可以在容器後台運行。

## 與 Container 互動

`docker container logs [Container ID]`: 查看 Container 的 log。

- `-f` 選項可以持續查看 log。

`docker container run -it alpine sh`:  以交互式模式運行Alpine Linux Image container，並在其中啟動 Shell。

- `-i` 選項表示以交互式模式運行容器。
- `-t` 選項表示在容器內啟動一個虛擬終端（pseudo-TTY）。
- `sh` 是在容器內啟動 Shell 的命令。
- 如果不使用 `-t` 選項或不指定 sh（或其他命令），則容器將沒有虛擬終端，並且在啟動後立即退出。
- 想退出容器，可以使用 `exit` 或 `Ctrl + D`。這時容器會**停止**。

`docker container exec -it [Container ID] sh`: 在已經運行的 Container 中啟動 Shell，並進入 Container 的交互式模式。

- `exec` 是指在已經運行的 Container 中啟動 Shell。
- 如果想退出容器，可以使用 `exit` 或 `Ctrl + D`。這時容器會**繼續運行**。


`docker container top [Container ID]`: 查看 Container 中正在運行的 process。








