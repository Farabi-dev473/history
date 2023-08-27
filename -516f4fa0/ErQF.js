import getBuyerSellerAndOwner from './src/packages/decoders/getBuyerSellerAndOwner.js'
import Store from 'data-store'

const store = new Store('', {path: __dirname + './src/db.json'})

const txId = "Vu2ukx8bddQT8RgPhocYJJdg8NaBotbHkDRQywNWsgRWSca1KfjZxtnSRHCapVc1bgrx6gMukARq9sh5ozDpWfR"
const tx = store.get(txId)
const txType = "Sale"
const programId = "hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu"

const {buyer, seller, owner} = getBuyerSellerAndOwner(tx, txType, programId)

console.log(`buyer: ${buyer} - seller: ${seller} - owner: ${owner}`)
// buyer: 25CMtPkDy4wU8Lkg625cpGfVbnQuuXPgBCkZVrbJ3zRY - seller: 7upYVPJjmVwyB3YGK2tgc69yC4GyHgQbSgn61vz3vPZY - owner: 25CMtPkDy4wU8Lkg625cpGfVbnQuuXPgBCkZVrbJ3zRY 