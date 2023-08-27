import web3 from '@solana/web3.js'
import fs from 'node:fs'
import jsonFormat from 'json-format'

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

const tx = await connection.getParsedTransaction("5jRUwyUftBJUakF5p5wKCh8ok3s9Soe271dEbccSA9qG8jRoXVoyGqdqqS2wSUBi8yJu5Tt9onU992jra3vkHmVh")


fs.writeFileSync('./answer.json', jsonFormat(tx, {
    type: 'space',
    size: 2
  }))
