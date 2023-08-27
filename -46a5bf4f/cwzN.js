import base58 from 'bs58';
import fs from 'fs';
import {programs} from './programs'
import {deserialize, deserializeUnchecked} from'borsh'
import Store from 'data-store';

const store = new Store('', {path: process.cwd() + '/db.json'})

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
      logMessages?.includes("Program log: Transfering sales tax") ||
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

function getProgramDataFromAccounts(transaction) {
  const accounts = new Set(
    transaction?.transaction?.message?.accountKeys?.map((e) => e.pubkey)
  );

  if (accounts.has("A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7")) {
    return {
      slug: "Digital Eyes",
      programId: "A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7",
      programData: programs["A7p8451ktDCHq5yYaHczeLMYsjRsAkzc3hCXcSrwYHU7"],
    };
  }

  if (accounts.has("TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN")) {
    return {
      slug: "Tenor Swap",
      programId: "TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN",
      programData: programs["TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN"],
    };
  }

  if (accounts.has("M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K")) {
    return {
      slug: "MagicEdenV2",
      programId: "M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K",
      programData: programs["M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K"],
    };
  }

  if (accounts.has("29xtkHHFLUHXiLoxTzbC7U8kekTwN3mVQSkfXnB1sQ6e")) {
    return {
      slug: "CoralCube",
      programId: "hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk",
      programData: programs["hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk"],
    };
  }

  if (accounts.has("3o9d13qUvEuuauhFrVom1vuCzgNsJifeaBYDPquaT73Y")) {
    return {
      slug: "OpenSea",
      programId: "hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk",
      programData: programs["hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk"],
    };
  }

  if (accounts.has("CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz")) {
    return {
      slug: "Solanart",
      programId: "CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz",
      programData: programs["CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz"],
    };
  }

  if (accounts.has("5SKmrbAxnHV2sgqyDXkGrLrokZYtWWVEEk5Soed7VLVN")) {
    return {
      slug: "yawww",
      programId: "5SKmrbAxnHV2sgqyDXkGrLrokZYtWWVEEk5Soed7VLVN",
      programData: programs["5SKmrbAxnHV2sgqyDXkGrLrokZYtWWVEEk5Soed7VLVN"],
    };
  }

  if (accounts.has("HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8")) {
    return {
      slug: "HyperSpace",
      programId: "HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8",
      programData: programs["HYPERfwdTjyJ2SCaKHmpF2MtrXqWxrsotYDsTrshHWq8"],
    };
  }

  if(accounts.has("mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc")) {
    return {
      slug: "Mmm",
      programId: "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc",
      programData: programs["mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc"]
    }
  }

  if(accounts.has("hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu")) {
    return {
      slug: "HadeSwap",
      programId: "hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu",
      programData: programs["hadeK9DLv9eA7ya5KCTqSvSvRZeJC3JgD5a9Y3CNbvu"]
    }
  }
}

class Test {
  constructor(properties) {
    Object.keys(properties).map((key) => {
      return (this[key] = properties[key]);
    });
  }
}

const getBuyerPrice = (schemaFields, data) => {
      const buffer = Buffer.from(base58.decode(data))
      const TestSchema = new Map([
        [
          Test,
          {
            kind: "struct",
            fields: schemaFields
          },
        ],
      ]);


      try{
        const lamports = deserializeUnchecked(TestSchema, Test, buffer).buyerPrice + ''
        return {buyerPrice: lamports}
      }catch(err) {
        return {error: err.message}
      }
}

const getAccounts = (tx) => {
  const {transaction: {message: {instructions}}} = tx
  
  return instructions.reduce((acc, {accounts, programId, data}) => {
    if(accounts instanceof Array && data && programId) {
      if(accounts.length > acc.length) return accounts
    }
    return acc
  }, [])
}

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

const getBuyerSellerAndOwner = (tx, txType, programId) => {

  let buyer = false
  let seller = false
  let owner = false

  const {transaction: {message: {accountKeys}}} = tx
  owner = accountKeys[0].pubkey


  if(txType === "Sale") {
    buyer = owner
    seller = getSeller(tx, programId)

    if(programId === "mmm3XBJg5gk8XJxEKBvdgptZz6SgK4tXvn36sodowMc") {
       buyer = seller.buyer
       owner = buyer
    }
  }

  if(txType === "List") {
    seller = owner
  }

  return {buyer,seller,owner}
}

async function main() {
  const transactions = Object.values(JSON.parse(fs.readFileSync(__dirname + '/db.json')))
  const transactionIds = Object.keys(JSON.parse(fs.readFileSync(__dirname + '/db.json')))

  transactions.forEach((tx, i) => {

    const txType = getTxType(tx);
    const programData = getProgramDataFromAccounts(tx);
    const programParser = programData?.programData?.actions[txType];
    
    if (programParser?.schemaFields) {
      const txData = tx.transaction.message.instructions
        .filter((e) => e?.accounts?.length && e.data && e.programId)
        .sort((a, b) => {
          let aLength = a?.accounts?.length;
          let bLength = b?.accounts?.length;
          const slug = programData.slug.toLowerCase();
          if (slug === "yawww" || slug === "opensea" || slug === "coralcube")
            return bLength - aLength;
          return aLength - bLength;
        })[0];




      // TODO: Do something here to get the below outputs
      const {schemaFields} = programs[txData.programId]["actions"][`${txType}`]
      const {buyerPrice} = getBuyerPrice(schemaFields, txData.data)
      if(buyerPrice) {
        const amount = (buyerPrice / 1000000000).toFixed(2) + ' SOL'
        const user = getBuyerSellerAndOwner(tx,txType,txData.programId)
        console.log({i, txId: transactionIds[i], txType, slug: programData.slug, buyerPrice, amount, ...user})
      } 
    }  
  })
 

/**
 * Output
{ buyerPrice: 250000000000, i: 0 }
{ buyerPrice: 40000000000, i: 1 }
{ buyerPrice: 17000000000, i: 2 }
{ buyerPrice: 970000000, i: 3 }
{ buyerPrice: 17900000000, i: 4 }
{ buyerPrice: 15000000000, i: 5 }
{ buyerPrice: 52500000000, i: 6 }
{ buyerPrice: 100000000000, i: 7 }
{ buyerPrice: 5690000000, i: 8 }
{ buyerPrice: 15150000000, i: 9 }
{ buyerPrice: 300000000, i: 10 }
*/
}

main();