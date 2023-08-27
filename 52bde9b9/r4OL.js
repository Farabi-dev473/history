import { programs } from "../../programs.js";

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

    if(accounts.has("6U2LkBQ6Bqd1VFt7H76343vpSwS5Tb1rNyXSNnjkf9VL")) {
      return {
        slug: "Auction_House_CoralCube",
        programId: "6U2LkBQ6Bqd1VFt7H76343vpSwS5Tb1rNyXSNnjkf9VL",
        programData: programs["hausS13jsjafwWwGqZTUQRmWyvyxn9EQpqMwV1PBBmk"]
      }
    }

}

export default getProgramDataFromAccounts