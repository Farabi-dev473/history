import Store from 'data-store'
import {join} from 'node:path'
import { programs } from '../programs.js';

function getTxType(transaction) {
  const { instructions, logMessages } = getInitialSearchData(transaction);

  const isMint =
    instructions?.has("initializeMint") ||
    logMessages?.includes("Instruction: MintNft");
  if (isMint) return "Mint";

  const isSale =
    (instructions?.has("createAccount") &&
      instructions?.has("transfer") &&
      instructions?.has("closeAccount") &&
      !logMessages?.includes("Instruction: Sell")) ||
      logMessages?.includes("Program log: Instruction: BuyNftFromPair") ||
    logMessages?.includes("Program log: Instruction: ExecuteSale");

  if (isSale) return "Sale";

  const isList =
    logMessages?.includes("Instruction: Sell") ||
    logMessages?.includes("Program log: Instruction: DepositLiquiditySingleSellToPair") ||
    logMessages?.includes("Program log: Instruction: DepositNft") ||
    logMessages?.includes("Program log: Instruction: List item");
  if (isList) return "List";

  const isUpdateList = logMessages?.includes("Instruction: Update listing");
  // NOTE: return this as List before final data returning to the client
  if (isUpdateList) return "UpdateList";

  const isDelist =
    logMessages?.includes("Instruction: Cancel") ||
    logMessages?.includes("Instruction: CancelSell") ||
    logMessages?.includes("Program log: Sale cancelled by seller") ||
    logMessages?.includes("Program log: Instruction: WithdrawNftFromPair") ||
    logMessages?.includes("Program log: Instruction: Cancel listing");
  if (isDelist) return "Delist";
}

function getInitialSearchData(transaction) {
  const logMessageJson = transaction?.meta?.logMessages;
  const logMessages = logMessageJson?.join("\n");
  const instructions = new Set(
    transaction?.meta?.innerInstructions
      ?.map((inner) =>
        inner?.instructions?.map((instruction) =>
          instruction?.parsed?.type?.trim()
        )
      )
      .flat()
  );

  return {
    logMessages,
    instructions,
  };
}


const store = new Store('', {path: join(process.cwd(), '..', 'db.json')})

const getAccounts = (tx) => {
    const {transaction: {message: {instructions}}} = tx
    return instructions.reduce((acc, curr) => {
       const {accounts, data, programId} = curr
       if(!(accounts && accounts?.length && data && programId)) return acc
         if(acc.length > accounts.length) {
            return acc
         }
         return accounts
    }, [])
}
  
const getBuyerAndSeller = (txId, programId) =>{ 
    const tx = store.get(txId)
     console.log(txId)
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

const getBuyerSellerAndOwner = (txId, programId) => {
    const tx = store.get(txId)
    const {buyer, seller} = getBuyerAndSeller(txId, programId)
    const txType = getTxType(tx)
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

const data = {txId: "2uAF57i5E1oLn15MYLDUoi5fGbw8WcwLsgE3QKJX6qc4DpAyft7Aott9NJXBMAzhKUhK61YFLfaxQMcnntUPuceN", programId: "5SKmrbAxnHV2sgqyDXkGrLrokZYtWWVEEk5Soed7VLVN"}
console.log(getBuyerSellerAndOwner(data))

