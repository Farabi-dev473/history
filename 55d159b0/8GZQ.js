import { useState } from "react"

function Collection() {
    const collections = ['Any']
    const [selectedCollection, setSelectedCollection] = useState(collections[0])
    const [query, setQuery] = useState('')
    const [filteredCollection, setfilteredCollection] = useState(collections)
  
    useEffect(() => {
      async function fetchCollection() {
       try{
        const response = await axios.get(`http://localhost:4600/api/collections/?q=${query}`)
  
        if(response.data.status) {
          setfilteredCollection(['Any', ...response.data.nfts.map((collection) => collection.name)])
        }else{
          toast.error('Internal Server Error. Failed to fetch collections')
        }
       }catch(err) {
         toast.error('Internal Server Error')
       }
      }
  
      fetchCollection()
    }, [query])
  
    console.log(...filteredCollection)
    return (
      <Combobox value={selectedCollection} onChange={setSelectedCollection}>
        <Combobox.Input onChange={(event) => setQuery(event.target.value)} />
        <Combobox.Options>
          {filteredCollection.map((collectionName) => (
            <Combobox.Option key={collectionName} value={collectionName}>
              {collectionName}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    )
  }

export default Collection