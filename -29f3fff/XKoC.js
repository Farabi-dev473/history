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

export default getInitialSearchData