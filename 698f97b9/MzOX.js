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

export default getTxType