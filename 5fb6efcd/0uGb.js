import Store from "data-store"
import {join} from 'node:path'
import getInstructionData from "../helpers/getInstructionData.js"
import getMintAddress from "../helpers/getMintAddress.js"
import getSolAmount from "../helpers/getSolAmount.js"
import getBuyerPrice from "./getBuyerPrice.js"
import getTxType from "./getTxType.js"

const store = new Store('', {path: join(process.cwd(), 'src', 'db.json')})

const parseMagicEdenTx = (txId) => {
    const tx = store.get(txId)
    const txType = getTxType(tx)
    const {programId} = getInstructionData(tx, txType)
    const accounts = tx?.transaction?.message?.instructions[0]?.accounts
     
    let pdaAddress, auctionHouse, tokenAddress, tokenMint, seller, sellerReferral, tokenSize, expiry, price
    price = getSolAmount(getBuyerPrice(txId).lamports)
    tokenSize = tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount 
    if(programId === "CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz") {
        pdaAddress = accounts[2]
        tokenAddress = accounts[5]
        tokenMint = accounts[4]
        seller = accounts[0]
        sellerReferral = accounts[1]
        auctionHouse = accounts[3]        
    }

    if(programId === "hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk") {
       tokenAddress = accounts[1]
       seller = accounts[0]
       tokenMint = getMintAddress(txId)
       auctionHouse = accounts[4]
    }
    if(txType === "List"){
        pdaAddress = accounts[8]
        auctionHouse = accounts[7]
        tokenAddress = accounts[2]
        tokenMint = accounts[4]
        seller = accounts[0]
        sellerReferral = accounts[9]
        logMessage = tx?.meta?.logMessages.find((logMessage) => logMessage.includes("price"))
        expiry = parseInt(logMessage[logMessage.length - 3] + logMessage[logMessage.length - 2])

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