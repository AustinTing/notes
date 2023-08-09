# Docker

主要參考 [Docker容器技術從入門到精通](https://www.udemy.com/course/docker-china/)
及 [其課程 Document](https://www.docker.tips)

# 容器技術的介紹與安裝

## 容器技術的介紹

Container 是一種虛擬化技術，而 Docker 是一種 Container 的實作。

### Container 的標準化

Container 的標準化是由 Open Container Initiative (OCI) 負責。主要有兩個標準：

- Runtime Specification
- Image Specification
    - 不同 Container 的實作（Docker, Podman）的 Image 可以互相使用。

### 與 VM 的比較

![](./assets/containers-vs-virtual-machines.jpg)

<center>圖片來源：<a href=https://www.weave.works/blog/a-practical-guide-to-choosing-between-docker-containers-and-vms>Docker vs Virtual Machines (VMs) : A Practical Guide to Docker Containers and VMs</a></center>



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

# Docker Image

![Docker Lifecycle](./assets/docker-lifecycle.jpeg)

<center>圖片來源：<a href=https://www.slideshare.net/TrisM/docker-41045742>Introduction to Docker - What is it and how is it compared to VM's</a></center>


## Get Image

有三種方法可以取得 Image：

1. 從 `registry` 取得 Image。
    - 可以是 Docker Hub、Quay.io 或其他私有的 registry。
2. 從 `Dockerfile` 建立 Image。
3. Load 本機的 Image。

## `docker image` 相關指令

`docker image pull [Image Name]`: 從 `registry` 取得 Image，預設版本是 `latest`。

- `docker image pull nginx`: 從 Docker Hub 取得 Image。
- `docker image pull quay.io/aptible/nginx`: 從 Quay.io 取得 Image。

`docker image ls`: 查看目前所有的 Image。

`docker image inspect [Image Name]`: 查看 Image 的詳細資訊，像是：
- Image 的大小、建立時間、作者等等。
- Image 的 Architecture 和 OS 這兩個欄位，可以知道這個 Image 是建立在哪個架構及 OS 上。
- Image 的 Layers，可以知道這個 Image 是由哪些 Layers 組成。

`docker image rm [Image Name]`: 刪除 Image。
- 無法刪除正在使用的 Image，必須先刪除使用該 Image 的 Container（無論是運行中還是被停止）。除非加上 `-f` 選項。
- 如果 Image 有多個版本，需要用指定版本的刪除，像是 `docker image rm nginx:1.17.10`。

`docker image save [Image Name] -o [File Name]`: 將 Image 儲存成 tar 檔。
- `docker image save busybox -o ./busybox`

`docker image load -i [File Name]`: 從 tar 檔載入 Image。
- `docker image load -i ./busybox`

## 簡介 Dockerfile

Docker 藉由 `Dockerfile` 建立 Image。`Dockerfile` 是一個純文字檔案，裡面包含了一連串的關於 build image 的指令。

如果要執行一隻程式，基本上要有幾個步驟：

1. 安裝程式所需的環境。
2. 準備程式。
3. 執行程式。

將上述步驟對應至 `Dockerfile`：

```dockerfile
FROM [Image Name]
RUN [Command]
ADD [Source] [Destination]
CMD [Command]
```

1. `FROM`: 指定 Image。（設定環境）
2. `RUN`: 執行指令。(設定環境)
3. `ADD`: 將檔案複製到 Image 中。（準備程式）
4. `CMD`: 執行程式。

## 建立 Image 與分享

`docker image build -t [Image Name] [Dockerfile Path]`: 建立 Image。
- 執行 `FROM`、`RUN`、`ADD` 以建立 Image。
- `-t` 選項可以指定 Image 的名稱，如果名稱後面沒指定版本，預設是 `latest`。

`docker container run [Image Name]`: run Image。
- 執行 Dockerfile 中的 `CMD`。

`docker image tag [Image Name] [New Image Name]`: 為 Image 加上新的 tag。

`docker image push [Image Name]`: 將 Image 上傳到 registry。
- 如果要 push 到 Docker Hub，要先 `docker login`。
- Image 名稱必須是 `username/repository:tag`。






# Other Tools

- [Orbstack](https://orbstack.dev/)
    - Mac 上 Docker Desktop 的替代品。



