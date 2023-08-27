import borsh from 'borsh'
import base58 from 'bs58';
borsh
const schema = new Map([
    [
    'List', {
    kind: 'struct',
    fields: [
    ['instructionDiscriminator', 'u8', 8],
    ['tradeStateBump', 'u8'],
    ['buyerPrice', 'u64']
    ]
    }
    ]
    ]);

const buffer = Buffer.from(base58.decode('4gK3rVwkyY7GTMR1VEX'))

const deserializedValue = borsh.deserialize(schema, buffer);
console.log(deserializedValue);