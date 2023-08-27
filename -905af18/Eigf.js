import getBuyerPrice from '../src/packages/decoders/getBuyerPrice'

const schemaFields = [
    ["instructionDiscriminator", ["u8", 8]],
    ["", "u8"],
    ["buyerPrice", "u64"],
]

const data = "3GyWrkssW12wQTbzN4smGdnf"

const {lamports} = getBuyerPrice(schemaFields, data)
const output =  "300000000"

describe('getBuyerPrice', () => {

    it('should return lamports if there no error occurs', () => {
        expect(lamports).toBe(output) 
    })
})