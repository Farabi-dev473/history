import getAccounts from '../utils/getAccounts'
import Store from 'data-store'
import {join} from 'node:path'

const store = new Store('', join(process.cwd(), '..', '/db.json'))

const txId = "4oBFNe4qY8HQGUMComcWQtDmF9Q9YGvLEYDUPbMWqeGBKRXTj5595C3N1EWyT6SRgFSSQys12kdaauDndNeHKbPR"
const tx = store.get(txId)
const output = [
  "BpAkt9QKDHNwmwMxZUgBnPjoVTqK5seDn2hB8XQ8JiVX",
  "57yQYzV3rg1Uw3UUivbbDktuuodUhq9o9JkizTBfTFve",
  "NTYeYJ1wr4bpM5xo6zx5En44SvJFAd35zTxxNoERYqd",
  "GeDUDSoCFSfK1gzqXBYtP4rhn9FN58GazB3p9hdsRbcN",
  "EcWJFSHxJ1iXEvcX3W9HD3zts4dTMQht3x8hLtGK5JMg",
  "6WodsaKfJ2meBuZkuajyqgmQw5DNhbGYCHfy7Fma3ieJ",
  "6YghkGoJJqWGXnPhyokJ4QhtwTC6mYoUCrU4faxfDxqy",
  "8UdASEr6ZTBFzoj7qLAsK4iRfwnbKW2Z67yhRRBK6yJK",
  "autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2",
  "E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe",
  "rFqFJ9g7TGBD8Ed7TPDnvGKZ5pWLPDyxLcvcH2eRCtt",
  "Bb4YD3hspoMhih3PVjUKmQhG3PYBjVbJq7wS1n5ivZG8",
  "971fLPdpjRQ1dLw9b97Dgu8SGBVD6M83FMWYjPstCjFg",
  "BguqW3XEBfwkgot1izLHfefa91uxzr8D1oo7Tixi8rPn",
  "GJ424aYFoVDHFPrTFpc917q7TD432fccEkgyAwS3Gryk",
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
  "11111111111111111111111111111111",
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
  "1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix",
  "SysvarRent111111111111111111111111111111111"
]

console.log(tx)

describe('getAccounts', () => {
  const accounts = getAccounts(tx)
  it('should return an arrray', () => {
     expect(accounts instanceof Array).toBeTruthy()
  })

  it('should return the biggest array from accounts', () => {
    expect(accounts).toEqual(output)
  })
})