import ListEventParser from './listEventParser.js'

export default class AuctionHouseParseStrategy extends ListEventParser{
        constructor(txId){
          super(txId)
        }
    
        parseListEventTx(){
                pdaAddress = accounts[7]
                tokenAddress = accounts[1]
                seller = accounts[0]
                auctionHouse = accounts[4]
                sellerReferral = accounts[7]
         
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