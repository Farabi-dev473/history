import ParseListEventTx from './parseListEventTx.js'

export default class TenorSwapParseStrategy extends ParseListEventTx{
        constructor(txId){
          super(txId)
        }
    
        parseListEventTx(){
                const pdaAddress = this.accounts[4]
                const auctionHouse = this.accounts[0]
                const tokenAddress = this.tx?.meta?.innerInstructions[0]?.instructions[3]?.parsed?.info?.source
                const seller = this.tx?.meta?.innerInstructions[0]?.instructions[3]?.parsed?.info?.authority
                const sellerReferral = this.accounts[this.accounts.length - 1]
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

const parseTensorListEventTxAndReturn = (txId) => {

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