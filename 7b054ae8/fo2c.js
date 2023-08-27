import web3 from '@solana/web3.js'
import fs from 'node:fs'
import jsonFormat from 'json-format'

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

const tx = await connection.getParsedTransaction("2PD1NBq2kWWBNgfYNqPN6TF3RSjTGGuNx9bHPDZiHvoNdi8bKTk9ddCyJjKeA8LeJL1q4GfdoAmzqwL88kZe5iAD")


fs.writeFileSync('./answer.json', jsonFormat(tx, {
    type: 'space',
    size: 2
  }))
