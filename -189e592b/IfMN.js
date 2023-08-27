import getBuyerAndSeller from '../src/packages/decoders/getBuyerAndSeller'
import store from './getAccounts.test'

let txId = "5QAWR56Ybx2sanHMfpGkbnXnciJAhKuxa7y9LCqYQR4PWrEGyEvUCySykCwzcTqQNFV9JvAUsKu8hwbRSmbB6RVe"
let programId = "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc"
let tx = store.get(txId)


describe('getSeller', () => {
    it('should return the buyer & seller address for any given transaction', () => {
        const {buyer, seller} = getBuyerAndSeller(tx, programId)

        const realBuyerAddress = "9DxRBPbEE41o4HZM7j4PV4cvKozmWgdEgdGqtqP7h4zd"
        const realSellerAddress = "28QCj71ovpqyQruW8ziv6MoF21h8wGCPPPNMQoZzCWB5"

        expect(buyer).toEqual(realBuyerAddress)
        expect(seller).toEqual(realSellerAddress)
    }) 
})