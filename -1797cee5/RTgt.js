
export default class ListEventParser {
    txId
    constructor(txId){
         this.txId = txId
    }
    tx = store.get(txId)
    txType = getTxType(tx)
    programId = getInstructionData(tx, txType)?.programId
    accounts = getAccounts(tx)
     
    pdaAddress = false
    auctionHouse = false
    tokenAddress = false
    tokenMint = false
    seller = false
    sellerReferral = false
    tokenSize = false
    price = false
    expiry = false
    logMessage = false

    price = getSolAmount(getBuyerPrice(txId).lamports)
    tokenSize = tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount 
    tokenMint = getMintAddress(txId)
}