import ParseListEventTx from './parseListEventTx.js'

export default class HyperSpaceParseStrategy extends ParseListEventTx{
        constructor(txId){
          super(txId)
        }
    
        parseListEventTx(){
                const pdaAddress = this.accounts[7]
                const auctionHouse = this.accounts[6]
                const tokenAddress = this.tx?.transaction?.message?.instructions[0]?.accounts[3]
                const seller = this.accounts[0]
                const sellerReferral = this.accounts[1]
                const expiry = false

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

const parseTensorListEventTxAndReturn = (txId) => {
    const tx = store.get(txId)
    const accounts = getAccounts(tx)

    return {
        pdaAddress: accounts[7],
        auctionHouse: accounts[6],
        tokenAddress: accounts[3],
        tokenMint: getMintAddress(txId),
        tokenSize: tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount,
        seller: accounts[0],
        sellerReferral: accounts[1],
        expiry: false,
        price: getSolAmount(getBuyerPrice(txId).lamports)
    }
}

export default parseTensorListEventTxAndReturn
