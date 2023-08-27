const { Transaction , Connection} = require('@solana/web3.js');
const {readFileSync, read, readFile} = require('fs')
const web3 = require('@solana/web3.js');

const fn = async() => {
  // connect to the `devnet` cluster and get the current `slot`
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
const slot = await connection.getSlot();

// get the latest block (allowing for v0 transactions)
const block = await connection.getBlock(slot, {
  maxSupportedTransactionVersion: 0,
});

// get a specific transaction (allowing for v0 transactions)
const getTx = await connection.getTransaction(
  "4oBFNe4qY8HQGUMComcWQtDmF9Q9YGvLEYDUPbMWqeGBKRXTj5595C3N1EWyT6SRgFSSQys12kdaauDndNeHKbPR",
  {
    maxSupportedTransactionVersion: 0,
  },
);
console.log(getTx)
}

fn()