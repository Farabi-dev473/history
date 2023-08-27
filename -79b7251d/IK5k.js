import getSolAmount from '../../helpers/getSolAmount.js'
import getAccounts from '../getAccounts.js'
import store from '../../helpers/store.js'
import getBuyerPrice from '../getBuyerPrice.js'
import getMintAddress from '../../helpers/getMintAddress.js'
    
const parseSolanartListEventTxAndReturn = (txId) =>{
          const tx = store.get(txId)
          const accounts = getAccounts(tx)

                return {
                    pdaAddress: accounts[2],
                    auctionHouse: accounts[3],
                    tokenAddress: accounts[5],
                    tokenMint: getMintAddress(txId),
                    seller: accounts[0],
                    sellerReferral: accounts[1],
                    tokenSize: tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount,
                    expiry,
                    price: getSolAmount(getBuyerPrice(txId).lamports)
                }        
}
  
export default parseSolanartListEventTxAndReturn