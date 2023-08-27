const getSeller = (tx, programId) =>{ 

    if(programId === "CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz" || programId === "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K" || programId === "A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7") {
      const {meta: {innerInstructions}} = tx
      const {instructions} = innerInstructions[innerInstructions.length - 1]
      return instructions[instructions.length - 1]?.parsed?.info?.destination
    }
    
    if(programId === "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc") {
      const {meta: {innerInstructions}} = tx
      const {instructions} = innerInstructions[0]
      const seller = instructions[0]?.parsed?.info?.source
      const buyer = instructions[1]?.parsed?.info?.wallet
  
      return {buyer, seller}
    }
  
    if(programId === "TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN" || programId === "HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8") {
      const accounts = getAccounts(tx)
      return accounts[2]
    }
  
  
    if(programId === "hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu" || programId === "5SKmrbAxnHV2sgqyDXkGrLrokZYtWWVEEk5Soed7VLVN" || programId === "hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk") {
      const accounts = getAccounts(tx)
       return accounts[1]
    }
  
    return false
}

export default getSeller