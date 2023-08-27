import getBuyerAndSeller from './getBuyerAndSeller'

const getBuyerSellerAndOwner = (tx, txType, programId) => {

    let buyer = false
    let seller = false
    let owner = tx?.transaction?.message?.accountKeys[0]?.pubkey
  
    if(txType === "Sale") {
      const {buyer,seller} = getBuyerAndSeller(tx, programId)
      owner = buyer
      return {
        owner,
        buyer,
        seller
      }
    }
  
    if(txType === "List") {
      seller = owner
    }
  
    return {buyer,seller,owner}
}

export default getBuyerSellerAndOwner