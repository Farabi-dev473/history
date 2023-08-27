import web3 from '@solana/web3.js'
import fs from 'node:fs'
import jsonFormat from 'json-format'

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

const tx = await connection.getParsedTransaction("3EvCqzuf8QTiFTYe2nW3MFcCJHY224KHJU9gS6uXQxMdqXXqFAoyCKr6hzsJ8HEVFnBUx7cA8iz3odeim4zQJdeb")


fs.writeFileSync('./answer.json', jsonFormat(tx, {
    type: 'space',
    size: 2
  }))
