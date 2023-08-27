import getSolAmount from '../../helpers/getSolAmount.js'
import getAccounts from '../getAccounts.js'
import store from '../../helpers/store.js'
import getBuyerPrice from '../getBuyerPrice.js'
import getMintAddress from '../../helpers/getMintAddress.js'
import getTokenSize from '../../helpers/getTokenSize'
import {MARKETPLACE_NAMES } from '../../../constants.js'


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
            },
            'solanart': {
              pdaAddress: accounts[2],
              auctionHouse: accounts[3],
              tokenAddress: accounts[5],
              seller: accounts[0],
              sellerReferral: accounts[1],
              expiry: false,
              tokenMint: getMintAddress(txId),
              tokenSize: getTokenSize(txId),
              price: getSolAmount(getBuyerPrice(txId).lamports)
            },
            'hyperspace': {
              pdaAddress: accounts[7],
              auctionHouse: accounts[6],
              tokenAddress: accounts[3],
              seller: accounts[0],
              sellerReferral: accounts[1],
              expiry: false,
              tokenMint: getMintAddress(txId),
              tokenSize: getTokenSize(txId),
              price: getSolAmount(getBuyerPrice(txId).lamports)
            },
            [MARKETPLACE_NAMES.DIGITAL_EYES]: {
              pdaAddress: accounts[3],
              auctionHouse: false,
              tokenAddress: tx?.transaction?.message?.instructions[2]?.parsed?.info?.source,
              seller: accounts[0],
              sellerReferral: accounts[4],
              expiry: false,
              tokenMint: getMintAddress(txId),
              tokenSize: getTokenSize(txId),
              price: getSolAmount(getBuyerPrice(txId).lamports)
            },
            [MARKETPLACE_NAMES.AUCTIONHOUSE]: {
              pdaAddress: accounts[7],
              auctionHouse: accounts[4],
              tokenAddress: accounts[1],
              seller: accounts[0],
              sellerReferral: accounts[7],
              expiry: false,
              tokenMint: getMintAddress(txId),
              tokenSize: getTokenSize(txId),
              price: getSolAmount(getBuyerPrice(txId).lamports)
            }
        }

        return marketplaceMap[marketplace]
}

export default parseListEventTx