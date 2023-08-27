import getBuyerPrice from '../src/packages/decoders/getBuyerPrice'

const schemaFields = [
    ["instructionDiscriminator", ["u8", 8]],
    ["", "u8"],
    ["buyerPrice", "u64"],
]

const data = "3GyWrkssW12wQTbzN4smGdnf"

const result = getBuyerPrice(schemaFields, data)
const output = {lamports: "300000000", type: "data"}

describe('getBuyerPrice', () => {

    it('should return lamports if there no error occurs', () => {
        expect(result).toBe(output) 
    })
})