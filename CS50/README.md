# CS50

## Preparation

[CS50 Lib](https://cs50.readthedocs.io/libraries/cs50/c/): CS50 寫好的小工具套件。Compile 時要記得加 `-lcs50`。
```bash
clang test.c -lcs50
```



[check50](https://cs50.readthedocs.io/projects/check50/en/latest/): 檢查作業的程式。

```bash
> pip install check50
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
