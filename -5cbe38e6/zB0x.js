import getSolAmount from '../../helpers/getSolAmount.js'
import getAccounts from '../getAccounts.js'
import store from '../../helpers/store.js'
import getBuyerPrice from '../getBuyerPrice.js'           
import getMintAddress from '../../helpers/getMintAddress.js'

const parseMagicEdenV2ListEventTxAndReturn = (txId) => {

const tx = store.get(txId)
const accounts = getAccounts(tx)
                    
return {
    pdaAddress: accounts[8],
    auctionHouse: accounts[7],
    tokenAddress: accounts[2],
    tokenMint: getMintAddress(txId),
    tokenSize: tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount,
    seller: accounts[0],
    sellerReferral: accounts[6],
    expiry: parseInt(tx?.meta?.logMessages.find((logMessage) => logMessage.includes("price"))[tx?.meta?.logMessages.find((logMessage) => logMessage.includes("price")).length - 3] + tx?.meta?.logMessages.find((logMessage) => logMessage.includes("price"))[tx?.meta?.logMessages.find((logMessage) => logMessage.includes("price")).length - 2]),
    price: getSolAmount(getBuyerPrice(txId).lamports)
}
}
                    
export default parseMagicEdenV2ListEventTxAndReturn