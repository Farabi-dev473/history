const { Transaction } = require('@solana/web3.js');
const {readFileSync, read, readFile} = require('fs')
async function decodeTransaction(transaction) {
    const decodedTransaction = await Transaction.decode(transaction);
    console.log(decodedTransaction);
}


const data = readFileSync('./db.json', 'utf-8')
console.log(data)
// decodeTransaction(data["4oBFNe4qY8HQGUMComcWQtDmF9Q9YGvLEYDUPbMWqeGBKRXTj5595C3N1EWyT6SRgFSSQys12kdaauDndNeHKbPR"])
