import ListEventParser from './listEventParser.js'

export default class SolanartParseStrategy extends ListEventParser{
        constructor(txId){
          super(txId)
        }
    
        parseListEventTx(){

            pdaAddress = accounts[2]
            tokenAddress = accounts[5]
            tokenMint = accounts[4]
            seller = accounts[0]
            sellerReferral = accounts[1]
            auctionHouse = accounts[3]  
            
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