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
      return deserializeUnchecked(TestSchema, Test, buffer).buyerPrice + ''
    }catch(err) {
      return err
    }
}

export default getBuyerPrice