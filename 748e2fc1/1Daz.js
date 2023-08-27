import { Transaction } from "@solana/web3.js";
import base58 from "bs58";

const data = base58.decode("ENwHiaH9NA9veUqRzGozjWnTuR9xcNvHcPZVFMi3Ca9L")
console.log(Transaction.from(data))