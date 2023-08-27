import web3 from '@solana/web3.js'
import fs from 'node:fs'
import jsonFormat from 'json-format'

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

const tx = await connection.getParsedTransaction("5j5WnQixrrPjqYvAGagNn9JhaEkFTWfgQS7cJcsa58reqGmLhiBg2trcEVe3yUYexRUqgJXPavBVsMEYBQX26Jru")


fs.writeFileSync('./answer.json', jsonFormat(tx, {
    type: 'space',
    size: 2
  }))
