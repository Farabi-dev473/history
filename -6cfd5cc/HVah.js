const { Transaction , Connection, PublicKey, clusterApiUrl} = require('@solana/web3.js')
const {encode, decode} = require('bs58')

console.log(Transaction.from(Buffer.from(decode('4oBFNe4qY8HQGUMComcWQtDmF9Q9YGvLEYDUPbMWqeGBKRXTj5595C3N1EWyT6SRgFSSQys12kdaauDndNeHKbPR'))))

const connection = new Connection(clusterApiUrl('testnet'), 'confirmed')

const fn = async() => {
  const pb = new PublicKey('3SZ7dpXCYu1XN6r9x4ekQNrmdMQQpyemmA1fSUQ49Mph')
  console.log(await connection.getAccountInfo(pb))

}

fn()