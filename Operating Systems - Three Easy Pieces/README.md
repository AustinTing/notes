# Operating Systems: Three Easy Pieces (OSTEP)

OS 究竟有多 Easy?

- Resource
  - [Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/)
  - [ostep-code](https://github.com/remzi-arpacidusseau/ostep-code)
  - [ostep-homework](https://github.com/remzi-arpacidusseau/ostep-homework)
- [Virtualization](#virtualization)
  - [Processes](#processes)
  - [Process API](#process-api)


## Introduction to Operating Systems  
**Virtualizing**
- Virtualizing the CPU: OS 試圖將有限數量 CPU 呈現多個程式同時運行、看似擁有無限數量 CPU 的假象。  
- Virtualizing the Memory: OS 試圖為每個程式分配 memory，呈現每個程式都有 private memory。

**Concurrency**: OS 需要能同時執行多個程式。

**Persistence**: OS 不會為程式創造虛擬 disk ，預設是所有使用者共享。OS 需要管理 Persistence 的 files。

**設計 OS  的主要目標**：
  - 提供高性能（performance）。
  - 程式之間以及 OS 在程式之間提供保護（protection）。
  - 操一个目标是在应用程序之间以及在 OS 和应用程序之间提供保护（protection）。  
  - 提供高可靠。
## Virtualization  

### Processes

Process 就是 running program，也是 OS 為 running program 提供的抽象。  

Machine state: 像是記憶體(memory)、寄存器(registers) 和 persistent storage device。 

分離策略與機制: 將系統如何針對問題提供答案（機制）與系統為哪個問題提供答案的手段（策略）分開，就可以輕鬆地改變策略不影響機制。  

Process 有各式各樣的狀態： 
- RUNNING: 正使用 CPU 中。  
- READY: 隨時準備可以使用 CPU。  
- BLOCKED: 等待 IO 中。  
- DONE: 完成執行。  

新增 Process 時，OS 主要會做的事：  
- 將程式及靜態資料從 disk 讀出後載入 memory。  
- 為程式 run-time stack or stack 分配 memory。  
- 為程式的 heap 分配 memory。  
  - 當有呼叫 malloc() 時，會分配更多 memory 。  
- 其他初始化任務，如 file descriptor ，方便 process 讀 terminal 的輸入及輸出。  
- 啟動 main 。  

OS 也是一隻程式，有一些關鍵的資料結構追蹤相關訊息。  


OS 必須追蹤每個 process 為了像是當有 process 停止時，將這個 process 的 register 保存至 memory 位置，方便之後恢復 process 。這部又稱作 context switch 。

[Homework](./ch04-homework.md)

## Process API

**fork()**

Parent 在 fork() 的返回值是新創建的 child 的 pid ，而 child 在 fork() 後的返回值是 0 。fork 後，對於 OS 來說，有兩個幾乎一模一樣的 process 在執行。

Child 不會從 main 開始執行，而是從 fork() 後開始，就像自己呼叫過 fork() 一樣。

根據不同的 scheduler ， 在 parent 跟 child 的處理有不同的先後順序。

**wait()**

利用 wait() 可以強制讓 Parent ~~或是 child ~~強制等 child 結束再執行。BUT 也要注意不是絕對。（開發時請參閱~~公開說明書~~man）

**exec()**

執行中的 process 藉由 load code 和資料來覆寫自己。


