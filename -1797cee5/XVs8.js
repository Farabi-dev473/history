
import getAccounts from '../../decoders/getAccounts.js'
import Store from 'data-store'
import {join} from 'node:path'

const store = new Store('', {path: join(process.cwd(), 'src', 'db.json')})

export default class ListEventParser {
    
    tx
    constructor(txId) {
        this.init(txId)
    }

    init(txId){
        let txId, tx, accounts, pdaAddress, auctionhosu, tokenAddress, tokenMint, seller, sellerReferral, tokenSize, expiry, price, logMessage

        tx = store.get(txId)
        accounts = getAccounts(tx)
        price = getSolAmount(getBuyerPrice(txId).lamports)
        tokenSize = tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount 
        tokenMint = getMintAddress(txId)
    }

}