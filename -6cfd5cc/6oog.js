const { Transaction } = require('@solana/web3.js')
const {encode, decode} = require('bs58')

console.log(Transaction.from(Buffer.from(decode('ENwHiaH9NA9veUqRzGozjWnTuR9xcNvHcPZVFMi3Ca9L'))))