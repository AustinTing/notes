# Ch04 Homework  

根據不同 Run `process-run.py` 模擬的情境，試著理解 process 運作方式跟 CPU 使用率。

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
### 4. `./process-run.py -l 1:0,4:100 -c -S SWITCH_ON_END `  
	- 54.55%，數字可能跟 `./process-run.py -l 4:100,1:0` 一樣，但不知道無法切換但 CPU 有不做事怎麼算？  
		- 就沒有算做運作，且無法 concurency。   
- `./process-run.py -l 1:0,4:100  
	-c -S SWITCH_ON_IO`  
	- CPU 使用率應該會更高。  
	- 時間縮短  

### 5. `./process-run.py -l 3:0,5:100,5:100,5:100 -S SWITCH_ON_IO -I IO_RUN_LATER -c -p`  
- 感覺這種有機會遇到 dead lock
