import { PROGRAM_IDS } from "../../constants.js";
import programs from "../../programs.js";

function getProgramDataFromAccounts(transaction) {
    const accounts = new Set(
      transaction?.transaction?.message?.accountKeys?.map((e) => e.pubkey)
    );
  
    if (accounts.has(PROGRAM_IDS.DIGITAL_EYES)) {
      return {
        slug: "Digital Eyes",
        programId: PROGRAM_IDS.DIGITAL_EYES,
        programData: programs[PROGRAM_IDS.DIGITAL_EYES],
      };
    }
  
    if (accounts.has(PROGRAM_IDS.TENSOR)) {
      return {
        slug: "Tenor Swap",
        programId: PROGRAM_IDS.TENSOR,
        programData: programs[PROGRAM_IDS.TENSOR],
      };
    }
  
    if (accounts.has(PROGRAM_IDS.MAGICEDEN_V2)){
      return {
        slug: "MagicEdenV2",
        programId: PROGRAM_IDS.MAGICEDEN_V2,
        programData: programs[PROGRAM_IDS.MAGICEDEN_V2],
      };
    }
  
    if (accounts.has(PROGRAM_IDS.CORALCUBE)) {
      return {
        slug: "CoralCube",
        programId: PROGRAM_IDS.CORALCUBE,
        programData: programs[PROGRAM_IDS.CORALCUBE],
      };
    }
  
    if (accounts.has(PROGRAM_IDS.OPENSEA)) {
      return {
        slug: "OpenSea",
        programId: PROGRAM_IDS.OPENSEA,
        programData: programs[PROGRAM_IDS.OPENSEA],
      };
    }
  
    if (accounts.has(PROGRAM_IDS.SOLANART)) {
      return {
        slug: "Solanart",
        programId: PROGRAM_IDS.SOLANART,
        programData: programs[PROGRAM_IDS.SOLANART],
      }
    }

    if (accounts.has(PROGRAM_IDS.YAWWW)) {
      return {
        slug: "yawww",
        programId: PROGRAM_IDS.YAWWW,
        programData: programs[PROGRAM_IDS.YAWWW],
      };
    }
  
    if (accounts.has(PROGRAM_IDS.HYPERSPACE)) {
      return {
        slug: "HyperSpace",
        programId: PROGRAM_IDS.HYPERSPACE,
        programData: programs[PROGRAM_IDS.HYPERSPACE],
      };
    }
  
    if(accounts.has(PROGRAM_IDS.MMM)) {
      return {
        slug: "Mmm",
        programId: PROGRAM_IDS.MMM,
        programData: programs[PROGRAM_IDS.MMM],
      }
    }
  
    if(accounts.has(PROGRAM_IDS.HADESWAP)) {
      return {
        slug: "HadeSwap",
        programId: PROGRAM_IDS.HADESWAP,
        programData: programs[PROGRAM_IDS.HADESWAP],
      }
    }

    if(accounts.has(PROGRAM_IDS.AUCTIONHOUSE)) {
      return {
        slug: "Auction_House_CoralCube_V2",
        programId: PROGRAM_IDS.AUCTIONHOUSE,
        programData: programs[PROGRAM_IDS.AUCTIONHOUSE],
      }
    }
}
  
export default getProgramDataFromAccounts