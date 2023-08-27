import base58 from "bs58";

const data = Buffer.from(base58.decode("ENwHiaH9NA9veUqRzGozjWnTuR9xcNvHcPZVFMi3Ca9L")).toString('utf8')
console.log(JSON.parse(data))