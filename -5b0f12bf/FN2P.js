import base58 from 'bs58';
import {deserialize, deserializeUnchecked} from'borsh'
import getTxType from './getTxType.js';
import {store} from './parseMagicEdenTx.js'
import getInstructionData from './getInstructionData.js'
import { programs } from '../../programs.js';

class Test {
    constructor(properties) {
      Object.keys(properties).map((key) => {
        return (this[key] = properties[key]);
      });
    }
}

const getBuyerPrice = (txId) => {
    
    const tx = store.get(txId)    
    const {data, programId, txType} = getInstructionData(tx)
    const schemaFields = programs[programId]?.actions?.[txType].schemaFields
    const buffer = Buffer.from(base58.decode(data))
    const TestSchema = new Map([
      [
        Test,
        {
          kind: "struct",
          fields: schemaFields
        },
      ],
    ]);


    try{
      const lamports = deserializeUnchecked(TestSchema, Test, buffer).buyerPrice + ''
      return {lamports, type: 'data'}
    }catch(err) {
      return {error: err.message, type: 'error'}
    }
}

console.log(getBuyerPrice("2i8DcvdB8gXhKUqynxqx8SGucQiRv7jTq3EH3XL9eb1M1aP1B3idThKLX2fMcWk64kEGkr5tzZttEaPKqq2wfR47"))

export default getBuyerPrice