import getTransaction from "./lib/getTransaction";
import singleTransactionParser from "./lib/single-tx-parser";
import fs from 'node:fs'

const transactionIds = Object.keys(JSON.parse(fs.readFileSync('../db.json', 'utf-8')))