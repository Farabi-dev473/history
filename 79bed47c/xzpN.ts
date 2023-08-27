import web3 from '@solana/web3.js'
const getTransaction = async(txId: string) => {
    const connection = new web3.Connection(web3.clusterApiUrl('mainnet-beta'));
    return await connection.getParsedTransaction(txId);
}
  