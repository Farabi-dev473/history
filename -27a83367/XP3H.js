import getBuyerAndSeller from '../src/packages/decoders/getBuyerAndSeller'
import store from './getAccounts.test'

let txId = "5QAWR56Ybx2sanHMfpGkbnXnciJAhKuxa7y9LCqYQR4PWrEGyEvUCySykCwzcTqQNFV9JvAUsKu8hwbRSmbB6RVe"
let programId = "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc"
let tx = store.get(txId)

let realSellerAddress, realBuyerAddress, seller


describe('getSeller', () => {
    it('should return the buyer & seller address for Mmm program', () => {
        const {buyer, seller} = getBuyerAndSeller(tx, programId)

        realBuyerAddress = "9DxRBPbEE41o4HZM7j4PV4cvKozmWgdEgdGqtqP7h4zd"
        realSellerAddress = "28QCj71ovpqyQruW8ziv6MoF21h8wGCPPPNMQoZzCWB5"

        expect(buyer).toEqual(realBuyerAddress)
        expect(seller).toEqual(realSellerAddress)
    }) 

    it('should return only seller address for any given tx', () => {
        txId = "52RFA8HKKTzeBwnNG7sFyZA9WFNZpMd4jQ8ouSWWAxpsZvA4qi7hj4nt7vdiE3K9YrURvajPj5sHy9F8v3w7dpWS"
        programId = "hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu"
        tx = store.get(txId)
        seller = getBuyerAndSeller(tx, programId)
        realSellerAddress = "6uBaNVngE46W8ZUVHuVzcsgeTLEnUDKo9NEtDkinecDJ"
        expect(seller).toBe(realSellerAddress)
    })
})