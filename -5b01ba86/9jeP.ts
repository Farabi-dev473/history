const  { PublicKey } = require('@solana/web3.js')
// import {deserialize} from'borsh'
const bs58 = require('bs58')
// const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));
const txData = new "2cPcFyTYwDdVFvvfGGz6f1t7YfWa7qXvZV"
const pubkey = new PublicKey("4oBFNe4qY8HQGUMComcWQtDmF9Q9YGvLEYDUPbMWqeGBKRXTj5595C3N1EWyT6SRgFSSQys12kdaauDndNeHKbPR")
console.log(bs58.decode(txData), pubkey )
// const transaction = await connection.getParsedTransaction(txId)

// class Primitive {
//     buyerPrice;
//     constructor(args: any) {
//       this.buyerPrice = args.buyerPrice;
//     }
// //   }

// // const schema = new Map([
// //     [
// //       Primitive,
// //       {
// //         kind: 'struct',
// //         fields: [
// //             ['instructionDiscriminator', 'u8'],
// //             ['buyerPrice', 'u64'],
// //           ],
// //       },
// //     ],
// //   ]);
// const txData = ""
// const programId = "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K"

// const data =  PublicKey.findProgramAddressSync([bs58.decode(txData)], new PublicKey(programId))
// console.log(data)
// const pubkey = new PublicKey("2nBb3aLfwxwmvMB2B9YVkN2EW7Az1ihzVZo888BhfW6F")
// console.log(pubkey)

// const isPdaPublicKey = (publicKey: string): boolean => {
//     try {
//       const pubkey = new PublicKey(publicKey);
//       return pubkey.isPda();
//     } catch (err) {
//         console.log(err)
//       return false;
//     }
//   };

  // console.log(isPdaPublicKey("2nBb3aLfwxwmvMB2B9YVkN2EW7Az1ihzVZo888BhfW6F"))