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