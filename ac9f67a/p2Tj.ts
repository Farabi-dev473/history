import getTransaction from "./lib/getTransaction";
import singleTransactionParser from "./lib/single-tx-parser";
import fs from 'node:fs'
import Store from 'data-store'
import path from "node:path";

const transactionIds = Object.keys(JSON.parse(fs.readFileSync(process.cwd() + '/data.json', 'utf-8')))
const store = new Store({path: process.cwd() + '/data.json'})

transactionIds.forEach((txId) => {
   const transaction = store.get(txId)
   const parsedData = singleTransactionParser(transaction)      
   transaction.value = parsedData
   store.set(txId, transaction)
})
