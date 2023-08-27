const axios = require('axios');
const endpoint = 'https://testnet.solana.com';

async function decodeTransaction(transactionId) {
    try {
        const response = await axios.get(`${endpoint}/transactions/${transactionId}`);
        const transactionData = response.data;

        // Extract the buyer price from the transaction data
        const buyerPrice = transactionData.memo;

        console.log(`Buyer price: ${buyerPrice}`);
    } catch (error) {
        console.error(`Error decoding transaction: ${error.message}`);
    }
}


decodeTransaction('2uAF57i5E1oLn15MYLDUoi5fGbw8WcwLsgE3QKJX6qc4DpAyft7Aott9NJXBMAzhKUhK61YFLfaxQMcnntUPuceN')