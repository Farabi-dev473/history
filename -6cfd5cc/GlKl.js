const { Transaction , Connection} = require('@solana/web3.js');
const {readFileSync, read, readFile} = require('fs')
const solanaWeb3 = require('@solana/web3.js');

async function decodeTransaction(transaction) {
    const connection = new solanaWeb3.Connection('https://mainnet.solana.com');
    const decodedTransaction = await connection.getTransaction(transaction);
    console.log(decodedTransaction);
}



const data = readFileSync('./db.json', 'utf-8')
// console.log(JSON.parse(data))
decodeTransaction(data["4oBFNe4qY8HQGUMComcWQtDmF9Q9YGvLEYDUPbMWqeGBKRXTj5595C3N1EWyT6SRgFSSQys12kdaauDndNeHKbPR"])
