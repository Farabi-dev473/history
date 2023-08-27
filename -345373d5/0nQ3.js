import getSolAmount from '../../helpers/getSolAmount.js'
import getAccounts from '../getAccounts.js'
import store from '../../helpers/store.js'
import getBuyerPrice from '../getBuyerPrice.js'
import getMintAddress from '../../helpers/getMintAddress.js'
import getTokenSize from '../../helpers/getTokenSize'

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

const parseListEventTx = (marketplace, txId) => {

        const tx = store.get(txId)
        const accounts = getAccounts(tx)

        const marketplaceMap = {
            tensor: {
              pdaAddress: accounts[4],
              auctionHouse: accounts[0],
              tokenAddress:
                tx?.meta?.innerInstructions[0]?.instructions[3]?.parsed?.info?.source,
              seller:
                tx?.meta?.innerInstructions[0]?.instructions[3]?.parsed?.info
                  ?.authority,
              sellerReferral: accounts.at(-1),
              expiry: false,
              tokenMint: getMintAddress(txId),
              tokenSize: getTokenSize(txId),
              price: getSolAmount(getBuyerPrice(txId).lamports)
            },

            'magic_eden_v2': {
              pdaAddress: accounts[8],
              auctionHouse: accounts[7],
              tokenAddress: accounts[2],
              seller: accounts[0],
              sellerReferral: accounts[6],
              expiry: parseInt(tx?.meta?.logMessages.find((logMessage) => logMessage.includes("price"))[tx?.meta?.logMessages.find((logMessage) => logMessage.includes("price")).length - 3] + tx?.meta?.logMessages.find((logMessage) => logMessage.includes("price"))[tx?.meta?.logMessages.find((logMessage) => logMessage.includes("price")).length - 2]),
              tokenMint: getMintAddress(txId),
              tokenSize: getTokenSize(txId),
              price: getSolAmount(getBuyerPrice(txId).lamports)
            }
        }
}

export default parseTensorListEventTxAndReturn