# Find Peak

找出一個陣列中的數值的 Peaks ，並回傳其 Index。

要注意如果資料是一路向上或是一路向下的話，就沒有 Peak 了。

```js
// Find Local Maxima Indexs in an array
const findPeakIndexs = (arr) => {
  let midpoints = new Array(Math.floor(arr.length / 2)).fill(0);
  let left_edges = new Array(Math.floor(arr.length / 2)).fill(0);
  let right_edges = new Array(Math.floor(arr.length / 2)).fill(0);
  let m = 0;  // Pointer to the end of valid area in allocated arrays
  let i = 1;  // Pointer to current sample, first one can't be maxima
  let i_max = arr.length - 1;  // Last sample can't be maxima

  while (i < i_max) {
    // Test if previous sample is smaller
    if (arr[i - 1] < arr[i]) {
      let i_ahead = i + 1;  // Index to look ahead of current sample

      // Find next sample that is unequal to x[i]
      while (i_ahead < i_max && arr[i_ahead] === arr[i]) {
        i_ahead++;
      }

      // Maxima is found if next unequal sample is smaller than x[i]
      if (arr[i_ahead] < arr[i]) {
        left_edges[m] = i;
        right_edges[m] = i_ahead - 1;
        midpoints[m] = Math.floor((left_edges[m] + right_edges[m]) / 2);
        m++;

        // Skip samples that can't be maximum
        i = i_ahead;
      }
    }
    i++;
  }
  // Resize the arrays to keep only the valid part
  midpoints = midpoints.slice(0, m);
  left_edges = left_edges.slice(0, m);
  right_edges = right_edges.slice(0, m);

  return midpoints
}
```