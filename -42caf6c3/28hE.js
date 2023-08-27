
import fs from 'fs';
import {programs} from './programs.js'
import getBuyerPrice from './packages/decoders/getBuyerPrice.js';
import getBuyerSellerAndOwner from './packages/decoders/getBuyerSellerAndOwner.js';
import getTxType from './packages/decoders/getTxType.js';
import getProgramDataFromAccounts from './packages/decoders/getProgramDataFromAccounts.js';
import getSolAmount from './packages/helpers/getSolAmount.js'
import Store from 'data-store';

const store = new Store('', {path: process.cwd() + '/db.json'})

async function main() {
  const transactionIds = Object.keys(JSON.parse(fs.readFileSync(__dirname + '/db.json')))

  transactionIds.forEach((txId, i) => {
    const data = getBuyerPrice(txId)
    const tx = store.get(txId)
    const txType = getTxType(tx)    
    if(!data.err) {
       const {lamports} = data
       const price = getSolAmount(lamports)
       console.log({i, txId, price, txType})
    }
  })
 

/**
 * Output
{ buyerPrice: 250000000000, i: 0 }
{ buyerPrice: 40000000000, i: 1 }
{ buyerPrice: 17000000000, i: 2 }
{ buyerPrice: 970000000, i: 3 }
{ buyerPrice: 17900000000, i: 4 }
{ buyerPrice: 15000000000, i: 5 }
{ buyerPrice: 52500000000, i: 6 }
{ buyerPrice: 100000000000, i: 7 }
{ buyerPrice: 5690000000, i: 8 }
{ buyerPrice: 15150000000, i: 9 }
{ buyerPrice: 300000000, i: 10 }
*/
}

main();