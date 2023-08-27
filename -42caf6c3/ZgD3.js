import fs from 'node:fs'
import getBuyerPrice from './packages/decoders/getBuyerPrice.js'

const transactionIds = Object.keys(JSON.parse(fs.readFileSync(__dirname + '/db.json', 'utf-8')))
transactionIds.forEach((txId, i) => {
    console.log(i)
    // console.log(getBuyerPrice(txId))
    getBuyerPrice(txId)
    // console.log(typeof txId)
})