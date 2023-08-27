import getProgramDataFromAccounts from "../decoders/getProgramDataFromAccounts.js";

const getInstructionData = (tx, txType) => {
    const programData = getProgramDataFromAccounts(tx);
    const programParser = programData?.programData?.actions[txType];
    
    let txData = {}

    if (programParser?.schemaFields) {
      txData = tx.transaction.message.instructions
        .filter((e) => e?.accounts?.length && e.data && e.programId)
        .sort((a, b) => {
          let aLength = a?.accounts?.length;
          let bLength = b?.accounts?.length;
          const slug = programData.slug.toLowerCase();
          if (slug === "yawww" || slug === "opensea" || slug === "coralcube" || slug === "auction_house_coralcube_v2")
            return bLength - aLength;
          return aLength - bLength;
        })[0];
    }
    
    return txData
}

export default getInstructionData