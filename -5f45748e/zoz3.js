import borsh from 'borsh'
const {decode} = require('bs58')
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

const buffer = Buffer.from(decode('4gK3rVwkyY7GTMR1VEX'))

const deserializedValue = borsh.deserialize(schema, buffer);
console.log(deserializedValue);