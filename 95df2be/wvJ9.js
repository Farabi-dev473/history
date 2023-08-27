import parseListEventTx from '../src/packages/decoders/parseListEventTx.js'

let txId, output, result

describe('parseListEventTx', () => {
    it('should return an object with 9 properties', () => {
        txId = "21JLn1W6J7uWxZWNe33NAaCN5uhxABE1R63wDfFbkkiySh9xnjw15K8PEssX3bm464Z219MEBeDxjK9GH8EhLDP5"
        output = 9
        result = Object.keys(parseListEventTx(txId)).length
        expect(result).toEqual(output)
    })
    
    it('should return an object for list event tx which matches with output', () => {
        txId = "57bHzn6dNftr7J17JGEbvJsD4RjkZWLQWRohD1b9xqk7nsAX5woh2tozcJLLcFph5GkkuNcgGS7ihcdfhx8bVhbP"
        output = {
            pdaAddress: '7FFHkvtcHBLPQubz5QUZ5qkFohaxA3yjyC5LWPFMNYHg',
            auctionHouse: 'E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe',
            tokenAddress: '4sq66jVVa5k8YDUUF2j8KSSbUesRy3rzRWUnGXXwABHM',
            tokenMint: '8i1on1c81t9LNwesYyreZfqMB1LYGx21ScvuB1JSYutQ',
            seller: '9DxRBPbEE41o4HZM7j4PV4cvKozmWgdEgdGqtqP7h4zd',
            sellerReferral: '25Bu6Fnm1cLmtwbRkpY3yuVaqAGURGJvdJxpKtKrG5Cb',
            tokenSize: 1,
            expiry: -1,
            price: 0.566
        }
        result = parseListEventTx(txId)
        expect(result).toEqual(output)
    })

    it('should return an object which is equal to `output`', () => {
        txId = ""
        output = 
    })
})