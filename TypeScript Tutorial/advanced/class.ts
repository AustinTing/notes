class Animal {
  private name: string;
  public constructor(name: string) {
      this.name = name;
  }
}

let a = new Animal('Jack');
// 'name' 是私用屬性，只可從類別 'Animal' 中存取。ts(2341)
// console.log(a.name); 
// a.name = 'Tom'; 
// console.log(a.name); 
