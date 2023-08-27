import ParseListEventTx from './parseListEventTx.js'

export default class SolanartParseStrategy extends ParseListEventTx{
        constructor(txId){
          super(txId)
        }
    
        parseListEventTx(){
          const pdaAddress = this.accounts[2]
          const tokenAddress = this.accounts[5]
          const seller = this.accounts[0]
          const sellerReferral = this.accounts[1]
          const auctionHouse = this.accounts[3]  
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