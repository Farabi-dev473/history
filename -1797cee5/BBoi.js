
import getAccounts from '../../decoders/getAccounts.js'
import Store from 'data-store'
import {join} from 'node:path'

const store = new Store('', {path: join(process.cwd(), 'src', 'db.json')})

export default class ListEventParser {
    
    tx
    accounts
    price
    tokenSize
    tokenMint

    constructor(txId) {
        this.init(txId)
    }

    init(txId){

        this.tx = store.get(txId)
        this.accounts = getAccounts(tx)
        this.price = getSolAmount(getBuyerPrice(txId).lamports)
        this.tokenSize = tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount 
        this.tokenMint = getMintAddress(txId)
    }

}