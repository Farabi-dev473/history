import ListEventParser from './listEventParser.js'

export default class MagicEdenParseStrategy extends ListEventParser{
        constructor(txId){
          super(txId)
          console.log(this.txId)
        }
    
        parseListEventTx(){
                pdaAddress = accounts[8]
                auctionHouse = accounts[7]
                tokenAddress = accounts[2]
                tokenMint = accounts[4]
                seller = accounts[0]
                sellerReferral = accounts[6]
                logMessage = tx?.meta?.logMessages.find((logMessage) => logMessage.includes("price"))
                expiry = parseInt(logMessage[logMessage.length - 3] + logMessage[logMessage.length - 2])   
        
                return {
                    pdaAddress,
                    auctionHouse,
                    tokenAddress,
                    tokenMint,
                    seller,
                    sellerReferral,
                    tokenSize,
                    expiry,
                    price
                }        
        }
    
}