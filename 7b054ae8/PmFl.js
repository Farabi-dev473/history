import web3 from"@solana/web3.js"
import base58 from "bs58";
import fs from 'fs'
import { parse } from "path";
import formatJson from "format-json";
let connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));

const data = await connection.getParsedTransaction('3gNwANxTi4V7bnNkorvvQpRRQe2mm9XQ476vZWcc5yNd7uptwix2nR5TpEJf8x6fSv8SCeAcSWphig2varRZh9gM', {maxSupportedTransactionVersion: 0})

fs.writeFileSync("./answer.json", formatJson.diffy(data))
// const data2 = await connection.getParsedProgramAccounts("M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K")