import ListEventParser from './listEventParser.js'

export default class DigitalEyesParseStrategy extends ListEventParser{
        constructor(txId){
          super(txId)
        }
    
        parseListEventTx(){

            pdaAddress = accounts[3],
            tokenAddress = tx?.transaction?.message?.instructions[2]?.parsed?.info?.source
            seller = accounts[0],
            sellerReferral = accounts[4]
    
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