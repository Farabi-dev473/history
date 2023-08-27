import parseMagicEdenTx from '../src/packages/decoders/parseMagicEdenTx.js'

let txId, output, result

describe('parseMagicEdenTx', () => {
    it('should return an object with 9 properties', () => {
        txId = "21JLn1W6J7uWxZWNe33NAaCN5uhxABE1R63wDfFbkkiySh9xnjw15K8PEssX3bm464Z219MEBeDxjK9GH8EhLDP5"
        output = 9
        result = Object.keys(parseMagicEdenTx(txId)).length
        expect(result).toEqual(output)
    })
    
    it('should return an object for list event tx which matches with output', () => {
        txId = "57bHzn6dNftr7J17JGEbvJsD4RjkZWLQWRohD1b9xqk7nsAX5woh2tozcJLLcFph5GkkuNcgGS7ihcdfhx8bVhbP"
        
    })
})