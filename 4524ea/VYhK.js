import ListEventParser from './listEventParser.js'

export default class HyperSpaceParseStrategy extends ListEventParser{
        constructor(txId){
          super(txId)
        }
    
        parseListEventTx(){

                pdaAddress = accounts[7]
                auctionHouse = accounts[6]
                tokenAddress = tx?.transaction?.message?.instructions[0]?.accounts[3]
                seller = accounts[0]
                sellerReferral = accounts[1]
        
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