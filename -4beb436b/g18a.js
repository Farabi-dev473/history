import Store from "data-store"
import {join} from 'node:path'
import getInstructionData from "../helpers/getInstructionData.js"
import getMintAddress from "../helpers/getMintAddress.js"
import getSolAmount from "../helpers/getSolAmount.js"
import getAccounts from "./getAccounts.js"
import getBuyerPrice from "./getBuyerPrice.js"
import getTxType from "./getTxType.js"

const store = new Store('', {path: join(process.cwd(), 'src', 'db.json')})

const parseListEventTx = (txId) => {
    const tx = store.get(txId)
    const txType = getTxType(tx)
    const {programId} = getInstructionData(tx, txType)
    const accounts = getAccounts(tx)
     
    let pdaAddress, auctionHouse, tokenAddress, tokenMint, seller, sellerReferral, tokenSize, expiry, price, logMessage = false
    price = getSolAmount(getBuyerPrice(txId).lamports)
    tokenSize = tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount 
    tokenMint = getMintAddress(txId)

    if(programId === "CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz") {
        pdaAddress = accounts[2]
        tokenAddress = accounts[5]
        tokenMint = accounts[4]
        seller = accounts[0]
        sellerReferral = accounts[1]
        auctionHouse = accounts[3]  
        
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

    if(programId === "hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk" || programId === "6U2LkBQ6Bqd1VFt7H76343vpSwS5Tb1rNyXSNnjkf9VL") {
       pdaAddress = accounts[7]
       tokenAddress = accounts[1]
       seller = accounts[0]
       auctionHouse = accounts[4]
       sellerReferral = accounts[7]

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

    if(programId === "HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8") {
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

    if(programId === "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K"){
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

export default parseListEventTx