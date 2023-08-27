import web3 from '@solana/web3.js'
import fs from 'node:fs'
import JSONFormatter from 'json-formatter-js'

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

const tx = connection.getParsedTransaction(txId)
const formatter = new JSONFormatter(tx)

fs.writeFileSync('./answer.json', formatter.render())
