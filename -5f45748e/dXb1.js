import borsh from 'borsh'

const deserializedValue = borsh.deserialize(schema, buffer);
console.log(deserializedValue);
