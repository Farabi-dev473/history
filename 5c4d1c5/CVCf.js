import ListEventParser from './listEventParser.js'

export default class TenorSwapParseStrategy extends ListEventParser{
        constructor(txId){
          super(txId)
        }
    
        parseListEventTx(){

            pdaAddress = accounts[4]
            auctionHouse = accounts[0]
            tokenAddress = tx?.meta?.innerInstructions[0]?.instructions[3]?.parsed?.info?.source
            seller = tx?.meta?.innerInstructions[0]?.instructions[3]?.parsed?.info?.authority
            sellerReferral = accounts[accounts.length - 1]
    
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