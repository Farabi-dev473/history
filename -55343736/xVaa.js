const { decreasingPercentage } = require('./lib');

const sdk = require('api')('@reservoirprotocol/v1.0#5rydk2clcv4g3zn');
sdk.auth('demo-api-key');

const getActivities = async(id) => {

return await sdk.getCollectionsActivityV5({collection: id, types: ['ask', 'ask_cancel'], accept: '*/*'})

}

const getDataFromCollection = (collection) => {
    
    const result = {}
   
    result.mintPrice = 'N/A'
    result.supply = collection.tokenCount
    result.mintDate = collection.createdAt
    result.floor = {
      price: collection.floorAsk.price.amount.native,
      priceChangedInPercentage: decreasingPercentage(this.price, collection.floorSale['1day'])
    }

    result.volume = collection.volume['30day']
    result.liveEvents = getActivities(collection.primaryContract)
    return result   
}

const getCollectionById = async(id) => {
  const collections = await sdk.getCollectionsV5({id: id, limit: '1', accept: '*/*'})
  console.log(collection)
  return collections.pop()
}

const collection = getCollectionById('0x81ae0be3a8044772d04f32398bac1e1b4b215aa8')

// const extractedData = getDataFromCollection(collection)
// console.log(extractedData)
