import borsh from 'borsh'
class Test {
    x
    y
    z
    q
  constructor(obj) {
    this.x = obj.x
    this.y = obj.y
    this.q = obj.q
  }
}
const value = new Test({ x: 255, y: 20, z: '123', q: [1, 2, 3] });
const schema = new Map([[Test, { kind: 'struct', fields: [['x', 'u8'], ['y', 'u64'], ['z', 'string'], ['q', [3]]] }]]);
const myObject = {
    name: "John",
    age: 30,
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345"
    }
  };
const buffer = borsh.serialize(myObject);

