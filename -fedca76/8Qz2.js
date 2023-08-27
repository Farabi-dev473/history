import getBuyerSellerAndOwner from '../src/packages/decoders/getBuyerSellerAndOwner'
import store from './getAccounts.test'

let txId, buyer, seller, owner, output, result

describe('getBuyerSellerAndOwner', () => {
    it('should return an object with properties include owner, buyer & seller', () => {
        txId = "Vu2ukx8bddQT8RgPhocYJJdg8NaBotbHkDRQywNWsgRWSca1KfjZxtnSRHCapVc1bgrx6gMukARq9sh5ozDpWfR"
        result = ['buyer', 'seller', 'owner']
        const keys = Object.keys(getBuyerSellerAndOwner(txId))

        expect(keys).toEqual(result)
    })

    it('should return buyer, seller, owner for List Type', () => {
        txId = "2SkDXdsEpm9bEZH6zdsC4TFWeQTPLh2zwiLo86fTxPZmqrqTPmjobdu73HPyjFat6MQphp5yVYkJQNSDvx849xw1"
        result = getBuyerSellerAndOwner(txId)
        buyer = false
        seller = "G8aXCw3iShnL7tcd94scdL6Y2hXn9QDSotsvWr89Nwxz"
        owner = seller
        output = {buyer, seller, owner}

        expect(result).toStrictEqual(output)
    })

    it('should return buyer, seller, owner for Sale Type', () => {
        txId = "44JE5GMpWkNEtMUdrBTMVVkPQBdvCrZSjxZzc24yHgij6FPSEKQZt2o6A58Hap9BQbdgrhLmvqqK3c7NPJ4EAC1Y"
        result = getBuyerSellerAndOwner(txId)
        buyer = "CNApMpy3cDBafm1G8pxBArERXn9rX7TtsDPNH6UxBNLR"
        seller = "9zbzbgoBYx6gefbTC42TWcKy7pm1GLDniJeAVznFHTmA"
        owner = buyer
        output = {buyer, seller, owner}

        expect(result).toStrictEqual(output)
    })

    it('should return buyer, seller, owner for Delist Type', () => {
        txId = "5iW72NYeUDFmUsRAxYVxReLx9PYRmApf4MNKRSxT5nZBH2dhRqugpJvbb1GyPtXiKtZg4WVY6kfvgFZ6xGBxKia5"
        result = getBuyerSellerAndOwner(txId)
        buyer = false
        seller = buyer
        owner = "2vkmBXYF4bbij5orbd9xUJkyX9tkPZD2v21M77r1bzA7"
        output = {buyer, seller, owner}

        expect(result).toStrictEqual(output)
    })

    it('should return buyer, seller, owner for UpdateList Type', () => {
        txId = "2uAF57i5E1oLn15MYLDUoi5fGbw8WcwLsgE3QKJX6qc4DpAyft7Aott9NJXBMAzhKUhK61YFLfaxQMcnntUPuceN"
        result = getBuyerSellerAndOwner(txId)
        buyer = false
        seller = buyer
        owner = "Ep4p1DGZNEoezJdojY2eSUCfsjDb38LmdACpGNSfdoSr"
        output = {buyer, seller, owner}

        expect(result).toStrictEqual(output)
    })
    
})
