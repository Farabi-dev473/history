const {TOKEN_PROGRAM_ID, TokenAccountNotFoundError} = require('@solana/spl-token')
const web3 = require('@solana/web3.js')

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

const address = 'DxnmMjdy35b5i2NHdkkjX656q73pXxDdqLnTpnS4yi8j'



const getTokensByWallet = async () => {
    console.log("HELLo")
const data = await connection.getParsedTokenAccountsByOwner(new web3.PublicKey(address), {programId: TOKEN_PROGRAM_ID})
console.log(data)
}

getTokensByWallet()

