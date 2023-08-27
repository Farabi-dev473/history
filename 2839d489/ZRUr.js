import getInstructionData from '../helpers/getInstructionData'
import getBuyerAndSeller from './getBuyerAndSeller'
import getTxType from './getTxType'

const getBuyerSellerAndOwner = (txId) => {
    const txType = getTxType(txId)
    const txData = getInstructionData(txId)

    let buyer = false
    let seller = false
    let owner = tx?.transaction?.message?.accountKeys[0]?.pubkey
  
    if(txType === "Sale") {
      const {buyer,seller} = getBuyerAndSeller(tx, txData?.programId)
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