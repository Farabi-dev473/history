const { PublicKey} =  require('@solana/web3.js')
// import {deserialize} from'borsh'
const bs58 = require('bs58')
// const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));

// const txId = "4oBFNe4qY8HQGUMComcWQtDmF9Q9YGvLEYDUPbMWqeGBKRXTj5595C3N1EWyT6SRgFSSQys12kdaauDndNeHKbPR"
// const transaction = await connection.getParsedTransaction(txId)

// class Primitive {
//     buyerPrice;
//     constructor(args: any) {
//       this.buyerPrice = args.buyerPrice;
//     }
//   }

// const schema = new Map([
//     [
//       Primitive,
//       {
//         kind: 'struct',
//         fields: [
//             ['instructionDiscriminator', 'u8'],
//             ['buyerPrice', 'u64'],
//           ],
//       },
//     ],
//   ]);
const txData = "2B3vSpRNKZZWu2Td1YeRbKeKFhn8XS72YcaAHbHbF2H9n2J"
const programId = "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K"

const data =  PublicKey.findProgramAddressSync([bs58.decode(txData)], new PublicKey(programId))
console.log(data)