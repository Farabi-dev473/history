const sdk = require('api')('@reservoirprotocol/v1.0#5rydk2clcv4g3zn');


sdk.auth('demo-api-key');
sdk.getCollectionsV5({accept: '*/*'})
  .then(({ data }) => {
     const moonly = data.collections.find((collection) => collection.name === 'Moonly')
     console.log(moonly)
    // console.log(data)
  })
  .catch(err => console.error(err));

