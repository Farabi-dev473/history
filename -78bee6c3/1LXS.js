import parseMagicEdenTx from './packages/decoders/parseMagicEdenTx'

const result = parseMagicEdenTx("21JLn1W6J7uWxZWNe33NAaCN5uhxABE1R63wDfFbkkiySh9xnjw15K8PEssX3bm464Z219MEBeDxjK9GH8EhLDP5")
const keys = Object.keys(result).forEach((key) => {
    console.log(`${key}: ${result[key]}`)
})


