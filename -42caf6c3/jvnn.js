import fs from 'node:fs'
import getBuyerPrice from './packages/decoders/getBuyerPrice.js'
import getTxType from './packages/decoders/getTxType.js'
import getBuyerSellerAndOwner from './packages/decoders/getBuyerSellerAndOwner.js'
import getSolAmount from './packages/helpers/getSolAmount.js'
import Store from 'data-store'

export const store = new Store('', {path: __dirname + '/db.json'})


const transactionIds = Object.keys(JSON.parse(fs.readFileSync(__dirname + '/db.json', 'utf-8')))
transactionIds.forEach((txId, i) => {
    const data = getBuyerPrice(txId)
    const tx = store.get(txId)
    const txType = getTxType(tx)
    // const d = getBuyerSellerAndOwner(txId)
    if(data.type === 'data') {
        const {lamports} = data
        const price = getSolAmount(lamports)
        console.log({i, txId, txType, price})
        return
    }

    console.log(data.error)
})