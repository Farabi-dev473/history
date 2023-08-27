const dataView = new DataView(Uint8Array.from(Uint8Array(14) [
  10, 1, 0, 144, 47, 80,
   9, 0, 0,   0,  1,  0,
   1, 0
]).buffer);
let buyerPrice = dataView.getUint64(2);
console.log(buyerPrice);
