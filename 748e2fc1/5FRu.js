const web3 = require('@solana/web3.js');
var bs58 = require('bs58');
let keypair;
const memoProgramId = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr";
let connection;


const establishConnection = async () =>{
    let rpcUrl = web3.clusterApiUrl('devnet')
    connection = new web3.Connection(rpcUrl, 'confirmed');   
    console.log('Connection to cluster established:', rpcUrl);
}

const connectWallet = async () => {
    let secretKey = Uint8Array.from(enter_secret);
    keypair = web3.Keypair.fromSecretKey(secretKey);
    console.log('keypair created: ' + keypair.publicKey.toString());
}

saveData = async (data) => {
    let transferTransaction = new web3.Transaction();

    transferTransaction.add(new web3.TransactionInstruction({
        programId: memoProgramId,
        keys: [{
            pubkey: keypair.publicKey,
            isSigner: true,
            isWritable: false,
        }],
        data: Buffer.from(JSON.stringify(data))
    }))

    const transcationHash =  await web3.sendAndConfirmTransaction(
        connection, 
        transferTransaction, 
        [keypair]
    );

    return transcationHash;
}

readTransaction = async (signature) => {
    const transaction = await connection.getTransaction(signature);
    return transaction.transaction.message.instructions[0].data;
}

saveReadData = async () => {
    const signature = await saveData({
        amount: 1,
        isWon: true,
        ROI: 2,
    });

    console.log(signature);

    const b58Address = await readTransaction(signature);
    const dataAsUint8Arr = bs58.decode(b58Address);
    const jsonString = new Buffer.from(dataAsUint8Arr).toString('utf8');
    const data = JSON.parse(jsonString);

    console.log(data);
}

initConnection = async () => {
    await establishConnection();
    await connectWallet();
}

initTestReadSaveData = async () => {
    await initConnection();
    await saveReadData();
}

initTestReadSaveData();
