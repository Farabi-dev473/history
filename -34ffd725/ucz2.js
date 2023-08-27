import Store from "data-store"
import {join} from 'node:path'

const store = new Store('', {path: join(process.cwd(), '..', '..', '/db.json')})
const parseMagicEdenTx = (txId) => {
    const tx = store.get(txId)
    const accounts = tx?.transaction?.message?.instructions[0]?.accounts
    const pdaAddress = accounts[8]
    const auctionHouse = accounts[7]
    const tokenAddress = accounts[2]
}