import base58 from 'bs58';
import {deserialize, deserializeUnchecked} from'borsh'

class Test {
    constructor(properties) {
      Object.keys(properties).map((key) => {
        return (this[key] = properties[key]);
      });
    }
}

const getBuyerPrice = (schemaFields, data) => {
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
      return {lamports}
    }catch(err) {
      return {error: err.message}
    }
}

export default getBuyerPrice