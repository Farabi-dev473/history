import fs from 'node:fs'
import getBuyerPrice from './packages/decoders/getBuyerPrice'

const transactionIds = Object.keys(JSON.parse(fs.readFileSync(__dirname + '/db.json', 'utf-8')))
transactionIds.forEach((txId, i) => {
    console.log(getBuyerPrice(txId))
    // console.log(typeof txId)
})