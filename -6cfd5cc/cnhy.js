const { Transaction } = require('@solana/web3.js')
const {encode, decode} = require('bs58')

console.log(Transaction.from(decode('4oBFNe4qY8HQGUMComcWQtDmF9Q9YGvLEYDUPbMWqeGBKRXTj5595C3N1EWyT6SRgFSSQys12kdaauDndNeHKbPR')))