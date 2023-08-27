// const sdk = require('api')('@reservoirprotocol/v1.0#5rydk2clcv4g3zn');
// const {decreasingPercentage} = require('./lib')

// sdk.auth('demo-api-key');
// sdk.getCollectionsV5({name: 'Bored%20Ape%20Yacht%20Club', limit: '1', accept: '*/*'})
//   .then(({ data }) => {
//     data = data.collections
//     const result = {}
    
//     floor = {
//       price: floorAsk.amount.native,
//       priceChangedPercentage: decreasingPercentage(price, floorSale['1day']),
//     }

//     let volume =  data.volume['allTime']

//     stats = {
//        '1day' :  {
//           price : data.floorAsk.amount.native,
//           priceChange: decreasingPercentage(this.price, this.floorSale['1day']),
//           priceChangePercentage: this.priceChange > 0 ? '+' + this.priceChange : '-' + this.priceChange,
//           volume: data.volume['1day'],  
//        },
//       '7day': {
//           price : data.floorSale['7day'],
//           priceChange: decreasingPercentage(data.floorAsk.amount.native, this.price),
//           priceChangePercentage: this.priceChange > 0 ? '+' + this.priceChange : '-' + this.priceChange,
//           volume: data.volume['7day'], 
//       },
//       '30day': {
//         price : data.floorSale['30day'],
//         priceChange: decreasingPercentage(this.floorAsk.amount.native, this.price),
//         priceChangePercentage: this.priceChange > 0 ? '+' + this.priceChange : '-' + this.priceChange,
//         volume: data.volume['30day'], 
//       }
//     }

//     result.stats['24h'] = {
      
//     }

//   })
//   .catch(err => console.error(err));


let some = new Date() - new Date(1673972458)

console.log(new Date(some).getHours())