import ParseListEventTx from './parseListEventTx.js'

export default class DigitalEyesParseStrategy extends ParseListEventTx{
        constructor(txId){
          super(txId)
        }
    
        parseListEventTx(){
                const pdaAddress = this.accounts[3]
                const auctionHouse = false
                const expiry = false
                const tokenAddress = this.tx?.transaction?.message?.instructions[2]?.parsed?.info?.source
                const seller = this.accounts[0]
                const sellerReferral = this.accounts[4]
        
                return {
                    pdaAddress,
                    auctionHouse,
                    tokenAddress,
                    tokenMint: this.tokenMint,
                    seller,
                    sellerReferral,
                    tokenSize: this.tokenSize,
                    expiry,
                    price: this.price
                }        
        }
    
}

import getSolAmount from '../../helpers/getSolAmount.js'
import getAccounts from '../getAccounts.js'
import store from '../../helpers/store.js'
import getMintAddress from '../getMintAddress.js'
import getBuyerPrice from '../getBuyerPrice.js'
import getTokenSize from '../../helpers/getTokenSize.js'

const parseTensorListEventTxAndReturn = (txId) => {
    const tx = store.get(txId)
    const accounts = getAccounts(tx)

    return {
        pdaAddress: accounts[3],
        auctionHouse: false,
        tokenAddress: tx?.transaction?.message?.instructions[2]?.parsed?.info?.source,
        tokenSize: getTokenSize(txId),
        tokenMint: getMintAddress(txId),
        seller: accounts[0],
        sellerReferral: accounts[4],
        expiry: false,
        price: getSolAmount(getBuyerPrice(txId).lamports)
    }
}

export default parseTensorListEventTxAndReturn
