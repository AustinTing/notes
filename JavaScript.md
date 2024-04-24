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


# Luxon (another MomentJS)

- Init

```js
const { DateTime } = require("luxon")
```

- Format，可以參考 [Preset](https://moment.github.io/luxon/#/formatting?id=presets)

```js
const dt = DateTime.fromMillis(1667890476496)
// ISO string
dt.toISO() // '2022-11-08T14:54:36.496+08:00'
// YYYY/MM/dd
dt.toLocaleString() // '2022/11/8'
// HH/mm/ss 
dt.toLocaleString(DateTime.TIME_24_WITH_SECONDS) // '14:54:36'
```

- 比較兩個時間是不是在同一天（年日月也要相同）

```js
const date = DateTime.fromMillis(1667810352000)
date.hasSame(DateTime.now(), 'day')
```

- [TimeZone列表](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)