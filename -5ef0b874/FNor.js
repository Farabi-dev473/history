import base58 from 'bs58';
import fs from 'fs';
import programs from './programs';
import {baseDecode, deserializeUnchecked} from'borsh'

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
    logMessages?.includes("Program log: Instruction: ExecuteSale");

  if (isSale) return "Sale";

  const isList =
    logMessages?.includes("Instruction: Sell") ||
    logMessages?.includes("Program log: Instruction: List item");
  if (isList) return "List";

  const isUpdateList = logMessages?.includes("Instruction: Update listing");
  // NOTE: return this as List before final data returning to the client
  if (isUpdateList) return "UpdateList";

  const isDelist =
    logMessages?.includes("Instruction: Cancel") ||
    logMessages?.includes("Instruction: CancelSell") ||
    logMessages?.includes("Program log: Sale cancelled by seller") ||
    logMessages?.includes("Program log: Instruction: Cancel listing");
  if (isDelist) return "Delist";
}

function getProgramDataFromAccounts(transaction) {
  const accounts = new Set(
    transaction?.transaction?.message?.accountKeys?.map((e) => e.pubkey)
  );

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
}

class Test {
  constructor(properties) {
    Object.keys(properties).map((key) => {
      return (this[key] = properties[key]);
    });
  }
}

async function main() {
  const transactions = Object.values(JSON.parse(fs.readFileSync(__dirname + '/db.json')))

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

      const {schemaFields} = programs[txData.programId]["actions"]["Sale"]
      const buffer = Buffer.from(baseDecode(txData.data))
       
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
        const hex = deserializeUnchecked(TestSchema, Test, buffer).buyerPrice + ''
        console.log({buyerPrice: parseInt(hex, 16), i})
      }catch(err) {
        console.log({error: err.message, i})
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
