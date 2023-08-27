import web3 from '@solana/web3.js'

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));

const txId = "4oBFNe4qY8HQGUMComcWQtDmF9Q9YGvLEYDUPbMWqeGBKRXTj5595C3N1EWyT6SRgFSSQys12kdaauDndNeHKbPR"
const transaction = await connection.getParsedTransaction(txId)
