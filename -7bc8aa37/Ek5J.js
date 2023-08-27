import getBuyerPrice from '../utils/getBuyerPrice'

const schemaFields = [
    ["instructionDiscriminator", ["u8", 8]],
    ["", "u8"],
    ["buyerPrice", "u64"],
]

const data = "3GyWrkssW12wT3TmMdzhSff5"

const result = getBuyerPrice(schemaFields, data)
const output = "300000000"

describe('getBuyerPrice', () => {

    it("should return an object", () => {
        expect(result instanceof Object)
    })

    it('should return lamports', () => {
        expect(result.buyerPrice).toBe(output) 
    })
})