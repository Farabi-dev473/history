import getSolAmount from './src/packages/helpers/getSolAmount'

const lamports = "46380668409"
const sol = getSolAmount(lamports).toFixed(2)

console.log(sol)
// 46.38