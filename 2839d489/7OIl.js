import getBuyerAndSeller from './getBuyerAndSeller.js'
import getInstructionData from '../helpers/getInstructionData.js'
import Store from 'data-store'
import {join} from 'node:path'
import getTxType from './getTxType.js'

const store = new Store('', {path: join(process.cwd(), 'src', 'db.json')})
 
const getBuyerSellerAndOwner = (txId) => {
    const tx = store.get(txId)
    const txType = getTxType(tx)
    const instruction = getInstructionData(tx, txType)
    
    let buyer = false
    let seller = false
    let owner = tx?.transaction?.message?.accountKeys[0]?.pubkey

    if(txType === "Sale") {
      const {buyer,seller} = getBuyerAndSeller(tx, instruction?.programId)
      owner = buyer
      return {
        buyer,
        seller,
        owner
      }
    }
  
    if(txType === "List") {
      seller = owner
    }
    
    return {buyer,seller,owner}
}

export default getBuyerSellerAndOwner