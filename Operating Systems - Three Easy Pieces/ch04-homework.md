# Ch04 Homework  

根據不同 Run `process-run.py` 模擬的情境，試著理解 process 運作方式跟 CPU 使用率。

```
-l PROCESS_LIST, X1:Y1,X2:Y2
	X: process 需要執行幾個指令
	Y: 每個指令使用 CPU 的機會，100 代表完全使用 CPU，0 代表完全使用 IO
-L 每次 IO 要花多久才會完成
-c 看解答
-S 切換 process 的行為
	SWITCH_ON_IO: 當 process 發起 IO 時切換。(預設？)
	SWITCH_ON_END: process 跑完才切換。
-I IO 結束時的行為
	IO_RUN_IMMEDIATE: 立刻切回原本 process 。
	IO_RUN_LATER: 根據切換 process 的行為。(預設？)
-p 印統計狀態
```

### 1. `./process-run.py -l 5:100,5:100`  

- CPU 使用率是 100%，因為依序執行兩個沒有發生 BLOCKING 的 process。  

### 2. `./process-run.py -l 4:100,1:0`  

- ~~100%? 因為另一個 process 不會用到 CPU~~ 
- 發送 IO request 跟 IO 結束還是會用到 CPU。

``` bash
Time        PID: 0        PID: 1           CPU           IOs
	1        RUN:cpu         READY             1          
	2        RUN:cpu         READY             1          
	3        RUN:cpu         READY             1          
	4        RUN:cpu         READY             1          
	5           DONE        RUN:io             1          
	6           DONE       BLOCKED                           1
	7           DONE       BLOCKED                           1
	8           DONE       BLOCKED                           1
	9           DONE       BLOCKED                           1
 10           DONE       BLOCKED                           1
 11*          DONE   RUN:io_done             1          

Stats: Total Time 11
Stats: CPU Busy 6 (54.55%)
Stats: IO Busy  5 (45.45%)
```
### 3. `./process-run.py -l 1:0,4:100`

- ~~100% 因為在 CPU 等待的時候，去做第二個 process 的事情~~  
-  Process(0)在開始 IO 後，OS 把 CPU 分配給 process(1)，執行完等 process(1) 結束後再處理 process(1) 。
``` bash
Time        PID: 0        PID: 1           CPU           IOs
	1         RUN:io         READY             1          
	2        BLOCKED       RUN:cpu             1             1
	3        BLOCKED       RUN:cpu             1             1
	4        BLOCKED       RUN:cpu             1             1
	5        BLOCKED       RUN:cpu             1             1
	6        BLOCKED          DONE                           1
	7*   RUN:io_done          DONE             1          

Stats: Total Time 7
Stats: CPU Busy 6 (85.71%)
Stats: IO Busy  5 (71.43%)
```
### 4. `./process-run.py -l 1:0,4:100 -c -S SWITCH_ON_END`  
- 54.55%，數字可能跟 `./process-run.py -l 4:100,1:0` 一樣，但不知道無法切換但 CPU 有不做事怎麼算？  
	- 就沒有算做運作，且無法 concurency。

```
Time        PID: 0        PID: 1           CPU           IOs
  1         RUN:io         READY             1          
  2        BLOCKED         READY                           1
  3        BLOCKED         READY                           1
  4        BLOCKED         READY                           1
  5        BLOCKED         READY                           1
  6        BLOCKED         READY                           1
  7*   RUN:io_done         READY             1          
  8           DONE       RUN:cpu             1          
  9           DONE       RUN:cpu             1          
 10           DONE       RUN:cpu             1          
 11           DONE       RUN:cpu             1          

Stats: Total Time 11
Stats: CPU Busy 6 (54.55%)
Stats: IO Busy  5 (45.45%)
```

加上 `-S SWITCH_ON_END` 後，執行結果可以發現 process(1) 等到 process(0) 完成才開始，但中間因為 process(0) 在 IO ，狀態為 Blocked。CPU 在這段時間就閒置了。總時間為 11 。

### 5. `./process-run.py -l 1:0,4:100 -c -S SWITCH_ON_IO`  
	- CPU 使用率應該會更高。  
	- 時間縮短。

```
Time        PID: 0        PID: 1           CPU           IOs
  1         RUN:io         READY             1          
  2        BLOCKED       RUN:cpu             1             1
  3        BLOCKED       RUN:cpu             1             1
  4        BLOCKED       RUN:cpu             1             1
  5        BLOCKED       RUN:cpu             1             1
  6        BLOCKED          DONE                           1
  7*   RUN:io_done          DONE             1          

Stats: Total Time 7
Stats: CPU Busy 6 (85.71%)
Stats: IO Busy  5 (71.43%)
```

執行時，可以發現 process(0) issue IO 後，OS 就切換 執行 process(1) ，等 process(1) 做完再回來處理 process(0)。這樣總消耗時間為 7 ，比上面那種等待完成才切換的模式還快。

### 6. `./process-run.py -l 3:0,5:100,5:100,5:100 -S SWITCH_ON_IO -I IO_RUN_LATER -c -p`  
- 感覺這種有機會遇到 dead lock

```
Time        PID: 0        PID: 1        PID: 2        PID: 3           CPU           IOs
  1         RUN:io         READY         READY         READY             1          
  2        BLOCKED       RUN:cpu         READY         READY             1             1
  3        BLOCKED       RUN:cpu         READY         READY             1             1
  4        BLOCKED       RUN:cpu         READY         READY             1             1
  5        BLOCKED       RUN:cpu         READY         READY             1             1
  6        BLOCKED       RUN:cpu         READY         READY             1             1
  7*         READY          DONE       RUN:cpu         READY             1          
  8          READY          DONE       RUN:cpu         READY             1          
  9          READY          DONE       RUN:cpu         READY             1          
 10          READY          DONE       RUN:cpu         READY             1          
 11          READY          DONE       RUN:cpu         READY             1          
 12          READY          DONE          DONE       RUN:cpu             1          
 13          READY          DONE          DONE       RUN:cpu             1          
 14          READY          DONE          DONE       RUN:cpu             1          
 15          READY          DONE          DONE       RUN:cpu             1          
 16          READY          DONE          DONE       RUN:cpu             1          
 17    RUN:io_done          DONE          DONE          DONE             1          
 18         RUN:io          DONE          DONE          DONE             1          
 19        BLOCKED          DONE          DONE          DONE                           1
 20        BLOCKED          DONE          DONE          DONE                           1
 21        BLOCKED          DONE          DONE          DONE                           1
 22        BLOCKED          DONE          DONE          DONE                           1
 23        BLOCKED          DONE          DONE          DONE                           1
 24*   RUN:io_done          DONE          DONE          DONE             1          
 25         RUN:io          DONE          DONE          DONE             1          
 26        BLOCKED          DONE          DONE          DONE                           1
 27        BLOCKED          DONE          DONE          DONE                           1
 28        BLOCKED          DONE          DONE          DONE                           1
 29        BLOCKED          DONE          DONE          DONE                           1
 30        BLOCKED          DONE          DONE          DONE                           1
 31*   RUN:io_done          DONE          DONE          DONE             1          

Stats: Total Time 31
Stats: CPU Busy 21 (67.74%)
Stats: IO Busy  15 (48.39%)
```

可以發現 process(0) 等到所有 process 都 run 完後才回來執行，但本身又有 IO ，這段時間應該是可以拿去做事才對。時間為 31 。

### 7.`./process-run.py -l 3:0,5:100,5:100,5:100 -S SWITCH_ON_IO -I IO_RUN_IMMEDIATE -c -p`

- 如果一個 process 在第一個 IO 結束後，還有其他 IO ，但又要等其他跑完才輪到自己，就會發生 CPU 閒置的情形。這時候如果可以先切換到自己，再次 IO 時，再讓給別人就可以增加 CPU 效率。

```
Time        PID: 0        PID: 1        PID: 2        PID: 3           CPU           IOs
  1         RUN:io         READY         READY         READY             1          
  2        BLOCKED       RUN:cpu         READY         READY             1             1
  3        BLOCKED       RUN:cpu         READY         READY             1             1
  4        BLOCKED       RUN:cpu         READY         READY             1             1
  5        BLOCKED       RUN:cpu         READY         READY             1             1
  6        BLOCKED       RUN:cpu         READY         READY             1             1
  7*   RUN:io_done          DONE         READY         READY             1          
  8         RUN:io          DONE         READY         READY             1          
  9        BLOCKED          DONE       RUN:cpu         READY             1             1
 10        BLOCKED          DONE       RUN:cpu         READY             1             1
 11        BLOCKED          DONE       RUN:cpu         READY             1             1
 12        BLOCKED          DONE       RUN:cpu         READY             1             1
 13        BLOCKED          DONE       RUN:cpu         READY             1             1
 14*   RUN:io_done          DONE          DONE         READY             1          
 15         RUN:io          DONE          DONE         READY             1          
 16        BLOCKED          DONE          DONE       RUN:cpu             1             1
 17        BLOCKED          DONE          DONE       RUN:cpu             1             1
 18        BLOCKED          DONE          DONE       RUN:cpu             1             1
 19        BLOCKED          DONE          DONE       RUN:cpu             1             1
 20        BLOCKED          DONE          DONE       RUN:cpu             1             1
 21*   RUN:io_done          DONE          DONE          DONE             1          

Stats: Total Time 21
Stats: CPU Busy 21 (100.00%)
Stats: IO Busy  15 (71.43%)
```

可以發現時間只要 21 。
