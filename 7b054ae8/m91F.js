import web3 from '@solana/web3.js'
import fs from 'node:fs'
import jsonFormat from 'json-format'

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

const tx = await connection.getParsedTransaction("53AJu3R9UHQ1k3VmAx5tqG1oJFSgCMDy41jQxLUCQBVutxEAef2zuucszjF5rih3nZsxrNNWJMr6MUpfejTsCzJN")


fs.writeFileSync('./answer.json', jsonFormat(tx, {
    type: 'space',
    size: 2
  }))
