import web3 from"@solana/web3.js"
import base58 from "bs58";
import fs from 'fs'
import { parse } from "path";
import formatJson from "format-json";
let connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"));

const data = await connection.getParsedTransaction('65GBRLNkRcuSr8JkgFg1xJuMRqWLTXd87uv2bxLvEq1TgY2MdiLtqtEqNRxqaSPuyMASJoaxP4Z9sdFZ67UGHhYF', {maxSupportedTransactionVersion: 0})

fs.writeFileSync("./answer.json", formatJson.diffy(data))
// const data2 = await connection.getParsedProgramAccounts("M2mx93ekt1fmXSVkTrUL9xVFHkmME8HTUi5Cyc5aF7K")yarn 