const store = require('data-store')({ path: process.cwd() + '/db.json' });
const findSaleAmount = (txId, programId) => {
 
    const tx = store.get(txId)
    let done = false
    let sale
    
    if(programId === "TSWAPaqyCSx2KABk68Shruf4rp7CxcNi8hAsbdwmHbN") {
       tx?.meta?.innerInstructions?.forEach(({instructions}) => {
         if(done) return
         const {parsed: {info: {lamports}}} = instructions.find((instruction) => {
           if(instruction?.parsed?.type === "transfer") {
              done = true
              return done
           }
         })
         sale = lamports / 1000000 
        })
    }
    return sale
}