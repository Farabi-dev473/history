import web3 from"@solana/web3.js"
import base58 from "bs58";
import fs from 'fs'
import { parse } from "path";
import formatJson from "format-json";
let connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));

const data = await connection.getParsedTransaction('gbkJJ4mKEvJABqmpTfChiqg4nEDYQQoQ9SUGerGz93SYBuBeknqTCPgkz2Sf7282F2AAx1rzFgfzHf4KsR6osm6', {maxSupportedTransactionVersion: 0})

fs.writeFileSync("./answer.json", formatJson.diffy(data))
// const data2 = await connection.getParsedProgramAccounts("M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K")yarn star