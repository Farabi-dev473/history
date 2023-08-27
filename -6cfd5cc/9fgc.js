import {Transaction, Connection} from '@solana/web3.js'

const connection = new Connection('wss://testnet.solana.com')

const fn = async() => {
  const transaction = await connection.getTransaction('4oBFNe4qY8HQGUMComcWQtDmF9Q9YGvLEYDUPbMWqeGBKRXTj5595C3N1EWyT6SRgFSSQys12kdaauDndNeHKbPR')
  console.log(transaction)
}