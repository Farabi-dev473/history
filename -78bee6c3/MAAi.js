import getBuyerPrice from "./packages/decoders/getBuyerPrice";
import fs from 'node:fs/promises'

const dbFilePath = process.cwd() + '/db.json'

const main = async() => {
    const transactionIds = Object.keys(JSON.parse(fs.readFile(dbFilePath, 'utf-8')))

    transactionIds.forEach((txId, i) => {
        const data = getBuyerPrice(txId)

        if(data.type === 'data') {
            const {lamports} = data
            console.log(lamports)
            return
        }
        console.log(data.error)
    })
}


