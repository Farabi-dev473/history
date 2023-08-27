import getBuyerPrice from "./packages/decoders/getBuyerPrice"

const schemaFields = [
    ["instructionDiscriminator", ["u8", 8]],
    ["", "u8"],
    ["buyerPrice", "u64"],
]

const data = "3GyWrkssW12wQTbzN4smGdnf"

const result = getBuyerPrice(schemaFields, data)

if(result.type === "data") {
    const {lamports} = result
    console.log({buyerPrice: lamports})
    // 300000000
}else{
    const {error} = result
    console.log(error)
}