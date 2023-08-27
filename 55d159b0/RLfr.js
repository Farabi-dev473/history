import { Combobox } from '@headlessui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
function Collection() {
    const collections = ['Any']
    const [selectedCollection, setSelectedCollection] = useState(collections[0])
    const [query, setQuery] = useState('')
    const [filteredCollection, setfilteredCollection] = useState(collections)
  

        useEffect(() => {
            async function fetchCollection() {
             try{
              const response = await axios.get(`http://localhost:4600/api/collections/?q=${query}&limit=5`)
        
              if(response.data.status) {
                  let collectionNames = query === '' ? ['Any'] : ['Any', ...response.data.nfts.map((collection) => collection.name)]
                  setfilteredCollection(collectionNames)
              }else{
                toast.error('Internal Server Error. Failed to fetch collections')
              }
             }catch(err) {
               toast.error('Internal Server Error')
             }
            }
        
            fetchCollection()
          }, [query])
    

    return (
      <div className="flex justify-center text-black w-1/2 h-11">
         <Combobox value={selectedCollection} onChange={setSelectedCollection}>
        <Combobox.Input onChange={(event) => setQuery(event.target.value)} className="w-1/2 h-11 m-10"/>
        <Combobox.Options className="text-black">
          {filteredCollection.map((collectionName) => (
            <Combobox.Option key={collectionName} value={collectionName}>
              {collectionName}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
      </div>
    )
}

export default Collection