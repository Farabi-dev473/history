import toDataView from "to-data-view"

console.log(toDataView(Buffer.from([
  10, 1, 0, 144, 47, 80,
   9, 0, 0,   0,  1,  0,
   1, 0
])))