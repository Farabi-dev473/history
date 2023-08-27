
import getAccounts from '../../decoders/getAccounts.js'
import getSolAmount from '../../helpers/getSolAmount.js'
import getBuyerPrice from '../getBuyerPrice.js'
import getMintAddress from '../../helpers/getMintAddress.js'
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
        this.accounts = getAccounts(this.tx)
        this.price = getSolAmount(getBuyerPrice(txId).lamports)
        this.tokenSize = this.tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount 
        this.tokenMint = getMintAddress(txId)
    }

}