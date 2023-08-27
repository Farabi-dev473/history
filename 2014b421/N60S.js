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
      fields: [
        ["instructionDiscriminator", ["u8", 8]],
        ["buyerPrice", "u64"],
      ]
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
// })ENwHiaH9NA9veUqRzGozjWnTuR9xcNvHcPZVFMi3Ca9L
// 124T5FwdDUhFzQCzQ8sGZF2ZM6QLko1DSHzUeKqPNdysGN6pBdTNhNWUj4myVxgVj1scVwJqj
// ``
const buffer = Buffer.from(base58.decode('ENwHiaH9NA9veUqRzGozjWnTuR9xcNvHcPZVFMi3Ca9L'))

// console.log(borsh.deserialize(payloadSchema, Payload, buffer))
const output = borsh.deserializeUnchecked(payloadSchema, Payload, buffer).buyerPrice + ''
console.log(output)

// function hexToDecimal(hex) {
  // return parseInt(hex, 16);
// }
// console.log(hexToDecimal("11e1a300"));
