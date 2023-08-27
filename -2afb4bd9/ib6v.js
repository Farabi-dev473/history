import Store from "data-store";
import {join} from 'node:path'

const store = new Store('', {path: join(process.cwd(), 'src', 'db.json')})

const getMintAddress = (txId) => {
   const tx = store.get(txId)
   return tx?.meta?.postTokenBalances[0].mint || tx?.meta?.preTokenBalances[0].mint
}