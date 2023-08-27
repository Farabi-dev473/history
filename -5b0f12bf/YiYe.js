import base58 from 'bs58';
import {deserialize, deserializeUnchecked} from'borsh'
import getInstructionData from './getInstructionData.js'
import { programs } from '../../programs.js';
import Store from 'data-store'
import {join} from 'node:path'


const store = new Store('', {path: join(process.cwd(), '..', '..' , 'db.json')})

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

console.log(getBuyerPrice("4oBFNe4qY8HQGUMComcWQtDmF9Q9YGvLEYDUPbMWqeGBKRXTj5595C3N1EWyT6SRgFSSQys12kdaauDndNeHKbPR"))

export default getBuyerPrice