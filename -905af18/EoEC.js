import getBuyerPrice from '../utils/getBuyerPrice'

const schemaFields = [
    ["instructionDiscriminator", ["u8", 8]],
    ["", "u8"],
    ["buyerPrice", "u64"],
]

const data = "3GyWrkssW12wQTbzN4smGdnf"

const lamports = getBuyerPrice(schemaFields)
const output = "300000000"

describe('getBuyerPrice', () => {

    it('should return lamports', () => {
        expect(lamports).toBe(output) 
    })
})