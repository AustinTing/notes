// enum Days { Sun, Mon, Tue, Wed, Thu, Fri, Sat };

// console.log(Days["Sun"] === 0); // true
// console.log(Days[0] === "Sun"); // true

// enum Days {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};

// console.log(Days["Sun"] === 7); // true
// console.log(Days["Mon"] === 1.5); // true
// console.log(Days["Tue"] === 2.5); // true
// console.log(Days["Sat"] === 6.5); // true

// const getRandomInt = () => {
//     return Math.floor(Math.random() * 10);
// }

enum Days { Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat };

console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true
console.log(Days["Sun"] === Days["Wed"]); // true
// console.log(Days["Sun"] === Days["Thu"]); // 此比較似乎是無意的，因為類型 'Days.Sun' 和 'Days.Thu' 沒有重疊。ts(2367)

// enum Color {Red = "red".length, Green, Blue}; // 列舉成員必須有初始設定式。ts(1061)
