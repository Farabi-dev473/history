import ListEventParser from './listEventParser.js'

export default class DigitalEyesParseStrategy extends ListEventParser{
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