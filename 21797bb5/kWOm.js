// import getTxType from '../index.js'
import Store from 'data-store'
import path from 'node:path'

const store = new Store('', {path: path.join(process.cwd(), '../db.json`')})

const getAccounts = (tx) => {
    const {transaction: {message: {instructions}}} = tx
    return instructions.reduce((acc, {accounts, data, programId}, i) => {
       if(accounts instanceof Array && accounts.length && data && programId) {
         if(acc.length > accounts.length) {
            return acc
         }
         return accounts
       }
    }, [])
}
  
const getBuyerAndSeller = (txId, programId) =>{ 
    const tx = store.get(txId)
    const accounts = getAccounts(tx)
    
  
    if(programId === "CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz") {
      return {
        buyer: accounts[0],
        seller: accounts[3]
      }
    }
  
    if(programId === "HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8") {
      return {
         buyer: accounts[0],
         seller: accounts[2]
      }
    }
  
    if(programId === "hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu" || programId === "5SKmrbAxnHV2sgqyDXkGrLrokZYtWWVEEk5Soed7VLVN" || programId === "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K" || programId === "hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk") {
        return {
          buyer: accounts[0],
          seller: accounts[1]
        }
    }
  
    if(programId === "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc") {
        return {
          buyer: accounts[1],
          seller: accounts[0]
        }
    }
  
    if(programId === "E1XRkj9fPF2NQUdoq41AHPqwMDHykYfn5PzBXAyDs7Be") {
      return {
        buyer: accounts[0],
        seller: accounts[4]
      }
    }
  
    if(programId === "2qGyiNeWyZxNdkvWHc2jT5qkCnYa1j1gDLSSUmyoWMh8") {
      return {
        buyer: accounts[0],
        seller: accounts[11]
      }
    }
}
  
const getBuyerSellerAndOwner = ({txId, programId}) => {
    const tx = store.get(txId)
    const {buyer, seller} = getBuyerAndSeller(txId, programId)
    const txType = "Sale"
    let owner = buyer
  
    if(txType === "Sale") {
      return {
        owner,
        buyer,
        seller
      }
    }
  
    if(txType === "List") {
      return {
        owner,
        seller
      }
    }
  
    return {owner}
}

const data = {txId: "4rrSVmxe4BgdWgCeYGvPqCw53WmZU7hh6Yt337qSky4jLYa82xteptWQ8yA9bkcxmuikhFzEgyWn1zUaSyxyD9tK", programId: "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K"}

console.log(getBuyerSellerAndOwner(data))

