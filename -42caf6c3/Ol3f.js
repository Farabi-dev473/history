import fs from 'node:fs'

const transactionIds = Object.keys(JSON.parse(fs.readFileSync(__dirname + '/db.json', 'utf-8')))
transactionIds.forEach((txId, i) => {
  console.log(txId)
})