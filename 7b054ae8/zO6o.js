import web3 from '@solana/web3.js'
import fs from 'node:fs'
import jsonFormat from 'json-format'

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

const tx = await connection.getParsedTransaction("4Nsg3T3GZ4UYnVn8dvTJvfDCfeLTeKSgbkCXfRPNPZMxrp3BZSL3iWDPP1gasxV3pXqXZYZkv3mGMF6dAgX8ygZa")


fs.writeFileSync('./answer.json', jsonFormat(tx, {
    type: 'space',
    size: 2
  }))
