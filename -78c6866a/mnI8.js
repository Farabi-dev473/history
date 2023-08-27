const {TOKEN_PROGRAM_ID, TokenAccountNotFoundError} = require('@solana/spl-token')
const web3 = require('@solana/web3.js')

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

const address = 'ESzUduT2e91MURbTDttCqSrQuQ3MWs86wyr9WvPJM9d1'



const getTokensByWallet = async () => {
    console.log("HELLo")
const data = await connection.getParsedTokenAccountsByOwner(new web3.PublicKey(address), {programId: TOKEN_PROGRAM_ID})
console.log(data)
}

getTokensByWallet()

