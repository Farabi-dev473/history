import web3 from '@solana/web3.js'
import fs from 'node:fs'
import jsonFormat from 'json-format'

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

const tx = await connection.getParsedTransaction("3ipFASo6v3s4qUeDDRNdP8299QirULXqPh8przMr9q8jJ9NwWXVNdULsghrUYERWtz9oXrHACMrydEiZpd32J92q")


fs.writeFileSync('./answer.json', jsonFormat(tx, {
    type: 'space',
    size: 2
  }))
