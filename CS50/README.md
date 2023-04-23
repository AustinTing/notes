# CS50

重溫 C 與寫好玩的題目。

## Preparation

[CS50 Lib](https://cs50.readthedocs.io/libraries/cs50/c/): CS50 寫好的小工具套件。Compile 時要記得加 `-lcs50`。
```bash
clang test.c -lcs50
```



[check50](https://cs50.readthedocs.io/projects/check50/en/latest/): 檢查作業的程式。

```bash
>   cd
> check50 --local cs50/problems/2022/x/<題目名>
// ex: check50 --local cs50/problems/2022/x/plurality
```



## [Algorithm](https://cs50.harvard.edu/x/2022/weeks/3/)

### Linear search

```
for i from 0 to n -1
    if 50 is behind doors[i]
        return true
return false
```

### Binary search

注意：陣列有先排序過

```
if no doors left
    return false
if 50 is behind doors[middle]
    return true
else if 50 < doors[middle]
    Search doors[0] through doors[middle -1]
else if 50 > doors[middle]
    Search doors[middle + 1] through doors[n - 1]
```

### Big-O 

只是用來方便表達某個演算法的表現(upper bound)。O(n) O(n/2) 將資料筆數加大後，其次數/時間的圖都會長的差不多（都是一條斜線)，但是那兩個跟 O(log~2~ n)就完全不一樣。相同地，O(1) 與 O(1000) 也是一樣，因為是一個固定的值。

幾種經典演算法時間複雜度的表現，由高至低：
1. O(n^2^)
2. O(n log n)
3. O(n)  // linear search
4. O(log n) // binary search
5. O(1)


### Omega

用來表達某個演算法最樂觀的情況(lower bound)。

1. Ω(n^2^)
2. Ω(n log n)
3. Ω(n) 
4. Ω(log n) 
5. Ω(1) // linear search & binary search

### Theta Θ

- 如果有複雜度 upper bound 和 lower bound 剛好一樣，就可以用 Θ
- everything break down to Θ

1. Θ(n^2^)
2. Θ(n log n)
3. Θ(n) // ex: 數班上有幾個學生
4. Θ(log n) 
5. Θ(1) 


## [Memory](https://cs50.harvard.edu/x/2022/weeks/4/)

### Pointer

`&`: 取得變數的 address 。
`*`: 這個一個 pointer 。
[Standford Pointer Fun](https://www.youtube.com/watch?v=5VnDaHBi8dM)

```C
int n = 50;
int *p = &n;
```

printf 裡的 `%p`: 印出變數的 address 。

#### Pointer Arithmtic

對 pointer 做加法，電腦會依據存的型別，自動跳下一個 memory 位置。開發者可以不會去考慮每個 type 需要佔據的記憶體大小。
```C
int numbers[] = {2, 4, 6, 8};
printf("%i\n", *numbers);       // 2
printf("%i\n", *(numbers + 1)); // 4，一次跳 4 個 bytes 拿到 4
printf("%i\n", *(numbers + 2)); // 6
printf("%i\n", *(numbers + 3)); // 8
```

### Compare 

`==` 比較是比對兩個 address 是不是相同。
字串如果要比較要用 `<string.h>` 裡的 `strcmp(s, t) == 0`。

### malloc and free

如果有用到 malloc 就應該用完後 free 它。沒用 malloc 而創的 memory 交給 OS 自己去處理。
如果忘記 malloc 該用多少的空間，可以 `sizeof()` 知道是多少 bytes。

```C
int *x = malloc(sizeof(int));
```

[valgrind](https://valgrind.org/): 協助查看程式是否有造成 memory 明顯錯誤的工具。
```sh
valgrind ./your-program
```

Garbage: 宣告變數但不賦值，那個變數裡面就是存垃圾資料。


### Howework

[Lab - volume](./week4-lab-volume/)

[Problem Set - Filter(Less)](./week4-problem-set-filter-less/)

在 C 語言中，文件的指針會隨著調用 fread 函數而改變。

兩 int 四捨五入，可以把某一個先轉成 float 再相除再 +0.5:

```C
int a = 3;
int b = 2;
int quotient = a / b; // quotient = 1
int roundedQuotients = (float)a/b + 0.5; // roundedQuotients = 2
```

## [Date Structures](https://cs50.harvard.edu/x/2023/weeks/5/)


### First-In-First-Out, FIFO

enqueue: 將資料加在 queue 尾端。

dequeue: 將資料從 queue 前端移除。

### 陣列宣告及分配記憶體

如果直接宣告，將無法再增加元素進陣列：

```C
int list[3]; // 使用 stack 
```

用 malloc 可以動態分配記憶體 free ：

```C
// --
int *list = malloc(3 * sizeof(int)); // 使用 heap ，可以要求更多空間
// 在C語言中，當使用malloc函數動態分配記憶體時，如果系統無法分配足夠的記憶體，就會返回一個null指針，表示分配失敗。
if (list == NULL) {
    printf("Memory allocation failed\n");
    exit(1);
}
```

自己寫陣列新增元素，需要先宣告一個 tmp array ，再把原來的 list 一個一個 copy 進 tmp， 。嫌麻煩可以直接使用 realloc:

```C
int *list = malloc(3 * sizeof(int));
list[0] = 1;
list[1] = 2;
list[2] = 3;

//使用realloc重新分配記憶體大小

int *tmp = realloc(list, 5 * sizeof(int));
if (tmp == NULL) { // // 也要檢查是否有 realloc 是否成功
    printf("Memory allocation failed\n");
    exit(1);
}

list = tmp;
list[3] = 4;
list[4] = 5;

//使用list指針進行操作
```

> 為什麼老師在宣告 tmp 下面，在假如 tmp 宣告失敗時，要 free(list)?

### Linked List

由節點（node）組成，每個節點包含了一個值（value）和一個指向下一個節點的指針（next）。使用 Linked List 時，需要創建一個指向 List 開頭的「head」指針。使用 NULL 當作結尾。

定義
```C
typedef struct node { // 之所以要再寫一次 node ，是因為 node 在下面使用時還沒宣告，所以這邊要先宣告一次。
    int number;          // 節點存儲的值
    struct node *next;  // 指向下一個節點的指針
}
node;
```
[新增 Linked List 的第一個 node](https://youtu.be/X8h4dq9Hzq8?t=3477)

```C
// 1. 宣告一個 pointer 並清空原始裡面的值，當作 Linked List 的 head
node *list = NULL; 

// 2. 宣告 pointer 、分配一個 node 大小的記憶體、將這個 node 記憶體位置寫進 pointer。
node *n = malloc(sizeof(node)); 

// 3. 賦值
(*n).number = 1; // 找到 pointer 指的東西（node），進到 node 結構裡面找到 number ，並賦值 1 。
n -> number = 1; // 同上，這是一種語法堂

// 4. 補上結尾
n -> next = NULL;

// 5. 將 n 指的東西給 list
list = n;
```

[新增第二個 node](https://youtu.be/X8h4dq9Hzq8?t=3783)

```C
// 1. 宣告 pointer 、分配一個 node 大小的記憶體、將這個 node 記憶體位置寫進 pointer。
node *n = malloc(sizeof(node)); 

// 2. (DeRef)找到 pointer 指的東西（node），進到 node 結構裡面找到 number ，並賦值 2 。
n -> number = 2;

// 3. 補上結尾
n -> next = NULL;

// 4. 賦值第二個 node 的 next，值是 list 所指的 node 位置。
n -> next = list;

// 5. 再把 n 指的位置交給 list
list = n;
```

上面實作 push 元素時，是將元素新增在最前面。

#### 時間複雜度

linked list的時間複雜度可以根據具體實現方式而有所不同(新元素是以開頭插入還是以結尾連接)。

查詢：O(n)

排序時間複雜度

- Insertion Sort: O(n^2)
- Selection Sort: O(n^2)
- Merge Sort: O(n log n)
- Quick Sort: O(n log n)

### Binary Search Tree

可以做 Binary Search 的 Tree 結構。

定義
```C
typedef struct node { // 之所以要再寫一次 node ，是因為 node 在下面使用時還沒宣告，所以這邊要先宣告一次。
    int number;          // 節點存儲的值
    struct node *left;  // 指向左節點的指針
    struct node *right;  // 指向右節點的指針
}
node;
```

是否是 balance 的 tree 會決定操作時的時間複雜度。

### Dictionaries

Key, value。

O(n|k), k 分出來的組數，上課的例子就是 k = 26(A ~ Z)。要根據 n 去設計 k 要多大，以及設計 hash function 讓 input 資料可以平均分派在 hash table 裡。

### Tries

字典樹

O(k), k 為給定的字串長度

空間複雜度超高


## Week 6 Python

### Functions

#### range

```py
range(5)           # 返回 [0, 1, 2, 3, 4]
range(1, 5)        # 返回 [1, 2, 3, 4]
range(0, 10, 2)    # 返回 [0, 2, 4, 6, 8]
range(10, 0, -1)   # 返回 [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```

#### input

要注意 input 回傳的是字串。

```py
num = int(input("Please enter your age: "))
```
#### print

參數 end 可以設定更改原本結尾預設是換行的行為

```py
print("Hello,", end='')
print("World!", end='')
print("My", end='')
print("name", end='')
print("is", end='')
print("Alice.")
// Hello,World!MynameisAlice.
```

### Issues

#### Truncation

Python 也是有尾數會被截斷問題。

```py
x = int(input("x: ")) // 1
y = int(input("y: ")) // 3
z = x / y
print(z) // 0.3333333333333333
```

#### Floating Point Imprecision 

Python 也是要注意浮點數運算時的精度問題。

```py
x = int(input("x: ")) // 1
y = int(input("y: ")) // 3
z = x / y
print(f"{z: .50f}") // .33333333333333331482961625624739099293947219848633
```

#### ~~Integer Overflow~~

Python 不會有這個問題，但要注意效能。

### Try Catch

```py
try:
    x = int(input("Please enter a number: "))
except ValueError:
    print("Oops! That was not a valid number. Please try again...")
```

### Week 7 SQL

- 用 for in 一個物件所有 key 時，如果又想要有特別得排序，可以先 sorted key 再 for in。

#### SQLite

`.schema` 命令，它會顯示出所有表的定義，包括表名、列名、數據類型以及約束等信息。

`NUMERIC` 可以存儲整數、浮點數或者十進制數，並且能夠保留小數點後任意位數的精度，因此非常適合於存儲需要高精度計算的數據，如財務數據或科學計算結果等。

`REAL` 類型是一個浮點數類型，可以存儲 8 字節的 IEEE 浮點數。它可以存儲任意小數位數的數字，但在精度方面可能存在一些誤差。

NUMERIC 類型比 REAL 類型更加精確，但在存儲和計算方面需要更多的資源。因此，在使用這兩種類型之前，需要根據應用程序的需求和計算要求來選擇合適的類型。

### Week 8 Web

Transmission Control Protocol(TCP)

cURL: connecnt to URL / [Client for URL](https://en.wikipedia.org/wiki/CURL)

Server 其實是指軟體，它收到 requests 會回 response。

輸入網址會變超連結其實是各家軟體實作的。

Submit form 後，form 會將資料用 query string 的方式帶到 action 屬性指定的 URL 。

### Week 10 Emoji

[Unicode Consortium](https://unicode.org/consortium/consort.html) 主要有三個 projects:

1. Encoding character
2. Localization Resources
    - Common Locale Data Repository(CLDR): 目的是為了解決不同語言和文化之間的本地化差異，提供標準化的數據集，使軟件開發人員能夠更容易地開發支持多語言和多地區的應用程序。CLDR的數據是通過對不同地區的本地專家進行調查和研究來獲得的，並且定期進行更新和維護。
3. Programming library
    - ICU是基於Unicode標準和CLDR項目開發的，它提供了一個豐富的API和工具，使軟件開發人員能夠更容易地開發支持多語言和多地區的應用程序。

### Cybersecurity

4-character password: 94^4 = 78,074,896 種組合

8-character password: 94^8 = 6,095,689,385,410,816 種組合 (quadrillion)

網路安全是一種比較的概念。

Ransomware 是一種惡意軟體（malware），也被稱為勒索軟體。它的攻擊方式是透過植入計算機或行動裝置中，加密或鎖定被感染裝置中的檔案或系統，進而勒索受害者支付贖金（ransom）來解鎖或解密被封鎖的檔案或系統。



