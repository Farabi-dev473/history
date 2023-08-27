import base58 from 'bs58';
import {deserializeUnchecked} from'borsh'
import Store from 'data-store';
import {join} from 'node:path'
import getInstructionData from '../helpers/getInstructionData.js'
import getTxType from './getTxType.js';
import { programs } from '../../programs.js';

const store = new Store('' , {path: join(process.cwd(), 'src', 'db.json')})

class Test {
    constructor(properties) {
      Object.keys(properties).map((key) => {
        return (this[key] = properties[key]);
      });
    }
}

const getBuyerPrice = (txId) => {
    const tx = store.get(txId)
    console.log(txId, tx)
    const txData = getInstructionData(tx)
    const txType = getTxType(tx)
    const schemaFields = programs[txData?.programId]?.actions[txType]?.schemaFields
    console.log(txData.data)
    const buffer = Buffer.from(base58.decode(txData?.data))
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

// console.log(getBuyerPrice("5jpP5jRjy638KbGUEveeF9JsiA47y4xEtmjNoSaifEzFE9GhT93oKWGkf4yRkPzf8gz33ng1ujbRxXFVchna3Y3z"))

export default getBuyerPrice