import getAccounts from "./getAccounts"

const getBuyerAndSeller = (tx, programId) =>{ 
   let buyer = tx?.transaction?.message?.accountKeys[0]?.pubkey
   let seller 
    if(programId === "CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz" || programId === "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K" || programId === "A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7") {
      const {meta: {innerInstructions}} = tx
      const {instructions} = innerInstructions[innerInstructions.length - 1]
      seller = instructions[instructions.length - 1]?.parsed?.info?.destination
      return {
        buyer,
        seller
      }
    }
    
    if(programId === "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc") {
      const {meta: {innerInstructions}} = tx
      const {instructions} = innerInstructions[0]
      seller = instructions[0]?.parsed?.info?.source
      buyer = instructions[1]?.parsed?.info?.wallet
  
      return {buyer, seller}
    }
  
    if(programId === "TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN" || programId === "HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8") {
      const accounts = getAccounts(tx)
      seller = accounts[2]
      return {
        buyer,
        seller
      }
    }
  
  
    if(programId === "hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu" || programId === "5SKmrbAxnHV2sgqyDXkGrLrokZYtWWVEEk5Soed7VLVN" || programId === "hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk") {
      const accounts = getAccounts(tx)
      seller  = accounts[1]
      return {
        buyer,
        seller
      }
    }
  
    return {
      buyer: false,
      seller: false
    }
}

export default getBuyerAndSeller