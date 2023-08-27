import getTxType from './getTxType.js'
import getBuyerPrice from './getBuyerPrice.js'
import getSolAmount from '../helpers/getSolAmount.js'
import Store from 'data-store'
import {join} from 'node:path'


const store = new Store('', {path: join(process.cwd(), '..', '..' , 'db.json')})

const parseMagicEdenTx = (txId) => {
    const tx = store.get(txId)    
    const txType = getTxType(tx)
    
    if(txType === 'List') {
        const {accounts, data} = tx?.transaction?.message?.instructions[0]
        const pdaAddress = accounts[8]
        const auctionHouse = accounts[7]
        const tokenAddress = accounts[2]
        const tokenMint  = accounts[4]
        const seller = accounts[0]
        const sellerReferral = accounts[6]
        const tokenSize = tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount
        const {logMessages} = tx?.meta
        const log = logMessages.find((logMessage) => logMessage.includes("price"))
        const expiry = parseInt(log[log.length - 3] + log[log.length - 2]) 

        return {
            pdaAddress,
            auctionHouse,
            tokenAddress,
            tokenMint,
            seller,
            sellerReferral,
            tokenSize,
            price: getSolAmount(getBuyerPrice( [
                ["instructionDiscriminator", ["u8", 8]],
                ["", "u8"],
                ["", "u8"],
                ["buyerPrice", "u64"],
              ], data).lamports),
            expiry
        }
    }
}

console.log(parseMagicEdenTx("5WqkZnw5G8RwP2LEqGwfyrMpb2hGBaqM79A6h6pa1UwfSNmXoJRcPXFSBTAzScZPzNRzn4fJCq46PscAfKrPPrKZ"))