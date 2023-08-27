
import getAccounts from '../../decoders/getAccounts.js'
import Store from 'data-store'
import {join} from 'node:path'

const store = new Store('', {path: join(process.cwd(), 'src', 'db.json')})

export default class ListEventParser {
    
    tx
    constructor(txId) {
        this.txId = txId
        this.tx = store.get(txId)
        this.accounts = getAccounts(tx)
        this.pdaAddress = false
        this.auctionHouse = false
        this.tokenAddress = false
        this.tokenMint = false
        this.seller = false
        this.sellerReferral = false
        this.tokenSize = false
        this.price = false
        this.expiry = false
        this.logMessage = false

        this.price = getSolAmount(getBuyerPrice(txId).lamports)
        this.tokenSize = tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount 
        this.tokenMint = getMintAddress(txId)
    }

}