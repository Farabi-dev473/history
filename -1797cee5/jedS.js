import getTxType from '../../decoders/getTxType.js'
import getTxType from '../../helpers/getInstructionData.js'
import getTxType from '../../decoders/getAccounts..js'
import Store from 'data-store'
import {join} from 'node:path'

const store = new Store('', {path: join(process.cwd(), 'src', 'db.json')})
console.log(store.path)
export default class ListEventParser {
    
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