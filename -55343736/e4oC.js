const { decreasingPercentage } = require('./lib');

const sdk = require('api')('@reservoirprotocol/v1.0#5rydk2clcv4g3zn');
sdk.auth('demo-api-key');


// getting activites / live events
const getActivities = (id) => {

return sdk.getCollectionsActivityV5({collection: id, types: ['ask', 'ask_cancel'], accept: '*/*'})
    
}


// Extracting data from colleciton
const extractDataFromCollection = (collection) => {
    
    const result = {
      ...collection
    }
   
    result.mintPrice = 'N/A'
    result.supply = collection.tokenCount
    result.mintDate = collection.createdAt
    result.floor = {
      price: collection.floorAsk.price.amount.native,
      priceChangedInPercentage: decreasingPercentage(this.price, collection.floorSale['1day'])
    }

    result.volume = collection.volume['30day']
    getActivities(collection.primaryContract)
      .then(({data}) => {
        result.activities = data.activities
        return result
      })

}

const getDataFromCollection = (id) => {

sdk.getCollectionsV5({id: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', accept: '*/*'})
  .then(({ data }) => extractDataFromCollection(data.collections.pop()))
  .then(result => console.log(result))
  .catch(err => console.error(err));
}


// Main function
getDataFromCollection('0x81ae0be3a8044772d04f32398bac1e1b4b215aa8')

