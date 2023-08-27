import ListEventParser from './listEventParser.js'

export default class MagicEdenParseStrategy extends ListEventParser{
        constructor(txId){
          super(txId)
        }
    
        parseListEventTx(){
                const pdaAddress = accounts[8]
                const auctionHouse = accounts[7]
                const tokenAddress = accounts[2]
                const seller = accounts[0]
                const sellerReferral = accounts[6]
                const logMessage = tx?.meta?.logMessages.find((logMessage) => logMessage.includes("price"))
                const expiry = parseInt(logMessage[logMessage.length - 3] + logMessage[logMessage.length - 2])   
        
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