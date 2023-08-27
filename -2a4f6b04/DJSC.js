const sdk = require('api')('@reservoirprotocol/v1.0#5rydk2clcv4g3zn');
const {decreasingPercentage} = require('./lib')

sdk.auth('demo-api-key');
sdk.getCollectionsV5({name: 'Bored%20Ape%20Yacht%20Club', limit: '1', accept: '*/*'})
  .then(({ data }) => {
    data = data.collections
    const result = {}

    floor = {
      price: floorAsk.amount.native,
      
    }

    stats = {

    }

    result.stats['24h'] = {
      priceChange: data.floorSaleChange['1day']
  
    }

  })
  .catch(err => console.error(err));