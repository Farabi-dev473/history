class Assignable {
  constructor(properties) {
    Object.keys(properties).map((key) => {
      return (this[key] = properties[key]);
    });
  }
}


const s = new Assignable({x: 120, y: 5})
console.log(s)