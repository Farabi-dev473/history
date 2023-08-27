import Store from "data-store"
import {join} from 'node:path'
import getSolAmount from "../helpers/getSolAmount"
import getBuyerPrice from "./getBuyerPrice"
import getTxType from "./getTxType"

const store = new Store('', {path: join(process.cwd(), '..', '..', '/db.json')})
const parseMagicEdenTx = (txId, data) => {
    const tx = store.get(txId)
    const txType = getTxType(txId)

    if(txType === "List"){
        const schemaFields =  [
            ["instructionDiscriminator", ["u8", 8]],
            ["", "u8"],
            ["", "u8"],
            ["buyerPrice", "u64"],
        ]
        const accounts = tx?.transaction?.message?.instructions[0]?.accounts
        const pdaAddress = accounts[8]
        const auctionHouse = accounts[7]
        const tokenAddress = accounts[2]
        const tokenMint = accounts[4]
        const seller = accounts[1]
        const sellerReferral = accounts[9]
        const tokenSize = tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount 
        const logMessage = tx?.meta?.logMessages.find((logMessage) => logMessage.includes("price"))
        const expiry = parseInt(logMessage[logMessage.length - 3] + logMessage[logMessage.length - 2])
        const price = getSolAmount(getBuyerPrice(schemaFields, data))

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