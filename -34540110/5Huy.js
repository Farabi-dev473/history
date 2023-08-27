const getAccounts = (tx) => {
    const {transaction: {message: {instructions}}} = tx
    
    return instructions.reduce((acc, {accounts, programId, data}) => {
      if(accounts instanceof Array && data && programId) {
        if(accounts.length > acc.length) return accounts
      }
      return acc
    }, [])
}

export default getAccounts