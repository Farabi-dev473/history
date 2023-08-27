import web3 from '@solana/web3.js'
import fs from 'node:fs'
import jsonFormat from 'json-format'

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

const tx = connection.getParsedTransaction("2i8DcvdB8gXhKUqynxqx8SGucQiRv7jTq3EH3XL9eb1M1aP1B3idThKLX2fMcWk64kEGkr5tzZttEaPKqq2wfR47")
console.log(tx)

fs.writeFileSync('./answer.json', jsonFormat(tx, {
    type: 'space',
    size: 2
  }))
