const sdk = require('api')('@reservoirprotocol/v1.0#5rydk2clcv4g3zn');
const {decreasingPercentage} = require('./lib')

sdk.auth('demo-api-key');
sdk.getCollectionsV5({name: 'Bored%20Ape%20Yacht%20Club', limit: '1', accept: '*/*'})
  .then(({ data }) => {
    data = data.collections
    const result = {}
    result.floor = {}
    result.mint.supply = data.tokenCount
    result.mint.date = new Date(data.createdAt).toLocaleDateString('en-Us', { month: "short", day: "numeric" })
    result.floor.price = data.floorSale['1day']
    let val = (data.floorSaleChange['1day'] * 100).toFixed(2)
    if(data.floorSaleChange['1day'] > 0) {
       result.floor.increase = val
    }else{
      result.floor.deccrease = '-' + val 
    }
    result.volume = data.volume['1day']

  })
  .catch(err => console.error(err));