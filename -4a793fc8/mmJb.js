import getAccounts from '../src/packages/decoders/getAccounts'
import Store from 'data-store'
import {join} from 'node:path'

const store = new Store('', {path: join(__dirname, '..', 'src', 'db.json')})

const txId = "3LAKYWLgWLTbBDthspnAfbffkNBKWXFSixAVXAW9rVPYBbhrizBvCtW1GTvSRpmLgc5GKk7atpreP1XZvVEZG1YB"
const tx = store.get(txId)
const output = [
  "3SZ7dpXCYu1XN6r9x4ekQNrmdMQQpyemmA1fSUQ49Mph",
  "2iTxWVuvFbtTQv3HDAwSe8qxMT7Dia3kqtH8HqH1SK7Q",
  "NTYeYJ1wr4bpM5xo6zx5En44SvJFAd35zTxxNoERYqd",
  "DMAJev6JinK4fNosGDWF3VweEZhqbshqazxzG16fLwpK",
  "7e7ffV1MCKbP7wn8RpRoZ6dw8vorCBFbdDHhF99MCk3o",
  "4QJwrP2hy7LdwzyQx6nD7ZXWLaAhcxGq2Vqdm76JTiU4",
  "H8DkwdZb32UdkZCasZvEjMfN33NqpL2zQY9YQMcB58ph",
  "8zmDiu8LE8kJjhyoaFBKVDWXAmTT7ytARmf2M1YWJPVh",
  "autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2",
  "E8cU1WiRWjanGxmn96ewBgk9vPTcL6AEZ1t6F6fkgUWe",
  "rFqFJ9g7TGBD8Ed7TPDnvGKZ5pWLPDyxLcvcH2eRCtt",
  "CRTgFdiPYXLwpgGMmbusp3EPqsV5oQccgBdHn9ihVkMs",
  "HeCtzGQjpJg9LB3FsTH49UX7dJA72Pynk24Ed28Ybhvx",
  "EZKsw7DFDNkrPZhVSNTspsVdLr3npomPnbsTgFF6LaGc",
  "autMW8SgBkVYeBgqYiTuJZnkvDZMVU2MHJh9Jh7CSQ2",
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
  "11111111111111111111111111111111",
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
  "1BWutmTvYPwDtmw9abTkS4Ssr8no61spGAvW1X6NDix",
  "SysvarRent111111111111111111111111111111111",
  "9ru6UN1E6V6rUNoVEe9muG3XhmhCHLFRUVHBkc2PFwHy",
  "8ZdzxEQ2v4yKKWgJjKoJLdGnsnAiCmh5ABuuJi8RKeQV"
]

describe('getAccounts', () => {
  const accounts = getAccounts(tx)
  it('should return an arrray', () => {
     expect(accounts instanceof Array).toBeTruthy()
  })

  it('should return the biggest array from accounts', () => {
    expect(accounts).toEqual(output)
  })
})

export default store