
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

    const txType = getTxType(tx);
    const programData = getProgramDataFromAccounts(tx);
    const programParser = programData?.programData?.actions[txType];
    
    if (programParser?.schemaFields) {
      const txData = tx.transaction.message.instructions
        .filter((e) => e?.accounts?.length && e.data && e.programId)
        .sort((a, b) => {
          let aLength = a?.accounts?.length;
          let bLength = b?.accounts?.length;
          const slug = programData.slug.toLowerCase();
          if (slug === "yawww" || slug === "opensea" || slug === "coralcube" || slug === "auction_house_coralcube")
            return bLength - aLength;
          return aLength - bLength;
        })[0];




      // TODO: Do something here to get the below outputs
      const {schemaFields} = programs[txData.programId]["actions"][`${txType}`]
      const result = getBuyerPrice(schemaFields, txData.data)
      // console.log(result, i)
      if(result.type === "data"){
        const {lamports} = result
        const numOfPrecisions = 2
        const amount = getSolAmount(lamports).toFixed(numOfPrecisions) + ' SOL'
        const user = getBuyerSellerAndOwner(tx,txType,txData.programId)
        console.log({i, txId: transactionIds[i], txType, slug: programData.slug , lamports, amount, ...user})
        return
      }
      console.log(result.error, i)
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