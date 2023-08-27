import getBuyerPrice from '../src/packages/decoders/getBuyerPrice'



const txId = "3LAKYWLgWLTbBDthspnAfbffkNBKWXFSixAVXAW9rVPYBbhrizBvCtW1GTvSRpmLgc5GKk7atpreP1XZvVEZG1YB"
const {lamports} = getBuyerPrice(txId)
const output =  "300000000"

describe('getBuyerPrice', () => {

    it('should return lamports if there no error occurs', () => {
        expect(lamports).toBe(output) 
    })
})