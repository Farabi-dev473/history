import web3 from '@solana/web3.js'
import fs from 'node:fs'
import jsonFormat from 'json-format'

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

const tx = await connection.getParsedTransaction("4DpVUScmefeVZ6PEoQgxU1aWtRAgfhZvHFZY4fYQh3EjNzMookKH2dHY4w77tf3HJr38D8VCpmxUboUuQDTcShjK")


fs.writeFileSync('./answer.json', jsonFormat(tx, {
    type: 'space',
    size: 2
  }))
