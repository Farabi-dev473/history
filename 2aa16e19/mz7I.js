import { deserializeUnchecked } from "borsh"
import base58 from "bs58"

const buffer = Buffer.from(base58.decode('3Bxs4WMREfkaNPWX'))
console.log(deserializeUnchecked())