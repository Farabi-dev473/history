import ParseListEventTx from './ParseListEventTx.js'

export default class AuctionHouseParseStrategy extends ParseListEventTx{
        constructor(txId){
          super(txId)
        }
    
        parseListEventTx(){
                const pdaAddress = this.accounts[7]
                const auctionHouse = this.accounts[4]
                const tokenAddress = this.accounts[1]
                const seller = this.accounts[0]
                const sellerReferral = this.accounts[7]
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