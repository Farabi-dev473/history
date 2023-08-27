import Store from "data-store"
import {join} from 'node:path'
import getSolAmount from "../helpers/getSolAmount.js"
import getBuyerPrice from "./getBuyerPrice.js"
import getTxType from "./getTxType.js"

const store = new Store('', {path: join(process.cwd(), 'src', 'db.json')})

const parseMagicEdenTx = (txId) => {
    const tx = store.get(txId)
    const txType = getTxType(tx)

    if(txType === "List"){
        const accounts = tx?.transaction?.message?.instructions[0]?.accounts
        const pdaAddress = accounts[8]
        const auctionHouse = accounts[7]
        const tokenAddress = accounts[2]
        const tokenMint = accounts[4]
        const seller = accounts[0]
        const sellerReferral = accounts[9]
        const tokenSize = tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount 
        const logMessage = tx?.meta?.logMessages.find((logMessage) => logMessage.includes("price"))
        const expiry = parseInt(logMessage[logMessage.length - 3] + logMessage[logMessage.length - 2])
        const price = getSolAmount(getBuyerPrice(txId).lamports)

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

export default parseMagicEdenTx