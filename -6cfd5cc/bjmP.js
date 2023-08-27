const {encode, decode} = require('bs58')

console.log(Buffer.from(decode('ENwHiaH9NA9veUqRzGozjWnTuR9xcNvHcPZVFMi3Ca9L')).toString('hex') === 'c6c682cba35faf4b004429353a0000000100000000000000fffffffffffffff')