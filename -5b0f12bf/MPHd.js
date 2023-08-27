import base58 from 'bs58';
import {deserialize, deserializeUnchecked} from'borsh'
import getTxType from './getTxType';
import {store} from './parseMagicEdenTx.js'
import getInstructionData from './getInstructionData'
import { programs } from '../../programs';

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

export default getBuyerPrice