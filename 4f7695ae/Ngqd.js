const fs = require('fs')
const {TOKEN_PROGRAM_ID} = require('@solana/spl-token')
const web3 = require('@solana/web3.js')

const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'))

async function getTokensFromWallet(addrss){
    const response = await connection.getParsedTokenAccountsByOwner(
      new web3.PublicKey(addrss), // owner here
      { programId: TOKEN_PROGRAM_ID }
    );

    return response.value
      .map((token) => {
        const parsedInfo = token.account.data.parsed.info;
        const tokenAmount = parsedInfo.tokenAmount;
        if (tokenAmount.decimals === 0 && tokenAmount.amount === '1') {
          return parsedInfo.mint;
        }
      })
      .filter(Boolean);
  }

(async() => {
    const data = JSON.stringify(await getTokensFromWallet('C9VE1ktXwTxGQK9zVH4ayAMYzpg6ezWfWUmv3KPRFUpm'))

    fs.writeFileSync('./data.json', data)
})()