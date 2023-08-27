import fs from 'node:fs'
import getBuyerPrice from './packages/decoders/getBuyerPrice.js'
import getTxType from './packages/decoders/getTxType.js'
import getSolAmount from './packages/helpers/getSolAmount.js'
import Store from 'data-store'

const store = new Store('', {path: __dirname + '/db.json'})


const transactionIds = Object.keys(JSON.parse(fs.readFileSync(__dirname + '/db.json', 'utf-8')))
transactionIds.forEach((txId, i) => {
    const data = getBuyerPrice(txId)
    const txType = getTxType()
    if(data.type === 'data') {
        const {lamports} = data
        const price = getSolAmount(lamports)
        console.log({i, txId, price})
        return
    }

    console.log(data.error)
})