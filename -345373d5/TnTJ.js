import ParseListEventTx from './parseListEventTx.js'
import getSolAmount from '../../helpers/getSolAmount.js'
import getAccounts from '../getAccounts.js'
import store from '../../helpers/store.js'
// export default class TenorSwapParseStrategy extends ParseListEventTx{
//         constructor(txId){
//           super(txId)
//         }
    
//         parseListEventTx(){
//                 const pdaAddress = this.accounts[4]
//                 const auctionHouse = this.accounts[0]
//                 const tokenAddress = this.tx?.meta?.innerInstructions[0]?.instructions[3]?.parsed?.info?.source
//                 const seller = this.tx?.meta?.innerInstructions[0]?.instructions[3]?.parsed?.info?.authority
//                 const sellerReferral = this.accounts[this.accounts.length - 1]
//                 const expiry = false
                
//                 return {
//                     pdaAddress,
//                     auctionHouse,
//                     tokenAddress,
//                     tokenMint: getMintAddress(txId),
//                     tokenSize: tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount,
//                     seller,
//                     sellerReferral,
//                     tokenSize: this.tokenSize,
//                     expiry,
//                     price: this.price
//                 }        
//         }
    
// }

const parseTensorListEventTxAndReturn = (txId) => {

        const tx = store.get(txId)
        const accounts = getAccounts(tx)

        return {
            pdaAddress : accounts[7],
            auctionHouse : accounts[4],
            tokenAddress : accounts[1],
            tokenMint: getMintAddress(txId),
            tokenSize: tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount,
            seller : accounts[0],
            sellerReferral : accounts[7],
            expiry : false,
            price: getSolAmount(getBuyerPrice(txId).lamports)
        }
}

export default parseTensorListEventTxAndReturn