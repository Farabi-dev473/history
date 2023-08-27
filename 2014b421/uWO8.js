import borsh from 'borsh'
import base58 from 'bs58';
class Assignable {
    constructor(properties) {
      Object.keys(properties).map((key) => {
        return (this[key] = properties[key]);
      });
    }
  }

  class Payload extends Assignable {}

// Borsh needs a schema describing the payload
const payloadSchema = new Map([
  [
    Payload,
    {
      kind: "struct",
      fields:  [
        ["instructionDiscriminator", ["u8", 2]],
        ["buyerPrice", "u64"],
      ],
    },
  ],
]);

const value = new Payload({
    id: 5,
    key: 'Hello',
    value: 'World'
})

const buffer = Buffer.from(base58.decode('4gK3rVwkyY7GTMR1VEX'))
console.log(buffer.length)

console.log(borsh.deserialize(payloadSchema, Payload, buffer ))