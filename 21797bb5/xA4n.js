import getSeller from './getSeller'

const getBuyerSellerAndOwner = (tx, txType, programId) => {

    let buyer = false
    let seller = false
    let owner = false
  
    const {transaction: {message: {accountKeys}}} = tx
    owner = accountKeys[0].pubkey
  
  
    if(txType === "Sale") {
      buyer = owner
      seller = getSeller(tx, programId)
  
      if(programId === "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc") {
         buyer = seller.buyer
         owner = buyer
         seller = seller.seller
      }
    }
  
    if(txType === "List") {
      seller = owner
    }
  
    return {buyer,seller,owner}
}

export default getBuyerSellerAndOwner