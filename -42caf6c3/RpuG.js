import fs from 'node:fs'

const transactionIds = Object.keys(JSON.parse(fs.readFileSync('./db.json', 'utf-8')))
console.log(transactionIds)