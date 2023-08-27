import borsh from 'borsh'

const mySchema = {
  name: 'Person',
  fields: {
    name: { type: 'string' },
    age: { type: 'uint8' },
    address: { type: 'Address' },
  },
};
const AddressSchema = {
  name: 'Address',
  fields: {
    street: { type: 'string' },
    city: { type: 'string' },
    state: { type: 'string' },
    zip: { type: 'string' },
  },
};

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

const serializedObject = borsh.serialize(mySchema, myObject);
console.log(serializedObject);
