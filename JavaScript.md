# JavaScript

## Moment

算出兩個日期時間差，再將時間差加到另一個時間：

```js
const a = moment(1669766400000) // Moment<2022-11-30T08:00:00+08:00>
const b = moment(1669809600000) // Moment<2022-11-30T20:00:00+08:00>
const duration = moment.duration(b.diff(a)) // 要注意 b 的時間比 a 晚。duration.humanize() -> '12 hours'
const c = moment(1669852800000) // Moment<2022-12-01T08:00:00+08:00>
c.add(duration) // Moment<2022-12-01T20:00:00+08:00>
```
