const getTokenSize = (tx: any) => {
    return tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount
}

export default getTokenSize