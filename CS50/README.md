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

在 C 語言中，文件的指針會隨著調用 fread 函數而改變。
