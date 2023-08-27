import store from "./store"

const getTokenSize = (txId) => {
    const tx = store.get(txId)
    return tx?.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount
}

export default getTokenSize