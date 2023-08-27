import borsh from 'borsh'
import base58 from 'bs58';

const arr = [
    [
        ["instructionDiscriminator", ["u8", 8]],
        ["", "u8"],
        ["", "u8"],
        ["buyerPrice", "u64"],
    ],
    [
        ["instructionDiscriminator", ["u8", 8]],
        ["", "u8"],
        ["buyerPrice", "u64"],
      ],
      [
        ["instructionDiscriminator", ["u8", 8]],
        ["buyerPrice", "u64"],
      ],
      [
        ["instructionDiscriminator", ["u8", 8]],
        ["", "u8"],
        ["", "u8"],
        ["buyerPrice", "u64"],
      ],
      [
        ["instructionDiscriminator", ["u8", 8]],
        ["", "u8"],
        ["", "u8"],
        ["buyerPrice", "u64"],
      ],
      [
        ["instructionDiscriminator", ["u8", 8]],
        ["", "u8"],
        ["", "u8"],
        ["", "u8"],
        ["buyerPrice", "u64"],
      ],
      [
        ["instructionDiscriminator", ["u8", 8]],
        ["", "u8"],
        ["", "u8"],
        ["", "u8"],
        ["buyerPrice", "u64"],
      ],
      [
        ["instructionDiscriminator", ["u8", 8]],
        ["buyerPrice", "u64"],
      ],
      [
        ["instructionDiscriminator", "u8"],
        ["buyerPrice", "u64"],
      ],
      [
        ["instructionDiscriminator", "u8"],
        ["buyerPrice", "u64"],
      ],
      [
        ["instructionDiscriminator", "u8"],
        ["buyerPrice", "u64"],
      ],[
        ["instructionDiscriminator", ["u8", 8]],
        ["tradeStateBump", "u8"],
        ["buyerPrice", "u64"],
      ],
      [
        ["instructionDiscriminator", "u8"],
        ["buyerPrice", "u64"],
        ],
        [
            ["instructionDiscriminator", ["u8", 2]],
            ["buyerPrice", "u64"],
          ],

null
]

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
        ["instructionDiscriminator", ["u8", 8]],
        ["", "u8"],
        ["buyerPrice", "u32"],
      ],
    },
  ],
]);

const value = new Payload({
    id: 5,
    key: 'Hello',
    value: 'World'
})

// const buffer = Buffer.from(base58.decode('2UnrLWTniTcs'))
// console.log(buffer.length)

// arr.forEach((schemaField) => {
//     const payloadSchema = new Map([
//         [
//           Payload,
//           {
//             kind: "struct",
//             fields:  schemaField,
//           },
//         ],
//       ]);
//     try {
//         console.log(borsh.deserialize(payloadSchema, Payload, buffer ))
//     }catch(err) {
//         console.log(err)
//     }
// })

const buffer = Buffer.from(base58.decode('3GyWrkssW12wQTbzN4smGdnf'))

// console.log(borsh.deserialize(payloadSchema, Payload, buffer))
console.log(borsh.deserializeUnchecked(payloadSchema, Payload, buffer))