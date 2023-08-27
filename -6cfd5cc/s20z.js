const { Transaction , Connection, PublicKey, clusterApiUrl} = require('@solana/web3.js')
const {encode, decode} = require('bs58')


const connection = new Connection(clusterApiUrl('testnet'), 'confirmed')

const fn = async(tx) => {
  // [
  //   "3SZ7dpXCYu1XN6r9x4ekQNrmdMQQpyemmA1fSUQ49Mph",
  //   "NTYeYJ1wr4bpM5xo6zx5En44SvJFAd35zTxxNoERYqd",
  //   "H8DkwdZb32UdkZCasZvEjMfN33NqpL2zQY9YQMcB58ph",
  //   "autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2",
  //   "E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe",
  //   "11111111111111111111111111111111"
  // ].forEach(async(pubkey) => {
  //   const pb = new PublicKey(pubkey)
  //   console.log(await connection.getAccountInfo(pb))
  // })


   console.log(await connection.getTransaction(tx))
}

fn()