import web3, { PublicKey } from '@solana/web3.js'
// import {deserialize} from'borsh'
import bs58 from 'bs58';
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
const txData = "2cPcFyTYwDdVFvvfGGz6f1t7YfWa7qXvZV"
const programId = "CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz"

const data = await PublicKey.findProgramAddressSync([bs58.decode(txData)], new PublicKey(programId))
console.log(data)