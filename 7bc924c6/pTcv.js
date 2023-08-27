import Store from 'data-store'
import jsonFormat from 'json-format'
import fs from 'node:fs'
const store = new Store({path: process.cwd() + '/data.json'})
const transactionIds = Object.keys(JSON.parse(fs.readFileSync(process.cwd() + '/data.json', 'utf-8')))

transactionIds.forEach((txId) => {
    const transaction = {}
    const tx = store.get(txId)
    transaction.transaction = tx
    store.set(txId, transaction)
})