import ParseListEventTx from './ParseListEventTx.js'

export default class MagicEdenParseStrategy extends ParseListEventTx{
        constructor(txId){
          super(txId)
        }
    
        parseListEventTx(){
                const pdaAddress = this.accounts[8]
                const auctionHouse = this.accounts[7]
                const tokenAddress = this.accounts[2]
                const seller = this.accounts[0]
                const sellerReferral = this.accounts[6]
                const logMessage = this.tx?.meta?.logMessages.find((logMessage) => logMessage.includes("price"))
                const expiry = parseInt(logMessage[logMessage.length - 3] + logMessage[logMessage.length - 2])   
        
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