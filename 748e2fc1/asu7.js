const {Transaction, Connection, } = require('@solana/web3.js')
const base58 = require('bs58')
const data = base58.decode("ENwHiaH9NA9veUqRzGozjWnTuR9xcNvHcPZVFMi3Ca9L")
// console.log(Transaction.from(data))
console.log(Buffer.from(data).)

