import web3 from '@solana/web3.js'
import fs from 'node:fs'
import jsonFormat from 'json-format'

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

const tx = await connection.getParsedTransaction("5g4pDLjDggzNKKhPdwc9C1hyjVokbdz18EGPNwGGJXSHvkrSaDFUTnEBu5gWDFQ4eBaVGfDy2RWxjxeMUoy9ma5M")


fs.writeFileSync('./answer.json', jsonFormat(tx, {
    type: 'space',
    size: 2
  }))
