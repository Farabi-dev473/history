const { Transaction , Connection, PublicKey, clusterApiUrl} = require('@solana/web3.js')
const {encode, decode} = require('bs58')


const connection = new Connection(clusterApiUrl('testnet'), 'confirmed')

const fn = async() => {
  const pb = new PublicKey('1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix')
  console.log(await connection.getAccountInfo(pb))

}

fn()