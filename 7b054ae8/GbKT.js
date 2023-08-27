import web3 from '@solana/web3.js'
import fs from 'node:fs'
import jsonFormat from 'json-format'

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

const tx = await connection.getParsedTransaction("2kA97ZirTGPSFeufpXt9FUsCT3YLpxiTLSWXADohj7jkRoVfW8rzDLywnEY2jCar5AjoUFey4fHNNkshVe6Njqqd")


fs.writeFileSync('./answer.json', jsonFormat(tx, {
    type: 'space',
    size: 2
  }))
